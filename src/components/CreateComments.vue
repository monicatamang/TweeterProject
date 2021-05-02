<template>
    <div>
        <h5>Reply to @{{ usernameOfTweet }}</h5>
        
        <print-comments :usersComments="comments"></print-comments>

        <textarea id="usersComments"></textarea>
        <button @click="postComment">Post</button>
        <p>{{ postCommentStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PrintComments from "../components/PrintComments.vue";

    export default {
        name: "create-comments",

        components: {
            PrintComments,
        },

        data: function() {
            return {
                postCommentStatus: "",
                comments: []
            }
        },

        props: {
            usernameOfTweet: String,
            idOfTweet: Number
        },

        methods: {
            postComment: function() {

                this.postCommentStatus = "Posting";

                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        tweetId: this.idOfTweet,
                        content: document.getElementById("usersComments").value
                    }
                }).then((res) => {
                    this.comments.unshift(res.data);
                    this.postCommentStatus = "";

                    // If the user's comment has been posted, clear the textarea
                    document.getElementById("usersComments").value = "";
                }).catch((err) => {
                    console.log(err);
                    this.postCommentStatus = "Failed to post comment.";
                });
            },
        },
    }
</script>

<style scoped>
    textarea, button {
        border: 1px solid black;
        width: 100%;
    }
</style>