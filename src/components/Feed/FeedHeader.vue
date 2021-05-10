<template>
    <header>
        <h3>Home</h3>
    </header>
</template>

<script>
    export default {
        name: "feed-header"
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

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        header {
            margin-left: 15vw;
            width: 85vw;
            z-index: 1;
        }

        h3 {
            font-size: 1.3rem;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        header {
            min-height: 12vh;
        }

        h3 {
            font-size: 1.3rem;
        }
    }
</style>