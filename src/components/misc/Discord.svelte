<script>
    import { onMount } from "svelte";

    let discordData = null;

    const statusLabels = {
        online: 'Online',
        idle: 'Idle',
        dnd: 'Do Not Disturb',
        offline: 'Offline'
    };
	
    function setFallbackData() {
        discordData = {
            avatarUrl: null,
            displayName: "Discord unavailable",
            state: null,
            status: "offline",
            username: "null"
        };
    }

    async function fetchDiscordData() {
        try {
            const response = await fetch(`https://${import.meta.env.PUBLIC_SERVER}/api/discord`);
            const data = await response.json();

            if (!response.ok || !data) {
                setFallbackData();
            } else {
                discordData = data;
            }
        } catch (error) {
            console.log('Exception: ' + error);
            setFallbackData();
        }
    }

    onMount(function () {
        fetchDiscordData();

        const intervalId = setInterval(function () {
            fetchDiscordData();
        }, 30000);

        return function () {
            clearInterval(intervalId);
        };
    });
</script>

<main>
    {#if discordData}
        <section>
            {#if discordData.avatarUrl}
                <img src={discordData.avatarUrl} alt="Discord avatar" width="64" height="64" />
            {/if}
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
        align-items: center;
		gap: 14px;
        
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
