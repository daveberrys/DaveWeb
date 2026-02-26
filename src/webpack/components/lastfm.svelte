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

<div class="lastfmWidget frame">
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
				<span class="song">{currentTrack.song}</span> <br/>
				<span class="artist">{currentTrack.artist}</span> <br/>
				{#if currentTrack.isPlaying}
					<span class="status playing">Currently Playing</span> <br/>
				{:else}
					<span class="status">Last Played</span> <br/>
				{/if}
			</div>
		</div>
	{:else}
		<span>No Last.fm data available.</span>
	{/if}
</div>

<style>
	.lastfmWidget {
		border-radius: 8px;
		padding: 15px;
		color: #ffffff;
		margin: 20px auto;
		align-self: center;
		box-sizing: border-box;
		
		scale: 1;
		transition: scale 50ms ease-in-out;
	} .lastfmWidget:hover {
	    scale: 1.01;
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

        box-shadow: 0px 5px 5px black;
	}

    .song, .artist, .status {
        text-shadow: 0px 0px 5px black;
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
