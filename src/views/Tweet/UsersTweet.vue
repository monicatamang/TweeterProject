<template>
    <section>
        <users-tweet-header title="Reply to Post"></users-tweet-header>
        <tweet-card :tweets="tweet"></tweet-card>
        <comment-card :comments="userComments" :tweetId="Number(userTweetId)"></comment-card>
        <create-comments :idOfTweet="Number(userTweetId)"></create-comments>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import axios from "axios";
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
                tweet: []
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

            userComments() {
                return this.$store.state.userCommentsOnTweets;
            }
        },

        mounted() {
            let storeTweet = this.$store.state.allTweets.filter((singleTweet) => singleTweet.tweetId === this.$route.params.tweetId);
            if(storeTweet.length === 0) {
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/tweets`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        tweetId: this.userTweetId
                    }
                }).then((res) => {
                    res;
                    this.tweet = res.data;
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                this.tweet = storeTweet;
            }

            this.getAllCommentsFromAPI();
        },
    }
</script>

<style scoped>
    
</style>