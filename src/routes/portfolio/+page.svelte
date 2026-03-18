<main>
	<div class="mainContent frame">
		<div class="flex" style="margin-top: 15px;">
			<section>
				<img src="assets/misc/Daveberry Wave.png" width="150" height="150" alt="Daveberry Waving" />
			</section>

			<section>
				<h1>Teen Full-Stack Dev</h1>
				<p>
					Self-taught developer from Malaysia. Building website, software, and tools with SvelteKit,
					Python, JavaScript and TypeScript. Started progamming at 14. Programming with AI on the
					side.
				</p>

				<a href="https://github.com/daveberrys">
					<img
						src="/assets/icons/social/Github.svg"
						alt="GitHub"
						style="width: 32px; height: 32px;"
						class="icon"
					/>
				</a>
				<a href="https://twitter.com/thedevdoggo">
					<img
						src="/assets/icons/social/Twitter.svg"
						alt="Twitter"
						style="width: 32px; height: 32px;"
						class="icon"
					/>
				</a>
			</section>
		</div>

		<br />

		<span class="h2">Projects</span> <br />
		<div class="flex">
			<div class="frame projectItem">
				<span class="h2">Send Your Files</span>
				<p>
					Upload your files to a provider of your choice with large file support from the selected
					provider. Made with Vite + Vanilla HTML and JS.
				</p>

				<section class="screeshotPreview">
                    <img src="/assets/misc/portfolio/sendyourfiles/screen1.png" alt="Send Your Files" width="600"/>
                    <img src="/assets/misc/portfolio/sendyourfiles/screen2.png" alt="Send Your Files" width="600"/>
                    <img src="/assets/misc/portfolio/sendyourfiles/screen3.png" alt="Send Your Files" width="600"/>
				    <img src="/assets/misc/portfolio/sendyourfiles/screen4.png" alt="Send Your Files" width="600"/>
				</section>
				
				<section class="buttonRow">
					<a href="https://sendyourfiles.pages.dev/" class="button">
						<div class="frame buttonInner">View Project</div>
					</a>
					<a href="https://github.com/PinpointTools/SendYourFiles-RW" class="button">
						<div class="frame buttonInner">Github Page</div>
					</a>
				</section>
			</div>

			<div class="frame projectItem">
				<span class="h2">Creativity Archived</span>
				<p>
					A software/mods/website/game sharing platform with less restrictions. Made with SvelteKit.
				</p>

				<section class="screeshotPreview">
                    <img src="/assets/misc/portfolio/creativity-archived/screen1.png" alt="Creativity Archived" width="600"/>
                    <img src="/assets/misc/portfolio/creativity-archived/screen2.png" alt="Creativity Archived" width="600"/>
                    <img src="/assets/misc/portfolio/creativity-archived/screen3.png" alt="Creativity Archived" width="600"/>
				    <img src="/assets/misc/portfolio/creativity-archived/screen4.png" alt="Creativity Archived" width="600"/>
				</section>
				
				<section class="buttonRow">
					<a href="https://creativity-archived.pages.dev/" class="button">
						<div class="frame buttonInner">View Project</div>
					</a>
					<a href="https://github.com/Creativity-Archived/Creativity-Archived" class="button">
						<div class="frame buttonInner">Github Page</div>
					</a>
				</section>
			</div>
		</div>

		<br /><br />

		<span class="h2">Skills</span> <br />
		<div class="flex">
			<div class="frame skillItem">
				<span class="h3">Frontend</span>
				<ul>
					<li>HTML, CSS, JavaScript</li>
					<li>SvelteKit</li>
					<li>ReactJS</li>
				</ul>
			</div>

			<div class="frame skillItem">
				<span class="h3">Backend</span>
				<ul>
					<li>Node.js</li>
					<li>Express</li>
					<li>JavaScript</li>
					<li>TypeScript</li>
					<li>Python</li>
				</ul>
			</div>

			<div class="frame skillItem">
				<span class="h3">Tools</span>
				<ul>
					<li>Vite</li>
					<li>GitHub API</li>
					<li>Figma</li>
					<li>Cloudflare Pages & Workers</li>
					<li>Vercel</li>
					<li>Netlify</li>
				</ul>
			</div>
		</div>

		<br /><br />

		<span class="h2">Contact Me!</span> <br />
		<span>You can contact me at Discord, Twitter, Bluesky, or Email.</span> <br /> <br />
		<div class="flex" style="padding-bottom: 15px;">
			<div class="frame skillItem">
				<span class="h3">Discord</span>
				<p>daveberrys</p>
			</div>

			<div class="frame skillItem">
				<span class="h3">Twitter</span>
				<p>@thedevdoggo</p>
			</div>

			<div class="frame skillItem">
				<span class="h3">Bluesky</span>
				<p>@codedave.pages.dev</p>
			</div>

			<div class="frame skillItem">
				<span class="h3">Email</span>
				<p>daveberryblueson@gmail.com</p>
			</div>
		</div>

		<div style="padding-bottom: 15px;" class="flex">
			<a href="/" class="button">
				<div class="frame buttonInner">Back to Home</div>
			</a>

			<a href="#" class="button">
				<div class="frame buttonInner">Back to Top</div>
			</a>
		</div>
	</div>
</main>

<style>
	* {
		box-sizing: border-box;
	}

	main {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 2rem 0 3rem;
	}

	.mainContent {
		max-width: 80.15rem;
		width: 100%;
		padding: 0 1rem;
	}

	a {
		color: white;
		text-decoration: none;
	}

	.flex {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		gap: 5px;

		scrollbar-width: none;
	}

	/*.flex.center {
	    justify-content: center;
		align-items: center;
	}*/
	
	.frame.projectItem {
		max-width: 40rem;
		display: flex;
		flex-direction: column;
	}
	.frame.skillItem {
		min-width: 250px;
	}

	.button {
		/*max-width: 5.75rem !important;*/
		text-align: center;
	}

	/*.smallText {
		font-size: 0.8rem;
	}*/

	.icon {
		filter: invert(1) drop-shadow(0px 2px 2px black);
		transition: transform 150ms ease-in-out;
	}
	.icon:hover {
		transform: scale(1.1);
	}

	.buttonInner {
		width: 100%;
	}

	.buttonRow {
		margin-top: 0.5rem;
		display: flex;
		gap: 5px;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.screeshotPreview {
		display: flex;
		overflow-y: auto;
		flex-direction: column;
		align-items: center;
		height: 27rem;
	}
	
	.h2 {
		font-size: 1.7rem;
		font-weight: bold;
	}
	.h3 {
		font-size: 1.3rem;
		font-weight: bold;
	}

	@media screen and (max-width: 768px) {
		main {
			padding: 1.25rem 0 2rem;
		}

		.mainContent {
			width: 100%;
			padding: 0 0.75rem;
		}

		.flex {
			flex-wrap: wrap;
			overflow-x: visible;
		}

		.frame.projectItem,
		.frame.skillItem {
			min-width: 100%;
		}
	}

	h2 + .flex {
		padding-bottom: 10px;
	}
</style>
