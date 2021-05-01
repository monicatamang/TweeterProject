<template>
    <section>
        <article v-if="!loginToken">
            <p>Please login</p>
            <router-link to="/Login">Login</router-link>
        </article>
        <h1>Feed Page</h1>
        <all-users></all-users>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import AllUsers from "../components/AllUsers.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            AllUsers,
            NavigationBar,
        },

        data: function() {
            return {
                loginToken: cookies.get("loginToken"),
            }
        },
    }
</script>

<style scoped>
    
</style>