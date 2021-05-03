<template>
    <div>
        <i class="fas fa-heart fa-2x" :class="{ displayColour: isTweetLiked }" @click="isTweetLiked = !isTweetLiked, favouriteTweet()"></i>
        <p>{{ favouriteTweetStatus }}</p>
        <p>{{ unfavouriteTweetStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "tweet-likes",

        data: function() {
            return {
                favouriteTweetStatus: "",
                unfavouriteTweetStatus: "",
                isTweetLiked: false
            }
        },

        props: {
            tweetIdNum: Number
        },

        methods: {
            favouriteTweet: function() {
                // If the tweet is originally unliked, the user can like the tweet and the icon will turn red
                if(this.isTweetLiked) {
                    axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        tweetId: this.tweetIdNum
                    }
                    }).then((res) => {
                        console.log(res);
                        console.log("Like");
                        console.log(this.isTweetLiked);
                        // ADD ANIMATION
                    }).catch((err) => {
                        console.log(err);
                        this.favouriteTweetStatus = "Failed to liked tweet.";
                    });
                } 
                
                // If the tweet is already liked and the user clicks on the icon again, it will unlike the tweet
                else {
                    axios.request({
                        url: "https://tweeterest.ml/api/tweet-likes",
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            tweetId: this.tweetIdNum
                        }
                    }).then((res) => {
                        console.log(res);
                        console.log("Unlike");
                        // ADD ANIMATION
                    }).catch((err) => {
                        console.log(err);
                        this.unfavouriteTweetStatus = "Failed to unlike tweet.";
                    });
                }
            }
        },
    }
</script>

<style scoped>
    .displayColour {
        color: indianred;
    }
</style>