<template>
    <article>
        <h3>Tweets</h3>
        <p>{{ usersProfileTweetsStatus }}</p>
        <div v-for="usersProfileTweet in usersProfileTweets" :key="usersProfileTweet.tweetId">
            <img :src="usersProfileTweet.userImageUrl" alt="">
            <h4>@{{ usersProfileTweet.username }}</h4>
            <p>{{ usersProfileTweet.content }}</p>
            <p>{{ usersProfileTweet.createdAt }}</p>
            <img :src="usersProfileTweet.tweetImageUrl" alt="">
        </div>
    </article>
</template>

<script>
    import axios from "axios";

    export default {
        name: "users-profile-tweets",

        data: function() {
            return {
                usersProfileTweets: [],
                usersProfileTweetsStatus: ""
            }
        },

        props: {
            usersIds: Number
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

        created: function() {
            this.getUsersProfileTweets();
        },
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 30vw;
    }
</style>