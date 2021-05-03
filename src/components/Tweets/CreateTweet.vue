<template>
    <div>
        <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue lighten-2" v-bind="attrs" v-on="on">Tweet</v-btn>
        </template>
            <v-card>
                <v-card-title>What is happening, @{{ ownerData.username }}?</v-card-title>
                <!-- v-model will bind to the user's tweet -->
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
                ownerData: cookies.get("userData"),
                createTweetStatus: "",
                tweet: "",
                imageAttachedToTweet: "",
                ownerTweetDetails: []
            }
        },

        methods: {
            createUserTweet: function() {

                this.createTweetStatus = "Sending Tweet";

                // If the user's tweet is less then or equal to 200 characters or if the user's tweet isn't empty, send the user's tweet
                if (this.tweet.length > 200 || this.tweet === "") {
                    this.createTweetStatus = "Invalid Tweet."
                } else {
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
                        this.ownerTweetDetails.push(res.data);
                        this.ownerTweetDetails.reverse();
                        this.createTweetStatus = "";
                    }).catch((err) => {
                        console.log(err);
                        this.createTweetStatus = "Failed to send tweet.";
                    });
                }
            },
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