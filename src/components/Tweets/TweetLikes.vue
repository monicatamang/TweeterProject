<template>
    <div>
        <i class="fas fa-heart fa-2x" :class="{ displayColour: isTweetLiked }" @click="isTweetLiked = !isTweetLiked, checkTweetLikes()"></i>

        <p>{{ countTweetLikesOnTweet.length }}</p>

        <!-- <print-tweet-likes :userTweetIdNum="tweetIdNum"></print-tweet-likes> -->
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    // import PrintTweetLikes from "./PrintTweetLikes.vue";

    export default {
        name: "tweet-likes",

        // components: {
        //     PrintTweetLikes
        // },

        data: function() {
            return {
                isTweetLiked: cookies.get("isTweetLiked"),
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

                    cookies.set("isTweetLiked", "true");
                    // this.isTweetLiked = true;
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
                    
                    cookies.set("isTweetLiked", "false");

                    this.getTweetLikesFromAPI();
                    // this.isTweetLiked = false;
                }).catch((err) => {
                    console.log(err);
                });
            },

            checkTweetLikes: function() {
                // If the tweet is originally unliked, the user can like the tweet and the icon will turn red
                if(this.isTweetLiked) {
                    this.favouriteTweet();
                    // this.isTweetLiked = true;
                    // this.$store.commit("updateIsTweetLiked", true);
                    // this.isTweetFavourited = true;
                } 
                
                // If the tweet is already liked and the user clicks on the icon again, it will unlike the tweet
                else {
                    this.unfavouriteTweet();
                    // this.$store.commit("updateIsTweetLiked", true);
                    // this.isTweetLiked = false;
                }
            }
        },

        // mounted: function() {
        //     for(let i = 0; i < this.countTweetLikesOnTweet.length; i++) {
        //         if(this.countTweetLikesOnTweet[i].userId === cookies.get("userData").userId && this.isTweetLiked === false) {
        //             this.isTweetLiked = true;
        //             // this.favouriteTweet();
        //         } 
                
        //         // else {
        //         //     this.isTweetLiked = false;
        //         //     this.favouriteTweet();
        //         // }
        //     }
        // },

        computed: {
            countTweetLikesOnTweet: function() {
                // return this.$store.state.tweetLikes.length; 
                return this.$store.state.tweetLikes.filter((tweet) => tweet.tweetId === this.tweetIdNum);
            }
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