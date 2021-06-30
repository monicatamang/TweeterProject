<template>
    <article>
        <div v-for="tweet in tweets" :key="tweet.tweetId">
            <v-card class="pa-5" elevation="0" v-if="tweet.imageUrl !== ''">
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <router-link :to="{ name: 'UsersProfiles', params: { userId: tweet.userId } }" v-if="tweet.userId !== ownerData.userId">
                                <v-avatar size="50">
                                    <img :src="tweet.imageUrl" :alt="`@${tweet.username}'s profile image.`">
                                </v-avatar>
                            </router-link>
                            <router-link to="/Profile" v-else>
                                <v-avatar size="50">
                                    <img :src="tweet.imageUrl" :alt="`@${tweet.username}'s profile image.`">
                                </v-avatar>
                            </router-link>
                        </v-col>
                        <v-col cols="8">
                            <v-card-title>@{{ tweet.username }}</v-card-title>
                        </v-col>
                        <v-col cols="2">
                            <div class="text-center" v-if="tweet.username === ownerData.username">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" depressed color="transparent">
                                        <v-icon>mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item class="grid">
                                        <edit-tweet :userTweetId="tweet.tweetId"></edit-tweet>
                                        <delete-tweet :userTweetId="tweet.tweetId"></delete-tweet>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-subtitle>{{ tweet.content }}</v-card-subtitle>
                <v-card-text>{{ tweet.createdAt }}</v-card-text>
                <v-container>
                    <v-row row="1">
                        <v-col cols="6">
                            <router-link :to="{ name: 'UsersTweet', params: { tweetId: tweet.tweetId } }" class="tweetComments">
                                <v-card-text class="replyLink">Reply</v-card-text>
                            </router-link>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2">
                            <tweet-likes :tweetIdNum="tweet.tweetId"></tweet-likes>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-card class="pa-5" elevation="0" v-if="tweet.imageUrl === ''">
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <router-link :to="{ name: 'UsersProfiles', params: { userId: tweet.userId } }" v-if="tweet.userId !== ownerData.userId">
                                <v-avatar size="50" color="black">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                            </router-link>
                            <router-link to="/Profile" v-else>
                                <v-avatar size="50" color="#9FBFCC">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                            </router-link>
                        </v-col>

                        <v-col cols="8">
                            <v-card-title>@{{ tweet.username }}</v-card-title>
                        </v-col>
                        <v-col cols="2">
                            <div class="text-center" v-if="tweet.username === ownerData.username">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" depressed color="transparent">
                                        <v-icon>mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item class="grid">
                                        <edit-tweet :userTweetId="tweet.tweetId"></edit-tweet>
                                        <delete-tweet :userTweetId="tweet.tweetId"></delete-tweet>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-subtitle>{{ tweet.content }}</v-card-subtitle>
                <v-card-text>{{ tweet.createdAt }}</v-card-text>
                <v-container>
                    <v-row row="1">
                        <v-col cols="6">
                            <router-link :to="{ name: 'UsersTweet', params: { tweetId: tweet.tweetId } }" class="tweetComments">
                                <v-card-text class="replyLink">Reply</v-card-text>
                            </router-link>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2">
                            <tweet-likes :tweetIdNum="Number(tweet.tweetId)"></tweet-likes>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </div>
    </article>
</template>

<script>
    import cookies from "vue-cookies";
    import EditTweet from "./EditTweet.vue";
    import DeleteTweet from "./DeleteTweet.vue";
    import TweetLikes from "./TweetLikes.vue";

    export default {
        name: "tweet-card",

        components: {
            EditTweet,
            DeleteTweet,
            TweetLikes,
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                ownerData: cookies.get("userData")
            }
        },

        props: {
            tweets: Array
        },
    }
</script>

<style scoped>
    img {
        object-fit: cover;
    }

    div {
        padding: 2%;
        background: white;
    }

    article {
        display: grid;
        row-gap: 8px;
        margin-top: 1vh;
    }

    a {
        text-decoration: none;
        text-align: left;
    }

    .v-card__title {
        font-size: 1rem;
    }

    .v-card__subtitle {
        font-size: 0.9rem;
    }

    .v-list-item {
        display: grid;
        row-gap: 15px;
    }

    .v-list-item__title {
        color: black;
        font-size: 0.9rem;
    }

    .v-list-item::after {
        content: none;
    }

    .replyLink {
        margin-left: -1vw;
        color: var(--primaryColor);
    }
</style>