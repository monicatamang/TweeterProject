<template>
    <section>
        <article v-if="!loginToken">
            <p>Please login</p>
            <router-link to="/Login">Login</router-link>
        </article>
        
        <article v-else>
            <page-header></page-header>
            <all-tweets></all-tweets>
            <navigation-bar></navigation-bar>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import PageHeader from "../components/PageHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            PageHeader,
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