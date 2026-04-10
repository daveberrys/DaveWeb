<script>
	import { onMount } from 'svelte';

	let albumArt = $state(null)
	let song = $state(null)
	let artist = $state(null)
	let status = $state(null)

	function getStatusClass() {
		if (status === 'Currently playing') {
			return 'playing';
		} else if (status === 'Last played') {
			return 'played';
		} else {
			return 'fallback';
		}
	}

	function setFallbackState() {
		status = 'Last.fm is unavailable right now.';
		song = 'Could not fetch song.';
		artist = 'Could not fetch artist.';
		albumArt = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREGyit_KIWx5jTbFAJNgvc8fn7QwVxq0sfYQ&s';
	}

	async function loadLastFM() {
		try {
			const response = await fetch('/api/lastfm');
			const data = await response.json();

			if (!response.ok || !data) {
				setFallbackState();
				return;
			} else {
				song = data.song || 'null';
				artist = data.artist || 'null';
				albumArt = data.albumArt || defaultAlbumArt;

				if (data.isPlaying === true) {
					status = 'Currently playing';
				} else {
					status = 'Last played';
				}
			}
		} catch (error) {
			console.log('Exception: ' + error);
			setFallbackState();
		}
	}

	onMount(function () {
		loadLastFM();

		const intervalId = setInterval(function () {
			loadLastFM();
		}, 15000);

		return function () {
			clearInterval(intervalId);
		};
	});
</script>

<div class="lastfmBanner">
	{#if song && artist && albumArt && status}
		<img class="albumArt" src={albumArt} alt="Album art" width="64" height="64" />

		<div class="textSection">
			<p class="songText">{song}</p>
			<p class="artistText">{artist}</p>
			<p class={`statusText ${getStatusClass()}`}>{status}</p>
		</div>
	{:else}
		<p class="statusText">Loading Last.fm...</p>
	{/if}
</div>

<style>
	.lastfmBanner {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 12px 14px;
		
    	.albumArt {
    		display: block;
    		object-fit: cover;
    		background: #111;
    	}
    
    	.textSection {
    		display: flex;
    		flex-direction: column;
    		gap: 4px;
      
            .songText {
                font-weight: bold;
                font-size: 1.5em;
            }
      
           	.statusText,
           	.songText,
           	.artistText {
          		margin: 0;
           	}
            
           	.statusText {
          		font-size: 0.75em;
                font-style: italic;
           	}
    	}
	}

	.statusText.playing {
		color: #0ff;
	} .statusText.played {
		color: #888;
	} .statusText.fallback {
		color: #888;
	}

</style>
