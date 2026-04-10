<script>
	import { page } from '$app/state';

	const navItems = [
		{
			href: '/',
			label: 'Index'
		},
		{
			href: '/about',
			label: 'About Me'
		},
		{
			href: '/links',
			label: 'Links'
		},
		{
			href: '/contributions',
			label: 'Contributions'
		}
	];

	const filteredNavItems = $derived.by(function () {
		const currentPath = page.url.pathname.replace(/\/$/, '') || '/';

		return navItems.filter(function (navItem) {
			if (navItem.href === currentPath) {
				return false;
			} else {
				return true;
			}
		});
	});
</script>

<span class="navText">
	{#each filteredNavItems as navItem}
		[<a href={navItem.href}>{navItem.label}</a>]{' '}
	{/each}
</span>

<style>
	.navText {
		display: inline-block;
		width: max-content;
	}

	.navText a {
		text-decoration: none;
		color: aqua;
	}
</style>
