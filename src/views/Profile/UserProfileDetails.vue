<template>
    <section>
        <router-link to="/Feed">Back</router-link>
        <article>
            <img :src="userProfileImage" :alt="`User Profile Image for` + userProfileUsername">
            <h4>@{{ userProfileUsername }}</h4>
            <user-profile-bios :userProfileId="userIdNumber"></user-profile-bios>
            <!-- <p>{{ userProfileBio }}</p> -->
        </article>
        <user-profile-tweets :userProfileId="userIdNumber"></user-profile-tweets>
    </section>
</template>

<script>
    import UserProfileTweets from "../../components/UserProfileTweets.vue";
    import UserProfileBios from "../../components/UserProfileBios.vue";

    export default {
        name: "User-Profile-Details",

        components: {
            UserProfileTweets,
            UserProfileBios
        },

        computed: {
            userProfileImage: function() {
                return this.$route.params.imageUrl;
            },

            userProfileUsername: function() {
                return this.$route.params.username;
            },

            userIdNumber: function() {
                return this.$route.params.userId;
            }

            // userProfileBio: function() {
            //     return this.$route.params.bio;
            // },
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