<script>
    class Link {
        constructor(title, url, desc) {
            this.title = title;
            this.url = url;
            this.desc = desc;
        }
    }
    
    const links = [
      new Link("Github", "https://github.com/daveberrys", "This is where I share all my code! Like this website! It's open source under MIT License."),  
      new Link("Discord", "https://discord.gg/S5jTpsq8Js", "This is my discord server! I'm very active in discord since all my friends are here. Discord is \"daveberrys\""),
      new Link("Twitter", "https://twitter.com/thedevdoggo", "Most of my active posts are right here! I'm actually somewhat active (lol)"),
      new Link("Bluesky", "https://bsky.app/profile/codedave.pages.dev", "Not really active here, but I guess I exist here."),
      new Link("Youtube", "https://youtube.com/@daveberrys", "I don't post as much, since I don't have any ideas, but I'm trying."),
      new Link("Last FM", "https://www.last.fm/user/daveberrycb", "I track my music here! If we strongly match, maybe we can friend each other!"),
      new Link("Tiktok", "https://www.tiktok.com/@itsdaveberrys", "I post whatever I want. You'll see me post random things because I have no idea."),
    ];
    
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
    
    const linkRows = makeRows(links);
</script>

<main>
    <section class="header">
        <span class="bigText">🔨 My Links!</span>
        <span>Go ahead and follow where I am!</span>
    </section>

    {#each linkRows as row}
        <section class="linksRow">
            {#each row as link}
                <a href={link.url} class="link">
                    <div class="linkContent">
                        <span class="socialText">{link.title}</span>
                        <span>{link.desc}</span>
                    </div>
                </a>
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
            gap: 0.5rem;
        }

        .linksRow {
            display: flex;
            justify-content: center;
            gap: 1rem;
            width: 100%;
            flex-wrap: wrap;
            
            .link {
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
                max-width: 100%;
                transition: border-color 150ms ease;
                
                .linkContent {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    
                    .socialText {
                        font-size: 1.5rem;
                        color: var(--primary);
                        font-weight: bold;
                    }
                }
            } .link:hover {
                border-color: var(--primary);
            }
        }
    }
    
    .bigText {
        font-size: 2rem;
        font-weight: bold;
    }
</style>
