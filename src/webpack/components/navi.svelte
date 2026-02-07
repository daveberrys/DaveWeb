<script lang="ts">
    export let currentPage: string;
</script>

<div class="navibar">
    <a href="/">
        <div class="item" class:currentlySelected={currentPage === "Home"} >
            <img src="/assets/icons/navi/home.svg" alt={currentPage} class="icon" />
            <span class="mobileOff">Home</span>
        </div>
    </a>

    <a href="/contributions">
        <div class="item" class:currentlySelected={currentPage === "Contributions"} >
            <img src="/assets/icons/navi/book-open.svg" alt={currentPage} class="icon" />
            <span class="mobileOff">Contributions</span>
        </div>
    </a>
    
    <a href="/links">
        <div class="item" class:currentlySelected={currentPage === "Links"} >
            <img src="/assets/icons/navi/link.svg" alt={currentPage} class="icon" />
            <span class="mobileOff">Links</span>
        </div>
    </a>

    <a href="/myJourney">
        <div class="item" class:currentlySelected={currentPage === "My Journey"}>
            <img src="/assets/icons/navi/arrow-right.svg" alt={currentPage} class="icon" />
            <span class="mobileOff">My Journey</span>
        </div>
    </a>
</div>


<style>
    .currentlySelected {
        background-color: var(--secondaryColor);
        box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
    }
    .currentlySelected:hover {
        background-color: var(--secondaryColor);
        box-shadow: 0 4px 15px var(--accentColor);
    }
    
    .navibar {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        box-shadow: 0 4px 8px var(--glowColor);
        background-color: var(--frameColor);
        border-radius: 8px;
        width: 750px;
        padding: 10px;
        gap: 10px;
    }

    .item {
        background-color: rgba(0, 0, 0, 0);
        box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
        outline: none;
        scale: 1;
        border-radius: 8px;

        display: flex;
        gap: 5px;
        vertical-align: auto;
        width: max-content;
        padding: 5px;

        transition: all 250ms ease-in-out;
    }
    .item:hover {
        background-color: var(--itemColor);
        box-shadow: 0 4px 15px var(--glowColor);
        scale: 1.025;
    }

    .currentlySelected {
        background-color: var(--accentColor);
        box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
    }
    .currentlySelected:hover {
        background-color: var(--secondaryColor);
        box-shadow: 0 4px 15px var(--accentColor);
    }

    a {
        color: var(--textColor);
        text-decoration: none;
    }

    .icon {
        filter: invert(1);
    }
    
    .mobileOff {
        display: block;
    }

    @media screen and (max-width: 768px) {
        .navibar {
            width: auto;
        }
        
        .desktopOff {
            display: block;
        } .mobileOff {
            display: none;
        }
    }
</style>
