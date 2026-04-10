<script>
	import LastFM from '$lib/components/LastFM.svelte';
	import NavText from '$lib/components/NavText.svelte';
	import Time from '$lib/components/Time.svelte';
	import Discord from '$lib/components/Discord.svelte';	
</script>

<main>
    <div class="mainSection">
        <img src="/assets/misc/Daveberry Wave.png" alt="Daveberry" width="150" height="150" />
        <span>Howdy! I'm Daveberry.</span>
        <Time />
        <NavText />
    </div>
    
    <div class="bottom">
        <LastFM />
        <Discord />
    </div>
</main>

<style>
	.mainSection {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.bottom {
		display: flex;
		align-items: center;
		gap: 15px;
		overflow-x: auto;
		overflow-y: hidden;
		justify-content: center;
		position: absolute;
		bottom: 20px;
		left: 20px;
		right: 20px;
	}

	.bottom :global(*) {
		flex-shrink: 0;
	}
	
	@media (max-width: 768px) {
		.bottom {
		    justify-content: flex-start;
		}
	}
</style>
