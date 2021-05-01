<template>
    <div>
        <router-link to="/Profile">Back</router-link>
        <h1>Edit Tweet Page</h1>
        <h2>Original Tweet</h2>
        <p>Posted on {{ userTweetCreationDate }}</p>
        <img :src="userProfileImage" alt="">
        <h4>@{{ userUsername }}</h4>
        <p>{{ userTweetContent }}</p>
        <h2>Edit Tweet</h2>
        <textarea id="updatedUserTweet"></textarea>
        <button @click="updateUserTweet">Update</button>
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

        methods: {
            updateUserTweet: function() {
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
                }).catch((err) => {
                    console.log(err);
                    this.updateTweetStatus = "Failed to update tweet."
                })
            }
        },
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 20vw;
    }

    textarea, button {
        border: 1px solid black;
        width: 100%;
    }
</style>