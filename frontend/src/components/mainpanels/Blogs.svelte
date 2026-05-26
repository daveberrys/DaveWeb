<script>
    import { onMount } from "svelte";
    import { marked } from "marked";

    class NewsAPI {
        constructor(serverBaseUrl) {
            this.serverBaseUrl = serverBaseUrl;
        }

        getFetchAllUrl() {
            return `${this.serverBaseUrl}/api/news/fetchall`;
        }

        getFetchNewsUrl(newsName) {
            return `${this.serverBaseUrl}/api/news/fetch?news=${encodeURIComponent(newsName)}`;
        }

        async fetchAllNewss() {
            try {
                const response = await fetch(this.getFetchAllUrl());
                const data = await response.json();

                if (!response.ok || !data) {
                    return null;
                } else {
                    return data;
                }
            } catch (error) {
                console.log("Exception: " + error);
                return null;
            }
        }

        async fetchNewsMarkdown(newsName) {
            try {
                const response = await fetch(this.getFetchNewsUrl(newsName));

                if (!response.ok) {
                    return null;
                } else {
                    const markdown = await response.text();
                    return markdown;
                }
            } catch (error) {
                console.log("Exception: " + error);
                return null;
            }
        }
    }

    let newsList = [];
    let selectedNewsName = null;

    let newsHtml = "Select a news from the list to view its content.";
    let isLoadingNewsList = false;
    let isLoadingNews = false;
    let statusMessage = null;

    function getNewsPriorityNumber(newsName) {
        if (!newsName) {
            return null;
        }

        const match = newsName.trim().match(/^(\d+)\./);

        if (!match) {
            return null;
        } else {
            return Number(match[1]);
        }
    }

    function sortNewsListHighPriorityFirst(news) {
        if (!news || !Array.isArray(news)) {
            return [];
        }

        const newsWithSortInfo = news.map(function (newsName, index) {
            const priorityNumber = getNewsPriorityNumber(newsName);

            return {
                newsName,
                index,
                priorityNumber
            };
        });

        newsWithSortInfo.sort(function (a, b) {
            const aHasPriority = a.priorityNumber !== null && Number.isFinite(a.priorityNumber) === true;
            const bHasPriority = b.priorityNumber !== null && Number.isFinite(b.priorityNumber) === true;

            if (aHasPriority === true && bHasPriority === true) {
                if (a.priorityNumber !== b.priorityNumber) {
                    return b.priorityNumber - a.priorityNumber;
                } else {
                    return a.index - b.index;
                }
            } else if (aHasPriority === true && bHasPriority === false) {
                return -1;
            } else if (aHasPriority === false && bHasPriority === true) {
                return 1;
            } else {
                return a.index - b.index;
            }
        });

        return newsWithSortInfo.map(function (item) {
            return item.newsName;
        });
    }

    function getServerBaseUrl() {
        let publicServer = (import.meta.env.PUBLIC_SERVER || "").trim();

        if (!publicServer) {
            return null;
        } else {
            if (publicServer.endsWith("/")) {
                publicServer = publicServer.slice(0, publicServer.length - 1);
            }

            return publicServer;
        }
    }

    function setFallbackNewsList() {
        newsList = [];
    }

    function setFallbackNewsContent() {
        newsHtml = "Could not load this news.";
    }

    function setLoadingContent() {
        newsHtml = "Loading news...";
    }

    async function refreshNewsList() {
        isLoadingNewsList = true;
        statusMessage = "Loading news...";

        const serverBaseUrl = getServerBaseUrl();

        if (!serverBaseUrl) {
            setFallbackNewsList();
            statusMessage = "PUBLIC_SERVER is not set. Please set it in your .env file.";
            isLoadingNewsList = false;
            return;
        }

        const api = new NewsAPI(serverBaseUrl);
        const news = await api.fetchAllNewss();

        if (!news || !Array.isArray(news)) {
            setFallbackNewsList();
            statusMessage = "No news could be loaded right now.";
        } else {
            newsList = sortNewsListHighPriorityFirst(news);
            statusMessage = null;

            if (newsList.length === 0) {
                statusMessage = "No news were found in the backend news folder.";
            }
        }

        isLoadingNewsList = false;
    }

    async function loadNews(newsName) {
        selectedNewsName = newsName;
        isLoadingNews = true;
        statusMessage = null;
        setLoadingContent();

        const serverBaseUrl = getServerBaseUrl();

        if (!serverBaseUrl) {
            setFallbackNewsContent();
            statusMessage = "PUBLIC_SERVER is not set. Please set it in your .env file.";
            isLoadingNews = false;
            return;
        }

        const api = new NewsAPI(serverBaseUrl);
        const markdown = await api.fetchNewsMarkdown(newsName);

        if (!markdown) {
            setFallbackNewsContent();
            statusMessage = "Could not fetch news content.";
            isLoadingNews = false;
            return;
        } else {
            try {
                newsHtml = marked.parse(markdown);
            } catch (error) {
                console.log("Exception: " + error);
                statusMessage = "Could not render markdown.";
                setFallbackNewsContent();
            }
        }

        isLoadingNews = false;
    }

    onMount(function () {
        refreshNewsList();
    });
</script>

<main class="newsPanel">
    <aside class="sidebar">
        <section class="sidebarHeader">
            <span class="titleText">News</span>
            <button class="refreshButton" on:click={refreshNewsList} disabled={isLoadingNewsList === true}>
                {#if isLoadingNewsList === true}
                    Loading...
                {:else}
                    Refresh
                {/if}
            </button>
        </section>

        {#if statusMessage}
            <p class="statusText">{statusMessage}</p>
        {/if}

        <section class="newsList">
            {#each newsList as newsName}
                <button
                    class:selected={selectedNewsName === newsName}
                    class="newsButton"
                    on:click={function () {
                        loadNews(newsName);
                    }}
                    disabled={isLoadingNews === true && selectedNewsName === newsName}
                >
                    {newsName}
                </button>
            {/each}
        </section>
    </aside>

    <section class="content">
        {@html newsHtml}
    </section>
</main>

<style>
    .newsPanel {
        display: flex;
        height: 100%;
        width: 100%;
        gap: 20px;

        .sidebar {
            width: 260px;
            border-right: 1px solid var(--border);
            padding: 16px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 12px;

            .sidebarHeader {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;

                .titleText {
                    font-weight: bold;
                    font-size: 1.25rem;
                }

                .refreshButton {
                    border: 2px solid var(--border);
                    border-radius: 8px;
                    background-color: var(--sidebar);
                    color: var(--text);
                    padding: 8px 10px;
                    cursor: pointer;
                }

                .refreshButton:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
            }

            .statusText {
                margin: 0;
                font-size: 0.85em;
                color: var(--text);
                opacity: 0.85;
            }

            .newsList {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 6px;

                .newsButton {
                    all: unset;
                    cursor: pointer;
                    color: var(--text);
                    width: 100%;
                    padding: 4px 0;
                }

                .newsButton.selected {
                    color: var(--primary);
                    font-weight: bold;
                }
            }
        }

        .content {
            flex: 1;
            padding: 16px;
            overflow: auto;
            
            :global(a) {
                color: var(--primary);
                text-decoration: none;
            } :global(a:hover) {
                text-decoration: underline;
            }
        }
    }

    @media (max-width: 800px) {
        .newsPanel {
            flex-direction: column;

            .sidebar {
                width: 100%;
                border-right: none;
                border-bottom: 1px solid var(--border);
            }
        }
    }
</style>
