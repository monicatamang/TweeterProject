<template>
    <div class="commentLikesContainer">
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

        // Receiving the comment id number from the CommentsOnTweets component
        props: {
            commentIdNum: Number
        },

        methods: {
            getCommentLikesFromAPI: function() {

                // Sending an axios request to get the number of likes on a user's comment
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/comment-likes`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    params: {
                        commentId: this.commentIdNum
                    }
                }).then((res) => {
                    // If the network is done and no errors occur, assign the variable to the value of the returned array of comment likes
                    this.countCommentLikes = res.data;

                    // Looking through all the comments and checking to see if the account holder has liked that comment already
                    for (let i = 0; i < this.countCommentLikes.length; i++) {
                        if(this.countCommentLikes[i].userId === cookies.get("userData").userId) {
                            this.isCommentLiked = true;
                        }
                    }

                    // Updating the number of likes on a user's comment
                    this.displayCommentLikes = res.data.length;
                }).catch((err) => {
                    err;
                });
            },

            checkCommentLikes: function() {

                // On click, If the comment has not been liked yet, send an axios request that creates a "like" on a user's comment
                if(!this.isCommentLiked) {
                    axios.request({
                    url: `${process.env.VUE_APP_API_URL}/comment-likes`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        commentId: this.commentIdNum
                    }
                    }).then((res) => {
                        res;

                        // If the network is done and there are no errors, increase the number of likes on a comment by one and change the colour of icon to blue
                        this.displayCommentLikes++;
                        this.isCommentLiked = true;

                    }).catch((err) => {
                        err;
                    });
                }

                else {

                    // On click, if the comment is already liked, send an axios request to unlike a user's comment
                    axios.request({
                        url: `${process.env.VUE_APP_API_URL}/comment-likes`,
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            commentId: this.commentIdNum
                        }
                    }).then((res) => {
                        res;

                        // If the network is done and there are no errors, decrease the number of likes on a comment and change the colour of the icon to grey
                        this.isCommentLiked = false;
                        this.displayCommentLikes--;

                    }).catch((err) => {
                        err;
                    });
                }
            }
        },

        mounted() {
            // When the page refreshes, send an axios request to get all the likes on a user's comment
            this.getCommentLikesFromAPI();
        },
    }
</script>

<style scoped>
    .commentLikesContainer {
        display: grid;
        place-items: center;
        grid-template-columns: auto 1fr;
    }

    .displayColour {
        color: var(--primaryColor);
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
            width: 70%;
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