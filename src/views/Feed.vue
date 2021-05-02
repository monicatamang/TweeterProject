<template>
    <section>
        <article v-if="!loginToken">
            <p>Please login</p>
            <router-link to="/Login">Login</router-link>
        </article>
        <article v-else>
            <h1>Feed Page</h1>
            <all-tweets></all-tweets>

            <navigation-bar></navigation-bar>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import AllTweets from "../components/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            AllTweets,
            NavigationBar,
        },

        data: function() {
            return {
                loginToken: cookies.get("loginToken")
            }
        },
    }
</script>

<style scoped>
    
</style>