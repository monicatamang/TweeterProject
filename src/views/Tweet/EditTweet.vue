<template>
    <div>
        <button @click="goBackToPreviousPage">Back</button>
        <h1>Edit Tweet Page</h1>
        <form action="javascript:void(0)">
            <label for="updatedUserTweet">Edit Tweet</label>
            <textarea :id="`editTweet${userTweetId}`" maxlength="200"></textarea>
            <button @click="updateUserTweet">Update</button>
        </form>
        <p>{{ updateTweetStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "Edit-Tweet",

        data: function() {
            return {
                updateTweetStatus: "",
                editedTweetContent: ""
            }
        },

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            },

            getAllUsersTweets: function() {
                this.$store.dispatch("getAllTweets");
            },

            updateUserTweet: function() {

                this.updateTweetStatus = "Updating";

                // If the user's tweet are more then 200 characters or if no content is entered in the textarea, print an error message to the user
                if(document.getElementById(`editTweet${this.userTweetId}`).value.length > 200 || document.getElementById(`editTweet${this.userTweetId}`).value === "") {
                    this.updateTweetStatus = "Invalid tweet.";
                } 
                
                // If the user's tweet is less than or equal to 200 characters, send a PATCH request to update the user's tweet
                else {
                    axios.request({
                        url: "https://tweeterest.ml/api/tweets",
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            tweetId: this.userTweetId,
                            content: document.getElementById(`editTweet${this.userTweetId}`).value
                        }
                    }).then((res) => {
                        console.log(res);

                        // Setting the new value of the tweet's content to the tweet content the API returned
                        this.editedTweetContent = res.data.content;

                        // Sending a request to the API to get all the current tweets onto the page
                        this.getAllUsersTweets();

                        this.updateTweetStatus = "Tweet was successfully updated.";

                        this.$router.go(-1);
                    }).catch((err) => {
                        console.log(err);
                        this.updateTweetStatus = "Failed to update tweet.";
                    })
                }
            }
        },

        mounted: function() {
            this.getAllUsersTweets();
        },

        computed: {
            userTweetId: function() {
                return Number(this.$route.params.tweetId);
            }
        },
    }
</script>

<style scoped>
    img {
        /* clip-path: circle(); */
        width: 20vw;
    }

    textarea, button, input {
        border: 1px solid black;
        width: 100%;
    }
</style>