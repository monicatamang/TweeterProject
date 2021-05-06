<template>
    <section>
        <button @click="backToPreviousPage">Back</button>
        <h1>Users Profile Page</h1>
        <users-profile-details></users-profile-details>
        <follow-users></follow-users>
        <users-profile-tweets></users-profile-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import UsersProfileTweets from "../../components/UserProfiles/UsersProfileTweets.vue";
    import UsersProfileDetails from "../../components/UserProfiles/UsersProfileDetails.vue";
    import FollowUsers from "../../components/Follows/FollowUsers.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Profile-Details",

        components: {
            UsersProfileTweets,
            UsersProfileDetails,
            FollowUsers,
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
            },

            // getOwnersTweets: function() {
            //     return this.$store.state.allTweets.filter((ownerTweet) => ownerTweet.userId === Number(this.userIdNum));
            // }
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