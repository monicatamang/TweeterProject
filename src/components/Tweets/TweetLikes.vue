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
                isTweetLiked: false,
            }
        },

        props: {
            tweetIdNum: Number
        },

        methods: {
            getTweetLikesFromAPI: function() {
                this.$store.dispatch("getNumberOfTweetLikes");
            },

            favouriteTweet: function() {
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

                    this.isTweetLiked = true;

                    this.getTweetLikesFromAPI();
                }).catch((err) => {
                    console.log(err);
                });
            },

            unfavouriteTweet: function() {
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
                    
                    this.isTweetLiked = false;

                    this.getTweetLikesFromAPI();
                }).catch((err) => {
                    console.log(err);
                });
            },

            checkTweetLikes: function() {
                if(this.isTweetLiked) {
                    this.favouriteTweet();
                } else {
                    this.unfavouriteTweet();
                }
            },
        },

        mounted: function() {
            if(this.countTweetLikesOnTweet.length === 1) {
                this.isTweetLiked = true;
                document.getElementsByClassName("displayColour")[0].style.color = "indianred";
                this.getTweetLikesFromAPI();
                this.unfavouriteTweet();
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