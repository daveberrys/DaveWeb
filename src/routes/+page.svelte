<script lang="ts">
	import Navi from '@components/navi.svelte';
	import LastFM from '@components/lastfm.svelte';
	import CurrentTime from '@components/currentTime.svelte';

	import About from '@components/windows/about.svelte';
	import Contributions from '@components/windows/contributions.svelte';
	import Links from '@components/windows/links.svelte';
	import MyJourney from '@components/windows/myJourney.svelte';
	let showAbout = false;
	let showContributions = false;
	let showLinks = false;
	let showMyJourney = false;
</script>

<main>
	<div class="mainContent xyCenter">
		<img src="assets/misc/Daveberry Wave.png" width="150" height="150" alt="HIIIII"/>
		<span class="bigText" style="text-shadow: 0px 5px 5px black;">Howdy! I'm <b>Daveberry</b>.</span>
		<CurrentTime/>

		<div class="fixOff">
			<Navi
				onAboutClick={() => (showAbout = true)}
				onLinksClick={() => (showLinks = true)}
				onContributionsClick={() => (showContributions = true)}
				onMyJourneyClick={() => (showMyJourney = true)}
			/>
			<LastFM/>
		</div>
	</div>

	{#if showAbout}
		<About onClose={() => (showAbout = false)} />
	{/if}
	{#if showContributions}
		<Contributions onClose={() => (showContributions = false)} />
	{/if}
	{#if showLinks}
		<Links onClose={() => (showLinks = false)} />
	{/if}
	{#if showMyJourney}
		<MyJourney onClose={() => (showMyJourney = false)} />
	{/if}
</main>

<style>
	.mainContent {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bigText {
		font-size: 35px;
		/* font-weight: bold; */
	}

	.fixOff {
		margin-right: 15px;

		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
