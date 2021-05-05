<template>
    <section>
        <article v-for="tweet in allTweetsCreated" :key="tweet.tweetId">

            <!-- When the tweet card is clicked, it will take the user to another page which shows the tweet and a textarea that allows users to comment on tweets -->
            <router-link :to="{
                name: 'UsersTweet',
                params: {
                    tweetId: tweet.tweetId,
                    userId: tweet.userId,
                    userImageUrl: tweet.userImageUrl,
                    username: tweet.username,
                    content: tweet.content,
                    createdAt: tweet.createdAt,
                    tweetImageUrl: tweet.tweetImageUrl
                }
            }">

                <!-- If the user's profile picture on the tweet is not theirs, go to the other users' profile pages but if the user's profile picture on the tweet is theirs, go to their own profile page -->
                <router-link :to="{
                    name: 'UsersProfileDetails',
                    params: {
                        imageUrl: tweet.userImageUrl, 
                        username: tweet.username,
                        userId: tweet.userId
                    }
                }" v-if="tweet.username !== userUsername">
                    <img class="userImage" :src="tweet.userImageUrl" :alt="`Profile image of ${tweet.username}`" id="userProfileImage">
                </router-link>

                <router-link to="/Profile" v-else>
                    <img class="userImage" :src="tweet.userImageUrl" :alt="`User Profile image for ${tweet.username}`" id="userProfileImage">
                </router-link>

                <!-- Printing tweet data on the tweet card -->
                <div>
                    <h4>@{{ tweet.username }}</h4>
                    <p>{{ tweet.content }}</p>
                    <p>{{ tweet.createdAt }}</p>
                    <img :src="tweet.tweetImageUrl" :alt="`@${tweet.username}'s image attached to this tweet.`">
                </div>

                <!-- If the tweet belongs to the account holder, the user is allowed to edit and delete their tweets -->
                <div v-if="tweet.username === userUsername">
                    <router-link :to="{ 
                        name: 'EditTweet',
                        params: {
                            tweetId: tweet.tweetId,
                            userImageUrl: tweet.userImageUrl,
                            username: tweet.username,
                            content: tweet.content,
                            createdAt: tweet.createdAt,
                            tweetImageUrl: tweet.tweetImageUrl
                        }
                    }">
                        <button>Edit</button>
                    </router-link>

                    <router-link :to="{
                        name: 'DeleteTweet',
                        params: {
                            tweetId: tweet.tweetId,
                            username: tweet.username
                        }
                    }">
                        <button>Delete</button>
                    </router-link>
                </div>
            </router-link>

            <!-- Printing the amount of likes on a tweet -->
            <tweet-likes :tweetIdNum="tweet.tweetId"></tweet-likes>
            <print-tweet-likes :userTweetIdNum="tweet.tweetId"></print-tweet-likes>
        </article>
    </section>
</template>

<script>
    // import axios from "axios";
    import cookies from "vue-cookies";
    import TweetLikes from "./TweetLikes.vue";
    import PrintTweetLikes from "./PrintTweetLikes.vue";

    export default {
        name: "all-tweets",

        components: {
            TweetLikes,
            PrintTweetLikes
        },

        data: function() {
            return {
                loginToken: cookies.get("loginToken"),
                userUsername: cookies.get("userData").username,
            }
        },

        methods: {
            getAllTweetsFromAPI: function() {
                this.$store.dispatch("getAllTweets");
            },
        },

        computed: {
            allTweetsCreated: function() {
                return this.$store.state.allTweets;
            },
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        margin-bottom: 10vh;
    }

    .userImage {
        clip-path: circle();
        width: 40px;
        height: 40px;
        object-fit: cover;
    }

    /* ---- */

    /* article {
        display: grid;
    } */

    article, button {
        border: 1px solid black;
        width: 100%;
        /* margin-bottom: 5vh; */
    }

    img {
        width: 30vw;
    }

    /* #userProfileImage {
        clip-path: circle();
    } */
</style>