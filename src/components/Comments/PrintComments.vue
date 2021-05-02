<template>
    <!-- If the comments belong to this tweet with the specific tweet id, then print the comments for that tweet -->
    <div v-if="idOfTweet">
        <p>{{ printCommentsToTweetsStatus }}</p>
        <div v-for="comment in allComments" :key="comment.commentId">
            <h4>@{{ comment.username }}</h4>
            <p>{{ comment.content }}</p>
            <p>{{ comment.createdAt }}</p>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "print-comments",

        data: function() {
            return {
                printCommentsToTweetsStatus: "",
                allComments: []
            }
        },

        props: {
            idOfTweet: Number
        },

        methods: {
            getAllCommentsFromAPI: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        tweetId: this.idOfTweet
                    }
                }).then((res) => {
                    this.allComments = res.data;
                    console.log("Got all comments on tweets");
                }).catch((err) => {
                    console.log(err);
                    this.printCommentsToTweetsStatus = "Failed to load comments to tweets.";
                });
            }
        },

        mounted: function() {
            this.getAllCommentsFromAPI();
        },
    }
</script>

<style scoped>

</style>