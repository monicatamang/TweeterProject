<template>
    <div>
        <router-link to="/Feed">Back</router-link>
        <h1>Tweet Page</h1>
        <router-link :to="{
            name: 'UsersProfileDetails',
            params: {
                imageUrl: usersProfileImage, 
                username: tweetUsername,
                userId: usersUserId
            }
        }" v-if="tweetUsername !== ownerData.username">
                <img :src="usersProfileImage" :alt="`Profile image of ${tweetUsername}`" id="userProfileImage">
        </router-link>

        <router-link to="/Profile" v-else>
            <img :src="usersProfileImage" :alt="`User Profile image for ${tweetUsername}`" id="userProfileImage">
        </router-link>

        <h4>@{{ tweetUsername }}</h4>
        <p>{{ tweetContent }}</p>
        <p>{{ tweetCreationDate }}</p>
        <p>{{ tweetImage }}</p>

        <div v-if="tweetUsername === ownerData.username">
            <router-link :to="{ 
                name: 'EditTweet',
                params: {
                    tweetId: usersTweetId,
                    userImageUrl: usersProfileImage,
                    username: tweetUsername,
                    content: tweetContent,
                    createdAt: tweetCreationDate,
                    tweetImageUrl: tweetImage
                }
            }">
                <button>Edit</button>
            </router-link>

            <router-link :to="{
                name: 'DeleteTweet',
                params: {
                    tweetId: usersTweetId,
                    username: tweetUsername
                }
            }">
                <button>Delete</button>
            </router-link>
        </div>
        <comments-on-tweets :idOfTweet="usersTweetId"></comments-on-tweets>
        <create-comments :usernameOfTweet="tweetUsername" :idOfTweet="usersTweetId"></create-comments>
        <navigation-bar></navigation-bar>
    </div>
</template>

<script>
    import cookies from "vue-cookies";
    import CreateComments from "../../components/Comments/CreateComments.vue";
    import CommentsOnTweets from "../../components/Comments/CommentsOnTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Tweet",

        data: function() {
            return {
                ownerData: cookies.get("userData")
            }
        },

        components: {
            CreateComments,
            CommentsOnTweets,
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

            tweetUsername: function() {
                return this.$route.params.username; 
            },

            tweetContent: function() {
                return this.$route.params.content; 
            },

            tweetCreationDate: function() {
                return this.$route.params.createdAt; 
            },

            tweetImage: function() {
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