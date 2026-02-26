<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string;
	export let onClose: () => void = () => {};

	let windowEl: HTMLDivElement | null = null;
	let position = { x: 100, y: 100 };
	let isMobile = false;

	const dragInfo = {
		isDragging: false,
		offset: { x: 0, y: 0 }
	};

	function updateIsMobile() {
		isMobile = window.innerWidth <= 768;
	}

	function handleMouseDown(event: MouseEvent) {
		if (!windowEl || isMobile) return;

		dragInfo.isDragging = true;
		const rect = windowEl.getBoundingClientRect();
		dragInfo.offset = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	function handleMouseMove(event: MouseEvent) {
		if (!dragInfo.isDragging || !windowEl || isMobile) return;

		const newX = event.clientX - dragInfo.offset.x;
		const newY = event.clientY - dragInfo.offset.y;

		const { innerWidth, innerHeight } = window;
		const { offsetWidth, offsetHeight } = windowEl;

		const clampedX = Math.max(0, Math.min(newX, innerWidth - offsetWidth));
		const clampedY = Math.max(0, Math.min(newY, innerHeight - offsetHeight));

		position = { x: clampedX, y: clampedY };
	}

	function handleMouseUp() {
		dragInfo.isDragging = false;
	}

	onMount(() => {
		updateIsMobile();

		window.addEventListener('resize', updateIsMobile);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('resize', updateIsMobile);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<div
	bind:this={windowEl}
	class="window frame"
	style={!isMobile
		? `left: ${position.x}px; top: ${position.y}px;`
		: 'left: 50%; top: 50%; transform: translate(-50%, -50%);'}
>
	<div class="topbar" on:mousedown={handleMouseDown}>
		<span>{title}</span>
		<button
			on:click|stopPropagation={onClose}
			class="closeButton"
			type="button"
			aria-label="Close window"
		>
			X
		</button>
	</div>
	<div class="mainframe">
		<slot />
	</div>
</div>

<style>
	.window {
		position: fixed;
		z-index: 1000;
		min-width: 260px;
		max-width: min(90vw, 420px);
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: grab;
		user-select: none;
		margin-bottom: 8px;
		font-size: 0.9rem;
		font-weight: 600;
		gap: 12px;
	}

	.topbar:active {
		cursor: grabbing;
	}

	.topbar span {
		min-width: 0;
		overflow-wrap: anywhere;
		word-break: break-word;
	}

	.mainframe {
		font-size: 0.95rem;
		line-height: 1.4;
		overflow-wrap: anywhere;
		word-break: break-word;
		white-space: normal;
		overflow-y: auto;
		padding-right: 2px;
        
        scrollbar-width: thin;
        scrollbar-color: rgb(255, 255, 255) rgba(0, 0, 0, 0);
	}

	.closeButton {
		background: transparent;
		border: none;
		padding: 0 6px;
		cursor: pointer;
		color: white;
		font-size: 1.4rem;
		line-height: 1;
		text-shadow: 0 5px 5px black;
	}

	.closeButton:hover {
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		.window {
			width: 94vw;
			min-width: 94vw;
			max-width: 94vw;
			max-height: 88vh;
		}

		.topbar {
			cursor: default;
		}
	}
</style>

<!-- 
how 2 use

<script lang="ts">
	import Window from '../window.svelte';

	export let onClose: () => void = () => {};
</script>

<Window title="Title Page" {onClose}>
	<p>Meow!!!~</p>
</Window>

<style>
    p, a, span {
        text-decoration: none;
        text-shadow: 0px 5px 5px black;
    } a {
        color: aqua;
    }
</style>

-->
