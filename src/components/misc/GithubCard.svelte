<script>
    import { onMount } from "svelte";

    export let url = "";
    export let desc = "";

    let githubData = null;
    let errorMessage = null;

    function getGithubLink() {
        return `https://github.com/${url}`;
    }

    function getGithubType() {
        if (url.includes("/")) {
            return "Repository";
        } else {
            return "Organization";
        }
    }

    function getStats() {
        if (!githubData) {
            return [];
        }

        if (githubData.type === "organization") {
            return [
                `${githubData.followers} followers`,
                `${githubData.repos} repos`,
                `${githubData.members} members`
            ];
        } else {
            return [
                `${githubData.stars} stars`,
                `${githubData.forks} forks`,
                `${githubData.issues} issues`,
                `${githubData.contributors} contributors`
            ];
        }
    }

    async function loadGithubData() {
        if (!url) {
            errorMessage = "GitHub URL not set.";
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.PUBLIC_SERVER}/api/github?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (!response.ok || !data || data.type === "error") {
                errorMessage = "Could not fetch GitHub data.";
                githubData = null;
            } else {
                githubData = data;
                errorMessage = null;
            }
        } catch (error) {
            console.log("Exception: " + error);
            errorMessage = "Could not fetch GitHub data.";
            githubData = null;
        }
    }

    onMount(function () {
        loadGithubData();
    });
</script>

<a class="githubCard" href={getGithubLink()} target="_blank" rel="noreferrer">
    <span class="typeText">{getGithubType()}</span>
    <span class="titleText">{url}</span>
    <span class="descText">{desc}</span>

    {#if githubData}
        <div class="stats">
            {#each getStats() as stat}
                <span class="stat">{stat}</span>
            {/each}
        </div>
    {:else if errorMessage}
        <span class="errorText">{errorMessage}</span>
    {:else}
        <span class="loadingText">Loading GitHub...</span>
    {/if}
</a>

<style>
    .githubCard {
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
            opacity: 0.85;
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

    .githubCard:hover {
        border-color: var(--primary);
    }
</style>
