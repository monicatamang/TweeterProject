<template>
    <i class="fas fa-sticky-note fa-2x"></i>
</template>

<script>
    export default {
        name: "post-it-logo"
    }
</script>

<style scoped>
    i {
        color: var(--primaryColor);
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        i {
            font-size: 2.5rem; 
        }
    }
</style>