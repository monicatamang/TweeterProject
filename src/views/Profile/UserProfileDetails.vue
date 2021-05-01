<template>
    <section>
        <router-link to="/Feed">Back</router-link>
        <article>
            <img :src="userProfileImage" :alt="`User Profile Image for` + userProfileUsername">
            <h4>@{{ userProfileUsername }}</h4>
            <p>{{ userProfileBio }}</p>
        </article>
    </section>
</template>

<script>

    export default {
        name: "User-Profile-Details",
        computed: {
            // Printing usernames sent by the AllUsers component to the User's Profile page
            userProfileImage: function() {
                return this.$route.params.imageUrl;
            },

            // Printing usernames sent by the AllUsers component to the User's Profile page
            userProfileUsername: function() {
                return this.$route.params.username;
            },

            userProfileBio: function() {
                return this.$route.params.bio;
            }
        },
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 40vw;
    }

    article {
        display: grid;
        place-items: center;
        text-align: center;
    }
</style>