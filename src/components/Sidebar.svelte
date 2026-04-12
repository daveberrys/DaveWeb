<script>
    import Time from "./misc/Time.svelte";
    export let currentPath = "/";

    // SIDEBAR NAVIGATION CODE
    class SidebarLink {
        constructor(label, href) {
            this.label = label;
            this.href = href;
        }
    }

    let links = [
        new SidebarLink("Home", "/"),
        new SidebarLink("Contributions", "/contributions"),
        new SidebarLink("Links", "/links")
    ];

    function formatPath(path) {
        if (path == "/") {
            return "/";
        } else {
            return path.replace(/\/$/, "");
        }
    }

    function checkActiveLink(href) {
        let formattedCurrentPath = formatPath(currentPath);
        let formattedHref = formatPath(href);

        if (formattedCurrentPath == formattedHref) {
            return true;
        } else {
            return false;
        }
    }
</script>

<div class="main">
    <div class="top">
        <img
            src="/assets/images/Daveberry Wave.png"
            alt="Daveberry"
            width="128"
            height="128"
        />
        <span class="mainText">Howdy, I'm Daveberry!</span>
        <div class="localTime">
            <span>Local Time: <Time /></span>
        </div>
        <span>I'm Daveberry! I'm a teenage self-taught software engineer and also an artist. Check out my contributions!</span>
    </div>

    <div class="bottom">
        {#each links as link}
            <a class:active={checkActiveLink(link.href)} href={link.href}>{link.label}</a>
        {/each}
    </div>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        min-width: 15rem;
        max-width: 15rem;
        height: 100vh;
        padding: 10px;

        border-right: 2px solid var(--border);
        background-color: var(--sidebar);

        .top {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            .localTime {
                display: flex;
                align-items: center;
                gap: 2px;
            }

            .mainText {
                color: var(--primary);
                font-size: 1.5rem;
                font-weight: bold;
            }
        }

        .bottom {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-top: 5rem;

            a {
                background-color: var(--secondary);
                color: var(--text);

                font-weight: bold;
                text-decoration: none;

                padding: 0.5rem 1rem;
                width: 10rem;
                border-radius: 5px;
                transition: scale 50ms ease-in-out;
            } a:hover {
                scale: 1.05;
            } a.active {
                background-color: var(--primary);
            }
        }
    }
</style>
