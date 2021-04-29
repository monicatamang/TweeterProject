<template>
    <section>
        <h1>Profile Page</h1>
        <router-link to="/">
            <button @click="logOutUser">Logout</button>
        </router-link>
        <one-user-profile></one-user-profile>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import NavigationBar from "../components/NavigationBar.vue";
    import OneUserProfile from "../components/OneUserProfile.vue";
    import cookies from "vue-cookies"

    export default {
        name: "Profile",
        components: {
            NavigationBar,
            OneUserProfile
        },
        methods: {
            logOutUser: function() {
                cookies.remove(`loginToken`);
            },
        },
    }
</script>

<style scoped>
    input, textarea {
        border: 1px solid black;
    }

    div {
        display: grid;
    }
</style>