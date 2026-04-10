import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { allContributions } from '$lib/contributionsData';

const cacheDuration = 10 * 60 * 1000;

let cachedStats = null;
let cacheTimestamp = 0;

function extractGithubPath(url) {
	return url.replace('https://github.com/', '');
}

function getHeaders() {
	const headers = {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'DavesWeb'
	};

	if (env.GITHUB_API) {
		headers.Authorization = `Bearer ${env.GITHUB_API}`;
	}

	return headers;
}

function getUnauthHeaders() {
	return {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'DavesWeb'
	};
}

async function fetchOrgStats(path) {
	const response = await fetch(`https://api.github.com/orgs/${path}`, {
		headers: getHeaders()
	});

	if (response.status === 403 && env.GITHUB_API) {
		const fallbackResponse = await fetch(`https://api.github.com/orgs/${path}`, {
			headers: getUnauthHeaders()
		});

		if (!fallbackResponse.ok) {
			throw new Error(`GitHub API error: ${fallbackResponse.status}`);
		} else {
			return fallbackResponse.json();
		}
	}

	if (!response.ok) {
		throw new Error(`GitHub API error: ${response.status}`);
	} else {
		return response.json();
	}
}

async function fetchOrgMembers(path) {
	const response = await fetch(`https://api.github.com/orgs/${path}/public_members?per_page=100`, {
		headers: getHeaders()
	});

	if (response.status === 403 && env.GITHUB_API) {
		const fallbackResponse = await fetch(
			`https://api.github.com/orgs/${path}/public_members?per_page=100`,
			{
				headers: getUnauthHeaders()
			}
		);

		if (!fallbackResponse.ok) {
			throw new Error(`GitHub API error: ${fallbackResponse.status}`);
		} else {
			const data = await fallbackResponse.json();

			if (Array.isArray(data)) {
				return data.length;
			} else {
				return 0;
			}
		}
	}

	if (!response.ok) {
		throw new Error(`GitHub API error: ${response.status}`);
	} else {
		const data = await response.json();

		if (Array.isArray(data)) {
			return data.length;
		} else {
			return 0;
		}
	}
}

async function fetchRepoStats(path) {
	const response = await fetch(`https://api.github.com/repos/${path}`, {
		headers: getHeaders()
	});

	if (!response.ok) {
		throw new Error(`GitHub API error: ${response.status}`);
	} else {
		return response.json();
	}
}

async function fetchRepoContributors(path) {
	const response = await fetch(`https://api.github.com/repos/${path}/contributors?per_page=100`, {
		headers: getHeaders()
	});

	if (!response.ok) {
		throw new Error(`GitHub API error: ${response.status}`);
	} else {
		const data = await response.json();

		if (Array.isArray(data)) {
			return data.length;
		} else {
			return 0;
		}
	}
}

async function buildGithubStats() {
	if (cachedStats && Date.now() - cacheTimestamp < cacheDuration) {
		return cachedStats;
	}

	const stats = {};

	const promises = allContributions.map(async function (contribution) {
		const githubPath = extractGithubPath(contribution.url);

		try {
			if (contribution.type === 'organization') {
				const [data, members] = await Promise.all([
					fetchOrgStats(githubPath),
					fetchOrgMembers(githubPath)
				]);

				stats[contribution.url] = {
					type: 'organization',
					followers: data.followers,
					repos: data.public_repos,
					members: members
				};
			} else {
				const [data, contributors] = await Promise.all([
					fetchRepoStats(githubPath),
					fetchRepoContributors(githubPath)
				]);

				stats[contribution.url] = {
					type: 'repository',
					stars: data.stargazers_count,
					issues: data.open_issues_count,
					forks: data.forks_count,
					contributors: contributors
				};
			}
		} catch (error) {
			console.log('Exception: ' + error);

			stats[contribution.url] = {
				type: 'error'
			};
		}
	});

	await Promise.all(promises);

	cachedStats = stats;
	cacheTimestamp = Date.now();

	return stats;
}

export async function GET() {
	try {
		const stats = await buildGithubStats();
		return json({ stats: stats });
	} catch (error) {
		console.log('Exception: ' + error);

		return json(
			{
				error: 'Failed to fetch GitHub stats.'
			},
			{
				status: 500
			}
		);
	}
}
