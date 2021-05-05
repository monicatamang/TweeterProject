<template>
    <article>
        <h3>Tweets</h3>
        <p>{{ usersProfileTweetsStatus }}</p>
        <div v-for="usersProfileTweet in usersProfileTweets" :key="usersProfileTweet.tweetId">
            <img :src="usersProfileTweet.userImageUrl" :alt="`${usersProfileTweet.username}'s Profile Photo.`">
            <h4>@{{ usersProfileTweet.username }}</h4>
            <p>{{ usersProfileTweet.content }}</p>
            <p>{{ usersProfileTweet.createdAt }}</p>
            <img :src="usersProfileTweet.tweetImageUrl" :alt="`${usersProfileTweet.username}'s image attached to this tweet.`">
            <tweet-likes :tweetIdNum="usersProfileTweet.tweetId"></tweet-likes>
            <print-tweet-likes :userTweetIdNum="usersProfileTweet.tweetId"></print-tweet-likes>
        </div>
    </article>
</template>

<script>
    import axios from "axios";
    import TweetLikes from "../Tweets/TweetLikes.vue";
    import PrintTweetLikes from "../Tweets/PrintTweetLikes.vue";

    export default {
        name: "users-profile-tweets",

        components: {
            TweetLikes,
            PrintTweetLikes,
        },

        data: function() {
            return {
                usersProfileTweets: [],
                usersProfileTweetsStatus: ""
            }
        },

        props: {
            usersIds: Number
            // usersIds: String
        },

        methods: {
            getUsersProfileTweets: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: this.usersIds
                    }
                }).then((res) => {
                    this.usersProfileTweets = res.data;
                }).catch((err) => {
                    console.log(err);
                    this.usersProfileTweetsStatus = "Failed to load tweets."
                });
            }
        },

        mounted: function() {
            this.getUsersProfileTweets();
        },
    }
</script>

<style scoped>
    img {
        /* clip-path: circle(); */
        width: 30vw;
    }
</style>