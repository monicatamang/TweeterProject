<template>
    <section>
        <router-link to="/Feed">Back</router-link>
        <article>
            <img :src="usersProfileImage" :alt="`User Profile Image for ${usersProfileUsername}`">
            <h4>@{{ usersProfileUsername }}</h4>
            <users-profile-bios :usersIds="usersIdNumber"></users-profile-bios>
        </article>
        <follow-users :followUserId="usersIdNumber"></follow-users>
        <users-profile-tweets :usersIds="usersIdNumber"></users-profile-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import UsersProfileTweets from "../../components/UserProfiles/UsersProfileTweets.vue";
    import UsersProfileBios from "../../components/UserProfiles/UsersProfileBios.vue";
    import FollowUsers from "../../components/Follows/FollowUsers.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Profile-Details",

        components: {
            UsersProfileTweets,
            UsersProfileBios,
            FollowUsers,
            NavigationBar
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