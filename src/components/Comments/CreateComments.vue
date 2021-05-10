<template>
    <article>
        <p>{{ postCommentStatus }}</p>
        <div id="textareaAndButton">
            <textarea v-model="userComment" maxlength="150" :placeholder="`Replying to @${username}`"></textarea>
            <button @click="postComment"><i class="fas fa-location-arrow fa-lg" id="sendIcon"></i></button>
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
                        err;
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
        background: white;
        padding: 2% 5% 5% 5%;
        border-top: 1px solid rgba(211, 211, 211, 0.4);
    }

    #textareaAndButton {
        display: grid;
        place-items: center;
        grid-template-columns: 6fr 1fr;
        column-gap: 10px;
    }

    #sendIcon {
        transform: rotate(43deg);
        color: #636D6E;
        width: 100%;
    }

    p {
        font-size: 0.9rem;
        padding: 0% 2%;
    }

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

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        article {
            bottom: 0vh;
            width: 85vw;
            margin-left: 15vw;
        }

        textarea {
            height: 5vh;
            padding: 3% 5%;
        }

        #sendIcon {
            font-size: 1.8rem;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        article {
            bottom: 0vh;
            width: 90vw;
            margin-left: 10vw;
        }

        textarea {
            height: 8vh;
            padding: 3% 5%;
        }

        #sendIcon {
            font-size: 1.8rem;
        }
    }
</style>