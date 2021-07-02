<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card class="text-center">
            <v-card-title>Delete Post</v-card-title>
            <v-card-text>Are you sure you want to permanently remove this post?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Cancel</v-btn>
                <v-btn text @click="dialog = false; deleteUserTweet()">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    // import BackButton from "../../components/BackButton.vue";

    export default {
        name: "delete-tweet",

        props: {
            userTweetId: Number
        },

        components: {
            // BackButton
        },

        data() {
            return {
                dialog: false,
                deleteTweetStatus: ""
            }
        },

        methods: {

            goBackToPreviousPage() {
                this.$router.go(-1);
            },

            getAllTweets: function() {
                this.$store.dispatch("getAllTweets");
            },


            deleteUserTweet() {

                this.deleteTweetStatus = "Deleting";

                // Sending an axios request to delete a user's tweet in the API
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/tweets`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        tweetId: this.userTweetId
                    }
                }).then((res) => {
                    res;

                    // If the network is done and no errors occur, delete the from the store by sending the index of the deleted tweet in the array of allTweets
                    this.$store.commit("deleteTweetOnPage", this.deletedTweetIndex);
                   
                    // Sending an API request again so that it can render all the current tweets on the page
                    this.getAllTweets();

                    // Printing a success message to the user
                    this.deleteTweetStatus = "Tweet was succesfully deleted.";

                    // Taking the user back to the previous page
                    this.$router.go(-1);
                }).catch((err) => {
                    err;

                    // If the network is done and page errors, print an error message to the user
                    this.deleteTweetStatus = "Failed to delete tweet.";
                });
            }
        },

        computed: {
            deletedTweetIndex() {
                return this.$store.state.allTweets.findIndex((deletedTweet) => deletedTweet.tweetId === this.userTweetId);
            }
        },
    }
</script>

<style scoped>
    
</style>