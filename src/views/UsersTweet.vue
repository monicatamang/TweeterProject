<template>
    <div>
        <router-link to="/Feed">Back</router-link>
        <h1>Tweet Page</h1>

        <router-link :to="{ name: 'UsersProfileDetails', params: { username: usersUsername } }" v-if="usersUsername !== ownerData.username">
            <img :src="usersProfileImage" :alt="`${usersUsername}'s Tweeter profile picture.`">
        </router-link>

         <router-link to="/Profile" v-else>
            <img :src="usersProfileImage" :alt="`User Profile image for ${usersUsername}`" id="userProfileImage">
        </router-link>

        <h4>@{{ usersUsername }}</h4>
        <p>{{ usersTweetContent }}</p>
        <p>{{ usersTweetCreationDate }}</p>
        <p>{{ usersTweetImage }}</p>
        <create-comments :usernameOfTweet="usersUsername" :idOfTweet="usersTweetId"></create-comments>
        <navigation-bar></navigation-bar>
    </div>
</template>

<script>
    import cookies from "vue-cookies";
    import CreateComments from "../components/CreateComments.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Users-Tweet",

        data: function() {
            return {
                ownerData: cookies.get("userData")
            }
        },

        components: {
            CreateComments,
            NavigationBar,
        },

        computed: {
            usersTweetId: function() {
                return this.$route.params.tweetId; 
            },

            usersUserId: function() {
                return this.$route.params.userId; 
            },

            usersProfileImage: function() {
                return this.$route.params.userImageUrl; 
            },

            usersUsername: function() {
                return this.$route.params.username; 
            },

            usersTweetContent: function() {
                return this.$route.params.content; 
            },

            usersTweetCreationDate: function() {
                return this.$route.params.createdAt; 
            },

            usersTweetImage: function() {
                return this.$route.params.tweetImageUrl;
            }
        },
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 50vw;
    }
</style>