<template>
    <nav>
        <router-link to="Feed">Home</router-link>
        <router-link to="Discover">Discover</router-link>
        <router-link to="Tweet">Tweet</router-link>
        <router-link to="EditProfile">Edit Profile</router-link>
        <router-link to="/" @click="logOutUser">Logout</router-link>
    </nav>
</template>

<script>
    import cookies from 'vue-cookies';

    export default {
        name: "navigation-bar",
        methods: {
            // Use user DELETE
            logOutUser: function() {
                cookies.remove(`loginToken`);
                cookies.remove(`userId`);
            }
        },
    }
</script>

<style scoped>
    nav {
        display: grid;
        grid-auto-flow: column;
    }
</style>