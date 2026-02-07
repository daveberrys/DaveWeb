<script lang="ts">
	import Navi from '@components/navi.svelte';
	import Frame from '@components/frame.svelte';
	import Item from '@components/item.svelte';

	const links = [
	    {
			name: "Github",
			url: "https://github.com/daveberrys",
			description: "This is where I post all my code and where I\'m active. Check out my repositories!"
		},
		{
		    name: "Discord",
		    url: "https://discord.gg/S5jTpsq8Js",
		    description: "This is my discord server! I'm very active since my friends are here."
		},
		{
			name: 'X',
			url: 'https://X.com/thedevdoggo',
			description: 'This is where I mostly share things. Not really active here, but I do sometimes post.'
		},
		{
			name: 'Bluesky',
			url: 'https://bsky.app/profile/daveberry.netlify.app',
			description: 'I\'m not really active here, but I somewhat check here :)'
		},
		{
			name: 'Youtube',
			url: 'https://youtube.com/@daveberrys',
			description: 'This is my youtube! I don\'t post much, but I try to.'
		},
		{
			name: 'LastFM',
			url: 'https://www.last.fm/user/daveberrycb',
			description: 'LastFM is where I keep track of my music. It\'s pretty cool!'
		}
	];
</script>

<main>
	<Navi currentPage="Links" />
	
	<Frame>
	    {#each links as link (link.url)}
			<a href={link.url} target="_blank" rel="noopener noreferrer" class="socialMainContainer">
		        <Item marginTop="10px">
					<div class="socialContainer">
				        <div class="socialItem">
				            <img src="assets/icons/social/{link.name}.svg" alt={link.name} class="icon"/> 
				        </div>
					
				        <div class="socialItem">
				            <span style="font-weight: bold; font-size: 25px;">{link.name}</span> <br/>
			    	        <span>{link.description}</span>
			            </div>
					</div>
		        </Item>
			</a>
	    {/each}
	</Frame>
</main>

<style>
    .socialContainer {
        display: flex;
        gap: 10px;
    }
    
    a {
        color: white;
        text-decoration: none;
    }
    
    .icon {
        filter: invert(1);
        width: 50px;
        height: 50px;
    }
</style>