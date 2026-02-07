<script lang="ts">
    export let marginTop: string;
</script>

<div class="frame" style="margin-top: {marginTop};">
    <slot/>
</div>

<style>
    .frame {
        background-color: var(--frameColor);
        border-radius: 8px;
        
        width: auto;
        padding: 10px;
        scale: 1;
        
        box-shadow: 0 4px 8px var(--glowColor);
        transition: scale 50ms ease-in-out;
    } .frame:hover {
        scale: 1.01;
    }
</style>