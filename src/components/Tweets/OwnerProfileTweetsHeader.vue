<template>
    <header>
        <h3>My Tweets</h3>
    </header>
</template>

<script>
    export default {
        name: "owner-profile-tweets-header"
    }
</script>

<style scoped>
    h3 {
        color: #9FBFCC;
        margin-left: 10vw;
    }

    header {
        position: fixed;
        top: 0;
        width: 100vw;
        background: white;
        border-bottom: 1px solid rgba(211, 211, 211, 0.4);
        min-height: 10vh;
        z-index: 1;

        display: grid;
        place-items: center;
    }
</style>