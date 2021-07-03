<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Edit</v-btn>
        </template>
        <v-card class="text-center">
            <v-card-title>Edit Post</v-card-title>
            <textarea :id="`editTweet${userTweetId}`" maxlength="200" placeholder="Write your post" class="ml-sm-n3"></textarea>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Cancel</v-btn>
                <v-btn text @click="dialog = false; updateUserTweet()">Post</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "edit-tweet",

        props: {
            userTweetId: Number
        },

        data() {
            return {
                dialog: false,
                updateTweetStatus: "",
                ownerData: cookies.get("userData")
            }
        },

        methods: {
            goBackToPreviousPage() {
                this.$router.go(-1);
            },

            getAllUsersTweets() {
                this.$store.dispatch("getAllTweets");
            },

            updateUserTweet() {

                this.updateTweetStatus = "Updating";

                // If the user's tweet is greater than 200 characters or if no content is entered in the textarea, print an error message to the user
                if(document.getElementById(`editTweet${this.userTweetId}`).value.length > 200 || document.getElementById(`editTweet${this.userTweetId}`).value === "") {
                    this.updateTweetStatus = "Invalid tweet.";
                } 
                
                // If the user's tweet is less than or equal to 200 characters, send an axios request that updates the user's tweet content
                else {
                    axios.request({
                        url: `${process.env.VUE_APP_API_URL}/tweets`,
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            tweetId: this.userTweetId,
                            content: document.getElementById(`editTweet${this.userTweetId}`).value
                        }
                    }).then((res) => {
                        res;

                        // Getting all the tweets from the store to print all the current tweets onto the page
                        this.getAllUsersTweets();

                        // Printing a success message to the user
                        this.updateTweetStatus = "Tweet was successfully updated.";

                        // Taking the user back to the previous page
                        this.$router.go(-1);
                    }).catch((err) => {
                        err;

                        // If the network is done and page errors, print an error message to the user
                        this.updateTweetStatus = "Failed to update tweet.";
                    })
                }
            },
        },
    }
</script>

<style scoped>
    textarea {
        height: 15vh;
        width: 85%;
    }

    textarea:focus {
        outline: none;
    }

    @media only screen and (min-width: 768px) {
        
        textarea {
            width: 90%;
            height: 20vh;
        }
    }
</style>