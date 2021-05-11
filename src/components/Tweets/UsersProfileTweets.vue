<template>
    <div id="userTweetsContainer">
        <p>{{ usersProfileTweetsStatus }}</p>

        <!-- Printing tweets that belong to a certain user onto their profile page -->
        <div v-for="tweet in profileTweets" :key="tweet.tweetId" class="tweetCard">
            <div class="userImageAndUsername">
                <router-link :to="{ name: 'UsersProfiles', params: { userId: tweet.userId } }" v-if="tweet.userId !== ownerData.userId">
                    <img class="userImage" :src="tweet.userImageUrl" :alt="`@${tweet.username}'s profile image.`">
                </router-link>

                <router-link to="/Profile" v-else>
                    <img class="userImage" :src="tweet.userImageUrl" :alt="`@${tweet.username}'s profile image.`">
                </router-link>

                <!-- Printing tweet data on the tweet card -->
                <div class="usernameAndCreatedAt">
                    <h4>@{{ tweet.username }}</h4>
                    <p class="tweetDate">{{ tweet.createdAt }}</p>
                </div>

                <div class="spacer"></div>

                <!-- If the tweet belongs to the account holder, allowed the account holder to edit and delete their tweets -->
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

            <div class="tweetLikesAndComments">
                <router-link :to="{ name: 'UsersTweet', params: { tweetId: tweet.tweetId, username: tweet.username } }" class="tweetComments">Reply</router-link>
                <div class="spacer"></div>
                <tweet-likes :tweetIdNum="tweet.tweetId"></tweet-likes>
            </div>
        </div>
    </div>
</template>

<script>
    import cookies from "vue-cookies";
    import TweetLikes from "./TweetLikes.vue";

    export default {
        name: "users-profile-tweets",

        data: function() {
            return {
                ownerData: cookies.get("userData"),
                usersProfileTweetsStatus: ""
            }
        },

        components: {
            TweetLikes
        },

        computed: {
            userId: function() {
                return this.$route.params.userId;
            },

            // Filtering through all the tweets and returning only tweets that belong to a certain user and printing their tweets onto their profile page
            profileTweets: function() {
                return this.$store.state.allTweets.filter((userTweet) => userTweet.userId === Number(this.userId));
            }
        },
    }
</script>

<style scoped>
    #userTweetsContainer {
        display: grid;
        place-items: center;
        row-gap: 10px;
        padding: 0vh 0vh 11vh 0vh;
        background: rgba(245, 245, 245, 0.3);
    }

    .tweetCard {
        display: grid;
        row-gap: 20px;
        background: white;
        width: 95vw;
        border: 1px solid rgba(211, 211, 211, 0.6);
        border-radius: 10px;
        padding: 3vh;
    }

    .userImageAndUsername {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 3fr 1fr 1fr;
        column-gap: 10px;
    }

    .userImage {
        clip-path: circle();
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    .usernameAndCreatedAt {
        display: grid;
        row-gap: 2px;
        align-self: start;
    }

    .tweetDate {
        font-weight: 300;
        font-size: 0.8rem;
        margin-bottom: 0px;
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

    .v-application p {
        margin-bottom: 0px;
    }

    .tweetComments {
        text-decoration: none;
        color: #7398A5;
        font-size: 0.9rem;
        width: 10vw;
    }

    .tweetLikesAndComments {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        .tweetCard {
            width: 82vw;
            height: 25vh;
            margin-left: 15vw;
        }

        .userImage {
            width: 65px;
            height: 65px;
        }

        h4 {
            font-size: 1.2rem;
        }

        .usernameAndCreatedAt {
            align-self: start;
            margin-top: 0.3vh;
            row-gap: 5px;
        }

        .tweetDate {
            font-size: 1rem;
        }

        .text-center {
            align-self: start;
            margin-top: 0.3vh;
        }

        .tweetComments {
            font-size: 1.1rem;
            padding-left: 1vw;
        }

        .tweetContent {
            font-size: 1.1rem;
            padding-left: 1vw;
        }

        .userImageAndUsername {
            grid-template-columns: 1fr 3fr 3fr 3fr;
        }

        .tweetLikesAndComments {
            grid-template-columns: 3fr 5fr 2fr;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        .tweetCard {
            width: 88vw;
            height: 30vh;
            margin-left: 10vw;
        }

        .userImage {
            width: 65px;
            height: 65px;
        }

        h4 {
            font-size: 1.2rem;
        }

        .tweetContent {
            font-size: 1.1rem;
            padding-left: 1vw;
        }

        .tweetDate {
            font-size: 1rem;
        }

        .tweetComments {
            font-size: 1.1rem;
            padding-left: 1vw;
        }

        .userImageAndUsername {
            grid-template-columns: 1fr 2fr 4fr 4fr;
        }

        .usernameAndCreatedAt {
            margin-top: 1.2vh;
            row-gap: 5px;
        }

        .tweetLikesAndComments {
            grid-template-columns: 4fr 5fr 2fr;
        }
    }

    @media only screen and (min-width: 1024px) {

        #userTweetsContainer {
            padding-top: 5vh;
        }

        .tweetCard {
            width: 50vw;
            margin-left: 25vw;
        }

        .userImageAndUsername {
            grid-template-columns: 1fr 3fr 3fr 3fr;
        }

        .tweetContent, .tweetComments {
            padding-left: 0.5vw;
        }

        .tweetLikesAndComments {
            grid-template-columns: 5fr 10fr 3fr;
        }
    }
</style>