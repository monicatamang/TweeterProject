<template>
    <header>
        <img src="../../assets/logoBlue.jpg" alt="Post-It's logo of a blue sticky note with the bottom right corner slightly folded.">
        <h1>Welcome to Post-It</h1>
        <p>Join our growing community of 10,000+ students from all over the world.</p>
    </header>
</template>

<script>
    export default {
        name: "home-header"
    }
</script>

<style scoped>
    header {
        display: grid;
        place-items: center;
        row-gap: 30px;
        text-align: center;
        padding-top: 2vh;
    }

    img {
        width: 10vw;
        margin-bottom: 2vh;
    }

    h1 {
        font-size: 1.8rem;
    }

    p {
        color: #636D6E;
        padding: 0% 10%;
    }
</style>