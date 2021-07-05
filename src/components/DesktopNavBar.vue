<template>
    <v-app-bar fixed elevate-on-scroll color="white" class="hidden-sm-and-down">
        <div>
            <post-it-logo></post-it-logo>
            <router-link to="/Feed" id="logoName">Post It</router-link>
        </div>
        <v-spacer></v-spacer>
        <nav>
            <router-link to="/Feed">Home</router-link>
            <router-link to="/Discover">Discover</router-link>
            <router-link to="/Profile">Profile</router-link>
            <router-link to="/Account">Account</router-link>
        </nav>
        <create-tweet></create-tweet>
    </v-app-bar>
</template>

<script>
    import PostItLogo from "./PostItLogo.vue";
    import CreateTweet from "./Tweets/CreateTweet.vue";

    export default {
        name: "desktop-nav-bar",

        components: {
            PostItLogo,
            CreateTweet
        },
    }
</script>

<style scoped>
    @media only screen and (min-width: 1024px) {
        
        a {
            text-decoration: none;
            font-size: 0.9rem;
        }

        .v-application a {
            color: black;
        }

        .v-application a:hover {
            color: var(--primaryColor);
            font-weight: 400;
        }

        #logoName:hover {
            color: black;
        }

        div, nav {
            display: grid;
            place-items: center;
        }

        div {
            grid-template-columns: 1fr 1fr;
        }

        nav {
            grid-template-columns: repeat(4, 1fr);
            column-gap: 20px;
        }
    }
</style>