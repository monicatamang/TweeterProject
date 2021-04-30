<template>
    <section>
        <article>
            <h1>Profile Page</h1>
            <img :src="userProfileData.imageUrl" alt="">
            <h1>@{{ userProfileData.username }}</h1>
            <p>{{ userProfileData.bio }}</p>
            <router-link to="/EditProfile">Edit Profile</router-link>
            <navigation-bar></navigation-bar>
        </article>
    </section>
</template>

<script>
    import NavigationBar from "../../components/NavigationBar.vue";
    import cookies from "vue-cookies";

    export default {
        name: "Profile",
        data: function() {
            return {
                userProfileData: cookies.get(`userData`)
            }
        },
        components: {
            NavigationBar,
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
    }

    .hideProfile {
        display: none;
    }

    button {
        border: 1px solid black;
    }

    input, textarea {
        border: 1px solid black;
    }

    div {
        display: grid;
    }

    img {
        clip-path: circle();
        width: 40vw;
    }
</style>