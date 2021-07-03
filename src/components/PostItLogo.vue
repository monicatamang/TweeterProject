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

    @media only screen and (min-width: 768px) {
        
        i {
            font-size: 2.5rem; 
        }
    }

    @media only screen and (min-width: 1024px) {
        
        i {
            font-size: 1.3rem; 
        }
    }
</style>