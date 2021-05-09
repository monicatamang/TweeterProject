<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
            <h3>Delete Comment</h3>
            <div></div>
        </div>
        <p>Are you sure you want to permanently remove this comment from this post?</p>
        <button @click="deleteComment">Delete</button>
        <p>{{ deleteCommentStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButtonHeader from "../../components/BackButtonHeader.vue";

    export default {
        name: "Delete-Comments",

        components: {
            BackButtonHeader
        },

        data: function() {
            return {
                deleteCommentStatus: ""
            }
        },

        methods: {
            deleteComment: function() {

                this.deleteCommentStatus = "Deleting";

                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        commentId: this.userCommentId
                    }
                }).then((res) => {
                    res;
                    this.deleteCommentStatus = "Comment was successfully deleted.";
                    this.$router.go(-1);
                }).catch((err) => {
                    err;
                    this.deleteCommentStatus = "Failed to delete comment.";
                })
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
    }
</style>