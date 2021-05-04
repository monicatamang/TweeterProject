<template>
    <div>
        <div v-for="usersTweet in usersTweetsFromAPI" :key="usersTweet.tweetId">
            <h4>@{{ usersTweet.username }}</h4>
            <p>{{ usersTweet.content }}</p>
            <p>{{ usersTweet.createdAt }}</p>
            <p>{{ usersTweet.tweetImageUrl }}</p>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "print-users-tweet",

        data: function() {
            return {
                usersTweetsFromAPI: []
            }
        },

        // props: {
        //     // tweetId: Number
        //     tweetId: String
        // },

        methods: {
            getUsersDataFromAPI: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "GET",
                    headers: {
                    "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: this.tweetId
                    }
                }).then((res) => {
                    this.usersTweetsFromAPI = res.data;
                }).catch((err) => {
                    console.log(err);
                });
            }
        },

        mounted: function() {
            this.getUsersDataFromAPI();
        },

    }
</script>

<style scoped>

</style>