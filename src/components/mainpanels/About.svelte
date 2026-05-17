<script>
    import Discord from '../misc/About/Discord.svelte';
    import LastFM from '../misc/About/LastFM.svelte';
    import WakatimeStats from '../misc/About/WakatimeStats.svelte';

    const skillGroup = [
        { group: "💻 Languages", skills: [
            { name: "Lua", icon: "lua", state: "yellow" },
            { name: "Haxe", icon: "haxe", state: "yellow" },
            { name: "Python", icon: "python", state: "blue" },
            { name: "HTML", icon: "html", state: "blue" },
            { name: "CSS", icon: "css", state: "blue" },
            { name: "Rust", icon: "rust", state: "red" },
            { name: "Go", icon: "go", state: "red" },
            { name: "JavaScript", icon: "js", state: "blue" },
            { name: "TypeScript", icon: "ts", state: "yellow" },
            { name: "Bash", icon: "bash", state: "yellow" },
        ]},

        { group: "📦 Frontend Frameworks", skills: [
            { name: "Svelte", icon: "svelte", state: "blue" },
            { name: "SolidJS", icon: "solidjs", state: "yellow" },
            { name: "Astro", icon: "astro", state: "blue" },
            { name: "React", icon: "react", state: "yellow" },
        ]},

        { group: "🖥️ Backend & Tools", skills: [
            { name: "Express", icon: "express", state: "blue" },
            { name: "Node.js", icon: "nodejs", state: "blue" },
            { name: "Flask", icon: "flask", state: "yellow" },
            { name: "Tauri", icon: "tauri", state: "red" },
            { name: "PyWebView", icon: "https://pywebview.flowrl.com/logo-no-text.png", state: "blue" }
        ]}
    ];

    function isExternalIcon(icon) {
        if (!icon.includes("https")) return `https://skillicons.dev/icons?i=${icon}`;
        return icon;
    }

    function getIconState(icon) {
        switch (icon) {
            case "blue":
                return "#008BFF";
            case "yellow":
                return "#FFFF00";
            case "red":
                return "#FF0000";
            default:
                return "#008BFF";
        }
    }
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
                <span class="bigText">💻 Skills/Tech Stack</span>
                <span class="smallText">Tap/Hover Information:</span>
                <span style="color: #008BFF;"><b>Blue</b> - Prefers this language, and codes in it</span> <br>
                <span style="color: #FFFF00;"><b>Yellow</b> - Codes this languages, but doesn't mainly code in it.</span> <br>
                <span style="color: #FF0000;"><b>Red</b> - Learning on this language.</span>
                
                <section class="skillContainer">
                    {#each skillGroup as skill}
                        <span class="bigText" style="font-size: 1.5rem">{skill.group}</span>
                        <div class="skillGroup">
                            {#each skill.skills as skill}
                                <div class="skillItem" style="--hoverColor: {getIconState(skill.state)};">
                                    <img
                                        src={isExternalIcon(skill.icon)}
                                        alt={skill.name}
                                        style="width: 3rem"
                                    />
                                    
                                    <span class="name">
                                        {skill.name}
                                    </span>
                                </div>
                            {/each}
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
                    flex-direction: column;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 10px;

                    .skillGroup {
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
                                border-color: var(--hoverColor);
                            }
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
    } .smallText {
        display: flex;
        font-size: 1.25rem;
    }
</style>