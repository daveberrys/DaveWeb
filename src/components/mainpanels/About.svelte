<script>
    import Discord from '../misc/About/Discord.svelte';
    import LastFM from '../misc/About/LastFM.svelte';
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
                
            </span>
            
            <span>
                <span class="bigText">💻 Skills/Tech Stack</span> <br/>
                <img
                    src="https://skillicons.dev/icons?i=python,html,css,js,ts,lua,haxe,bash&amp;theme=dark"
                    alt="python, html, css, js, ts, lua, haxe, bash"
                    style="width: 25rem"
                /> <br/>
                <img
                    src="https://skillicons.dev/icons?i=svelte,solidjs,astro,react,express&amp;theme=dark"
                    alt="svelte, solidjs, astro, react, express"
                    style="width: 20rem"
                />
            </span>
        </section>
    </section>
    
    <section class="stats">
        <span class="bigText">📈 Stats</span> <br/>
        <section>
            <img
                src="https://raw.githubusercontent.com/daveberrys/daves-stats/refs/heads/main/profile/stats.svg"
                alt="Daveberry's GitHub Stats"
            />
            <img
                src="https://raw.githubusercontent.com/daveberrys/daves-stats/refs/heads/main/profile/toplangs.svg"
                alt="Daveberry's Top 6 Languages"
            />
        </section>
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 30px;
        
        .showoff {
            section {
                display: flex;
                gap: 14px;
                overflow-x: scroll;
            }
        }
        
        .about {
            section {
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
        }
        
        .stats {
            section {
                @media screen and (max-width: 768px) {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }
                /*overflow-x: scroll;*/
            }
        }
    }
    
    .bigText {
        display: flex;
        font-size: 2rem;
        font-weight: bold;
    }
</style>