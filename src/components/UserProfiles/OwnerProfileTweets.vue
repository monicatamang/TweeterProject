<template>
    <article>
        <h1>Tweets</h1>
        <div v-if="userId">
            <div v-for="userTweet in userTweetCards" :key="userTweet.tweetId">
                    <router-link :to="{
                        name: 'UsersTweet',
                        params: {
                            tweetId: userTweet.tweetId,
                            userId: userTweet.userId,
                            userImageUrl: userTweet.userImageUrl,
                            username: userTweet.username,
                            content: userTweet.content,
                            createdAt: userTweet.createdAt,
                            tweetImageUrl: userTweet.tweetImageUrl
                        }
                    }">
                        <img :src="userTweet.userImageUrl" :alt="`User Profile image for ${userTweet.username}`" id="userProfileImage">
                        <h4>@{{ userTweet.username }}</h4>
                        <p>{{ userTweet.content }}</p>
                        <p>{{ userTweet.createdAt }}</p>
                        
                        <img :src="userTweet.tweetImageUrl" :alt="`${userTweet.username}'s image attached to this tweet.`">
                    </router-link>

                    <router-link :to="{ 
                            name: 'EditTweet',
                            params: {
                                tweetId: userTweet.tweetId,
                                userImageUrl: userTweet.userImageUrl,
                                username: userTweet.username,
                                content: userTweet.content,
                                createdAt: userTweet.createdAt,
                                tweetImageUrl: userTweet.tweetImageUrl
                            }
                        }">
                            <button>Edit</button>
                        </router-link>

                    <router-link :to="{
                        name: 'DeleteTweet',
                        params: {
                            tweetId: userTweet.tweetId,
                            userImageUrl: userTweet.userImageUrl,
                            username: userTweet.username,
                            content: userTweet.content,
                            createdAt: userTweet.createdAt,
                            tweetImageUrl: userTweet.tweetImageUrl
                        }
                    }">
                        <button>Delete</button>
                    </router-link>
                    <tweet-likes :tweetIdNum="userTweet.tweetId"></tweet-likes>
                    <print-tweet-likes :userTweetIdNum="userTweet.tweetId"></print-tweet-likes>
            </div>
        </div>
    </article>
</template>

<script>
    // import axios from "axios";
    import cookies from "vue-cookies";
    import TweetLikes from "../Tweets/TweetLikes.vue";
    import PrintTweetLikes from "../Tweets/PrintTweetLikes.vue";

    export default {
        name: "owner-profile-tweets",

        components: {
            TweetLikes,
            PrintTweetLikes,
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
    div {
        display: grid;
    }

    div, button {
        border: 1px solid black;
        width: 100%;
    }

    img {
        width: 30vw;
    }

    /* #userProfileImage {
        clip-path: circle();
    } */
</style>