<template>
    <div>
        <p>{{ displayCommentLikes }}</p>
        <i :class="{ displayColour: isCommentLiked, 'fas': true, 'fa-thumbtack': true }" @click="checkCommentLikes"></i>
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
                countCommentLikes: [],
                displayCommentLikes: 0
            }
        },

        props: {
            commentIdNum: Number
        },

        methods: {
            getCommentLikesFromAPI: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/comment-likes",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        commentId: this.commentIdNum
                    }
                }).then((res) => {
                    this.countCommentLikes = res.data;

                    // Looking through all the comments and seeing if the account holder has liked that comment already
                    for (let i = 0; i < this.countCommentLikes.length; i++) {
                        if(this.countCommentLikes[i].userId === cookies.get("userData").userId) {
                            this.isCommentLiked = true;
                        }
                    }

                    // Updating the number of likes of a particular comment on the page
                    this.displayCommentLikes = res.data.length;
                }).catch((err) => {
                    console.log(err);
                });
            },

            checkCommentLikes: function() {
                if(!this.isCommentLiked) {
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

                        this.isCommentLiked = true;
                        this.displayCommentLikes++;

                    }).catch((err) => {
                        console.log(err);
                    });
                }

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

                        this.isCommentLiked = false;
                        this.displayCommentLikes--;

                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        },

        mounted: function() {
            // When the page refreshes send the API request to get all the comment likes on a particular comment
            this.getCommentLikesFromAPI();
        },
    }
</script>

<style scoped>
    .displayColour {
        color: indianred;
    }
</style>