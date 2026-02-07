<div class="frame">
    <slot/>
</div>

<style>
    .frame {
        background-color: var(--frameColor);
        border-radius: 8px;
        
        margin-top: 20px;
        height: max-content;
        width: 750px;
        padding: 10px;
        
        box-shadow: 0 4px 15px var(--glowColor);
        outline: none;
    }
    
    @media screen and (max-width: 768px) {
        .frame {
            width: auto;
        }
    }
</style>