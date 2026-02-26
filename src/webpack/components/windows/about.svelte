<script lang="ts">
	import Window from '../window.svelte';
    import './textStyle.css'

	export let onClose: () => void = () => {};
</script>

<Window title="About Me" {onClose}>
    <blockquote>
        I'm Daveberry! I'm a passionate open-source programmer whose also a web, software and game developer! I do things online for free and I also love making things for free. I have no intent to make my code closed-source. Open source is love, open source is life.
    </blockquote>

    <p> I'm a guy who uses AI for coding. Not to blindly give me code or to write me code, but to help me learn and understand how to code by giving me quizzes. </p>

    <p> I'm learning more languages! I've so far known 5 languages and I'm learning 4. Why? I don't know. I just like learning new things. </p>

    <details>
		<summary class="bigText" style="cursor: pointer; font-weight: bold;">Coding Languages I know</summary>
		<ul>
			<span class="bigText" style="font-weight: bold;">Learnt:</span>
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
			<span class="bigText" style="font-weight: bold;">Learning:</span>
			<li>C#</li>
			<li><s>Rust</s> Too complicated.</li>
			<li><s>GoLang</s> Too complicated.</li>
			<li>Java</li>
		</ul>
	</details>
</Window>