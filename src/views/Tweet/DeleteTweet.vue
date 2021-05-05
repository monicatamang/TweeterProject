<template>
    <div>
        <button @click="goBackToPreviousPage">Back</button>
        <h1>Delete Tweet Page</h1>
        <!-- <h2>Original Tweet</h2>
        <p>Posted on {{ userTweetCreationDate }}</p>
        <img :src="userProfileImage" :alt="`${userUsername}'s profile image.`">
        <h4>@{{ userUsername }}</h4>
        <p>{{ userTweetContent }}</p> -->
        <button @click="deleteUserTweet">Delete</button>
        <p>{{ deleteTweetStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "Delete-Tweet",

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
                    console.log(res);

                    // Deleting the tweet store in the API and sending the index of the deleted tweet to the store so that it can be deleted from allTweets
                    this.$store.commit("deleteTweetOnPage", this.deletedTweetIndex);
                   
                    // Sending an API request again so that it can render all the current tweets on the page
                    this.getAllTweets();

                    this.deleteTweetStatus = "Tweet was succesfully deleted.";
                    this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
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

            // userProfileImage: function() {
            //     return this.$route.params.userImageUrl;
            // },

            // userUsername: function() {
            //     return this.$route.params.username;
            // },

            // userTweetContent: function() {
            //     return this.$route.params.content;
            // },

            // userTweetCreationDate: function() {
            //     return this.$route.params.createdAt;
            // },
        },
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 20vw;
    }

    button {
        border: 1px solid black;
        width: 100%;
    }
</style>