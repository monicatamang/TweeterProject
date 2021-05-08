<template>
    <section>
        <users-tweet-header></users-tweet-header>

        <print-users-tweet :tweetId="Number(usersTweetId)"></print-users-tweet>

        <!-- <tweet-likes :tweetIdNum="Number(usersTweetId)"></tweet-likes> -->
        
        <!-- Printing all comments on a single user's tweet -->
        <comments-on-tweets :idOfTweet="Number(usersTweetId)"></comments-on-tweets>
            
        <!-- Creating comments and printing onto the page -->
        <create-comments :idOfTweet="Number(usersTweetId)" :username="tweetUsername"></create-comments>

        <!-- Navigation Bar Menu -->
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import UsersTweetHeader from "../../components/Tweets/UsersTweetHeader.vue";
    import PrintUsersTweet from "../../components/Tweets/PrintUsersTweet.vue";
    // import TweetLikes from "../../components/Tweets/TweetLikes.vue";
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
            UsersTweetHeader,
            PrintUsersTweet,
            // TweetLikes,
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
    section {
        background: rgba(245, 245, 245, 0.3);
        min-height: 100vh;
    }
</style>