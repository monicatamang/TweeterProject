<template>
    <v-app-bar flat color="white">
        <v-spacer></v-spacer>
        <v-app-bar-title>{{ title }}</v-app-bar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>
    export default {
        name: "feed-header",

        props: {
            title: String
        },
    }
</script>

<style scoped>
    /* header {
        display: grid;
        place-items: center;
        min-height: 10vh;
        border-bottom: 1px solid rgba(211, 211, 211, 0.4);
        background: white;
        
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    h3 {
        color: #7398A5;
    } */

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
            width: 90vw;
            margin-left: 10vw;
        }

        h3 {
            font-size: 1.3rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        header {
            width: 74vw;
            margin-left: 25vw;
        }
    }
</style>