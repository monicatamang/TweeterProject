<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
            <h3>Edit Post</h3>
            <div></div>
        </div>
        <textarea :id="`editTweet${userTweetId}`" maxlength="200"></textarea>
        <button @click="updateUserTweet">Update</button>
        <!-- <p>{{ updateTweetStatus }}</p> -->
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButtonHeader from "../../components/BackButtonHeader.vue";

    export default {
        name: "Edit-Tweet",

        components: {
            BackButtonHeader
        },

        data: function() {
            return {
                updateTweetStatus: "",
                // editedTweetContent: "",
                ownerData: cookies.getElementById("userData")
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

                // If the user's tweet are more then 200 characters or if no content is entered in the textarea, print an error message to the user
                if(document.getElementById(`editTweet${this.userTweetId}`).value.length > 200 || document.getElementById(`editTweet${this.userTweetId}`).value === "") {
                    this.updateTweetStatus = "Invalid tweet.";
                    // console.log("hello");
                } 
                
                // If the user's tweet is less than or equal to 200 characters, send a PATCH request to update the user's tweet
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
                        console.log(res);

                        // Setting the new value of the tweet's content to the tweet content the API returned
                        // this.editedTweetContent = res.data.content;

                        // Sending a request to the API to get all the current tweets onto the page
                        this.getAllUsersTweets();

                        this.updateTweetStatus = "Tweet was successfully updated.";

                        this.$router.go(-1);
                    }).catch((err) => {
                        err;
                        this.updateTweetStatus = "Failed to update tweet.";
                    })
                }
            }
        },

        mounted: function() {
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
</style>