<template>
    <nav>
        <router-link to="Feed">Home</router-link>
        <router-link to="Discover">Discover</router-link>
        <router-link to="Tweet">Tweet</router-link>
        <router-link to="Profile">Profile</router-link>
        <router-link to="Account">Account</router-link>
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
        column-gap: 20px;
    }
</style>