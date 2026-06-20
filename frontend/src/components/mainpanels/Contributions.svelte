<script>
    import GithubCard from '../misc/Contributions/GithubCard.svelte';
    
    class Github {
        constructor(url, desc) {
            this.url = url;
            this.desc = desc;
        }
    }
    
    const githubOrganization = [
        new Github("PinpointTools", "A team dedicated for making open source software and websites."),
        new Github("Creativity-Archived", "A way to easily share your game with less restrctions. No bullshit. Just cool shit."),
        new Github("Team-SolarEngine", "Modified version of Psych Engine, now turning into a base-game fork. Former main developer. Formerly called as Universe Engine."),
    ]

    const githubProjects = [
        new Github("Noteted/Noteted", "A note taking app made with customtkinter. This project has been dropped due to having issues with the customtkinter library."),
        new Github("Creativity-Archived/Creativity-Archived", "A place to share games, software, and many other creative content that you desire."),
        new Github("PinpointTools/VLC.UTILS", "Share your current playing in VLC to LastFM to scrobble, and show off to your friends using Discord RPC."),
        new Github("PinpointTools/SendYourFiles-RW", "A way to share your files to different providers."),
        new Github("PinpointTools/WhatsAnApp", "An alternative to the official WhatsApp desktop client with custom features. Supported for cross platform. Currently under heavy break."),
        new Github("daveberrys/LitV", "A `uv` inspired tool made with Rust. A python helper if you will."),
        new Github("daveberrys/HostRN", "A simple and fast way to host your services without docker."),
        new Github("daveberrys/GitUI", "A minimal alternative to GitHub Desktop. Not a full on replacement. Maybe later..."),
        new Github("daveberrys/Protux", "A terminal inspired by `cmux` but for cross-desktop."),
        new Github("daveberrys/ThisCordRPC", "A simple Discord RPC client with presets, and many others to come."),
        new Github("daveberrys/EWgent", "A tool to write a prompt before you send it to your preferred LLM."),
        new Github("daveberrys/Guh", "Too cool to use GitHub Desktop but stupid to not know how to use Git CLI? This is for you."),
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
    
    const organization = makeRows(githubOrganization);
    const projects = makeRows(githubProjects);
</script>

<main>
    <section class="header">
        <span class="bigText">🔨 My Contributions!</span>
        <span>Take a look at the stuff I contributed.</span>
    </section>

    <span class="bigText" style="margin-top: 30px;">Projects</span>
    {#each organization as row}
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

    <span class="bigText" style="margin-top: 30px;">Projects</span>
    {#each projects as row}
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
</style>