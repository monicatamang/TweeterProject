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
            <textarea id="updatedUserTweet" maxlength="200"></textarea>
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
                updateTweetStatus: ""
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
                        content: document.getElementById("updatedUserTweet").value
                    }
                }).then((res) => {
                    console.log(res);

                    // Updating the user's tweet content by sending the store the index of the original tweet along with the edited tweet content
                    this.$store.commit("editTweetOnPage", this.editTweetIndex, document.getElementById("updatedUserTweet").value);

                    // Sending a request to the API to get all the current tweets onto the page
                    this.getAllUsersTweets();

                    this.updateTweetStatus = "Tweet was successfully updated.";

                    // Taking the user back to the previous page they were on before going to the edit tweet page.
                    this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                    this.updateTweetStatus = "Failed to update tweet.";
                })
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

            editTweetIndex: function() {
                return this.$store.state.allTweets.findIndex((editTweet) => editTweet.tweetId === this.userTweetId);
            }

        },
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 20vw;
    }

    textarea, button, input {
        border: 1px solid black;
        width: 100%;
    }
</style>