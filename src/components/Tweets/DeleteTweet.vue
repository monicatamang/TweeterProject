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
    <!-- <section>
        <div id="backButtonAndTitle">
            <back-button></back-button>
            <h3>Delete Post</h3>
            <div></div>
        </div>
        <p>Are you sure you want to permanently remove this post from Post-It?</p>
        <button @click="deleteUserTweet">Delete</button>
        <p>{{ deleteTweetStatus }}</p>
    </section> -->
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
            // userTweetId() {
            //     return this.$route.params.tweetId;
            // },

            // userId() {
            //     return this.$route.params.userId;
            // },

            deletedTweetIndex() {
                return this.$store.state.allTweets.findIndex((deletedTweet) => deletedTweet.tweetId === this.userTweetId);
            }
        },
    }
</script>

<style scoped>
    /* .v-btn {
        text-transform: capitalize;
    } */

    /* section {
        display: grid;
        place-items: center;
        row-gap: 20px;
    }

    #backButtonAndTitle {
        display: grid;
        place-items: center;
        grid-template-columns: 1.2fr 3fr 1fr;
        width: 100%;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
        min-height: 10vh;
    }

    h3 {
        color: #7398A5;
    }

    p {
        font-size: 0.95rem;
        text-align: center;
        padding: 0vw 5vw;
    }

    button {
        border: 1px solid #9FBFCC;
        padding: 3%;
        color: #7398A5;
        border-radius: 3px;
        width: 80vw;
    } */

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            row-gap: 40px;
        }

        h3 {
            font-size: 1.3rem;
        }

        p {
            font-size: 1.1rem;
            font-weight: 300;
        }

        button {
            width: 60vw;
            font-size: 1.1rem;
            font-weight: 300;
            padding: 2%;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        section {
            row-gap: 40px;
        }

        #backButtonAndTitle {
            min-height: 13vh;
        }

        h3 {
            font-size: 1.3rem;
        }

        p {
            font-size: 1.1rem;
            font-weight: 300;
        }

        button {
            width: 55vw;
            font-size: 1.1rem;
            font-weight: 300;
            padding: 1.5%;
        }
    }

    @media only screen and (min-width: 1024px) {

        section {
            row-gap: 50px;
        }

        #backButtonAndTitle {
            min-height: 15vh;
            grid-template-columns: 1fr 4fr 1fr;
        }

        button {
            font-size: 0.9rem;
            font-weight: 300;
            padding: 0.5%;
            width: 10vw;
        }
    }
</style>