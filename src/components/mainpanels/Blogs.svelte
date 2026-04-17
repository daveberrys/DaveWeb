<script>
    import { onMount } from "svelte";
    import { marked } from "marked";

    class BlogAPI {
        constructor(serverBaseUrl) {
            this.serverBaseUrl = serverBaseUrl;
        }

        getFetchAllUrl() {
            return `${this.serverBaseUrl}/api/blogs/fetchall`;
        }

        getFetchBlogUrl(blogName) {
            return `${this.serverBaseUrl}/api/blogs/fetch?blog=${encodeURIComponent(blogName)}`;
        }

        async fetchAllBlogs() {
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

        async fetchBlogMarkdown(blogName) {
            try {
                const response = await fetch(this.getFetchBlogUrl(blogName));

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

    let blogList = [];
    let selectedBlogName = null;

    let blogHtml = "Select a blog from the list to view its content.";
    let isLoadingBlogList = false;
    let isLoadingBlog = false;
    let statusMessage = null;

    function getBlogPriorityNumber(blogName) {
        if (!blogName) {
            return null;
        }

        const match = blogName.trim().match(/^(\d+)\./);

        if (!match) {
            return null;
        } else {
            return Number(match[1]);
        }
    }

    function sortBlogListHighPriorityFirst(blogs) {
        if (!blogs || !Array.isArray(blogs)) {
            return [];
        }

        const blogsWithSortInfo = blogs.map(function (blogName, index) {
            const priorityNumber = getBlogPriorityNumber(blogName);

            return {
                blogName,
                index,
                priorityNumber
            };
        });

        blogsWithSortInfo.sort(function (a, b) {
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

        return blogsWithSortInfo.map(function (item) {
            return item.blogName;
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

    function setFallbackBlogList() {
        blogList = [];
    }

    function setFallbackBlogContent() {
        blogHtml = "Could not load this blog.";
    }

    function setLoadingContent() {
        blogHtml = "Loading blog...";
    }

    async function refreshBlogList() {
        isLoadingBlogList = true;
        statusMessage = "Loading blogs...";

        const serverBaseUrl = getServerBaseUrl();

        if (!serverBaseUrl) {
            setFallbackBlogList();
            statusMessage = "PUBLIC_SERVER is not set. Please set it in your .env file.";
            isLoadingBlogList = false;
            return;
        }

        const api = new BlogAPI(serverBaseUrl);
        const blogs = await api.fetchAllBlogs();

        if (!blogs || !Array.isArray(blogs)) {
            setFallbackBlogList();
            statusMessage = "No blogs could be loaded right now.";
        } else {
            blogList = sortBlogListHighPriorityFirst(blogs);
            statusMessage = null;

            if (blogList.length === 0) {
                statusMessage = "No blogs were found in the backend blogs folder.";
            }
        }

        isLoadingBlogList = false;
    }

    async function loadBlog(blogName) {
        selectedBlogName = blogName;
        isLoadingBlog = true;
        statusMessage = null;
        setLoadingContent();

        const serverBaseUrl = getServerBaseUrl();

        if (!serverBaseUrl) {
            setFallbackBlogContent();
            statusMessage = "PUBLIC_SERVER is not set. Please set it in your .env file.";
            isLoadingBlog = false;
            return;
        }

        const api = new BlogAPI(serverBaseUrl);
        const markdown = await api.fetchBlogMarkdown(blogName);

        if (!markdown) {
            setFallbackBlogContent();
            statusMessage = "Could not fetch blog content.";
            isLoadingBlog = false;
            return;
        } else {
            try {
                blogHtml = marked.parse(markdown);
            } catch (error) {
                console.log("Exception: " + error);
                statusMessage = "Could not render markdown.";
                setFallbackBlogContent();
            }
        }

        isLoadingBlog = false;
    }

    onMount(function () {
        refreshBlogList();
    });
</script>

<main class="blogsPanel">
    <aside class="sidebar">
        <section class="sidebarHeader">
            <span class="titleText">Blogs</span>
            <button class="refreshButton" on:click={refreshBlogList} disabled={isLoadingBlogList === true}>
                {#if isLoadingBlogList === true}
                    Loading...
                {:else}
                    Refresh
                {/if}
            </button>
        </section>

        {#if statusMessage}
            <p class="statusText">{statusMessage}</p>
        {/if}

        <section class="blogList">
            {#each blogList as blogName}
                <button
                    class:selected={selectedBlogName === blogName}
                    class="blogButton"
                    on:click={function () {
                        loadBlog(blogName);
                    }}
                    disabled={isLoadingBlog === true && selectedBlogName === blogName}
                >
                    {blogName}
                </button>
            {/each}
        </section>
    </aside>

    <section class="content">
        {@html blogHtml}
    </section>
</main>

<style>
    .blogsPanel {
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

            .blogList {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 6px;

                .blogButton {
                    all: unset;
                    cursor: pointer;
                    color: var(--text);
                    width: 100%;
                    padding: 4px 0;
                }

                .blogButton.selected {
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
        .blogsPanel {
            flex-direction: column;

            .sidebar {
                width: 100%;
                border-right: none;
                border-bottom: 1px solid var(--border);
            }
        }
    }
</style>
