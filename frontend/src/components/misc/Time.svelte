<script>
    import { onMount } from "svelte";

    const timeZone = "Asia/Kuala_Lumpur";
    let currentTime = $state("???");

    function getCurrentTime() {
        return new Date().toLocaleTimeString("en-MY", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: timeZone
        });
    }

    function updateTime() {
        currentTime = getCurrentTime();
    }

    onMount(function () {
        updateTime();

        let intervalId = setInterval(function () {
            updateTime();
        }, 1000);

        return function () {
            clearInterval(intervalId);
        };
    });
</script>

<span>{currentTime}</span>
