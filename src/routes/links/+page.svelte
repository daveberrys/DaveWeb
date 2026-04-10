<script>
	import NavText from '$lib/components/NavText.svelte';

	const links = [
		{
			name: 'Github',
			url: 'https://github.com/daveberrys',
			description: "This is where I post all my code and where I'm active. Check out my repositories!"
		},
		{
			name: 'Discord',
			url: 'https://discord.gg/S5jTpsq8Js',
			description: "This is my discord server! I'm very active since my friends are here."
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/thedevdoggo',
			description: 'This is where I mostly share things. Not really active here, but I do sometimes post.'
		},
		{
			name: 'Bluesky',
			url: 'https://bsky.app/profile/daveberry.netlify.app',
			description: "I'm not really active here, but I somewhat check here :)"
		},
		{
			name: 'Youtube',
			url: 'https://youtube.com/@daveberrys',
			description: "This is my youtube! I don't post much, but I try to."
		},
		{
			name: 'LastFM',
			url: 'https://www.last.fm/user/daveberrycb',
			description: "LastFM is where I keep track of my music. It's pretty cool!"
		}
	];
</script>

<div class="pageSection">
	<div class="linksParent">
		{#each links as link}
			<a class="linksContent" href={link.url} target="_blank" rel="noreferrer">
				<section class="image">
					<img src="/assets/icons/social/{link.name}.svg" alt={link.name} class="social" width="64" height="64" />
				</section>

				<section class="text">
					<span class="name">{link.name}</span> <br />
					<span>{link.description}</span>
				</section>
			</a>
		{/each}
	</div>

	<div class="bottomNav">
		<NavText />
	</div>
</div>

<style>
	.pageSection {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: 20px;
	}

	.linksParent {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex: 1;
		width: 100%;
		gap: 20px;
	}

	.linksContent {
		display: flex;
		align-items: center;
		gap: 10px;
		color: white;
		text-decoration: none;
	}

	.name {
		font-size: 1.2em;
		font-weight: bold;
	}

	.bottomNav {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: auto;
	}
</style>
