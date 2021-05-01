<template>
    <div>
        <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue lighten-2" v-bind="attrs" v-on="on">Tweet</v-btn>
        </template>
            <v-card>
                <v-card-title>What is happening, @{{ userData.username }}?</v-card-title>
                <!-- V-model will bind to the user's tweet -->
                <v-textarea auto-grow counter="200" v-model="tweet"></v-textarea>
                <v-card-title>Attach Image</v-card-title>
                <input type="URL" v-model="imageAttachedToTweet">
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false, createUserTweet()">Send Tweet</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <p>{{ createTweetStatus }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "create-tweet",

        data: function() {
            return {
                dialog: false,
                userData: cookies.get("userData"),
                createTweetStatus: "",
                tweet: "",
                imageAttachedToTweet: "",
                userTweet: {}
            }
        },

        methods: {
            createUserTweet: function() {
                // IF STATEMENT - if the user's tweet is =< 200 characters and !== null, send the user's tweet
                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        content: this.tweet,
                        imageUrl: this.imageAttachedToTweet
                    }
                }).then((res) => {
                    this.userTweet = res.data;

                    // Sending user's tweet to the store so that it can be printed to the Feed page
                    this.sendTweetToStore();

                    // this.sendTweetButtonClicked()

                    // After the user has tweeted, clear the tweet from the tweet form
                    // this.tweet = "";
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                    this.createTweetStatus = "Failed to send Tweet.";
                });
            },

            // sendTweetButtonClicked: function() {
            //     this.$emit("userCreatedTweet", this.userTweet);
            // }

            sendTweetToStore: function() {
                this.$store.commit("sendUserTweet", this.userTweet);
            }
        },
    }
</script>

<style scoped>
    textarea {
        border: 1px solid black;
        width: 100%;
        height: 30vh;
    }

    input {
        border: 1px solid black;
        width: 100%;
    }
</style>