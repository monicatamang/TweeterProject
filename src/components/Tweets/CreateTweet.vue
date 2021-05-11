<template>
    <div>
        <v-dialog v-model="dialog" width="340" class="hidden-md-and-up">
        <template v-slot:activator="{ on, attrs }">

            <v-btn color="#9FBFCC" v-bind="attrs" v-on="on" fab depressed small>
                <i class="fas fa-sticky-note fa-lg" id="logo"></i>
            </v-btn>

        </template>
            <v-card>
                <v-card-title style="font-size: 1.1rem">What's happening, @{{ ownerData.username }}?</v-card-title>
                <v-textarea auto-grow counter="200" v-model="tweet" rows="5" cols="30" color="#7398A5"></v-textarea>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" style="font-weight: 800, font-size: 2rem" text @click="dialog = false; createUserTweet()">Post</v-btn>
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
            }
        },

        methods: {
            createUserTweet: function() {

                this.createTweetStatus = "Sending Tweet";

                // If the user's tweet is greater than 200 characters or if the user attempts to post a tweet with no content, print an error message to the user
                if (this.tweet.length > 200 || this.tweet === "") {
                    this.createTweetStatus = "Invalid post.";
                } 
                
                // If the user's tweet is less than or equal to 200 characters, send an axios request that will create and print the user's tweet to the page
                else {
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
                            imageUrl: cookies.get("userData").imageUrl
                        }
                    }).then((res) => {
                        this.$store.commit("addTweetToPage", res.data);
                        this.createTweetStatus = "";
                    }).catch((err) => {
                        err;
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

    div {
        display: grid;
        place-items: center;
    }

    #logo {
        color: white;
    }
</style>