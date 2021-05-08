<template>
    <article id="ownerTweets">
        <div v-for="tweet in userTweetCards" :key="tweet.tweetId" class="tweetCard">
            <div class="userInfoContainer">
                <img :src="tweet.userImageUrl" :alt="`Profile image of ${tweet.username}`" class="userImage">

                <div class="usernameAndDate">
                    <h4>@{{ tweet.username }}</h4>
                    <p class="tweetDate">{{ tweet.createdAt }}</p>
                </div>

                <!-- <div class="spacer"></div> -->

                <div class="text-center">
                    <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                            <i class="fas fa-ellipsis-h fa-lg" v-bind="attrs" v-on="on"></i>
                        </template>
                        <v-list>
                            <v-list-item class="grid">
                                <router-link :to="{ name: 'EditTweet', params: { tweetId: tweet.tweetId } }">
                                    <v-list-item-title>Edit</v-list-item-title>
                                </router-link>

                                <router-link :to="{ name: 'DeleteTweet', params: { tweetId: tweet.tweetId, username: tweet.username } }">
                                    <v-list-item-title>Delete</v-list-item-title>
                                </router-link>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <p class="tweetContent">{{ tweet.content }}</p>
            <div class="tweetLikesAndComments">
                <!-- When the tweet card is clicked, it will take the user to another page which shows the tweet and a textarea that allows users to comment on tweets -->
                <router-link :to="{ name: 'UsersTweet', params: { tweetId: tweet.tweetId, username: tweet.username } }" class="tweetComments">Reply</router-link>

                <div class="spacer"></div>

                <!-- Printing the amount of likes on a tweet -->
                <tweet-likes :tweetIdNum="Number(tweet.tweetId)"></tweet-likes>
            </div>
        </div>
    </article>
</template>

<script>
    // import axios from "axios";
    import cookies from "vue-cookies";
    import TweetLikes from "../Tweets/TweetLikes.vue";

    export default {
        name: "owner-profile-tweets",

        components: {
            TweetLikes,
            // PrintTweetLikes,
        },

        data: function() {
            return {
                userId: cookies.get("userData").userId,
                userTweetsStatus: "",
            }
        },

        computed: {
            // Instead of making another API call, since we have all the tweets and tweet data, we are getting allTweets from the store and filtering out tweets that only belong to the account holder and printing those tweets to the page
            userTweetCards: function() {
                // If the user's id on a single tweet matches with the account holder's id, only return those tweets
                return this.$store.state.allTweets.filter((singleTweet) => singleTweet.userId === this.userId);
            }
        },
    }
</script>

<style scoped>
    #ownerTweets {
        display: grid;
        background: rgba(245, 245, 245, 0.3);
        /* background: rgba(211, 211, 211, 0.3); */
        row-gap: 8px;
        /* margin-top: 1vh; */
    }

    .userImage {
        clip-path: circle();
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    .tweetCard {
        display: grid;
        row-gap: 20px;
        width: 95vw;
        border-radius: 10px;
        /* box-shadow: 1px 1px 5px lightgrey; */
        /* border: 1px solid rgba(211, 211, 211, 0.6); */
        border: 1px solid rgba(99, 109, 110, 0.15);
        padding: 3vh;
        background: white;
    }

    .userInfoContainer {
        display: grid;
        column-gap: 15px;
        grid-template-columns: 1fr 4fr 1fr;
    }

    .usernameAndDate {
        display: grid;
        row-gap: 2px;
        align-self: start;
    }

    .tweetLikesAndComments {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr;
    }

    .tweetDate {
        font-weight: 300;
        font-size: 0.8rem;
        margin-bottom: 0px;
    }

    .tweetComments {
        text-decoration: none;
        color: #7398A5;
        font-size: 0.9rem;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    .v-list-item {
        display: grid;
        row-gap: 15px;
    }

    .v-list-item__title {
        color: black;
        font-size: 1rem;
    }

    .v-list-item::after {
        content: none;
    }
    
    a {
        text-decoration: none;
    }

    h4 {
        font-size: 0.95rem;
    }

    .tweetContent {
        font-size: 0.9rem;
    }
</style>