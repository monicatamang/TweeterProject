<template>
    <div>
        <p>{{ displayTweetLikes }}</p>
        <i :class="{ displayColour: isTweetLiked, 'fas': true, 'fa-thumbtack': true }" @click="checkTweetLikes" :id="`tweetLike${tweetIdNum}`"></i>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "tweet-likes",

        data: function() {
            return {
                isTweetLiked: false,
                countTweetLikes: [],
                displayTweetLikes: 0
            }
        },

        props: {
            tweetIdNum: Number
        },

        methods: {
            getTweetLikesFromAPI: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        tweetId: this.tweetIdNum
                    }
                }).then((res) => {
                    this.countTweetLikes = res.data;

                    // Looking through all the tweets and seeing if the account holder has liked that tweet already
                    for (let i = 0; i < this.countTweetLikes.length; i++) {
                        if(this.countTweetLikes[i].userId === cookies.get("userData").userId) {
                            this.isTweetLiked = true;
                        }
                    }

                    // Updating the number of likes of a particular tweet on the page
                    this.displayTweetLikes = res.data.length;
                }).catch((err) => {
                    err;
                });
            },
            
            checkTweetLikes: function() {
                if(!this.isTweetLiked) {
                    axios.request({
                        url: "https://tweeterest.ml/api/tweet-likes",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            tweetId: this.tweetIdNum
                        }
                    }).then((res) => {
                        res;
                        this.isTweetLiked = true;
                        this.displayTweetLikes++;
                    }).catch((err) => {
                        err;
                    });
                }

                else {
                    axios.request({
                        url: "https://tweeterest.ml/api/tweet-likes",
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            tweetId: this.tweetIdNum
                        }
                    }).then((res) => {
                        res;

                        this.isTweetLiked = false;
                        this.displayTweetLikes--;
                    }).catch((err) => {
                        err;
                    });
                }
            },
        },

        mounted: function() {
            // When the page refreshes send the API request to get all the tweet likes on a particular tweet
            this.getTweetLikesFromAPI();
        },
    }
</script>

<style scoped>
    .displayColour {
        color: #9FBFCC;
    }

    p + i {
        color: lightgrey;
    }

    p {
        font-size: 0.95rem;
    }

    div {
        display: grid;
        place-items: center;
        grid-template-columns: auto auto;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        p + i {
            font-size: 1.1rem;
        }

        p {
            font-size: 1.1rem;
        }

        div {
            width: 50%;
            margin-left: 5.4vw;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        p + i {
            font-size: 1.1rem;
        }

        p {
            font-size: 1.1rem;
        }

        div {
            width: 50%;
            margin-left: 6vw;
        }
    }
</style>