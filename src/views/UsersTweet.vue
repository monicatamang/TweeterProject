<template>
    <section>
        <page-header-with-button title="Reply to Post"></page-header-with-button>
        <desktop-nav-bar></desktop-nav-bar>
        <tweet-card :tweets="tweet"></tweet-card>
        <comment-card :comments="userComments" :tweetId="Number(userTweetId)"></comment-card>
        <create-comments :idOfTweet="Number(userTweetId)"></create-comments>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import axios from "axios";
    import PageHeaderWithButton from "../components/PageHeaderWithButton.vue";
    import TweetCard from "../components/Tweets/TweetCard.vue";
    import CreateComments from "../components/Comments/CreateComments.vue";
    import CommentCard from "../components/Comments/CommentCard.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    import DesktopNavBar from "../components/DesktopNavBar.vue";

    export default {
        name: "Users-Tweet",

        data: function() {
            return {
                ownerData: cookies.get("userData"),
                tweet: []
            }
        },

        components: {
            PageHeaderWithButton,
            TweetCard,
            CreateComments,
            CommentCard,
            NavigationBar,
            DesktopNavBar
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
            // Checking to see if the tweet exists in the store
            let storeTweet = this.$store.state.allTweets.filter((singleTweet) => singleTweet.tweetId === this.$route.params.tweetId);
            // If the tweet does not exist, send an axios request to the specific tweet
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
            // If the tweet does exists, get the tweet from the store
            } else {
                this.tweet = storeTweet;
            }

            // If the comment exists in the store, get all comments
            // if(this.userComments !== 0) {
            //     this.getAllCommentsFromAPI();
            // }
        },
    }
</script>

<style scoped>
    @media only screen and (min-width: 768px) {

        section {
            margin-bottom: 20vh;
        }
    }
</style>