<template>
    <section>
        <article>
            <users-profile-header></users-profile-header>
            <users-profile-details></users-profile-details>
            <follow-users :followUserId="Number(userIdNum)"></follow-users>
        </article>
        <users-profile-tweets></users-profile-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import UsersProfileHeader from "../../components/UserProfiles/UsersProfileHeader.vue";
    import UsersProfileTweets from "../../components/Tweets/UsersProfileTweets.vue";
    import UsersProfileDetails from "../../components/UserProfiles/UsersProfileDetails.vue";
    import FollowUsers from "../../components/Follows/FollowUsers.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Profiles",

        components: {
            UsersProfileHeader,
            UsersProfileTweets,
            UsersProfileDetails,
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

            userIdNum: function() {
                return this.$route.params.userId;
            },
        },
    }
</script>

<style scoped>
    article {
        padding-bottom: 5vh;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
    }
</style>