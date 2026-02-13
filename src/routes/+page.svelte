<script lang="ts">
	import Navi from '@components/navi.svelte';
	import Frame from '@components/frame.svelte';
	import Item from '@components/item.svelte';
	import Bar from '@misc/bar.svelte';
	import LastFM from '@components/lastfm.svelte';
	import PopupModule from '@components/popupModule.svelte';

	let showAboutMe = false;
</script>

<main>
	<Navi currentPage="Home" />

	<Frame>
		<div class="flex">
			<img
				src="/assets/misc/Daveberry Wave.png"
				width="150"
				height="150"
				alt="Daveberry Wavin' at ya."
			/>
			<span style="margin-left: 20px;">
				<span style="font-weight: bold; font-size: 30px;">Howdy there!</span> <br />
				<p style="margin-left: 20px;">
					I'm Daveberry! I'm a passionate open-source programmer whose also a web, software and game
					developer! I do things online for free and I also love making things for free. I have no
					intent to make my code closed-source. Open source is love, open source is life.
				</p>
			</span>
		</div>

		<Bar />

		<div class="otherContent">
			<span>
				For what I do online is for fun. I make things that looks cool and awesome. Not doing for
				the money. <br />
				I like making things! Makes me happy and I love what I do for free :3
			</span>

			<Bar />

			<span>
				Here's my workflow if you <i>really</i> wanted to know.

				<Item marginTop="0px">
					<ul>
						<li>
							<b>Code Editor</b>: Zed Editor
							<ul>
								<li><b>Why</b>: It's quick, and has all the things I love.</li>
								<li>
									<b>Reccomended</b>: Absoulutely! It's free and open source and isn't made of
									electron.
								</li>
							</ul>
						</li>

						<li style="margin-top: 10px;">
							<b>Preferred Web Framework</b>: SvelteKit
							<ul>
								<li>
									<b>Why</b>: It's quick and absoultely awesome. I'm currently using it for my
									website!
								</li>
								<li><b>Reccomended</b>: If you want your website to be fast, then yeah!</li>
							</ul>
						</li>

						<li style="margin-top: 10px;">
							<b>Preferred Build Tool Web</b>: Vite
							<ul>
								<li><b>Why</b>: Been using for a while now, pretty comfortable with it.</li>
								<li><b>Reccomended</b>: Very quick and builds websites under a second.</li>
							</ul>
						</li>

						<li style="margin-top: 10px;">
							<b>Preferred Programming Language</b>: Python (For Now)
							<ul>
								<li><b>Why</b>: It's easy, and also really intuitive.</li>
								<li>
									<b>Reccomended</b>: For new comers who wanna learn programming, yeah! For advanced
									people? No.
								</li>
							</ul>
						</li>
					</ul>
				</Item>

				<Bar />

				<div class="flexButtonCenter">
                    <button class="popupButton" on:click={() => (showAboutMe = true)}
                        >Here's more infomation about me</button
                    >
				</div>

				<PopupModule bind:open={showAboutMe} title="More Infomation About Me">
					<p> I'm a guy who uses AI for coding. Not to blindly give me code or to write me code, but to help me learn and understand how to code by giving me quizzes. </p>

					<p> I'm learning more languages! I've so far known 5 languages and I'm learning 4. Why? I don't know. I just like learning new things. </p>
					
					<details>
						<summary class="bigText" style="cursor: pointer;">Languages I know</summary>
						<ul>
							<span class="bigText">Learnt:</span>
							<li>Lua</li>
							<li>Haxe</li>
							<li>JavaScript (little bit)</li>
							<li>TypeScript (little bit)</li>
							<li>Bash</li>
							<li>Python</li>
							<li>HTML</li>
							<li>CSS</li>
						</ul>
						
						<ul>
							<span class="bigText">Learning:</span>
							<li>C#</li>
							<li>Rust</li>
							<li>GoLang</li>
							<li>Java</li>
						</ul>
					</details>
					
					<p> I do find AI bad for the world (phyiscal), but for digital cases, I find it okay to use. Especially when it gives you quizzes. </p>

					<p> I'm a soft guy! I don't get mad easily, and I respect your opinion on something. I can help you out on helping your emotions! I probably won't be good at it, but I try anyways. </p>
				</PopupModule>

				<Bar />

				That's about it. Check out the things I've contributed, and check out my links! See ya!
				<LastFM />
			</span>
		</div>
	</Frame>
</main>

<style>
	.flex {
		display: flex;
	}

	.popupButton {
		background: none;
		border: none;
		color: var(--textColor);

		font-family: inherit;
		font-size: 16px;
		padding: 8px 16px;
		border-radius: 8px;

		cursor: pointer;
		box-shadow: 0 4px 8px var(--glowColor);
		scale: 1;

		width: 85%;

		transition:
			background-color 50ms ease-in-out,
			box-shadow 50ms ease-in-out,
			scale 50ms ease-in-out;
	} .popupButton:hover {
		background-color: var(--accentColor);
		box-shadow: 0 4px 8px var(--secondaryColor);
		scale: 1.05;
	}
	
	.flexButtonCenter {
        display: flex;
        justify-content: center;
	}

	.bigText {
		font-weight: bold;
		font-size: 20px;
	}
</style>
