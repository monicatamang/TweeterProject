<template>
    <div>
        <button @click="backToPreviousPage">Back</button>
        <h1>User's Tweet Page</h1>

        <print-users-tweet :tweetId="Number(usersTweetId)"></print-users-tweet>

        <tweet-likes :tweetIdNum="Number(usersTweetId)"></tweet-likes>
        
        <!-- Printing all comments on a single user's tweet -->
        <comments-on-tweets :idOfTweet="Number(usersTweetId)"></comments-on-tweets>
            
        <!-- Creating comments and printing onto the page -->
        <create-comments :idOfTweet="Number(usersTweetId)" :username="tweetUsername"></create-comments>

        <!-- Navigation Bar Menu -->
        <navigation-bar></navigation-bar>
    </div>
</template>

<script>
    // import axios from "axios";
    import cookies from "vue-cookies";
    import PrintUsersTweet from "../../components/Tweets/PrintUsersTweet.vue";
    import TweetLikes from "../../components/Tweets/TweetLikes.vue";
    import CreateComments from "../../components/Comments/CreateComments.vue";
    import CommentsOnTweets from "../../components/Comments/CommentsOnTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Tweet",

        data: function() {
            return {
                ownerData: cookies.get("userData"),
            }
        },

        components: {
            PrintUsersTweet,
            TweetLikes,
            CreateComments,
            CommentsOnTweets,
            NavigationBar
        },

        methods: {
            backToPreviousPage: function() {
                this.$router.go(-1);
            },

            getAllTweetsFromAPI: function() {
                this.$store.dispatch("getAllTweets");
            },
        },

        computed: {
            usersTweetId: function() {
                return this.$route.params.tweetId; 
            },

            tweetUsername: function() {
                return this.$route.params.username;
            }
        },

        mounted: function() {
            this.getAllTweetsFromAPI();
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