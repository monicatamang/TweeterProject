<template>
    <div>
        <i class="fas fa-heart fa-2x" :class="{ displayColour: isCommentLiked }" @click="isCommentLiked = !isCommentLiked, favouriteComment()"></i>
        <p>{{ numberOfLikesOnComment }}</p>
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
                numberOfLikesOnComment: undefined
            }
        },

        props: {
            commentIdNum: Number
        },

        methods: {
            favouriteComment: function() {
                // If the comment is originally unliked, the user can like the comment and the icon will turn red
                if(this.isCommentLiked) {
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
                        this.countCommentLikes();
                        // this.isTweetLiked = false;
                    }).catch((err) => {
                        console.log(err);
                    });
                } 
                
                // If the comment is already liked and the user clicks on the icon again, it will unlike the comment
                else {
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
                        this.countCommentLikes();
                        // this.isTweetLiked = true;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },

            countCommentLikes: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/comment-likes",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        commentId: this.commentIdNum
                    }
                }).then((res) => {
                    this.numberOfLikesOnComment = res.data.length;
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
    }
</script>

<style scoped>
    .displayColour {
        color: indianred;
    }
</style>