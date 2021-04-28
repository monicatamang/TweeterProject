<template>
    <nav>
        <router-link to="Feed">Home</router-link>
        <p>Discover</p>
        <p>Tweet</p>
        <router-link to="MyProfile">Profile</router-link>
        <p>Settings</p>
    </nav>
</template>

<script>
    export default {
        name: "navigation-bar",
    }
</script>

<style scoped>
    nav {
        display: grid;
        grid-auto-flow: column;
    }
</style>