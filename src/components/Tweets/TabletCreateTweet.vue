<template>
    <div>
        <v-dialog v-model="dialog" width="500" class="hidden-md-and-down">
        <template v-slot:activator="{ on, attrs }">

            <v-btn color="#9FBFCC" v-bind="attrs" v-on="on" fab depressed small id="tweetButton">
                <i class="fas fa-sticky-note fa-lg" id="logo"></i>
            </v-btn>
            <p>Post</p>

        </template>
            <v-card height="400">
                <v-card-title style="font-size: 1.5rem">What's happening, @{{ ownerData.username }}?</v-card-title>
                <v-textarea auto-grow counter="200" v-model="tweet" rows="6" cols="40" color="#7398A5"></v-textarea>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" style="font-weight: 800" text @click="dialog = false; createUserTweet()">Post</v-btn>
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
        name: "tablet-create-tweet",

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

                // If the user's tweet is less then or equal to 200 characters or if the user's tweet isn't empty, send the user's tweet
                if (this.tweet.length > 200 || this.tweet === "") {
                    this.createTweetStatus = "";
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

    p {
        display: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        #logo {
            color: white;
            font-size: 1.2rem;
        }

        button {
            width: 30vw;
        }
    }

    @media only screen and (min-width: 1024px) {

        .v-application p {
            margin-bottom: 0px;
        }

        #tweetButton {
            margin-top: 2vh;
            margin-bottom: -2vh;
        }
    }
</style>