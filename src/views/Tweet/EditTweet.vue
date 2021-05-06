<template>
    <div>
        <button @click="goBackToPreviousPage">Back</button>
        <h1>Edit Tweet Page</h1>
        <h2>Original Tweet</h2>
        <p>Posted on {{ userTweetCreationDate }}</p>
        <img :src="userProfileImage" alt="">
        <h4>@{{ userUsername }}</h4>
        <p>{{ userTweetContent }}</p>
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
                editTweetInfo: {
                    index: this.$store.state.allTweets.findIndex((editTweet) => editTweet.tweetId === this.$route.params.tweetId),
                    content: ""
                }
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

                        this.editTweetInfo.content = document.getElementById(`editTweet${this.userTweetId}`).value;

                        // Updating the user's tweet content by sending the store the index of the original tweet along with the edited tweet content
                        this.$store.commit("editTweetOnPage", this.editTweetInfo);

                        // Sending a request to the API to get all the current tweets onto the page
                        // this.getAllUsersTweets();

                        this.updateTweetStatus = "Tweet was successfully updated.";


                        this.$router.go(-1);
                    }).catch((err) => {
                        console.log(err);
                        console.log(this.editTweetInfo.index);
                        this.updateTweetStatus = "Failed to update tweet.";
                    })
                }
            }
        },

        mounted: function() {
            if(this.editTweetInfo.index === -1 && this.editTweetInfo.content === "") {
                this.editTweetInfo.index = this.$store.state.allTweets.findIndex((editTweet) => editTweet.tweetId === this.$route.params.tweetId);
                this.editTweetInfo.content = document.getElementById(`editTweet${this.userTweetId}`).value;
                this.getAllUsersTweets();
            }
        },

        computed: {
            userTweetId: function() {
                return this.$route.params.tweetId;
            },

            userProfileImage: function() {
                return this.$route.params.userImageUrl;
            },

            userUsername: function() {
                return this.$route.params.username;
            },

            userTweetContent: function() {
                return this.$route.params.content;
            },

            userTweetCreationDate: function() {
                return this.$route.params.createdAt;
            },

            userTweetImage: function() {
                return this.$route.params.tweetImageUrl;
            },

            // editTweetIndex: function() {
            //     return this.$store.state.allTweets.findIndex((editTweet) => editTweet.tweetId === this.$route.params.tweetId);
            // }

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