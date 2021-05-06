<template>
    <div>
        <i class="fas fa-heart fa-2x" @click="isTweetLiked = !isTweetLiked, checkTweetLikes()"></i>
        <!-- <i class="fas fa-heart fa-2x" :class="{ displayColour: isTweetLiked }" @click="isTweetLiked = !isTweetLiked, checkTweetLikes()"></i> -->
        <p>{{ countTweetLikes.length }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "tweet-likes",

        data: function() {
            return {
                // isTweetLiked: JSON.parse(cookies.get("isTweetLiked"))
                isTweetLiked: false
            }
        },

        props: {
            tweetIdNum: Number,
            userIdNum: Number
        },

        methods: {
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

                    JSON.stringify(cookies.set("isTweetLiked", true));

                    // this.getTweetLikesFromAPI();
                }).catch((err) => {
                    console.log(err);
                });
            },

            checkTweetLikes: function() {
                if(this.isTweetLiked) {
                    this.isTweetLiked = false;
                    this.favouriteTweet();
                }
            },
        },

        // methods: {
        //     getTweetLikesFromAPI: function() {
        //         this.$store.dispatch("getNumberOfTweetLikes");
        //     },


        //     checkTweetLikes: function() {
        //         if(this.isTweetLiked === true && this.tweetIdNum) {
        //             cookies.set("isTweetLiked", true);
        //             console.log("true");
        //         } 

        //         else if(this.isTweetLiked === false) {
        //             cookies.set("isTweetLiked", false);
        //             console.log("false");
        //         }
        //     }
        // },

        // computed: {
        //     countTweetLikes: function() {
        //         return this.$store.state.tweetLikes; 
        //     }
        // },

        // mounted: function() {
        //     if(this.isTweetLiked === true && this.tweetIdNum) {
        //             this.isTweetLiked = true;
        //             console.log(this.isTweetLiked);
        //         } else {
        //             this.isTweetLiked = false;
        //             console.log(this.isTweetLiked);
        //         }
        // },

        //     getTweetLikesFromAPI: function() {
        //         this.$store.dispatch("getNumberOfTweetLikes");
        //     },

        //     checkTweetLikes: function() {
        //         if(this.isTweetLiked) {
        //             
        //         }

        //         else {
        //             axios.request({
        //                 url: "https://tweeterest.ml/api/tweet-likes",
        //                 method: "DELETE",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
        //                 },
        //                 data: {
        //                     loginToken: cookies.get("loginToken"),
        //                     tweetId: this.tweetIdNum
        //                 }
        //             }).then((res) => {
        //                 console.log(res);
        //                 console.log("Unlike");
                        
        //                 JSON.stringify(cookies.set("isTweetLiked", false));

        //                 this.getTweetLikesFromAPI();
        //             }).catch((err) => {
        //                 console.log(err);
        //             });
        //         }
        //     },
        // },

        computed: {
            countTweetLikes: function() {
                return this.$store.state.tweetLikes; 
            }
        },

        // mounted: function() {
        //     if(this.tweetIdNum === 1411) {
        //         cookies.set("isTweetLiked", true);
        //     }
        // },

        // computed: {
        //     // countTweetLikesOnTweet: function() {
        //     //     return this.$store.state.tweetLikes.filter((tweet) => tweet.tweetId === this.tweetIdNum);
        //     // },

        //     countTweetLikesOnTweet: function() {
        //         return this.$store.state.tweetLikes;
        //     },
        // },
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