<template>
    <div>
        <h5>Reply to @{{ usernameOfTweet }}</h5>

        <div v-for="comment in comments" :key="comment.commentId">

            <!-- <print-comments :userTweetId="comment.commentId"></print-comments> -->

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

        <v-textarea auto-grow counter="150" v-model="userComment"></v-textarea>
        <button @click="postComment">Post</button>
        <p>{{ postCommentStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    // import PrintComments from "../Comments/PrintComments.vue";

    export default {
        name: "create-comments",

        // components: {
        //     PrintComments,
        // },

        data: function() {
            return {
                userComment: "",
                ownerData: cookies.get("userData"),
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
                // If the user's comment is longer than 150 character or if the user attempts to the post a comment without content, print an error message to the user
                if (this.userComment.length > 150 || this.userComment === "") {
                    this.postCommentStatus = "Invalid comment.";
                } 
                
                // If the user's comment is less than or equal to 150, then post the user's comment to the tweet
                else {
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
                            content: this.userComment
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
                }
            },
        },
    }
</script>

<style scoped>
    button {
        border: 1px solid black;
        width: 100%;
    }
</style>