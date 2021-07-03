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

        data() {
            return {
                isTweetLiked: false,
                countTweetLikes: [],
                displayTweetLikes: 0
            }
        },

        // Receiving the tweet id from the PrintUsersTweet and UsersProfileTweets component
        props: {
            tweetIdNum: Number
        },

        methods: {
            getTweetLikesFromAPI() {
                // Sending an axios request that gets all the likes on a single tweet
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/tweet-likes`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        tweetId: this.tweetIdNum
                    }
                }).then((res) => {
                    this.countTweetLikes = res.data;

                    // Checking to see if the account holder has already liked a tweet
                    for (let i = 0; i < this.countTweetLikes.length; i++) {
                        if(this.countTweetLikes[i].userId === cookies.get("userData").userId) {
                            this.isTweetLiked = true;
                        }
                    }

                    // Updating the current number of likes on a certain tweet
                    this.displayTweetLikes = res.data.length;
                }).catch((err) => {
                    err;
                });
            },
            
            checkTweetLikes() {
                // If the tweet is not liked by the account holder, on click, send an axios request that "creates" a like on a tweet
                if(!this.isTweetLiked) {
                    axios.request({
                        url: `${process.env.VUE_APP_API_URL}/tweet-likes`,
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            loginToken: cookies.get("userData").loginToken,
                            tweetId: this.tweetIdNum
                        }
                    }).then((res) => {
                        res;
                        // If the network is done and no errors occur, increase the number of likes on a tweet by one
                        this.isTweetLiked = true;
                        this.displayTweetLikes++;
                    }).catch((err) => {
                        err;
                    });
                }

                else {

                    // If the tweet is already liked by the account holder, on click, send an axios request that "deletes" a like on a tweet
                    axios.request({
                        url: `${process.env.VUE_APP_API_URL}/tweet-likes`,
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            loginToken: cookies.get("userData").loginToken,
                            tweetId: this.tweetIdNum
                        }
                    }).then((res) => {
                        res;

                        // If the network is done and no errors occur, decrease the number of likes on a tweet by one
                        this.isTweetLiked = false;
                        this.displayTweetLikes--;
                    }).catch((err) => {
                        err;
                    });
                }
            },
        },

        mounted() {
            // If the tweet exists, get all the tweet likes on a single tweet
            if(this.tweetIdNum) {
                // When the page refreshes, send an axios request to get the total number of likes on a certain tweet
                this.getTweetLikesFromAPI();
            }
        },
    }
</script>

<style scoped>
    .displayColour {
        color: var(--primaryColor);
    }

    p + i {
        color: lightgrey;
    }

    p {
        font-size: 0.9rem;
    }

    div {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        p + i, p {
            font-size: 1.1rem;
        }

        p {
            font-weight: 300;
        }

        div {
            width: 40%;
            margin-left: 5.4vw;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        p + i, p {
            font-size: 1.1rem;
        }

        p {
            font-weight: 300;
        }

        div {
            width: 50%;
            margin-left: 6vw;
        }
    }
</style>