<template>
    <div>
        <!-- <p>{{ printTweetLikesStatus }}</p> -->
        <!-- <p>{{ usersThatLikedTweet.length }}</p> -->
    </div>
</template>

<script>
    // import axios from "axios";

    export default {
        name: "print-tweet-likes",

        // data: function() {
        //     return {
        //         printTweetLikesStatus: "",
        //         usersThatLikedTweet: []
        //     }
        // },

        // props: {
        //     userTweetIdNum: Number,
        // },

        // methods: {
        //     printNumberOfTweetLikes: function() {
        //         axios.request({
        //             url: "https://tweeterest.ml/api/tweet-likes",
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
        //             },
        //             params: {
        //                 tweetId: this.userTweetIdNum
        //             }
        //         }).then((res) => {
        //             this.usersThatLikedTweet = res.data;
        //             // console.log(this.usersThatLikedTweet.length);
        //         }).catch((err) => {
        //             console.log(err);
        //             this.printTweetLikesStatus = "Sorry, something went wrong.";
        //         });
        //     },
        // },

        // mounted: function() {
        //     this.printNumberOfTweetLikes();
        // },
    }
</script>

<style scoped>

</style>