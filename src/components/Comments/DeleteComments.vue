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
                            this.$store.commit("deleteComment", i);
                        }
                    }

                    // If the network is done and no errors occur, print a success message to the user
                    this.deleteCommentStatus = "Comment was successfully deleted.";

                    this.$emit("isCommentDeleted", true);
                }).catch((err) => {
                    err;

                    // If the network is done and page errors, print an error message to the user
                    this.deleteCommentStatus = "Failed to delete comment.";
                })
            }
        },

        computed: {
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