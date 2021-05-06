<template>
    <div>
        <p>{{ displayTweetLikes }}</p>
        <i :class="{ displayColour: isTweetLiked, 'fas': true, 'fa-heart': true}" @click="checkTweetLikes" :id="`tweetLike${tweetIdNum}`"></i>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "tweet-likes",

        data: function() {
            return {
                isTweetLiked: false,
                countTweetLikes: [],
                displayTweetLikes: 0
            }
        },

        props: {
            tweetIdNum: Number,
            userIdNum: Number
        },

        methods: {
            getTweetLikesFromAPI: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        tweetId: this.tweetIdNum
                    }
                }).then((res) => {
                    this.countTweetLikes = res.data;
                    // Looking through all the tweets and seeing if the account holder has liked that tweet already
                    for (let i = 0; i < this.countTweetLikes.length; i++) {
                        if(this.countTweetLikes[i].userId === cookies.get("userData").userId) {
                            this.isTweetLiked = true;
                        }
                    }

                    this.displayTweetLikes = res.data.length;
                }).catch((err) => {
                    console.log(err);
                });
            },
            
            checkTweetLikes: function() {
                if(!this.isTweetLiked) {
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

                        this.displayTweetLikes++;

                        // document.getElementById(`tweetLike${tweetId}`).style.color = "#9FBFCC";

                        this.isTweetLiked = true;

                        // this.getTweetLikesFromAPI();
                    }).catch((err) => {
                        console.log(err);
                    });
                }

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

                        // document.getElementById(`tweetLike${tweetId}`).style.color = "black";

                        // JSON.stringify(cookies.set("isTweetLiked", true));

                        this.isTweetLiked = false;

                        this.displayTweetLikes--;

                        // this.getTweetLikesFromAPI();
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
        },

        mounted: function() {
            // When the page refreshes send the API request to get all the tweet likes on a particular tweet
            this.getTweetLikesFromAPI();
        },
    }
</script>

<style scoped>
    .displayColour {
        color: #9FBFCC;
    }

    div {
        display: grid;
        place-items: center;
        grid-template-columns: auto auto;
    }

    p {
        font-weight: 700;
    }

    .v-application p {
        margin-bottom: 0px;
    }
</style>