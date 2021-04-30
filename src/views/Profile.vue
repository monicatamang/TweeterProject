<template>
    <section>
        <h1>Profile Page</h1>
        <button>Edit Profile</button>
        <router-link to="/EditProfile">Edit Profile</router-link>
        <single-user-profile></single-user-profile>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import NavigationBar from "../components/NavigationBar.vue";
    import SingleUserProfile from "../components/SingleUserProfile.vue";

    export default {
        name: "Profile",
        components: {
            NavigationBar,
            SingleUserProfile,
        },
    }
</script>

<style scoped>
    button {
        border: 1px solid black;
    }

    input, textarea {
        border: 1px solid black;
    }

    div {
        display: grid;
    }
</style>