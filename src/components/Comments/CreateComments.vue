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

        data() {
            return {
                postCommentStatus: ""
            }
        },

        // Receiving the tweet id from the UsersTweet view
        props: {
            idOfTweet: Number
        },

        methods: {
            postComment() {
                // Changing the color of the icon
                document.getElementById("sendIcon").style.color = "#60A3D9";

                // If a user's comment is longer than 150 characters, print an error message to the user
                if (document.getElementById("commentContent").value.length > 150) {
                    this.postCommentStatus = "You have exceeded the maximum character limit.";
                } 

                // If the user attempts to post a comment without content, print an error message to the user
                else if (document.getElementById("commentContent").value === "") {
                    this.postCommentStatus = "Invalid comment.";

                    console.log(document.getElementById("commentContent").value)
                }
                
                // If the user's comment is less than or equal to 150 characters, print their comment to the page
                else {
                    this.postCommentStatus = "Posting";

                    console.log(document.getElementById("commentContent").value)

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
                }
            },
        },
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

    @media only screen and (min-width: 768px) {

        textarea {
            height: 6vh;
            padding: 3% 5%;
            font-size: 1.1rem;
            margin-left: 5vw;
        }

        #sendIcon {
            font-size: 1.8rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        article {
            background: transparent;
            place-items: center;
            padding: 0%;
            border-top: none;
            width: 45%;
        }

        #textareaAndButton {
            grid-template-columns: 3fr 1fr;
            width: 100%;
        }

        textarea {
            background: white;
            box-shadow: 1px 5px 5px lightgrey;
            border-radius: 10px;
            height: 100%;
            width: 100%;
            padding: 3% 5%;
            font-size: 0.9rem;
            margin-right: 5vw;
        }

        p {
            justify-self: start;
        }
    }
</style>