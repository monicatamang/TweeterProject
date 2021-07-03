<template>
    <v-bottom-navigation fixed background-color="white" class="py-sm-10 hidden-sm-and-up">
        <router-link to="/Feed">
            <v-btn class="mx-sm-7">
                <v-icon class="hidden-sm-and-up">mdi-home</v-icon>
                <v-icon size="30" class="hidden-xs-only">mdi-home</v-icon>
            </v-btn>
        </router-link>
        <router-link to="/Discover">
            <v-btn class="mx-sm-5">
                <v-icon class="hidden-sm-and-up">mdi-magnify</v-icon>
                <v-icon size="30" class="hidden-xs-only">mdi-magnify</v-icon>
            </v-btn>
        </router-link>
        <create-tweet></create-tweet>
        <router-link to="/Profile">
            <v-btn class="mx-sm-5">
                <v-icon class="hidden-sm-and-up">mdi-account</v-icon>
                <v-icon size="30" class="hidden-xs-only">mdi-account</v-icon>
            </v-btn>
        </router-link>
        <router-link to="/Account">
            <v-btn class="mx-sm-7">
                <v-icon class="hidden-sm-and-up">mdi-cog</v-icon>
                <v-icon size="30" class="hidden-xs-only">mdi-cog</v-icon>
            </v-btn>
        </router-link>
    </v-bottom-navigation>
</template>

<script>
    import CreateTweet from "./Tweets/CreateTweet.vue";

    export default {
        name: "navigation-bar",

        components: {
            CreateTweet
        }
    }
</script>

<style scoped>
    a {
        display: grid;
        place-items: center;
        text-decoration: none;
    }

    @media only screen and (min-width: 768px) {
        
        .v-bottom-navigation {
            display: grid;
            place-items: center;
        }
    }
</style>