<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card class="text-center">
            <v-card-title>Delete Comment</v-card-title>
            <v-card-text>Are you sure you want to permanently remove this comment?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Cancel</v-btn>
                <v-btn text @click="dialog = false; deleteComment()">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- <section>
        <div id="backButtonAndTitle">
            <back-button></back-button>
            <h3>Delete Comment</h3>
            <div></div>
        </div>
        <p>Are you sure you want to permanently remove this comment from this post?</p>
        <button @click="deleteComment">Delete</button>
        <p>{{ deleteCommentStatus }}</p>
    </section> -->
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    // import BackButton from "../BackButton.vue";

    export default {
        name: "delete-comments",

        props: {
            userCommentId: Number
        },

        components: {
            // BackButton
        },

        data() {
            return {
                dialog: false,
                deleteCommentStatus: ""
            }
        },

        methods: {
            deleteComment() {

                this.deleteCommentStatus = "Deleting";

                // Sending an axios request that deletes a user's comment on a tweet
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/comments`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        commentId: this.userCommentId
                    }
                }).then((res) => {
                    res;

                    for(let i = 0; i < this.userComments.length; i++) {
                        if(this.userComments[i].commentId == this.userCommentId) {
                            let index = i;
                            this.$store.commit("deleteComment", index);
                        }
                    }

                    // If the network is done and no errors occur, print a success message to the user
                    this.deleteCommentStatus = "Comment was successfully deleted.";

                    // When the user has successfully deleted their comment, take the user back to the previous page
                    this.$router.go(-1);
                }).catch((err) => {
                    err;

                    // If the network is done and page errors, print an error message to the user
                    this.deleteCommentStatus = "Failed to delete comment.";
                })
            }
        },

        computed: {
            // userCommentId() {
            //     return this.$route.params.commentId;
            // },

            userComments() {
                return this.$store.state.userCommentsOnTweets;
            }
        }
    }
</script>

<style scoped>
    /* section {
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

    p {
        font-size: 0.95rem;
        text-align: center;
        padding: 0vw 5vw;
    }

    button {
        border: 1px solid #9FBFCC;
        padding: 3%;
        color: #7398A5;
        border-radius: 3px;
        width: 80vw;
    } */

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            row-gap: 40px;
        }

        h3 {
            font-size: 1.3rem;
        }

        p {
            font-size: 1.1rem;
            font-weight: 300;
        }

        button {
            width: 60vw;
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

        p {
            font-size: 1.1rem;
            font-weight: 300;
        }

        button {
            width: 55vw;
            font-size: 1.1rem;
            font-weight: 300;
            padding: 1.5%;
        }
    }

    @media only screen and (min-width: 768px) {

        section {
            row-gap: 50px;
        }

        #backButtonAndTitle {
            min-height: 15vh;
            grid-template-columns: 1fr 4fr 1fr;
        }

        button {
            font-size: 0.9rem;
            font-weight: 300;
            padding: 0.5%;
            width: 10vw;
        }
    }
</style>