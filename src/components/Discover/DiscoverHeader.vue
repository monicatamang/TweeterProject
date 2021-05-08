<template>
    <header>
        <h3>Discover</h3>
    </header>
</template>

<script>
    export default {
        name: "discover-header"
    }
</script>

<style scoped>
    header {
        display: grid;
        place-items: center;
        min-height: 10vh;
        border-bottom: 1px solid rgba(211, 211, 211, 0.4);
        background: white;
    }

    h3 {
        color: #7398A5;
    }
</style>