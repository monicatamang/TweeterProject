<template>
    <section>
        <article>
            <h1>Profile Page</h1>
            <img :src="userProfileData.imageUrl" alt="">
            <h1>@{{ userProfileData.username }}</h1>
            <p>{{ userProfileData.bio }}</p>
            <router-link to="/EditProfile">Edit Profile</router-link>
            <user-tweets></user-tweets>
            <navigation-bar></navigation-bar>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import UserTweets from "../../components/UserTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Profile",

        components: {
            UserTweets,
            NavigationBar,
        },

        data: function() {
            return {
                userProfileData: cookies.get("userData")
            }
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