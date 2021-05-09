<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
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
    import BackButtonHeader from "../../components/BackButtonHeader.vue";

    export default {
        name: "Update-Comments",

        components: {
            BackButtonHeader
        },

        data: function() {
            return {
                updatedCommentContent: "",
                updateCommentStatus: ""
            }
        },

        methods: {
            updateComment: function() {
                if(this.updatedCommentContent.length > 150 || this.updatedCommentContent === "") {
                    this.updateCommentStatus = "Cannot update comment.";
                } else {
                    this.updateCommentStatus = "Updating";

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
                        this.updateCommentStatus = "Comment was successfully updated."
                        this.$router.go(-1);
                    }).catch((err) => {
                        err;
                        this.updateCommentStatus = "Failed to update comment."
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
</style>