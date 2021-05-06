<template>
    <div>
        <i class="fas fa-heart fa-2x" :class="{ displayColour: isTweetLiked }" @click="isTweetLiked = !isTweetLiked, checkTweetLikes()"></i>
        <p>{{ countTweetLikesOnTweet.length }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "tweet-likes",

        data: function() {
            return {
                isTweetLiked: JSON.parse(cookies.get("isTweetLiked")),
                userId: cookies.get("userData").userId
            }
        },

        props: {
            tweetIdNum: Number,
            userIdNum: Number
        },

        methods: {
            getTweetLikesFromAPI: function() {
                this.$store.dispatch("getNumberOfTweetLikes");
            },

            checkTweetLikes: function() {
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

                        JSON.stringify(cookies.set("isTweetLiked", true));

                        this.getTweetLikesFromAPI();
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
                        
                        JSON.stringify(cookies.set("isTweetLiked", false));

                        this.getTweetLikesFromAPI();
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
        },

        mounted: function() {
            if(this.tweetIdNum === 1411) {
                this.isTweetLiked = JSON.parse(cookies.get("isTweetLiked"));
            }
        },

        computed: {
            countTweetLikesOnTweet: function() {
                return this.$store.state.tweetLikes.filter((tweet) => tweet.tweetId === this.tweetIdNum);
            },
        },
    }
</script>

<style scoped>
    .displayColour {
        color: indianred;
    }

    /* #tweetHeart {
        color: indianred;
    } */
</style>