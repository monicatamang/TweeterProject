<template>
    <nav>
        <router-link to="/Feed">
            <i class="fas fa-home fa-lg"></i>
            <p>Home</p>
        </router-link>
        <router-link to="/Discover">
            <i class="fas fa-search fa-lg"></i>
            <p>Discover</p>
        </router-link>
        <create-tweet></create-tweet>
        <router-link to="/Profile">
            <i class="fas fa-user-alt fa-lg"></i>
            <p>Profile</p>
        </router-link>
        <router-link to="/Account">
            <i class="fas fa-cog fa-lg"></i>
            <p>Account</p>
        </router-link>
    </nav>
</template>

<script>
    import CreateTweet from "./Tweets/CreateTweet.vue";

    export default {
        name: "navigation-bar",

        components: {
            CreateTweet,
        },
    }
</script>

<style scoped>
    nav {
        position: fixed;
        bottom: -2vh;
        width: 100%;
        background: white;
        display: grid;
        grid-auto-flow: column;
        column-gap: 20px;
        border-top: 1px solid lightgrey;
        padding: 5% 3%;
    }

    a {
        display: grid;
        place-items: center;
        /* row-gap: 5px; */
        text-decoration: none;
    }

    a > p {
        font-size: 0.7rem;
        color: #9FBFCC;
    }

    a > i {
        color: #9FBFCC;
    }
</style>