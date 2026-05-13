<script>
    import Discord from '../misc/About/Discord.svelte';
    import LastFM from '../misc/About/LastFM.svelte';
    import WakatimeStats from '../misc/About/WakatimeStats.svelte';

    const skills = [
        { name: "Lua", icon: "https://skillicons.dev/icons?i=lua" },
        { name: "Haxe", icon: "https://skillicons.dev/icons?i=haxe" },
        { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
        { name: "HTML", icon: "https://skillicons.dev/icons?i=html" },
        { name: "CSS", icon: "https://skillicons.dev/icons?i=css" },
        { name: "Rust", icon: "https://skillicons.dev/icons?i=rust" },
        { name: "Go", icon: "https://skillicons.dev/icons?i=go" },
        { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
        { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
        { name: "Bash", icon: "https://skillicons.dev/icons?i=bash" },
        { name: "Svelte", icon: "https://skillicons.dev/icons?i=svelte" },
        { name: "SolidJS", icon: "https://skillicons.dev/icons?i=solidjs" },
        { name: "Astro", icon: "https://skillicons.dev/icons?i=astro" },
        { name: "React", icon: "https://skillicons.dev/icons?i=react" },
        { name: "Express", icon: "https://skillicons.dev/icons?i=express" }
    ];
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
            
            <span class="skills">
                <span class="bigText">💻 Skills/Tech Stack</span> <br/>
                <section class="skillContainer">
                    {#each skills as skill}
                        <div class="skillItem">
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                style="width: 3rem"
                            />
                            <span class="name">
                                {skill.name}
                            </span>
                        </div>
                    {/each}
                </section>
            </span>
        </section>
    </section>
    
    <section class="stats">
        <span class="bigText">📈 Stats</span> <br/>
        <section>
            <WakatimeStats/>
        </section>
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 30px;
        
        .showoff {
            display: flex;
            flex-direction: column;
            gap: 14px;
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

            .skills {
                .skillContainer {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 10px;

                    .skillItem {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        background-color: var(--sidebar);
                        border: 2px solid var(--border);
                        padding: 5px 10px;
                        border-radius: 10px;
                        width: fit-content;
                        transition: all 0.1s ease-in-out;
                        
                        .name {
                            font-size: 1.5rem;
                        }

                        &:hover {
                            scale: 1.05;
                            border-color: var(--primary);
                        }
                    }
                }
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