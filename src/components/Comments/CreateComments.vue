<template>
    <article>
        <p>{{ postCommentStatus }}</p>
        <div id="textareaAndButton">
            <textarea id="commentContent" maxlength="150" placeholder="Post your reply"></textarea>
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
                postCommentStatus: "",
            }
        },

        // Receiving the tweet id from the UsersTweet view
        props: {
            idOfTweet: Number
        },

        methods: {
            updateCommentToPage: function() {
                this.$store.dispatch("getUserComments", this.idOfTweet);
            },

            postComment: function() {
                document.getElementById("sendIcon").style.color = "#9FBFCC";

                // If a user's comment is longer than 150 characters, print an error message to the user
                if (document.getElementById("commentContent").value.length > 150) {
                    this.postCommentStatus = "You have exceeded the maximum character limit.";
                } 

                // If the user attempts to post a comment without content, print an error message to the user
                else if (document.getElementById("commentContent").value === "") {
                    this.postCommentStatus = "Invalid comment.";
                }
                
                // If the user's comment is less than or equal to 150 characters, print their comment to the page
                else {

                    this.postCommentStatus = "Posting";

                    // Sending an axios request to allow user's to create comments and reply to tweets
                    axios.request({
                        url: `${process.env.VUE_APP_API_URL}/comments`,
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            tweetId: this.idOfTweet,
                            content: document.getElementById("commentContent").value
                        }
                    }).then((res) => {
                        // Sending the returned data to the store so that the CommentsOnTweets component can print all comments on the page that belong to a tweet
                        this.$store.commit("addCommentToTweet", res.data);
                        this.postCommentStatus = "";
                        document.getElementById("sendIcon").style.color = "lightgrey";
                    }).catch((err) => {
                        err;
                        this.postCommentStatus = "Failed to post comment.";
                    });

                    document.getElementById("commentContent").value = "";
                }
            },
        }
    }
</script>

<style scoped>
    article {
        position: fixed;
        bottom: 7%;
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
        color: lightgrey;
        width: 100%;
    }

    p {
        font-size: 0.9rem;
        padding: 0% 2%;
    }

    textarea {
        width: 100%;
        height: 5vh;
        background: rgba(211, 211, 211, 0.3);
        border-radius: 15px;
        padding: 3% 8%;
        font-size: 0.9rem;
        align-items: center;
    }

    textarea:focus {
        outline: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        /* article {
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
        } */
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        /* article {
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
        } */
    }

    @media only screen and (min-width: 1024px) {

        /* article {
            width: 74vw;
            margin-left: 25vw;
            bottom: 0vh;
            padding: 1% 4% 2% 4%;
        }

        textarea {
            height: 8vh;
            padding: 2% 4%;
        } */
    }
</style>