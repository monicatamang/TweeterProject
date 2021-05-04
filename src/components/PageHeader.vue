<template>
    <header>
        <i class="fas fa-sticky-note fa-2x" id="logo"></i>
    </header>
</template>

<script>
    export default {
        name: "page-header"
    }
</script>

<style scoped>
    header {
        display: grid;
        place-items: center;
        min-height: 10vh;
    }

    /* img {
        width: 10vw;
    } */

    #logo {
        color: #9FBFCC;
    }
</style>