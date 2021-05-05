<template>
    <div>
        <button @click="backToPreviousPage">Back</button>
        <h1>User's Tweet Page</h1>

        <div v-for="tweet in getSingleTweet" :key="tweet.tweetId">
            <!-- From the tweet page, when the user's profile image is click, take them to the user's profile page -->
            <router-link :to="{
                name: 'UsersProfileDetails',
                params: {
                    tweetId: tweet.tweetId,
                    userId: tweet.userId,
                    userimageUrl: tweet.userImageUrl, 
                    username: tweet.username
                }
            }" v-if="tweet.username !== ownerUsername">
                    <img :src="tweet.userImageUrl" :alt="`Profile image of ${tweet.userImageUrl}`" id="userProfileImage">
            </router-link>

            <router-link to="/Profile" v-else>
                <img :src="tweet.userImageUrl" :alt="`User Profile image for ${tweet.username}`" id="userProfileImage">
            </router-link>

            <!-- Printing tweet data on a single user's tweet -->
            <div>
                <h4>@{{ tweet.username }}</h4>
                <p>{{ tweet.content }}</p>
                <p>{{ tweet.createdAt }}</p>
                <p>{{ tweet.tweetImageUrl }}</p>
            </div>

            <!-- Edit button -->
            <div v-if="tweetUsername === ownerUsername">
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
            
            <!-- Delete button -->
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

            <!-- Printing all comments on a single user's tweet -->
            <!-- <comments-on-tweets :idOfTweet="usersTweetId"></comments-on-tweets> -->
            
            <!-- Creating comments and printing onto the page -->
            <!-- <create-comments :usernameOfTweet="tweetUsername" :idOfTweet="usersTweetId"></create-comments> -->

            <!-- Navigation Bar Menu -->
            <navigation-bar></navigation-bar>
        </div>
    </div>
</template>

<script>
    // import axios from "axios";
    import cookies from "vue-cookies";
    // import CreateComments from "../../components/Comments/CreateComments.vue";
    // import CommentsOnTweets from "../../components/Comments/CommentsOnTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Tweet",

        data: function() {
            return {
                ownerUsername: cookies.get("userData").username,
            }
        },

        components: {
            // CreateComments,
            // CommentsOnTweets,
            NavigationBar
        },

        methods: {
            backToPreviousPage: function() {
                this.$router.go(-1);
            },

            getAllTweetsFromStore: function() {
                this.$store.dispatch("getAllTweets");
            }
        },

        // mounted () {
        //     this.getAllTweetsFromStore();
        // },

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
            },

            getSingleTweet: function() {
                return this.$store.state.allTweets.filter((singleTweet) => singleTweet.tweetId === this.usersTweetId);
            }
        },
    }
</script>

<style scoped>
    div {
        margin-bottom: 10vh;
    }

    img {
        /* clip-path: circle(); */
        width: 50vw;
    }

    button {
        border: 1px solid black;
    }
</style>