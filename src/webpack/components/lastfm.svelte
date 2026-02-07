<script lang="ts">
	import { onMount } from 'svelte';

	let currentTrack: any = null;
	let isLoading = true;
	let error: string | null = null;

	async function fetchLastFmData() {
		isLoading = true;
		error = null;
		currentTrack = null;

		try {
			const response = await fetch('/api/lastfm');
			const data = await response.json();

			if (response.ok && !data.error) {
				currentTrack = data;
			} else {
				error = data.error || 'Failed to fetch Last.fm data.';
			}
		} catch (e: any) {
			error = `Network error: ${e.message}`;
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		fetchLastFmData();
		// Refresh every 30 seconds
		const interval = setInterval(fetchLastFmData, 30000);
		return () => clearInterval(interval);
	});
</script>

<div class="lastfmWidget">
	{#if isLoading}
		<p>Loading Last.fm data...</p>
	{:else if error}
		<p class="error">Error: {error}</p>
	{:else if currentTrack}
		<div class="trackInfo">
			{#if currentTrack.albumArt}
				<img src={currentTrack.albumArt} alt="Album Art" class="albumArt" />
			{/if}
			<div class="details">
				<p class="song">{currentTrack.song}</p>
				<p class="artist">{currentTrack.artist}</p>
				{#if currentTrack.isPlaying}
					<p class="status playing">Currently Playing</p>
				{:else}
					<p class="status">Last Played</p>
				{/if}
			</div>
		</div>
	{:else}
		<p>No Last.fm data available.</p>
	{/if}
</div>

<style>
	.lastfmWidget {
		background-color: var(--frameColor);
		border-radius: 8px;
		padding: 15px;
		color: #ffffff;
		margin: 20px;
		box-shadow: 0 4px 8px var(--glowColor);
	}

	.trackInfo {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.albumArt {
		width: 60px;
		height: 60px;
		border-radius: 4px;
		object-fit: cover;
	}

	.details {
		flex-grow: 1;
	}

	.song {
		font-size: 1.1em;
		font-weight: bold;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.artist {
		font-size: 0.9em;
		color: #b3b3b3;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.status {
		font-size: 0.8em;
		color: #888888;
		margin-top: 5px;
	}

	.status.playing {
		color: #1ed760; /* Spotify green :3 */
		font-weight: bold;
	}

	.error {
		color: #ff6b6b;
		font-weight: bold;
	}
</style>
