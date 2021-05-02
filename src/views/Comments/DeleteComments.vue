<template>
    <div>
        <router-link to="/Feed">Back</router-link>
        <h1>Update Comments Page</h1>
        <h2>Original Comment</h2>
        <h4>@{{ commentUsername }}</h4>
        <p>{{ commentContent }}</p>
        <p>{{ commentCreatedAt }}</p>
        <h2>Delete Comment</h2>
        <button @click="deleteComment">Delete</button>
        <p>{{ deleteCommentStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "Delete-Comments",

        data: function() {
            return {
                deleteCommentStatus: ""
            }
        },

        methods: {
            deleteComment: function() {

                this.deleteCommentStatus = "Deleting";

                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        commentId: this.userCommentId
                    }
                }).then((res) => {
                    console.log(res);
                    this.deleteCommentStatus = "Comment was successfully deleted.";
                }).catch((err) => {
                    console.log(err);
                    this.deleteCommentStatus = "Failed to delete comment.";
                })
            }
        },

        computed: {
            userCommentId: function() {
                return this.$route.params.commentId;
            },

            userTweetId: function() {
                return this.$route.params.tweetId;
            },

            commentUsername: function() {
                return this.$route.params.username;
            },

            commentContent: function() {
                return this.$route.params.content;
            },

            commentCreatedAt: function() {
                return this.$route.params.createdAt;
            }
        },
    }
</script>

<style scoped>

</style>