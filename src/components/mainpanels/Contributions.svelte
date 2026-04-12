<script>
    import GithubCard from '../misc/GithubCard.svelte';
    
    class Github {
        constructor(url, desc) {
            this.url = url;
            this.desc = desc;
        }
    }
    
    const github = [
        new Github("PinpointTools", "A team dedicated for making open source software and websites."),
        new Github("Creativity-Archived", "A way to easily share your game with less restrctions. No bullshit. Just cool shit."),
        new Github("Team-SolarEngine", "Modified version of Psych Engine, now turning into a base-game fork. Former main developer. Formerly called as Universe Engine."),
    ]
    
    function makeRows(linkList) {
        let rows = [];
        let currentIndex = 0;
        let useTwoItems = true;
    
        while (currentIndex < linkList.length) {
            let rowSize = null;
    
            if (useTwoItems === true) {
                rowSize = 2;
            } else {
                rowSize = 3;
            }
    
            rows.push(linkList.slice(currentIndex, currentIndex + rowSize));
            currentIndex = currentIndex + rowSize;
            useTwoItems = !useTwoItems;
        }
    
        return rows;
    }
    
    const linkRows = makeRows(github);
</script>

<main>
    <section class="header">
        <span class="bigText">🔨 My Contributions!</span>
        <span>Take a look at the stuff I contributed.</span>
    </section>
    
    <section class="contributions">
        {#each linkRows as row}
            <section class="content">
                {#each row as link}
                    <GithubCard
                        url={link.url}
                        desc={link.desc}
                    />
                {/each}
            </section>
        {/each}
    </section>
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
            gap: 0.5rem;
        }
    
        .contributions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            width: 100%;
            flex-wrap: wrap;
            
            .content {
                display: flex;
                gap: 1rem;
            }
        }
    }
    
    .bigText {
        font-size: 2rem;
        font-weight: bold;
    }
</style>