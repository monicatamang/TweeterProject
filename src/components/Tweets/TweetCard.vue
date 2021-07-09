<template>
    <article>
        <v-divider class="hidden-md-and-up"></v-divider>
        <div v-for="tweet in tweets" :key="tweet.tweetId" class="cardContainer">
            <v-card class="pa-xs-5 pl-sm-13 py-sm-10 pa-md-10 pl-md-10" elevation="0" v-if="tweet.imageUrl !== '' && tweet.imageUrl !== null">
                <v-container>
                    <v-row>
                        <v-col cols="2" sm="1" md="2">
                            <router-link :to="{ name: 'UsersProfiles', params: { userId: tweet.userId } }" v-if="tweet.userId !== ownerData.userId">
                                <v-avatar size="50">
                                    <img :src="tweet.imageUrl" :alt="`@${tweet.username}'s profile image.`">
                                </v-avatar>
                            </router-link>
                            <router-link to="/Profile" v-else>
                                <v-avatar size="50">
                                    <img :src="ownerData.imageUrl" :alt="`@${tweet.username}'s profile image.`">
                                </v-avatar>
                            </router-link>
                        </v-col>
                        <v-col cols="8" sm="9" md="8" class="ml-sm-n16 ml-md-n1">
                            <v-card-title>@{{ tweet.username }}</v-card-title>
                        </v-col>
                        <v-col cols="2" sm="1" md="2">
                            <div class="text-xs-center text-sm-right" v-if="tweet.userId === ownerData.userId">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" depressed color="transparent">
                                        <v-icon class="hidden-sm-and-up">mdi-dots-horizontal</v-icon>
                                        <v-icon size="30" class="hidden-xs-only">mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item class="grid">
                                        <edit-tweet :userTweetId="tweet.tweetId"></edit-tweet>
                                        <delete-tweet :userTweetId="tweet.tweetId" @tweetIsDeleted="notifyTweetLikes"></delete-tweet>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-subtitle class="mt-4">{{ tweet.content }}</v-card-subtitle>
                <v-card-text class="mt-4 mt-sm-10 mt-md-5">{{ tweet.createdAt }}</v-card-text>
                <v-container>
                    <v-row row="1">
                        <v-col cols="6" sm="8" md="6">
                            <router-link :to="{ name: 'UsersTweet', params: { tweetId: tweet.tweetId } }" class="tweetComments">
                                <v-card-text class="replyLink">Reply</v-card-text>
                            </router-link>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2" sm="3" md="4" class="d-md-flex justify-end">
                            <tweet-likes :tweetIdNum="tweet.tweetId" :checkTweetDeleted="callTweetLikes"></tweet-likes>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-card class="pa-xs-5 pl-sm-13 py-sm-10 pa-md-10 pl-md-10" elevation="0" v-else-if="tweet.imageUrl === '' || tweet.imageUrl === null">
                <v-container>
                    <v-row>
                        <v-col cols="2" sm="2" md="2">
                            <router-link :to="{ name: 'UsersProfiles', params: { userId: tweet.userId } }" v-if="tweet.userId !== ownerData.userId">
                                <v-avatar size="50" :color="color">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                            </router-link>
                            <router-link to="/Profile" v-else>
                                <v-avatar size="50" :color="color">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                            </router-link>
                        </v-col>
                        <v-col cols="8" sm="9" md="8" class="ml-sm-n16 ml-md-n1">
                            <v-card-title>@{{ tweet.username }}</v-card-title>
                        </v-col>
                        <v-col cols="2" sm="1" md="2">
                            <div class="text-xs-center text-sm-right" v-if="tweet.userId === ownerData.userId">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" depressed color="transparent">
                                        <v-icon class="hidden-sm-and-up">mdi-dots-horizontal</v-icon>
                                        <v-icon size="30" class="hidden-xs-only">mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item class="grid">
                                        <edit-tweet :userTweetId="tweet.tweetId"></edit-tweet>
                                        <delete-tweet :userTweetId="tweet.tweetId" @tweetIsDeleted="notifyTweetLikes"></delete-tweet>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-subtitle class="mt-4">{{ tweet.content }}</v-card-subtitle>
                <v-card-text class="mt-4 mt-sm-10 mt-md-5">{{ tweet.createdAt }}</v-card-text>
                <v-container>
                    <v-row row="1">
                        <v-col cols="6" sm="8" md="6">
                            <router-link :to="{ name: 'UsersTweet', params: { tweetId: tweet.tweetId } }" class="tweetComments">
                                <v-card-text class="replyLink">Reply</v-card-text>
                            </router-link>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2" sm="3" md="4" class="d-md-flex justify-end">
                            <tweet-likes :tweetIdNum="Number(tweet.tweetId)" :checkTweetDeleted="callTweetLikes"></tweet-likes>
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
                ownerData: cookies.get("userData"),
                color: "#60A3D9",
                callTweetLikes: undefined
            }
        },

        methods: {
            // Listening to whether a tweet is deleted and proping the data to the TweetLikes component
            notifyTweetLikes(data) {
                this.callTweetLikes = data;
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

    .cardContainer {
        border-bottom: 1px solid rgba(211, 211, 211, 0.5);
    }

    article {
        display: grid;
        margin-bottom: 5vh;
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

    @media only screen and (min-width: 768px) {
        
        div {
            padding: 1%;
        }

        .v-card__title {
            font-size: 1.2rem;
        }

        .v-card__subtitle {
            font-size: 1.1rem;
            margin: 2% 0%;
        }

        .v-card__text {
            font-size: 1rem;
            margin: 2% 0%;
        }

        .replyLink {
            margin-left: -1%;
        }
    }

    @media only screen and (min-width: 1024px) {
        
        article {
            width: 100%;
            margin: 13vh 0vw 4vh 0vw;
        }

        .cardContainer {
            border-bottom: none;
            border-radius: 10px;
            box-shadow: 3px 5px 5px lightgrey;
            width: 100%;
            margin: 2vh 0vw;
        }

        .v-card {
            width: 100%;
        }

        .v-card__title {
            font-size: 0.9rem;
        }

        .v-card__subtitle {
            font-size: 0.8rem;
        }

        .v-card__text {
            font-size: 0.7rem;
        }

        .replyLink {
            margin-left: 1%;
        }
    }
</style>