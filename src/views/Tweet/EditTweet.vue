<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button></back-button>
            <h3>Edit Post</h3>
            <div></div>
        </div>
        <textarea :id="`editTweet${userTweetId}`" maxlength="200"></textarea>
        <button @click="updateUserTweet">Update</button>
        <p>{{ updateTweetStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButton from "../../components/BackButton.vue";

    export default {
        name: "Edit-Tweet",

        components: {
            BackButton
        },

        data: function() {
            return {
                updateTweetStatus: "",
                ownerData: cookies.get("userData")
            }
        },

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            },

            getAllUsersTweets: function() {
                this.$store.dispatch("getAllTweets");
            },

            updateUserTweet: function() {

                this.updateTweetStatus = "Updating";

                // If the user's tweet is greater than 200 characters or if no content is entered in the textarea, print an error message to the user
                if(document.getElementById(`editTweet${this.userTweetId}`).value.length > 200 || document.getElementById(`editTweet${this.userTweetId}`).value === "") {
                    this.updateTweetStatus = "Invalid tweet.";
                } 
                
                // If the user's tweet is less than or equal to 200 characters, send an axios request that updates the user's tweet content
                else {
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
            }
        },

        mounted: function() {
            // When the page refreshes, get all the tweets from the store so that all current tweets are printed onto the page and having no varaibles being undefined
            this.getAllUsersTweets();
        },

        computed: {
            userTweetId: function() {
                return Number(this.$route.params.tweetId);
            },
        },
    }
</script>

<style scoped>
    section {
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

    label {
        font-size: 0.95rem;
    }

    textarea {
        border-radius: 5px;
        border: 1px solid rgba(211, 211, 211, 0.8);
        padding: 2%;
        width: 80vw;
        height: 15vh;
    }

    textarea:focus {
        outline: none;
    }

    button {
        border: 1px solid #9FBFCC;
        padding: 3%;
        color: #7398A5;
        border-radius: 3px;
        width: 80vw;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            row-gap: 40px;
        }

        h3 {
            font-size: 1.3rem;
        }

        textarea, button {
            width: 75vw;
        }

        textarea {
            height: 20vh;
        }

        button {
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

        textarea, button {
            width: 70vw;
        }

        textarea {
            height: 25vh;
        }

        button {
            font-size: 1.1rem;
            font-weight: 300;
            padding: 2%;
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

        textarea {
            width: 30vw;
            height: 20vh;
        }

        button {
            width: 10vw;
        }

        button {
            font-size: 0.9rem;
            font-weight: 300;
            padding: 0.5%;
        }
    }
</style>