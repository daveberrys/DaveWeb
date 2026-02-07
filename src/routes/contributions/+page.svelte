<script lang="ts">
	import Navi from '@components/navi.svelte';
	import Frame from '@components/frame.svelte';
	import Item from '@components/item.svelte';
	import Bar from '@misc/bar.svelte';
	import { softwareAndWebsiteContributions, gameContributions } from '$lib/contributions.js';
	import type { GithubStats } from './+page.server.js';

	let { data }: { data: { stats: GithubStats } } = $props();
</script>

<main>
	<Navi currentPage="Contributions" />

	<Frame>
		<p class="titleText">Software & Website Contributions</p>

		{#each softwareAndWebsiteContributions as contribution (contribution.url)}
			{@const stat = data.stats[contribution.url]}
			<a
				href={contribution.url}
				target="_blank"
				rel="noopener noreferrer"
				class="socialMainContainer"
			>
				<Item marginTop="10px">
					<div class="socialContainer">
						<div class="socialItem">
							<span style="font-weight: bold; font-size: 25px;">{contribution.name}</span> <br />
							<span>{contribution.description}</span>
						</div>
					</div>
					{#if stat && stat.type === 'organization'}
						<div class="statsContainer">
							<span class="statItem"> <img src="/assets/icons/contributions/followers.svg" width="15" height="15" alt="Followers" class="icon"/> {stat.followers} followers</span>
							<span class="statItem"> <img src="/assets/icons/contributions/repository.svg" width="15" height="15" alt="Repository" class="icon"/> {stat.repos} repositories</span>
							<span class="statItem"> <img src="/assets/icons/contributions/members.svg" width="15" height="15" alt="Members" class="icon"/> {stat.members} members</span>
						</div>
					{:else if stat && stat.type === 'repository'}
						<div class="statsContainer">
							<span class="statItem"> <img src="/assets/icons/contributions/star.svg" width="15" height="15" alt="Stars" class="icon"/> {stat.stars} stars</span>
							<span class="statItem"> <img src="/assets/icons/contributions/issues.svg" width="15" height="15" alt="Issues" class="icon"/> {stat.issues} issues</span>
							<span class="statItem"> <img src="/assets/icons/contributions/forks.svg" width="15" height="15" alt="Forks" class="icon"/> {stat.forks} forks</span>
							<span class="statItem"> <img src="/assets/icons/contributions/contributors.svg" width="15" height="15" alt="Contributors" class="icon"/> {stat.contributors} contributors</span>
						</div>
					{/if}
				</Item>
			</a>
		{/each}

		<Bar />

		<p class="titleText">Game Contributions</p>

		{#each gameContributions as contribution (contribution.url)}
			{@const stat = data.stats[contribution.url]}
			<a
				href={contribution.url}
				target="_blank"
				rel="noopener noreferrer"
				class="socialMainContainer"
			>
				<Item marginTop="10px">
					<div class="socialContainer">
						<div class="socialItem">
							<span style="font-weight: bold; font-size: 25px;">{contribution.name}</span> <br />
							<span>{contribution.description}</span>
						</div>
					</div>
					{#if stat && stat.type === 'organization'}
						<div class="statsContainer">
							<span class="statItem"> <img src="/assets/icons/contributions/followers.svg" width="15" height="15" alt="Followers" class="icon"/> {stat.followers} followers</span>
							<span class="statItem"> <img src="/assets/icons/contributions/repository.svg" width="15" height="15" alt="Repository" class="icon"/> {stat.repos} repositories</span>
							<span class="statItem"> <img src="/assets/icons/contributions/members.svg" width="15" height="15" alt="Members" class="icon"/> {stat.members} members</span>
						</div>
					{:else if stat && stat.type === 'repository'}
						<div class="statsContainer">
							<span class="statItem"> <img src="/assets/icons/contributions/star.svg" width="15" height="15" alt="Stars" class="icon"/> {stat.stars} stars</span>
							<span class="statItem"> <img src="/assets/icons/contributions/issues.svg" width="15" height="15" alt="Issues" class="icon"/> {stat.issues} issues</span>
							<span class="statItem"> <img src="/assets/icons/contributions/forks.svg" width="15" height="15" alt="Forks" class="icon"/> {stat.forks} forks</span>
							<span class="statItem"> <img src="/assets/icons/contributions/contributors.svg" width="15" height="15" alt="Contributors" class="icon"/> {stat.contributors} contributors</span>
						</div>
					{/if}
				</Item>
			</a>
		{/each}
	</Frame>
</main>

<style>
	.socialContainer {
		display: flex;
		gap: 10px;
	}

	a {
		color: white;
		text-decoration: none;
	}

	.titleText {
		font-weight: bold;
		font-size: 25px;
		text-align: center;
	}

	.statsContainer {
		display: flex;
		gap: 15px;
		margin-top: 8px;
		flex-wrap: wrap;
	}

	.statItem {
	    display: flex;
		vertical-align: auto;
		gap: 5px;
		
		font-size: 14px;
		opacity: 0.85;
	}
	
	.icon {
        filter: invert(1);
	}
</style>
