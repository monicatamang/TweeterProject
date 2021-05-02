<template>
    <article>
        <h1>Tweets</h1>
        <div v-for="userTweet in userTweetCards" :key="userTweet.tweetId">
            <img :src="userTweet.userImageUrl" :alt="`User Profile image for` + userTweet.username" id="userProfileImage">
            <h4>{{ userTweet.username }}</h4>
            <p>{{ userTweet.content }}</p>
            <p>{{ userTweet.createdAt }}</p>
            
            <img :src="userTweet.tweetImageUrl" :alt="`${userTweet.username}'s image attached to this tweet.`">
            
            <router-link :to="{ 
                name: 'EditTweet',
                params: {
                    tweetId: userTweet.tweetId,
                    userImageUrl: userTweet.userImageUrl,
                    username: userTweet.username,
                    content: userTweet.content,
                    createdAt: userTweet.createdAt,
                    tweetImageUrl: userTweet.tweetImageUrl
                }
            }">
                <button>Edit</button>
            </router-link>

            <router-link :to="{
                name: 'DeleteTweet',
                params: {
                    tweetId: userTweet.tweetId,
                    userImageUrl: userTweet.userImageUrl,
                    username: userTweet.username,
                    content: userTweet.content,
                    createdAt: userTweet.createdAt,
                    tweetImageUrl: userTweet.tweetImageUrl
                }
            }">
                <button>Delete</button>
            </router-link>
        </div>
    </article>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "owner-tweets",

        data: function() {
            return {
                userId: cookies.get("userId"),
                userTweetsStatus: "",
                userTweetCards: [],
            }
        },

        methods: {
            getUserTweetsFromAPI: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: cookies.get("userId")
                    }
                }).then((res) => {
                    this.userTweetCards = res.data;
                }).catch((err) => {
                    console.log(err);
                    this.userTweetsStatus = "Could not load tweets.";
                });
            },
        },
        
        created: function() {
            this.getUserTweetsFromAPI();
        },
       
    }
</script>

<style scoped>
    div {
        display: grid;
    }

    div, button {
        border: 1px solid black;
        width: 100%;
    }

    img {
        width: 30vw;
    }

    #userProfileImage {
        clip-path: circle();
    }
</style>