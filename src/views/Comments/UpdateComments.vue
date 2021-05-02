<template>
    <div>
        <router-link to="/Feed">Back</router-link>
        <h1>Update Comments Page</h1>
        <h2>Original Comment</h2>
        <h4>@{{ commentUsername }}</h4>
        <p>{{ commentContent }}</p>
        <p>{{ commentCreatedAt }}</p>
        <h2>Update Comment</h2>
        <h4>@{{ commentUsername }}</h4>
        <v-textarea auto-grow counter="150" v-model="updatedCommentContent"></v-textarea>
        <button @click="updateComment">Update</button>
        <p>{{ updateCommentStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "Update-Comments",

        data: function() {
            return {
                updatedCommentContent: "",
                updateCommentStatus: ""
            }
        },

        methods: {
            updateComment: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        commentId: this.userCommentId,
                        content: this.updatedCommentContent
                    }
                }).then((res) => {
                    console.log(res);
                    this.updateCommentStatus = "Comment was successfully updated."
                    this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                    this.updateCommentStatus = "Failed to update comment."
                });
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
    button {
        border: 1px solid black;
    }
</style>