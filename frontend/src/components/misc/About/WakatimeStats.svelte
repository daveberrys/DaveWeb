<script>
    import { onMount } from "svelte";

    const url = "https://wakatime.com/share/@Daveberry/05adfbd0-c7d1-4460-9124-9cc326d50862.json"
    
    let loading = true;
    let error = false;
    let errMSG = null;
    let wakatimeData = null;
    
    async function main() {
      try {
        const request = await fetch(url)
        const result = await request.json()
        
        const topLanguages = result.data.slice(0, 6).map(lang => ({
          name: lang.name,
          text: lang.text,
          color: lang.color
        }))
        
        wakatimeData = topLanguages;
      } catch(err) {
        loading = false;
        error = true;
        return errMSG = err.message
      } finally {
        loading = false;
      }
    }
    
    onMount(async () => {
      main();
    })
</script>

<main>
    <span class="bigText">Top 6 Languages</span>
    <section>
        {#if loading}
            <span>Loading...</span>
        {:else if error && errMSG}
            <span style="color: red;">Error: {errMSG}</span>
        {:else if wakatimeData}
            {#each wakatimeData as wdGASTER}
                <span style="color: {wdGASTER.color}">
                    {wdGASTER.name} ••• {wdGASTER.text}
                </span>
            {/each}
        {/if}
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 100%;
        
        section {
            display: grid; 
            grid-template-columns: repeat(2, 1fr); 
            column-gap: 0rem;
            row-gap: 0.5rem;
            width: fit-content;
            overflow-x: scroll;
        }
    }
    
    .bigText {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>