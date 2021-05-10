<template>
    <header>
        <i class="fas fa-sticky-note fa-lg"></i>
        <h3>Post-It</h3>
    </header>
</template>

<script>
    export default {
        name: "desktop-logo"
    }
</script>

<style scoped>
    header {
        display: grid;
        row-gap: 10px;
        place-items: center;
        margin-bottom: 1vh;
        padding-top: 2vh;
    }

    i, h3 {
        color: #9FBFCC;
        font-size: 1rem;
    }
</style>