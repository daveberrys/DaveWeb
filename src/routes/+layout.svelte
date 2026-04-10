<script>
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Dave's Webby</title>
	<link rel="icon" href="/assets/misc/Daveberry Wave.png" />
</svelte:head>

{@render children()}
