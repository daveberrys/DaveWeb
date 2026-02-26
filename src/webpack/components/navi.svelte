<script lang="ts">
	export let onAboutClick: () => void = () => {};
	export let onLinksClick: () => void = () => {};
	export let onContributionsClick: () => void = () => {};
	export let onMyJourneyClick: () => void = () => {};
</script>

<div class="navi">
	<button class="frame button" type="button" on:click={onAboutClick} aria-label="Open About window">
		<img src="assets/icons/navi/home.svg" width="25" height="25" alt="About Me" class="icon"/>
	</button>

	<button class="frame button" type="button" on:click={onLinksClick} aria-label="Open Links window">
		<img src="assets/icons/navi/link.svg" width="25" height="25" alt="My Links" class="icon"/>
	</button>

	<button class="frame button" type="button" on:click={onContributionsClick} aria-label="Open Contributions window">
		<img src="assets/icons/navi/book-open.svg" width="25" height="25" alt="Contributions" class="icon"/>
	</button>

	<button class="frame button" type="button" on:click={onMyJourneyClick} aria-label="Open My Journey window">
		<img src="assets/icons/navi/arrow-right.svg" width="25" height="25" alt="My Journey" class="icon"/>
	</button>
</div>

<style>
    .icon {
		filter: invert(1) drop-shadow(0px 5px 5px black);
	}

	.navi {
		margin-top: 10px;

		display: flex;
		gap: 10px;
	}

	.button {
		appearance: none;
		scale: 1;
		transition: scale 150ms ease-in-out;
	} .button:hover {
		scale: 1.1;
		cursor: pointer;
	}
</style>
