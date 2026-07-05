<script>
    import { onMount } from "svelte";

    export let url = "";
    export let desc = "";
    export let plat = "github";

    let gitData = null;
    let errorMessage = null;

    const platformInfo = {
        github: {
            baseUrl: "https://github.com",
            apiEndpoint: "github",
            label: "GitHub",
        },
        codeberg: {
            baseUrl: "https://codeberg.org",
            apiEndpoint: "codeberg",
            label: "Codeberg",
        },
    };

    function getLink() {
        return `${platformInfo[plat].baseUrl}/${url}`;
    }

    function getType() {
        if (url.includes("/")) {
            return "Repository";
        } else {
            return "Organization";
        }
    }

    function getStats() {
        if (!gitData) return [];

        const stats = [];
        if (gitData.type === "organization") {
            if (gitData.followers != null) stats.push(`${gitData.followers} followers`);
            if (gitData.repos != null) stats.push(`${gitData.repos} repos`);
            if (gitData.members != null) stats.push(`${gitData.members} members`);
        } else {
            if (gitData.stars != null) stats.push(`${gitData.stars} stars`);
            if (gitData.forks != null) stats.push(`${gitData.forks} forks`);
            if (gitData.contributors != null) stats.push(`${gitData.contributors} contributors`);
        }
        return stats;
    }

    async function loadGitData() {
        if (!url) {
            errorMessage = `${platformInfo[plat].label} URL not set.`;
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.PUBLIC_SERVER}/api/${platformInfo[plat].apiEndpoint}?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (!response.ok || !data || data.type === "error") {
                errorMessage = `Could not fetch ${platformInfo[plat].label} data.`;
                gitData = null;
            } else {
                gitData = data;
                errorMessage = null;
            }
        } catch (error) {
            console.log("Exception: " + error);
            errorMessage = `Could not fetch ${platformInfo[plat].label} data.`;
            gitData = null;
        }
    }

    onMount(function () {
        loadGitData();
    });
</script>

<a class="gitCard" href={getLink()} target="_blank" rel="noreferrer">
    <span class="typeText">{getType()} ({platformInfo[plat].label})</span>
    <span class="titleText">{url}</span>
    <span class="descText">{desc}</span>

    {#if gitData}
        <div class="stats">
            {#each getStats() as stat}
                <span class="stat">{stat}</span>
            {/each}
        </div>
    {:else if errorMessage}
        <span class="errorText">{errorMessage}</span>
    {:else}
        <span class="loadingText">Loading {platformInfo[plat].label}...</span>
    {/if}
</a>

<style>
    .gitCard {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
        border: 2px solid var(--border);
        border-radius: 8px;
        background-color: var(--sidebar);
        color: var(--text);
        text-decoration: none;
        width: 20rem;
        transition: border-color 150ms ease;
        
        .typeText {
            color: var(--primary);
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
        } .titleText {
            font-size: 1.25rem;
            font-weight: bold;
            word-break: break-word;
        } .descText {
            color: var(--text);
        }
    
        .stats {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            
            .stat {
                padding: 4px 8px;
                border-radius: 999px;
                background-color: var(--secondary);
                font-size: 0.8rem;
            }
        }
    
        .loadingText,
        .errorText {
            font-size: 0.85rem;
        } .errorText {
            color: #ff7b7b;
        }
    }

    .gitCard:hover {
        border-color: var(--primary);
    }
</style>
