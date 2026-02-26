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
		hour12: true
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
	It is currently: <b style={`color: ${currentColor};`}>{timeText}</b> (GMT+8)
</span>

<style>
	.clock {
		transition: color 200ms ease-in-out;
	}
</style>
