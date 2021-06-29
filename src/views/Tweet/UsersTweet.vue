<template>
    <section>
        <users-tweet-header></users-tweet-header>
        <tweet-card :tweets="tweet"></tweet-card>
        <comment-card :comments="userComments" :tweetId="Number(userTweetId)"></comment-card>
        <create-comments :idOfTweet="Number(userTweetId)" :username="tweetUsername"></create-comments>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import UsersTweetHeader from "../../components/Tweets/UsersTweetHeader.vue";
    import TweetCard from "../../components/Tweets/TweetCard.vue";
    import CreateComments from "../../components/Comments/CreateComments.vue";
    import CommentCard from "../../components/Comments/CommentCard.vue";
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
            TweetCard,
            CreateComments,
            CommentCard,
            NavigationBar
        },

        methods: {
            backToPreviousPage() {
                this.$router.go(-1);
            },

            getAllTweetsFromAPI() {
                this.$store.dispatch("getAllTweets");
            },

            getAllCommentsFromAPI() {
                this.$store.dispatch("getUserComments", this.userTweetId);
            }
        },

        computed: {
            userTweetId() {
                return this.$route.params.tweetId; 
            },

            tweetUsername() {
                return this.$route.params.username;
            },

            tweet() {
                return this.$store.state.allTweets.filter((singleTweet) => singleTweet.tweetId === this.userTweetId);
            },

            userComments() {
                return this.$store.state.userCommentsOnTweets;
            }
        },

        mounted: function() {
            this.getAllCommentsFromAPI();
        },
    }
</script>

<style scoped>
    
</style>