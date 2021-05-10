<template>
    <div class="commentLikesContainer">
        <p>{{ displayCommentLikes }}</p>
        <i :class="{ displayColour: isCommentLiked, 'fas': true, 'fa-thumbtack': true }" @click="checkCommentLikes"></i>
        <div></div>
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
                    err;
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
                        res;

                        this.isCommentLiked = true;
                        this.displayCommentLikes++;

                    }).catch((err) => {
                        err;
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
                        res;

                        this.isCommentLiked = false;
                        this.displayCommentLikes--;

                    }).catch((err) => {
                        err;
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
    .commentLikesContainer {
        display: grid;
        place-items: center;
        grid-template-columns: auto 1fr 1fr;
        width: 23vw;
    }

    .displayColour {
        color: #9FBFCC;
    }

    p + i {
        color: lightgrey;
    }

    p {
        font-size: 0.95rem;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        .commentLikesContainer {
            width: 15vw;
        }

        p + i, p {
            font-size: 1.1rem;
        }

        p {
            font-weight: 300;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        .commentLikesContainer {
            width: 10vw;
            margin-left: 1vw;
        }

        p + i, p {
            font-size: 1.1rem;
        }

        p {
            font-weight: 300;
        }
    }

    @media only screen and (min-width: 1024px) {

        .commentLikesContainer {
            width: 10vw;
            margin-left: 0vw;
        }        
    }
</style>