<script>
    import { onMount } from "svelte";

    let twitterData = $state([])
    let youtubeData = $state([])
    let currentPage = $state("YouTube")

    async function getYoutube() {
        try {
            const res = await fetch("https://raw.githubusercontent.com/daveberrys/FetchYTStats/refs/heads/master/yt-data.json");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const dat = await res.json()
            youtubeData = dat
        } catch(e) {
            console.error(e)
        }
    }

    function onlyDaveberry(url) { return url.includes("TheDevDoggo"); }

    async function getTwitter() {
        try {
            const res = await fetch("https://fixupx.com/thedevdoggo/feed.xml")
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const xml = await res.text();
            const doc = new DOMParser().parseFromString(xml, "application/xml");

            twitterData = [...doc.querySelectorAll("item")]
                .map((item) => {
                    const description = item.querySelector("description")?.textContent?.trim() ?? "";
                    const html = new DOMParser().parseFromString(description, "text/html");

                    return {
                        link: item.querySelector("link")?.textContent?.trim() ?? "",
                        description,
                        pubDate: item.querySelector("pubDate")?.textContent?.trim() ?? "",
                        isQuote: html.querySelector("blockquote") !== null
                    };
                })
                .filter((item) => onlyDaveberry(item.link))
                .splice(0, 10)
        } catch(e) {
            console.error(e)
        }
    }

    function truncateString(str) {
        const maxLength = 30;
        return str.length > maxLength ? str.slice(0, maxLength) + '<span style="opacity: 0.3;">...</span>' : str;
    }

    function openPage(page) {
        let urlToPage = "";
        if (page == "Twitter") urlToPage = "https://twitter.com/thedevdoggo";
        if (page == "YouTube") urlToPage = "https://youtube.com/@daveberrys";

        if (page !== currentPage) currentPage = page;
        else if (page === currentPage) window.open(urlToPage, "_blank");
    }

    onMount(async () => {
        await getYoutube()
        await getTwitter()
    })
</script>

<main>
    <div class="header">
        <span class="bigText">📰 Recent Updates</span>
        <span>Recent updates following me! Such as my Youtube!</span>
        <span class="smallText" style="opacity: 0.5;">(Hint, double clicking the active one opens a new tab to that social!)</span>
    </div>

    <div class="row buttonsTop">
        <button onclick={() => openPage("YouTube")} class:active={currentPage == "YouTube"}>
            <img src="/assets/social/Youtube.svg" alt="YouTube" />
            YouTube
        </button>
        <button onclick={() => openPage("Twitter")} class:active={currentPage == "Twitter"}>
            <img src="/assets/social/Twitter.svg" alt="Twitter" />
            Twitter
        </button>
    </div>

    {#if currentPage == "YouTube"}
        <div class="row">
            {#each youtubeData as dat}
                <a class="videoBox" href={dat.link} target="_blank">
                    <img src={dat.thumbnail} alt={dat.title} />
                    <div>
                        <span class="bigText" style="font-size: 1.2rem;">{@html truncateString(dat.title)}</span>
                        <div class="stats">
                            <span>Views: {dat.views}</span> •
                            <span>Likes: {dat.likes}</span> •
                            <span>Comments: {dat.comments}</span>
                        </div>
                    </div>
                </a>
            {:else}
                <span>Loading, please wait...</span>
            {/each}
        </div>
    {:else if currentPage == "Twitter"}
        <div class="column">
            {#each twitterData as dat}
                <a class="twitterBox" href={dat.link} target="_blank">
                    {@html dat.description}

                    <div class="pubDate">
                        {@html dat.pubDate}
                        {#if dat.isQuote} • Quote Tweet {/if}
                    </div>
                </a>
            {:else}
                <span>Loading, please wait...</span>
            {/each}
        </div>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        .header {
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
            gap: 0.5rem;
        }

        .column {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .row {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .videoBox {
            padding: 8px;
            border: 2px solid var(--border);
            border-radius: 8px;
            background-color: var(--sidebar);
            color: white;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: min-content;

            transition: border-color 150ms ease;
            &:hover { border-color: var(--primary); }

            img {
                border-radius: 8px;
                width: 25rem;
                height: 14rem;
                object-fit: cover;
                /*@media screen and (max-width: 768px) {
                    width: 25rem;
                }*/
            }

            .stats { opacity: 0.5; }
        }

        .twitterBox {
            padding: 8px;
            border: 2px solid var(--border);
            border-radius: 8px;
            background-color: var(--sidebar);
            text-decoration: none;
            color: white;

            transition: border-color 150ms ease;
            &:hover { border-color: var(--primary); }
            @media screen and (min-width: 768px) { width: 40rem; }

            :global(a) {
                color: white;
                text-decoration: none;
            }

            :global(img) {
                border-radius: 8px;
                width: 5rem;
            }

            :global(blockquote) {
                border-left: 2px solid rgba(255, 255, 255, 0.25);
                padding-left: 14px;
                transform: translateX(-18px);
            }

            .pubDate {
                opacity: 0.25;
                font-size: 0.8rem;
            }
        }

        .buttonsTop {
            button {
                background-color: transparent;
                border: transparent;
                color: white;
                display: flex;
                gap: 0.5rem;
                align-items: center;
                justify-content: center;
                font-family: jetbrains !important;
                width: 18rem;
                border-bottom: 2px solid transparent;

                img { width: 2rem; }
                &:hover { cursor: pointer; }
                &.active { border-bottom: 2px solid var(--primary); }
            }
        }
    }
</style>
