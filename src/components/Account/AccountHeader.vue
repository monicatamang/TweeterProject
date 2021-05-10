<template>
    <header>
        <h3>Account</h3>
    </header>
</template>

<script>
    export default {
        name: "account-header"
    }
</script>

<style scoped>
    header {
        display: grid;
        place-items: center;
        min-height: 10vh;
        width: 100%;
        color: #7398A5;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        header {
            position: relative;
            top: 0;
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