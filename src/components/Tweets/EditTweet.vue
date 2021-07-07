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
                ownerData: cookies.get("userData"),
                editedTweet: {}
            }
        },

        methods: {
            // Send an axios request from the store to get all tweets
            getAllUsersTweets() {
                this.$store.dispatch("getAllTweets");
            },

            // Creating a function to update a tweet
            updateUserTweet() {
                // Printing a loading message
                this.updateTweetStatus = "Updating";
                // If the user's tweet is greater than 200 characters or if no content is entered in the textarea, print an error message to the user
                if(document.getElementById(`editTweet${this.userTweetId}`).value.length > 200 || document.getElementById(`editTweet${this.userTweetId}`).value === "") {
                    this.updateTweetStatus = "Invalid tweet.";
                } 
                
                // If the user's tweet is valid, send an axios reques to update a user's tweet
                else {
                    // Configuring the axios request with the url, type and data
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
                        // If the network is done and there are no errors, find the index of the updated tweet in the array and store it in an object
                        for(let i = 0; i < this.tweets.length; i++) {
                            if(this.tweets[i].tweetId === this.userTweetId) {
                                this.editedTweet.index = i;
                            }
                        }
                        // Store the updated tweet content into an object
                        this.editedTweet.content = res.data.content;
                        this.$store.commit("updateTweet", this.editedTweet);

                        // Creating a global emit so that the UsersTweet page can show the updated tweet in real time
                        this.$root.$emit("tweetIsUpdated", this.editedTweet);
                        res;
                    }).catch((err) => {
                        err;
                    });
                }
            },
        },

        computed: {
            // Getting all tweets from the store
            tweets() {
                return this.$store.state.allTweets; 
            }
        },
    }
</script>

<style scoped>
    textarea {
        height: 30vh;
        width: 85%;
    }

    textarea:focus {
        outline: none;
    }

    @media only screen and (min-width: 768px) {
        
        textarea {
            width: 90%;
        }
    }

    @media only screen and (min-width: 768px) {
        
        textarea {
            height: 40vh;
        }
    }
</style>