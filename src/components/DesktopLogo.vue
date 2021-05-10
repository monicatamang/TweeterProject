<template>
    <header>
        <i class="fas fa-sticky-note fa-lg"></i>
        <h3>Post-It</h3>
        <div></div>
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
        place-items: center;
        grid-template-columns: 1fr 1fr 1fr;
        margin-bottom: 1vh;
        padding-top: 5vh;
    }

    i, h3 {
        color: #9FBFCC;
        font-size: 0.8rem;
    }
</style>