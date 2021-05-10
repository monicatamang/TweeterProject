<template>
    <nav>
        <tablet-create-tweet></tablet-create-tweet>
        <router-link to="/Feed">Home</router-link>
        <router-link to="/Discover">Discover</router-link>
        <router-link to="/Profile">Profile</router-link>
        <router-link to="/Account">Account</router-link>
    </nav>
</template>

<script>
    import TabletCreateTweet from "../components/Tweets/TabletCreateTweet.vue";

    export default {
        name: "desktop-navigation-bar",

        components: {
            TabletCreateTweet
        },
    }
</script>

<style scoped>
    nav {
        position: fixed;
        top: 57vh;
        left: 0;
        z-index: 1;

        width: 25vw;
        height: 43vh;
        margin-left: 0vw;
        background: white;
        border-top: 1px solid rgba(211, 211, 211, 0.3);
        border-right: 1px solid rgba(211, 211, 211, 0.3);
    }

    a {
        display: grid;
        place-items: center;
        text-decoration: none;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .v-application a{
        color: black;
    }
</style>