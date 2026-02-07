import { env } from '$env/dynamic/private';
import { allContributions } from '$lib/contributions.js';

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
let cachedStats: GithubStats | null = null;
let cacheTimestamp = 0;

interface OrgStats {
	followers: number;
	public_repos: number;
}

interface RepoStats {
	stargazers_count: number;
	open_issues_count: number;
	forks_count: number;
}

export type GithubStats = {
	[url: string]:
		| {
				type: 'organization';
				followers: number;
				repos: number;
				members: number;
		  }
		| {
				type: 'repository';
				stars: number;
				issues: number;
				forks: number;
				contributors: number;
		  }
		| {
				type: 'error';
		  };
};

function extractGithubPath(url: string): string {
	return url.replace('https://github.com/', '');
}

function getHeaders() {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'DavesWeb'
	};

	if (env.GITHUB_API) {
		headers['Authorization'] = `Bearer ${env.GITHUB_API}`;
	}

	return headers;
}

function getUnauthHeaders() {
	return {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'DavesWeb'
	};
}

async function fetchOrgStats(path: string): Promise<OrgStats> {
	const res = await fetch(`https://api.github.com/orgs/${path}`, {
		headers: getHeaders()
	});

	// Fine-grained tokens may be blocked by org policy — retry without auth
	if (res.status === 403 && env.GITHUB_API) {
		const fallback = await fetch(`https://api.github.com/orgs/${path}`, {
			headers: getUnauthHeaders()
		});
		if (!fallback.ok) throw new Error(`GitHub API error: ${fallback.status}`);
		return fallback.json();
	}

	if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
	return res.json();
}

async function fetchOrgMembers(path: string): Promise<number> {
	const res = await fetch(`https://api.github.com/orgs/${path}/public_members?per_page=100`, {
		headers: getHeaders()
	});

	// Fine-grained tokens may be blocked by org policy — retry without auth
	if (res.status === 403 && env.GITHUB_API) {
		const fallback = await fetch(
			`https://api.github.com/orgs/${path}/public_members?per_page=100`,
			{
				headers: getUnauthHeaders()
			}
		);
		if (!fallback.ok) throw new Error(`GitHub API error: ${fallback.status}`);
		const data = await fallback.json();
		return Array.isArray(data) ? data.length : 0;
	}

	if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
	const data = await res.json();
	return Array.isArray(data) ? data.length : 0;
}

async function fetchRepoStats(path: string): Promise<RepoStats> {
	const res = await fetch(`https://api.github.com/repos/${path}`, {
		headers: getHeaders()
	});

	if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
	return res.json();
}

async function fetchRepoContributors(path: string): Promise<number> {
	const res = await fetch(`https://api.github.com/repos/${path}/contributors?per_page=100`, {
		headers: getHeaders()
	});

	if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
	const data = await res.json();
	return Array.isArray(data) ? data.length : 0;
}

export async function load() {
	if (cachedStats && Date.now() - cacheTimestamp < CACHE_DURATION) {
		return { stats: cachedStats };
	}

	const stats: GithubStats = {};

	const promises = allContributions.map(async (contribution) => {
		const path = extractGithubPath(contribution.url);

		try {
			if (contribution.type === 'organization') {
				const [data, members] = await Promise.all([fetchOrgStats(path), fetchOrgMembers(path)]);
				stats[contribution.url] = {
					type: 'organization',
					followers: data.followers,
					repos: data.public_repos,
					members
				};
			} else {
				const [data, contributors] = await Promise.all([
					fetchRepoStats(path),
					fetchRepoContributors(path)
				]);
				stats[contribution.url] = {
					type: 'repository',
					stars: data.stargazers_count,
					issues: data.open_issues_count,
					forks: data.forks_count,
					contributors
				};
			}
		} catch (err) {
			console.error(`Failed to fetch stats for ${contribution.url}:`, err);
			stats[contribution.url] = { type: 'error' };
		}
	});

	await Promise.all(promises);

	cachedStats = stats;
	cacheTimestamp = Date.now();

	return { stats };
}
