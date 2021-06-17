<template>
    <v-bottom-navigation fixed grow :value="value" background-color="transparent">
        <router-link to="/Feed">
            <v-btn>
                <!-- <span>Feed</span> -->
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </router-link>
        <router-link to="/Discover">
            <v-btn>
                <!-- <span>Discover</span> -->
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </router-link>
        <create-tweet></create-tweet>
        <router-link to="/Profile">
            <v-btn>
                <!-- <span>Profile</span> -->
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </router-link>
        <router-link to="/Account">
            <v-btn>
                <!-- <span>Account</span> -->
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </router-link>
    </v-bottom-navigation>
    <!-- <nav>
        <router-link to="/Feed">
            <i class="fas fa-home fa-lg"></i>
        </router-link>
        <router-link to="/Discover">
            <i class="fas fa-search fa-lg"></i>
        </router-link>
        <create-tweet id="mobileTweetButton"></create-tweet>
        <tablet-create-tweet id="tabletTweetButton"></tablet-create-tweet>
        <router-link to="/Profile">
            <i class="fas fa-user-alt fa-lg"></i>
        </router-link>
        <router-link to="/Account">
            <i class="fas fa-cog fa-lg"></i>
        </router-link>
    </nav> -->
</template>

<script>
    import CreateTweet from "./Tweets/CreateTweet.vue";
    // import TabletCreateTweet from "./Tweets/TabletCreateTweet.vue";

    export default {
        name: "navigation-bar",

        data() {
            return {
                value: 1,
            }
        },

        components: {
            CreateTweet,
            // TabletCreateTweet
        },
    }
</script>

<style scoped>
    /* nav {
        position: fixed;
        bottom: -0.1vh;
        width: 100%;
        background: white;
        min-height: 10vh;

        display: grid;
        grid-auto-flow: column;
        column-gap: 20px;
        border-top: 1px solid rgba(211, 211, 211, 0.4);
        padding: 5% 3% 0% 3%;
    } */

    a {
        display: grid;
        place-items: center;
        text-decoration: none;
    }

    /* a > i {
        color: var(--primaryColor);
        margin-bottom: 1.5vh;
    } */

    /* #tabletTweetButton {
        display: none;
    } */

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        nav {
            left: 0vh;
            width: 15vw;
            height: 100%;
            z-index: 2;

            display: grid;
            grid-template-rows: repeat(5, 1fr);
            column-gap: 20px;
            border-top: none;
            border-right: 1px solid rgba(211, 211, 211, 0.4);
        }
        
        a > i {
            font-size: 1.8rem;
            color: #9FBFCC;
            margin-bottom: 4vh;
        }

        #mobileTweetButton {
            display: none;
        }

        #tabletTweetButton {
            display: grid;
            margin-top: 5vh;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        nav {
            left: 0vh;
            width: 10vw;
            height: 100%;
            z-index: 2;

            display: grid;
            grid-template-rows: repeat(5, 1fr);
            column-gap: 20px;
            border-top: none;
            border-right: 1px solid rgba(211, 211, 211, 0.4);
        }
        
        a > i {
            font-size: 1.8rem;
            margin-bottom: 10vh;
        }
    }
</style>