<template>
    <div id="earthImageContainer">
        <img id="earth" src="../assets/earthGreyBackground.jpg" alt="A clipart of earth in a soft blue colour where the dark blue shaded area represents North and South America.">
    </div>
</template>

<script>
    export default {
        name: "earth-image-background"
    }
</script>

<style scoped>
    #earthImageContainer {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        background: var(--accentDarkColor);
    }

    img {
        width: 20vw;
    }
</style>