<template>
    <section>
        <article v-for="tweet in allTweetsCreated" :key="tweet.tweetId">
            <div class="userImageAndUsername">
                <!-- If the user's profile picture on the tweet is not theirs, go to the other users' profile pages but if the user's profile picture on the tweet is theirs, go to their own profile page -->
                <router-link :to="{ name: 'UsersProfiles', params: { userId: tweet.userId } }" v-if="tweet.userId !== ownerData.userId">
                    <img class="userImage" :src="tweet.userImageUrl" :alt="`Profile image of ${tweet.username}`">
                </router-link>

                <router-link to="/Profile" v-else>
                    <img class="userImage" :src="tweet.userImageUrl" :alt="`User Profile image for ${tweet.username}`">
                </router-link>

                <!-- Printing tweet data on the tweet card -->
                <div class="usernameAndCreatedAt">
                    <h4>@{{ tweet.username }}</h4>
                    <p class="tweetDate">{{ tweet.createdAt }}</p>
                </div>

                <div class="spacer"></div>

                <!-- If the tweet belongs to the account holder, the user is allowed to edit and delete their tweets -->
                <div class="text-center" v-if="tweet.username === ownerData.username">
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
            <!-- here -->
            <!-- <p class="tweetDate">{{ tweet.createdAt }}</p> -->

            <div class="tweetLikesAndComments">
                <!-- When the tweet card is clicked, it will take the user to another page which shows the tweet and a textarea that allows users to comment on tweets -->
                <router-link :to="{ name: 'UsersTweet', params: { tweetId: tweet.tweetId, username: tweet.username } }" class="tweetComments">Reply</router-link>

                <div class="spacer"></div>

                <!-- Printing the amount of likes on a tweet -->
                <tweet-likes :tweetIdNum="tweet.tweetId"></tweet-likes>
            </div>
        </article>
    </section>
</template>

<script>
    // import axios from "axios";
    import cookies from "vue-cookies";
    import TweetLikes from "./TweetLikes.vue";

    export default {
        name: "all-tweets",

        components: {
            TweetLikes,
        },

        data: function() {
            return {
                loginToken: cookies.get("loginToken"),
                ownerData: cookies.get("userData")
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

        mounted: function() {
            this.getAllTweetsFromAPI();
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 20px;
        padding: 3vh 0vh 13vh 0vh;
        /* background: rgba(245, 245, 245, 0.1); */
        /* background: rgba(230, 241, 243, 0.5); */
    }

    article {
        display: grid;
        row-gap: 20px;
        background: white;
        width: 90vw;
        /* box-shadow: 1px 1px 5px lightgrey; */
        /* border: 1px solid rgba(211, 211, 211, 0.6); */
        border: 1px solid rgba(99, 109, 110, 0.15);
        border-radius: 10px;
        padding: 3vh;
    }

    a {
        text-decoration: none;
    }

    h4, p {
        color: black;
    }

    h4 {
        font-size: 0.95rem;
    }

    .tweetContent {
        font-size: 0.9rem;
    }

    .tweetDate {
        font-weight: 300;
        font-size: 0.8rem;
        margin-bottom: 0px;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    .tweetComments {
        text-decoration: none;
        color: #7398A5;
        font-size: 0.9rem;
    }

    .tweetLikesAndComments {
        display: grid;
        /* place-items: center; */
        grid-template-columns: 3fr 1fr 1fr;
    }

    .userImageAndUsername {
        display: grid;
        place-items: center;
        /* grid-template-columns: 1fr 1fr 2fr 1fr; */
        grid-template-columns: 1fr 3fr 1fr 1fr;
        column-gap: 10px;
    }

    .usernameAndCreatedAt {
        display: grid;
        row-gap: 2px;
        align-self: start;
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

    .userImage {
        clip-path: circle();
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    .text-center {
        align-self: start;
    }
</style>