<template>
    <article>
        <h3>Tweets</h3>
        <p>{{ userProfileTweetsStatus }}</p>
        <div v-for="userProfileTweet in userProfileTweets" :key="userProfileTweet.tweetId">
            <img :src="userProfileTweet.userImageUrl" alt="">
            <h4>@{{ userProfileTweet.username }}</h4>
            <p>{{ userProfileTweet.content }}</p>
            <p>{{ userProfileTweet.createdAt }}</p>
            <img :src="userProfileTweet.tweetImageUrl" alt="">
        </div>
    </article>
</template>

<script>
    import axios from "axios";

    export default {
        name: "user-profile-tweets",

        data: function() {
            return {
                userProfileTweets: [],
                userProfileTweetsStatus: ""
            }
        },

        props: {
            userProfileId: Number
        },

        methods: {
            getUserProfileTweets: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: this.userProfileId
                    }
                }).then((res) => {
                    this.userProfileTweets = res.data;
                }).catch((err) => {
                    console.log(err);
                    this.userProfileTweetsStatus = "Failed to load tweets."
                });
            }
        },

        created: function() {
            this.getUserProfileTweets();
        },
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 30vw;
    }
</style>