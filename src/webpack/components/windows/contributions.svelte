<script lang="ts">
	import { onMount } from 'svelte';
	import Window from '../window.svelte';
	import './textStyle.css';
	import { allContributions } from '../../../routes/api/githubAPI/contributions';

	export let onClose: () => void = () => {};

	type GithubStats = Record<
		string,
		| { type: 'organization'; followers: number; repos: number; members: number }
		| { type: 'repository'; stars: number; issues: number; forks: number; contributors: number }
		| { type: 'error' }
	>;

	let stats: GithubStats = {};
	let isLoading = true;
	let error: string | null = null;

	async function fetchStats() {
		isLoading = true;
		error = null;

		try {
			const response = await fetch('/api/githubAPI');
			const data = await response.json();

			if (!response.ok || data.error) {
				error = data.error ?? 'Failed to fetch GitHub stats.';
				return;
			}

			stats = data.stats ?? {};
		} catch (e: any) {
			error = `Network error: ${e.message}`;
		} finally {
			isLoading = false;
		}
	}

	function githubPath(url: string) {
		return url.replace('https://github.com/', '');
	}

	onMount(() => {
		fetchStats();
	});
</script>

<Window title="Contributions" {onClose}>
	{#if isLoading}
		<p>Loading contributions...</p>
	{:else if error}
		<p>{error}</p>
	{:else}
		{#each allContributions as contribution (contribution.url)}
			{@const stat = stats[contribution.url]}
			<a href={contribution.url} target="_blank" rel="noopener noreferrer" class="contributionLink">
				<div class="frame contributionCard">
					<div class="topRow">
						<div>
							<span class="title">{contribution.name}</span>
							<p class="description">{contribution.description}</p>
							<span class="meta">{githubPath(contribution.url)}</span>
						</div>
					</div>

					{#if stat && stat.type === 'organization'}
				    	<div class="statsRow">
				    		<span class="statItem"> <img src="/assets/icons/contributions/followers.svg" width="15" height="15" alt="Followers" class="icon"/> {stat.followers} followers</span>
				    		<span class="statItem"> <img src="/assets/icons/contributions/repository.svg" width="15" height="15" alt="Repository" class="icon"/> {stat.repos} repositories</span>
				    		<span class="statItem"> <img src="/assets/icons/contributions/members.svg" width="15" height="15" alt="Members" class="icon"/> {stat.members} members</span>
				    	</div>
				    {:else if stat && stat.type === 'repository'}
				    	<div class="statsRow">
				    		<span class="statItem"> <img src="/assets/icons/contributions/star.svg" width="15" height="15" alt="Stars" class="icon"/> {stat.stars} stars</span>
				    		<span class="statItem"> <img src="/assets/icons/contributions/issues.svg" width="15" height="15" alt="Issues" class="icon"/> {stat.issues} issues</span>
				    		<span class="statItem"> <img src="/assets/icons/contributions/forks.svg" width="15" height="15" alt="Forks" class="icon"/> {stat.forks} forks</span>
				    		<span class="statItem"> <img src="/assets/icons/contributions/contributors.svg" width="15" height="15" alt="Contributors" class="icon"/> {stat.contributors} contributors</span>
				    	</div>
				    {:else}
						<div class="statsRow">
							<span>Stats unavailable</span>
						</div>
					{/if}
				</div>
			</a>
		{/each}
	{/if}
</Window>

<style>
    .icon {
		filter: invert(1) drop-shadow(0px 5px 5px black);
	}

	.contributionLink {
		display: block;
		color: white;
		text-decoration: none;
	}

	.contributionCard {
		margin-top: 10px;
		padding: 12px;
	}

	.topRow {
		display: flex;
		gap: 10px;
	}

	.title {
		font-size: 1rem;
		font-weight: 700;
	}

	.description {
		margin: 6px 0;
	}

	.meta {
		opacity: 0.85;
		font-size: 0.85rem;
	}

	.statsRow {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 10px;
		font-size: 0.9rem;
		opacity: 0.95;
	}

	.statItem {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		line-height: 1;
	}
</style>
