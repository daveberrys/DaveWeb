<script lang="ts">
	import { onMount } from 'svelte';

	export let blueColor = '#4dabf7';
	export let yellowColor = '#ffd43b';
	export let greenColor = '#69db7c';
	export let defaultColor = '#ffffff';

	let timeText = '';
	let currentColor = defaultColor;

	const tz = 'Asia/Singapore'; // GMT+8
	const displayFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: tz,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	});

	const compareFormatter = new Intl.DateTimeFormat('en-GB', {
		timeZone: tz,
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	function toMinutes(hhmm: string) {
		const [h, m] = hhmm.split(':').map(Number);
		return h * 60 + m;
	}

	function tick() {
		const now = new Date();
		timeText = displayFormatter.format(now);

		const hhmm = compareFormatter.format(now);
		const total = toMinutes(hhmm);

		const t2200 = toMinutes('22:00');
		const t0500 = toMinutes('05:00');
		const t0600 = toMinutes('06:00');
		const t1430 = toMinutes('14:30');

		if (total >= t2200 || total < t0500) {
			currentColor = blueColor;
		} else if (total >= t0600 && total < t1430) {
			currentColor = yellowColor;
		} else if (total >= t1430 && total < t2200) {
			currentColor = greenColor;
		} else {
			currentColor = defaultColor;
		}
	}

	onMount(() => {
		tick();
		const interval = setInterval(tick, 1000);
		return () => clearInterval(interval);
	});
</script>

<span class="clock">
	Local Time:
	<span class="timeTooltip">
		<b style={`color: ${currentColor};`}>{timeText}</b>

		<section class="tooltipText frame">
    		<div>
				<span style="color: green; font-size: 20px;">Green</span> <br/>
				• I'm available to chat! You can chat me freely whenever it's green :) <br/>
				• I might be afk, not responding or busy. But, I'll try to respond!
			</div>

    		<div style="margin-top: 10px;">
				<span style="color: yellow; font-size: 20px;">Yellow</span> <br/>
				• I'm either at work, or busy. <br/>
				• I get off work at random times. Even before 14:00. <br/>
				• Overtime is another thing, but ehh. I take it randomly.
			</div>

    		<div style="margin-top: 10px;">
				<span style="color: blue; font-size: 20px;">Blue</span> <br/>
				• I'm sleepy... <br/>
				• Sometimes I'd stay up late just for fun.
			</div>

    		<div style="margin-top: 10px;">
				<span style="color: white; font-size: 20px;">White</span> <br/>
    			• Probably doing something else. <br/>
    			• I don't know. This just serves as a fallback.
			</div>

			<div style="margin-top: 10px; font-size: 20px;">
				<b>GMT+8 (Asia/Singapore)</b>
			</div>
		</section>
	</span>
</span>

<style>
	.clock {
		transition: color 200ms ease-in-out;
	}

	.timeTooltip {
		position: relative;
		display: inline-block;
	}

	.tooltipText {
		position: absolute;
		bottom: 130%;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		pointer-events: none;
		transition: opacity 120ms ease-in-out;
		color: #fff;
		padding: 4px 8px;
		border-radius: 6px;
		font-size: 0.75rem;
		white-space: nowrap;
		z-index: 1200;
	}

	.timeTooltip:hover .tooltipText {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.tooltipText {
			position: fixed;
			transform:
				translateX(-50%)
				translateY(100%);
		}
	}
</style>
