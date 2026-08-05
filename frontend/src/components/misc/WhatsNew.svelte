<main>
    <span class="bigText header">
        📢 WHAT'S NEW?!
        <a href="https://github.com/daveberrys/DaveWeb/commits/main/frontend/src/components/misc/WhatsNew.svelte">
            Open File History
        </a>
    </span>
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
        font-family: jetbrains;
        color: white;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            a {
                all: unset;
                padding: 5px 12px;
                border-radius: 8px;
                background-color: var(--sidebar);
                border: 2px solid var(--border);
                color: #fff;
                font-weight: bold;
                font-size: 1rem;
                cursor: pointer;
                text-align: center;
                transition: scale 0.1s ease-in-out, border-color 0.1s ease-in-out;

                &:hover {
                    scale: 1.05;
                    border-color: var(--primary);
                }
            }
        }

        a { color: aqua; }
        .date { font-size: 0.8rem; opacity: 0.5; }
        @media screen and (max-width: 900px) {
            width: 20rem;
        }
    }
</style>