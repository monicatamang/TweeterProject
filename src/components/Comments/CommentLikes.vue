<template>
    <div>
        <i class="fas fa-heart fa-2x" :class="{ displayColour: isCommentLiked }" @click="isCommentLiked = !isCommentLiked, checkCommentLikes()"></i>
        <p>{{ countCommentLikes.length }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "comment-likes",

        data: function() {
            return {
                isCommentLiked: false,
            }
        },

        props: {
            commentIdNum: Number
        },

        methods: {
            getCommentLikesFromAPI: function() {
                this.$store.dispatch("getNumberOfCommentLikes");
            },

            favouriteComment: function() {
                axios.request({
                url: "https://tweeterest.ml/api/comment-likes",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                },
                data: {
                    loginToken: cookies.get("loginToken"),
                    commentId: this.commentIdNum
                }
                }).then((res) => {
                    console.log(res);
                    console.log("Like");

                    this.getCommentLikesFromAPI();
                }).catch((err) => {
                    console.log(err);
                });
            },

            unfavouriteComment: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/comment-likes",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        commentId: this.commentIdNum
                    }
                }).then((res) => {
                    console.log(res);
                    console.log("Unlike");


                    this.getCommentLikesFromAPI();
                }).catch((err) => {
                    console.log(err);
                });
            },

            checkCommentLikes: function() {
                if(this.isCommentLiked) {
                    this.favouriteComment();
                } else {
                    this.unfavouriteComment();
                }
            }
        },

        mounted: function() {
            if(this.countCommentLikes === [] && this.isCommentLiked === false) {
                this.isCommentLiked = false;
                // this.favouriteComment();
                // this.getCommentLikesFromAPI();
            } 
            
            if (this.countCommentLikes !== [] && this.isCommentLiked === false) {
                this.isCommentLiked = true;
                // this.unfavouriteComment();
                // this.getCommentLikesFromAPI();
            }

            if (this.countCommentLikes === [] && this.isCommentLiked === true) {
                this.isCommentLiked = false;
            }
        },

        computed: {
            countCommentLikes: function() {
                return this.$store.state.commentLikes.filter((comment) => comment.commentId === this.commentIdNum);
            },
        },
    }
</script>

<style scoped>
    .displayColour {
        color: indianred;
    }
</style>