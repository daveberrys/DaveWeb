<script>
	import NavText from '$lib/components/NavText.svelte';
</script>

<div class="pageSection">
	<div class="mainSection">
		<p>
			I am a self-taught teenager open source software developer. I make websites, software, and
			tools! <br />
			I'm also an artist. I create designs, make furry cartoony arts and practicing! <br />
			I really don't like to call myself smart, as I do use AI to help me out with some of my
			projects. <br />
			Nontheless, I am productive with AI helping me on the side! I don't use AI to create
			everything for me.
		</p>

		<p>
			I've learnt about 8 programming languages <br />
			<img
				src="https://skillicons.dev/icons?i=python,html,css,js,ts,lua,haxe,bash&theme=dark"
				alt="python, html, css, js, ts, lua, haxe, bash"
			/>
			<br />
			and 4 different web frameworks. <br />
			<img
				src="https://skillicons.dev/icons?i=svelte,solidjs,astro,react&theme=dark"
				alt="svelte, solidjs, astro, react"
			/>
			<br />
		</p>
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

	.mainSection {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		flex: 1;
		width: 100%;
	}

	.bottomNav {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: auto;
	}
</style>
