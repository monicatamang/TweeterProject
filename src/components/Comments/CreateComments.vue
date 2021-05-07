<template>
    <div>
        <h5>Reply to @{{ username }}</h5>

        <v-textarea auto-grow counter="150" v-model="userComment"></v-textarea>

        <!-- When clicked, a GET request will be sent to the API -->
        <button @click="postComment">Post</button>
        <p>{{ postCommentStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "create-comments",

        data: function() {
            return {
                userComment: "",
                postCommentStatus: "",
            }
        },

        props: {
            idOfTweet: Number,
            username: String
        },

        methods: {
            updateCommentToPage: function() {
                this.$store.dispatch("getUserComments", this.idOfTweet);
            },

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
                        this.$store.commit("addCommentToTweet", res.data);
                        this.postCommentStatus = "";
                        this.userComment = "";
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