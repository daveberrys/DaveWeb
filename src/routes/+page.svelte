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

				<Item>
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

				<PopupModule bind:open={showAboutMe} title="About Me">
					<p>I'll make this later</p>
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
</style>
