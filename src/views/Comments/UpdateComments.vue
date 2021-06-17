<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button></back-button>
            <h3>Edit Comment</h3>
            <div></div>
        </div>
        <textarea maxlength="150" v-model="updatedCommentContent"></textarea>
        <button @click="updateComment">Update</button>
        <p>{{ updateCommentStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButton from "../../components/BackButton.vue";

    export default {
        name: "Update-Comments",

        components: {
            BackButton
        },

        data: function() {
            return {
                updatedCommentContent: "",
                updateCommentStatus: ""
            }
        },

        methods: {
            updateComment: function() {

                // If the length of a user's comment is greater than 150 characters or if a user attempts to post a comment without content, print an error message to the user
                if(this.updatedCommentContent.length > 150 || this.updatedCommentContent === "") {
                    this.updateCommentStatus = "Cannot update comment.";
                } else {
                    this.updateCommentStatus = "Updating";

                    // Sending an axios reques that updates the user's comment on a tweet
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
                        res;

                        // If the network is done and no errors occur, print a success message to the user
                        this.updateCommentStatus = "Comment was successfully updated.";

                        // When the user successfully updates their comment, take the user back to the previous page
                        this.$router.go(-1);
                    }).catch((err) => {
                        err;

                        // If the network is done and page errors, print an error message to the user
                        this.updateCommentStatus = "Failed to update comment.";
                    });
                }
            }
        },

        computed: {
            userCommentId: function() {
                return this.$route.params.commentId;
            },
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 20px;
    }

    #backButtonAndTitle {
        display: grid;
        place-items: center;
        grid-template-columns: 1.2fr 3fr 1fr;
        width: 100%;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
        min-height: 10vh;
    }

    h3 {
        color: #7398A5;
    }

    textarea {
        border-radius: 5px;
        border: 1px solid rgba(211, 211, 211, 0.8);
        padding: 2%;
        width: 80vw;
        height: 10vh;
    }

    textarea:focus {
        outline: none;
    }

    button {
        border: 1px solid #9FBFCC;
        padding: 3%;
        color: #7398A5;
        border-radius: 3px;
        width: 80vw;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            row-gap: 40px;
        }

        h3 {
            font-size: 1.3rem;
        }

        textarea, button {
            width: 75vw;
        }

        textarea {
            height: 15vh;
        }

        button {
            font-size: 1.1rem;
            font-weight: 300;
            padding: 2%;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        section {
            row-gap: 40px;
        }

        #backButtonAndTitle {
            min-height: 13vh;
        }

        h3 {
            font-size: 1.3rem;
        }

        textarea, button {
            width: 70vw;
        }

        textarea {
            height: 20vh;
        }

        button {
            font-size: 1.1rem;
            font-weight: 300;
            padding: 2%;
        }
    }

    @media only screen and (min-width: 1024px) {

        section {
            row-gap: 50px;
        }

        #backButtonAndTitle {
            min-height: 15vh;
            grid-template-columns: 1fr 4fr 1fr;
        }

        textarea {
            width: 30vw;
            height: 20vh;
        }

        button {
            width: 10vw;
        }

        button {
            font-size: 0.9rem;
            font-weight: 300;
            padding: 0.5%;
        }
    }
</style>