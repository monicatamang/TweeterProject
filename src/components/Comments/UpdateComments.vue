<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Edit</v-btn>
        </template>
        <v-card class="text-center">
            <v-card-title>Edit Comment</v-card-title>
            <textarea :id="`updatedComment${userCommentId}`" maxlength="150" placeholder="Write your comment"></textarea>
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
    // import BackButton from "../../components/BackButton.vue";

    export default {
        name: "update-comments",

        props: {
            userCommentId: Number
        },

        components: {
            // BackButton
        },

        data() {
            return {
                dialog: false,
                // updatedCommentContent: "",
                updateCommentStatus: ""
            }
        },

        methods: {
            updateComment() {
                // If the length of a user's comment is greater than 150 characters or if a user attempts to post a comment without content, print an error message to the user
                if(document.getElementById(`updatedComment${this.userCommentId}`).value.length > 150 || document.getElementById(`updatedComment${this.userCommentId}`).value === "") {
                    this.updateCommentStatus = "Cannot update comment.";
                } else {
                    this.updateCommentStatus = "Updating";

                    // Sending an axios reques that updates the user's comment on a tweet
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
        }
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
</style>