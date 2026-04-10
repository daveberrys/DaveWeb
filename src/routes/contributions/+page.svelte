<script>
	import { onMount } from 'svelte';
	import NavText from '$lib/components/NavText.svelte';
	import { allContributions } from '$lib/contributionsData';

	let pageStatus = $state('Loading contributions...');
	let contributionStats = $state({});

	function githubPath(url) {
		return url.replace('https://github.com/', '');
	}

	function getStatsText(contributionUrl) {
		const statData = contributionStats[contributionUrl];

		if (!statData || statData.type === 'error') {
			return 'Stats unavailable';
		}

		if (statData.type === 'organization') {
			return `${statData.followers} followers | ${statData.repos} repositories | ${statData.members} members`;
		} else if (statData.type === 'repository') {
			return `${statData.stars} stars | ${statData.issues} issues | ${statData.forks} forks | ${statData.contributors} contributors`;
		} else {
			return 'Stats unavailable';
		}
	}

	async function loadContributions() {
		try {
			const response = await fetch('/api/githubAPI');
			const data = await response.json();

			if (!response.ok || data.error) {
				pageStatus = data.error || 'Failed to load contributions.';
				return;
			} else {
				contributionStats = data.stats || {};
				pageStatus = '';
			}
		} catch (error) {
			console.log('Exception: ' + error);
			pageStatus = 'Failed to load contributions.';
		}
	}

	onMount(function () {
		loadContributions();
	});
</script>

<div class="pageSection">
	<div class="contributionsParent">
		{#if pageStatus}
			<p class="pageStatus">{pageStatus}</p>
		{/if}

		<div class="contributionsList">
			{#each allContributions as contribution}
				<a class="contributionCard" href={contribution.url} target="_blank" rel="noreferrer">
					<p class="name">{contribution.name}</p>
					<p class="description">{contribution.description}</p>
					<p class="githubPath">{githubPath(contribution.url)}</p>
					<p class="statsText">{getStatsText(contribution.url)}</p>
				</a>
			{/each}
		</div>
	</div>

	<div class="bottomNav">
		<NavText />
	</div>
</div>

<style>
	.pageSection {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: 20px;
	}

	.contributionsParent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		width: 100%;
		gap: 16px;
	}

	.pageStatus {
		margin: 0;
		color: aqua;
	}

	.contributionsList {
		width: 100%;
		max-width: 860px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.contributionCard {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		color: white;
		text-decoration: none;
		background: #050505;
	}

	.name,
	.description,
	.githubPath,
	.statsText {
		margin: 0;
	}

	.name {
		font-size: 1.2em;
		font-weight: bold;
		color: aqua;
	}

	.githubPath {
		color: #9fe8ff;
	}

	.bottomNav {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: auto;
	}
</style>
