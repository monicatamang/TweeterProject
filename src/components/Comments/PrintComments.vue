<template>
    <!-- If the comments belong to this tweet with the specific tweet id, then print the comments for that tweet -->
    <div v-if="idOfTweet">
        <p>{{ printCommentsToTweetsStatus }}</p>
        <div v-for="comment in allComments" :key="comment.commentId" id="userComments">
            <h4>@{{ comment.username }}</h4>
            <p>{{ comment.content }}</p>
            <p>{{ comment.createdAt }}</p>

            <router-link :to="{
                name: 'UpdateComments',
                params: {
                    commentId: comment.commentId,
                    tweetId: comment.tweetId,
                    username: comment.username,
                    content: comment.content,
                    createdAt: comment.createdAt
                }
            }" v-if="comment.username === ownerData.username">
                <button>Update</button>
            </router-link>

            <router-link :to="{
                name: 'DeleteComments',
                params: {
                    commentId: comment.commentId,
                    username: comment.username,
                    content: comment.content,
                    createdAt: comment.createdAt
                }
            }" v-if="comment.username === ownerData.username">
                <button>Delete</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "print-comments",

        data: function() {
            return {
                ownerData: cookies.get("userData"),
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
                }).catch((err) => {
                    console.log(err);
                    this.printCommentsToTweetsStatus = "Failed to load comments to tweets.";
                });
            }
        },

        created: function() {
            this.getAllCommentsFromAPI();
        }
    }
</script>

<style scoped>
    #userComments {
        border: 1px solid black;
    }
</style>