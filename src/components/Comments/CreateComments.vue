<template>
    <article>
        <p>{{ postCommentStatus }}</p>
        <div id="textareaAndButton">
            <textarea v-model="userComment" maxlength="150" :placeholder="`Replying to @${username}`"></textarea>
            <button @click="postComment"><i class="fas fa-location-arrow fa-lg" id="sendIcon"></i></button>
            <!-- <button @click="postComment">Reply</button> -->
        </div>
    </article>
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
                document.getElementById("sendIcon").style.color = "#9FBFCC";
                // If the user's comment is longer than 150 character or if the user attempts to the post a comment without content, print an error message to the user
                if (this.userComment.length > 150) {
                    this.postCommentStatus = "You have exceeded the maximum character limit.";
                } 

                else if (this.userComment === "") {
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
                        document.getElementById("sendIcon").style.color = "#636D6E";
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
    article {
        position: fixed;
        bottom: 10vh;
        width: 100%;

        display: grid;
        /* row-gap: 10px; */
        background: white;
        padding: 2% 5% 5% 5%;
        border-top: 1px solid rgba(211, 211, 211, 0.4);
    }

    #textareaAndButton {
        display: grid;
        place-items: center;
        grid-template-columns: 6fr 1fr;
        column-gap: 10px;
        /* column-gap: 100px; */
        /* width: 100%; */
    }

    #sendIcon {
        transform: rotate(43deg);
        /* color: #9FBFCC; */
        color: #636D6E;
        width: 100%;
    }

    p {
        font-size: 0.9rem;
        padding: 0% 2%;
    }

    /* #commentContainer {
        display: grid;
        row-gap: 10px;
        background: white;
        padding: 5%;
        border-top: 1px solid rgba(211, 211, 211, 0.4);
    } */

    /* button {
        color: white;
        font-weight: 700;
        border-radius: 30px;
        margin-top: 3vh;
        padding: 5% 0%;
        background: #9FBFCC;
    } */


    textarea {
        width: 100%;
        height: 4vh;
        background: rgba(211, 211, 211, 0.3);
        border-radius: 30px;
        padding: 2% 8%;
        font-size: 0.9rem;
    }

    textarea:focus {
        outline: none;
    }
    /* .v-textarea {
        width: 90vw;
        height: 30vh;
    } */

    /* #input-819 > label {
        font-size: 0.9rem;
    } */
</style>