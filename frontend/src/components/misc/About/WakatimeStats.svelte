<script>
    import { onMount } from "svelte";

    const url = "https://wakatime.com/share/@Daveberry/05adfbd0-c7d1-4460-9124-9cc326d50862.json"
    const ignoredLanguages = [
      "Markdown",
      "HTML",
      "CSS",
      "JSON",
      "YAML",
      "Other",
      "Text",
      "TOML",
      "git ignore",
      "RPMSpec",
      "XML",
      "Git Config",
      "jsonc",
      "go mod",
      "Desktop file",
      "Image (svg)",
      "TSConfig",
      "CSV",
      "INI",
      "conf",
      "Java Properties",
      "TableGen",
      "Apache Config",
      "CMake",
      "systemd",
      "Checksums"
    ]
    
    let loading = true;
    let error = false;
    let errMSG = null;
    let wakatimeData = null;
    let increment = 0;
    
    async function main() {
      try {
        const request = await fetch(url)
        const result = await request.json()
        
        const topLanguages = result.data.map(lang => ({
          name: lang.name,
          text: lang.text,
          color: lang.color,
          percentage: Math.round(lang.percent),
        })).filter(lang => !ignoredLanguages.includes(lang.name))
        
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
    <span class="bigText">Top Languages</span>
    <span style="color: rgba(255, 255, 255, 0.5)">A few of the languages are excluded from this list.</span>
    <section class="percentageRow">
        {#each wakatimeData as lang}
            {#if lang.percentage > 0}
                <div class="percentage" style="background-color: {lang.color}; width: {lang.percentage}%;"></div>
            {/if}
        {/each}
    </section>
    
    <section>
        {#if loading}
            <span>Loading...</span>
        {:else if error && errMSG}
            <span style="color: red;">Error: {errMSG}</span>
        {:else if wakatimeData}
            {#each wakatimeData as wdGASTER}
                <span class="badge" style="color: {wdGASTER.color}; --hoverColor: {wdGASTER.color}">
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
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;
            width: fit-content;

            .badge {
                background-color: var(--sidebar);
                border: 2px solid var(--border);
                padding: 5px 10px;
                border-radius: 10px;
                transition: all 0.1s ease-in-out;

                &:hover {
                    scale: 1.05;
                    border-color: var(--hoverColor);
                }
            }
        }
        
        .percentageRow {
            display: flex;
            flex-direction: row;
            width: 100%;
            gap: 0;
            margin-bottom: 5px;
            
            .percentage {
                height: 10px;

                &:first-child {
                    border-radius: 5px 0 0 5px;
                } &:last-child {
                    border-radius: 0 5px 5px 0;
                }
            }
        }
    }
</style>