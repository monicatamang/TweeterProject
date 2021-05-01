<template>
    <section>
        <h1>Feed Page</h1>
        <all-tweets></all-tweets>
        <navigation-bar></navigation-bar>
        <article v-if="!loginToken">
            <p>Please login</p>
            <router-link to="/Login">Login</router-link>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import NavigationBar from "../components/NavigationBar.vue";
    import AllTweets from '../components/AllTweets.vue';

    export default {
        name: "Feed",
        data: function() {
            return {
                loginToken: cookies.get("loginToken"),
            }
        },
        components: {
            NavigationBar,
            AllTweets
        },
    }
</script>

<style scoped>
    
</style>