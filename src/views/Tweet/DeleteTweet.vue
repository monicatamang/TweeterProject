<template>
    <div>
        <router-link to="/Profile">Back</router-link>
        <h1>Delete Tweet Page</h1>
        <h2>Original Tweet</h2>
        <p>Posted on {{ userTweetCreationDate }}</p>
        <img :src="userProfileImage" alt="">
        <h4>@{{ userUsername }}</h4>
        <p>{{ userTweetContent }}</p>
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
                    this.deleteTweetStatus = "Tweet was succesfully deleted.";
                    this.$router.push('/Profile');
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
            }
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