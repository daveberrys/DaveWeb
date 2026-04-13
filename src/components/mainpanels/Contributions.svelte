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
    
    {#each linkRows as row}
        <section class="contributions">
            {#each row as link}
                <div class="content">
                    <GithubCard
                        url={link.url}
                        desc={link.desc}
                    />
                </div>
            {/each}
        </section>
    {/each}
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
            gap: 0.5rem;
        }
    
        .contributions {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
            max-width: 100%;
            
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