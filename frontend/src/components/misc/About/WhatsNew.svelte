<main onclick={() => window.open("https://github.com/daveberrys/DaveWeb/blob/main/frontend/src/components/misc/About/WhatsNew.svelte")}>
    <span class="bigText">📢 WHAT'S NEW?!</span>
    <span>
        <a href="/commisions">I've opened a commision</a>!
        You can now commision me something to create a custom app or a production ready app for you!
        Check out the <a href="/commisions">commisions page</a> to learn more.
    </span>
    <span class="date">5th August 2026</span>
</main>

<style>
    main {
        width: 50rem;
        background-color: var(--sidebar);
        border: 2px solid var(--border);
        border-radius: 8px;
        padding: 16px;
        display: flex;
        flex-direction: column;

        a { color: aqua; }
        .date { font-size: 0.8rem; opacity: 0.5; }
        @media screen and (max-width: 1200px) {
            width: 100%;
            padding: 8px;
        }
    }
</style>