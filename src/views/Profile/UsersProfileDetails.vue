<template>
    <section>
        <button @click="backToPreviousPage">Back</button>
        <h1>Users Profile Details Page</h1>

        <article>
            <img :src="usersProfileImage" :alt="`${usersProfileUsername}'s profile photo.`">
            <h4>@{{ usersProfileUsername }}</h4>
            <users-profile-bios :usersIds="userIdNum"></users-profile-bios>
        </article>

        <!-- <follow-users :followUserId="usersIdNumber"></follow-users> -->
        <users-profile-tweets :usersIds="userIdNum"></users-profile-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import UsersProfileTweets from "../../components/UserProfiles/UsersProfileTweets.vue";
    import UsersProfileBios from "../../components/UserProfiles/UsersProfileBios.vue";
    // import FollowUsers from "../../components/Follows/FollowUsers.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Profile-Details",

        components: {
            UsersProfileTweets,
            UsersProfileBios,
            // FollowUsers,
            NavigationBar
        },

        methods: {
            backToPreviousPage: function() {
                this.$router.go(-1);
            },
        },

        computed: {
            usersProfileImage: function() {
                return this.$route.params.imageUrl;
            },

            usersProfileUsername: function() {
                return this.$route.params.username;
            },

            userIdNum: function() {
                return this.$route.params.userId;
            }
        },
    }
</script>

<style scoped>
    img {
        /* clip-path: circle(); */
        width: 40vw;
    }

    button {
        border: 1px solid black;
    }

    article {
        display: grid;
        place-items: center;
        text-align: center;
    }
</style>