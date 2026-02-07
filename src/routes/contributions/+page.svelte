<script lang="ts">
	import Navi from '@components/navi.svelte';
	import Frame from '@components/frame.svelte';
	import Item from '@components/item.svelte';
	import Bar from '@misc/bar.svelte';

	const softwareAndWebsiteContributions = [
	    {
			name: "Track The Code",
			url: "https://github.com/TrackTheCode",
			description: "A team dedicated of making apps, websites and webapps. All for free and Open Source."
		},
		{
		    name: "Current LastFM",
		    url: "https://github.com/daveberrys/CurrentLastFM",
		    description: "This is a project I made recently to fetch your current playing from LastFM."
		},
		{
			name: 'WhatsAnApp',
			url: 'https://github.com/daveberrys/WhatsAnApp',
			description: 'Modification to Whatsapp\'s web UI. Purely made with Python. Currently not mainted, but will be soon.'
		},
		{
			name: 'Creativity Archived',
			url: 'https://github.com/Creativity-Archived/Creativity-Archived',
			description: 'A way to easily share your game with less restrctions. No bullshit. Just cool shit.'
		}
	];
	
	const gameContributions = [
	    {
			name: "Universe Engine",
			url: "https://github.com/Team-UniverseEngine",
			description: "Modified version of Psych Engine, now turning into a base-game fork. Former main developer."
		}
	];
</script>

<main>
	<Navi currentPage="Contributions" />
	
	<Frame>
		<p class="titleText">
		    Software & Website Contributions
		</p>
	
	    {#each softwareAndWebsiteContributions as contribution (contribution.url)}
			<a href={contribution.url} target="_blank" rel="noopener noreferrer" class="socialMainContainer">
		        <Item marginTop="10px">
					<div class="socialContainer">
				        <div class="socialItem">
				            <span style="font-weight: bold; font-size: 25px;">{contribution.name}</span> <br/>
			    	        <span>{contribution.description}</span>
			            </div>
					</div>
		        </Item>
			</a>
	    {/each}
					
		<Bar/>
		
		<p class="titleText">
		    Game Contributions
		</p>
		
	    {#each gameContributions as contribution (contribution.url)}
			<a href={contribution.url} target="_blank" rel="noopener noreferrer" class="socialMainContainer">
		        <Item marginTop="10px">
					<div class="socialContainer">
				        <div class="socialItem">
				            <span style="font-weight: bold; font-size: 25px;">{contribution.name}</span> <br/>
			    	        <span>{contribution.description}</span>
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
    
    .titleText {
        font-weight: bold;
        font-size: 25px;
        text-align: center;
    }
</style>