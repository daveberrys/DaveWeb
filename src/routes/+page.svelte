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
		<img class="me" src="assets/misc/Daveberry Wave.png" width="150" height="150" alt="HIIIII"/>
		<span class="bigText meText" style="text-shadow: 0px 5px 5px black;">Howdy! I'm <b>Daveberry</b>.</span>
		<CurrentTime/>

		<div class="fixOff">
			<Navi
				onAboutClick={() => (showAbout = true)}
				onLinksClick={() => (showLinks = true)}
				onContributionsClick={() => (showContributions = true)}
				onMyJourneyClick={() => (showMyJourney = true)}
			/>
			
			<a href="/portfolio" class="frame portfolio">
			    <img src="/assets/icons/navi/briefcase.svg" alt="Portfolio" class="icon"/>
				<span style="font-size: 18px; color: white;">Portfolio</span>
			</a>
			
		</div>
	</div>
	
	<div class="bottom">
	    <LastFM/>
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

	.bottom {
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        
        display: flex;
        justify-content: center;
        gap: 5px;
	}
	
	.me {
		transform: rotate(0deg) scale(1);
		transition: transform 150ms ease-out;
	} .me:hover {
		transform: rotate(5deg) scale(1.1);
	}

	.meText {
		text-align: center;
		white-space: nowrap;
	}
	
	.icon {
		filter: invert(1) drop-shadow(0px 5px 5px black);
	}
	
	.portfolio {
	    margin-top: 10px;

		display: flex;
		justify-content: center;
		justify-items: center;
		gap: 5px;
		
		transition: transform 150ms ease-out;
	} .portfolio:hover {
		transform: scale(1.1);
	}

	/*@media screen and (max-width: 768px) {
		main {
			
		}
	}*/
</style>
