<script>
	import { onMount } from "svelte";
	let discordData = $state(null);

    const statusLabels = {
        online: 'Online',
        idle: 'Idle',
        dnd: 'Do Not Disturb',
        offline: 'Offline'
    };
	
    async function fetchDiscordData() {
        const response = await fetch('/api/discord');
        const data = await response.json();
        return data;
    }
    
    onMount(() => {
        fetchDiscordData().then(data => {
            discordData = data;
        });
    });
</script>

<main>
    {#if discordData}
        <section>
            <img src={discordData.avatarUrl} alt="Discord avatar" width="64" height="64" />
        </section>
        <section>
            <span class="big">{discordData.displayName}</span> <br/>
            <!-- <span class="small">{discordData.username}</span> <br/> -->
            {#if discordData.state}
                <span>{discordData.state}</span> <br/>
            {/if}
            <span class={`small ${discordData.status}`}>{statusLabels[discordData.status] || discordData.status}</span>
        </section>
    {:else}
        <section>
            <span>Loading Discord...</span>
        </section>
    {/if}
</main>

<style>
    main {
        display: flex;
        gap: 15px;
        
        .big {
            font-weight: bold;
            font-size: 1.5em;
        }
        
        .small {
            font-size: 0.75em;
            font-style: italic;
        }
    }
    
    .small.online {
        color: #0F0;
    } .small.idle {
        color: #FF0;
    } .small.dnd {
        color: #F00;
    } .small.offline {
        color: #888;
    }
</style>
