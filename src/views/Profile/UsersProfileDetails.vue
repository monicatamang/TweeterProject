<template>
    <section>
        <router-link to="/Feed">Back</router-link>
        <article>
            <img :src="usersProfileImage" :alt="`User Profile Image for` + usersProfileUsername">
            <h4>@{{ usersProfileUsername }}</h4>
            <users-profile-bios :usersIds="usersIdNumber"></users-profile-bios>
            <!-- <p>{{ userProfileBio }}</p> -->
        </article>
        <users-profile-tweets :usersIds="usersIdNumber"></users-profile-tweets>
    </section>
</template>

<script>
    import UsersProfileTweets from "../../components/UsersProfileTweets.vue";
    import UsersProfileBios from "../../components/UsersProfileBios.vue";

    export default {
        name: "Users-Profile-Details",

        components: {
            UsersProfileTweets,
            UsersProfileBios
        },

        computed: {
            usersProfileImage: function() {
                return this.$route.params.imageUrl;
            },

            usersProfileUsername: function() {
                return this.$route.params.username;
            },

            usersIdNumber: function() {
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