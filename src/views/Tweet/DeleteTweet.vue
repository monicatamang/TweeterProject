<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
            <h3>Delete Post</h3>
            <div></div>
        </div>
        <p>Are you sure you want to permanently remove this post from Post-It?</p>
        <button @click="deleteUserTweet">Delete</button>
        <p>{{ deleteTweetStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButtonHeader from "../../components/BackButtonHeader.vue";

    export default {
        name: "Delete-Tweet",

        components: {
            BackButtonHeader
        },

        data: function() {
            return {
                deleteTweetStatus: ""
            }
        },

        methods: {

            goBackToPreviousPage: function() {
                this.$router.go(-1);
            },

            getAllTweets: function() {
                this.$store.dispatch("getAllTweets");
            },


            deleteUserTweet: function() {

                this.deleteTweetStatus = "Deleting";

                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        tweetId: this.userTweetId
                    }
                }).then((res) => {
                    res;

                    // Deleting the tweet store in the API and sending the index of the deleted tweet to the store so that it can be deleted from allTweets
                    this.$store.commit("deleteTweetOnPage", this.deletedTweetIndex);
                   
                    // Sending an API request again so that it can render all the current tweets on the page
                    this.getAllTweets();

                    this.deleteTweetStatus = "Tweet was succesfully deleted.";
                    this.$router.go(-1);
                }).catch((err) => {
                    err;
                    this.deleteTweetStatus = "Failed to delete tweet.";
                });
            }
        },

        computed: {
            userTweetId: function() {
                return this.$route.params.tweetId;
            },

            userId: function() {
                return this.$route.params.userId;
            },

            deletedTweetIndex: function() {
                return this.$store.state.allTweets.findIndex((deletedTweet) => deletedTweet.tweetId === this.userTweetId);
            }
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

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            row-gap: 40px;
        }

        h3 {
            font-size: 1.3rem;
        }

        p {
            font-size: 1.1rem;
            font-weight: 300;
        }

        button {
            width: 60vw;
            font-size: 1.1rem;
            font-weight: 300;
            padding: 2%;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        section {
            row-gap: 40px;
        }

        #backButtonAndTitle {
            min-height: 13vh;
        }

        h3 {
            font-size: 1.3rem;
        }

        p {
            font-size: 1.1rem;
            font-weight: 300;
        }

        button {
            width: 55vw;
            font-size: 1.1rem;
            font-weight: 300;
            padding: 1.5%;
        }
    }
</style>