<template>
    <section>
        <article v-for="tweet in allTweetsCreated" :key="tweet.tweetId">
            <div class="userImageAndUsername">
                <!-- If the user's profile picture on the tweet is not theirs, go to the other users' profile pages but if the user's profile picture on the tweet is theirs, go to their own profile page -->
                <router-link :to="{ name: 'UsersProfiles', params: { userId: tweet.userId } }" v-if="tweet.userId !== ownerData.username">
                    <img class="userImage" :src="tweet.userImageUrl" :alt="`Profile image of ${tweet.username}`">
                </router-link>

                <router-link to="/Profile" v-else>
                    <img class="userImage" :src="tweet.userImageUrl" :alt="`User Profile image for ${tweet.username}`">
                </router-link>

                <!-- Printing tweet data on the tweet card -->
                <h4>@{{ tweet.username }}</h4>

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
            <p class="tweetDate">{{ tweet.createdAt }}</p>

            <div class="tweetLikesAndComments">
                <!-- When the tweet card is clicked, it will take the user to another page which shows the tweet and a textarea that allows users to comment on tweets -->
                <router-link :to="{ name: 'UsersTweet', params: { tweetId: tweet.tweetId, username: tweet.username } }" class="tweetComments">View Comments</router-link>

                <div class="spacer"></div>

                <!-- Printing the amount of likes on a tweet -->
                <tweet-likes :tweetIdNum="tweet.tweetId" :userIdNum="tweet.userId"></tweet-likes>
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
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 20px;
        padding: 3vh 0vh 13vh 0vh;
        background: whitesmoke;
    }

    article {
        display: grid;
        row-gap: 10px;
        background: white;
        width: 90vw;
        box-shadow: 1px 1px 5px lightgrey;
        border-radius: 10px;
        padding: 3vh;
    }

    a {
        text-decoration: none;
    }

    h4, p {
        color: black;
    }

    .tweetContent {
        font-size: 1rem;
    }

    .tweetDate {
        font-weight: 300;
        font-size: 0.8rem;
    }

    .v-applciation p {
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
        grid-template-columns: 2fr 1fr 1fr;
    }

    .userImageAndUsername {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr 2fr 1fr;
        column-gap: 10px;
        margin-bottom: 2vh;
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
        width: 60px;
        height: 60px;
        object-fit: cover;
    }
</style>