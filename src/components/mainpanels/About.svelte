<script>
    import Discord from '../misc/Discord.svelte';
    import LastFM from '../misc/LastFM.svelte';
</script>

<main>
    <section class="showoff">
        <span class="bigText">🌐 Status</span>
        <section>
            <Discord />
            <LastFM />
        </section>
    </section>
    
    <section class="about">
        <span class="bigText">👤 About Me</span> <br/>
        <section>
            <span>
                I am a self-taught teenager open source software developer. I make websites, software, and tools! <br/>
                I'm also an artist! I create designs, make furry cartoony arts and practicing! <br/>
                I really don't like to call myself smart, as I do use AI to help me out with some of my projects. <br/>
                Nontheless, I am productive with AI helping me on the side! I don't use AI to create everything for me.
            </span>
            
            <span>
                I've learnt about 8 programming languages <br/>
                <img
                    src="https://skillicons.dev/icons?i=python,html,css,js,ts,lua,haxe,bash&amp;theme=dark"
                    alt="python, html, css, js, ts, lua, haxe, bash"
                /> <br/>
                and 4 different web frameworks. <br/>
                <img
                    src="https://skillicons.dev/icons?i=svelte,solidjs,astro,react&amp;theme=dark"
                    alt="svelte, solidjs, astro, react"
                />
            </span>
        </section>
    </section>
    
    <section class="stats">
        <span class="bigText">📈 Stats</span> <br/>
        <img
            src="https://raw.githubusercontent.com/daveberrys/daves-stats/refs/heads/main/profile/stats.svg"
            alt="Daveberry's GitHub Stats"
        />
        <img
            src="https://raw.githubusercontent.com/daveberrys/daves-stats/refs/heads/main/profile/toplangs.svg"
            alt="Daveberry's Top 6 Languages"
        />
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        
        .showoff {
            section {
                display: flex;
                gap: 14px;
                overflow-x: scroll;
            }
        }
        
        .about {
            text-align: center;
            section {
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
        }
    }
    
    .bigText {
        display: flex;
        justify-content: center;
        
        font-size: 2rem;
        font-weight: bold;
    }
</style>