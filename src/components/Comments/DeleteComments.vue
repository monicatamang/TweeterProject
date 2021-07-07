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
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-comments",

        props: {
            userCommentId: Number
        },

        data() {
            return {
                dialog: false,
                deleteCommentStatus: ""
            }
        },

        methods: {
            // Creating a function that deletes a comment
            deleteComment() {
                // Printing a loading status
                this.deleteCommentStatus = "Deleting";
                // Configuring an axios request with the url, type and data
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
                    // If the network is done and there are no errors, find the index of the deleted comment and send it to the store
                    for(let i = 0; i < this.userComments.length; i++) {
                        if(this.userComments[i].commentId == this.userCommentId) {
                            this.$store.commit("deleteComment", i);
                        }
                    }
                    // Notifying the CommentCard component on whether the comment has been deleted, don't call API to get CommentLikes
                    this.$emit("isCommentDeleted", true);
                    res;
                }).catch((err) => {
                    // If the network is done and page errors, print an error message to the user
                    this.deleteCommentStatus = "Failed to delete comment.";
                    err;
                })
            }
        },

        computed: {
            // Getting comments from the store;
            userComments() {
                return this.$store.state.userCommentsOnTweets;
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 768px) {
        
        .v-card__text {
            font-size: 1rem;
        }
    }
</style>