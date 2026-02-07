<script lang="ts">
	export let open: boolean = false;
	export let title: string = '';

	function close() {
		open = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	function onBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) close();
	}
</script>

<svelte:window on:keydown={onKeydown} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="backdrop" on:click={onBackdropClick}>
		<div class="modal">
			<div class="header">
				{#if title}
					<span class="title">{title}</span>
				{/if}
				<button class="closeButton" on:click={close}>✕</button>
			</div>
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.modal {
		background-color: var(--frameColor);
		border-radius: 8px;
		padding: 20px;
		width: 500px;
		max-width: 90vw;
		max-height: 80vh;
		overflow-y: auto;
		box-shadow: 0 4px 15px var(--glowColor);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
	}

	.title {
		font-weight: bold;
		font-size: 22px;
	}

	.closeButton {
		background: none;
		border: none;
		color: var(--textColor);
		font-size: 20px;
		cursor: pointer;
		padding: 5px 10px;
		border-radius: 4px;
		margin-left: auto;
		transition: background-color 150ms ease-in-out;
	}

	.closeButton:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.content {
		color: var(--textColor);
	}
	
	@media screen and (max-width: 768px) {
		.modal {
			width: auto;
		}
	}
</style>
