<template>
    <section>
        <h1>Feed Page</h1>
        <router-link to="/">
            <button @click="logOutUser">Logout</button>
        </router-link>
        <all-tweets></all-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import NavigationBar from "../components/NavigationBar.vue";
    import AllTweets from '../components/AllTweets.vue';
    import cookies from 'vue-cookies';

    export default {
        name: "Feed",
        data: function() {
            return {
                loginToken: ""
            }
        },
        components: {
            NavigationBar,
            AllTweets
        },
        methods: {
            logOutUser: function() {
                cookies.remove(`loginToken`);
            }
        },
    }
</script>

<style scoped>
    
</style>