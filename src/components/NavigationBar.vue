<template>
    <nav>
        <router-link to="/Feed">Home</router-link>
        <router-link to="/Discover">Discover</router-link>
        <!-- <create-tweet @userCreatedTweet="sendTweetToFeed"></create-tweet> -->
        <create-tweet></create-tweet>
        <router-link to="/Profile">Profile</router-link>
        <router-link to="/Account">Account</router-link>
    </nav>
</template>

<script>
    import CreateTweet from "./Tweets/CreateTweet.vue";

    export default {
        name: "navigation-bar",

        components: {
            CreateTweet,
        },

        // methods: {
        //     sendTweetToFeed: function(data) {
        //         this.$emit("printUserTweet", data);
        //     }
        // },
    }
</script>

<style scoped>
    nav {
        display: grid;
        grid-auto-flow: column;
        column-gap: 20px;
    }

    /* button {
        border: 1px solid black;
    } */
</style>