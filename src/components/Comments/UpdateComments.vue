<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Edit</v-btn>
        </template>
        <v-card class="text-center">
            <v-card-title>Edit Comment</v-card-title>
            <textarea :id="`updatedComment${userCommentId}`" maxlength="150" placeholder="Write your comment" class="ml-sm-n2"></textarea>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Cancel</v-btn>
                <v-btn text @click="dialog = false; updateComment()">Post</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "update-comments",

        props: {
            userCommentId: Number
        },

        data() {
            return {
                dialog: false,
                updateCommentStatus: "",
                editedComment: {}
            }
        },

        methods: {
            // Creating a function that will update a user's comment
            updateComment() {
                // If the length of a user's comment is greater than 150 characters or if a user attempts to post a comment without content, print an error message to the user
                if(document.getElementById(`updatedComment${this.userCommentId}`).value.length > 150 || document.getElementById(`updatedComment${this.userCommentId}`).value === "") {
                    this.updateCommentStatus = "Cannot update comment.";
                } 
                // If the user's comment is valid, send an axios request to update the user's comment
                else {
                    // Printing a loading message
                    this.updateCommentStatus = "Updating";

                    // Configuring an axios request with the url, type and data
                    axios.request({
                        url: `${process.env.VUE_APP_API_URL}/comments`,
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            commentId: this.userCommentId,
                            content: document.getElementById(`updatedComment${this.userCommentId}`).value
                        }
                    }).then((res) => {
                        // If the network is done and there are no errors, send an axios request from the store to get all the comments
                        this.$store.dispatch("getUserComments", res.data.tweetId);
                        // Finding the index of the updated comment and storing into an object
                        for(let i = 0; i < this.userComments.length; i++) {
                            if(this.userComments[i].commentId === res.data.commentId) {
                                this.editedComment.index = i;
                            }
                        }
                        // Storing the new comment content into an object
                        this.editedComment.content = res.data.content;
                        // Sending the updated user's comment to the store
                        this.$store.commit("updateComment", this.editedComment);
                        res;
                    }).catch((err) => {
                        // If the network is done and page errors, print an error message to the user
                        this.updateCommentStatus = "Failed to update comment.";
                        err;
                    });
                }
            }
        },

        computed: {
            // Getting comments on a single tweet from the store
            userComments() {
                return this.$store.state.userCommentsOnTweets;
            }
        },
    }
</script>

<style scoped>
    textarea {
        height: 15vh;
        width: 85%;
    }

    textarea:focus {
        outline: none;
    }

    @media only screen and (min-width: 768px) {
    
        textarea {
            width: 90%;
            height: 20vh;
        }
    }
</style>