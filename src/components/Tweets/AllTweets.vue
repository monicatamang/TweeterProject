<template>
    <section>
        <article v-for="tweet in totalTweets" :key="tweet.tweetId">
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
                                <router-link :to="{ 
                                    name: 'EditTweet', 
                                    params: { 
                                    tweetId: tweet.tweetId } }">
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

        props: {
            isTweetsFiltered: Boolean
        },

        methods: {
            getAllTweetsFromAPI: function() {
                this.$store.dispatch("getAllTweets");
            },

            getUserFollowersFromAPI: function() {
                this.$store.dispatch("getOwnerFollows", cookies.get("userData").userId);
            },
        },
        
        computed: {
            allTweetsCreated: function() {
                return this.$store.state.allTweets;
            },

            totalTweets: function() {
                // If the tweets are supposed to be filted, create an empty array, and check see to if the account holder's any user that the account holder is following has a tweet
                // If the account holders followings has a tweet, append that tweet into the filteredTweets
                if(this.isTweetsFiltered) {
                    let filteredTweets = [];
                    for(let i = 0; i < this.totalFollows.length; i++) {
                        for(let j = 0; j < this.allTweetsCreated.length; j++) {
                            if(this.totalFollows[i].userId === this.allTweetsCreated[j].userId) {
                                filteredTweets.unshift(this.allTweetsCreated[j]);
                            }
                        }
                    }

                    // Appending tweets created by the account holder to the filteredTweets
                    for(let i = 0; i < this.allTweetsCreated.length; i++) {
                        if(this.allTweetsCreated[i].userId === cookies.get("userData").userId) {
                            filteredTweets.unshift(this.allTweetsCreated[i]);
                        }
                    }
                    return filteredTweets.reverse();
                } 
                
                // If the tweets are not supposed to be filered, just show all the tweets on the page
                else {
                    return this.$store.state.allTweets;
                }
            },

            totalFollows: function() {
                return this.$store.state.ownerFollowsList;
            },
        },

        mounted: function() {
            if (this.totalFollows.length <= 0) {
                this.getUserFollowersFromAPI();
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 8px;
        padding: 1vh 0vh 11vh 0vh;
        background: rgba(245, 245, 245, 0.3);
    }

    article {
        display: grid;
        row-gap: 20px;
        background: white;
        width: 95vw;
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
        width: 10vw;
    }

    .tweetLikesAndComments {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr;
    }

    .userImageAndUsername {
        display: grid;
        place-items: center;
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

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            margin-top: 0vh;
        }

        article {
            width: 82vw;
            height: 25vh;
            margin-left: 15vw;
        }

        .userImage {
            width: 65px;
            height: 65px;
        }

        .userImageAndUsername {
            grid-template-columns: 1fr 2fr 2fr 2fr;
        }

        .usernameAndCreatedAt {
            align-self: start;
            margin-top: 1.2vh;
            row-gap: 5px;
        }

        h4 {
            font-size: 1.1rem;
        }

        .tweetContent {
            font-size: 1rem;
        }

        .tweetDate {
            font-size: 0.9rem;
        }

        .tweetComments {
            font-size: 1rem;
        }

        .text-center {
            justify-self: end;
            align-self: start;
            margin-top: 1.2vh;
        }

        i {
            font-size: 1.5rem;
            margin-right: 3vw;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        article {
            width: 88vw;
            height: 30vh;
            margin-left: 10vw;
        }

        .userImage {
            width: 65px;
            height: 65px;
        }

        h4 {
            font-size: 1.1rem;
        }

        .tweetContent {
            font-size: 1rem;
            padding-left: 1vw;
        }

        .tweetDate {
            font-size: 0.9rem;
        }

        .tweetComments {
            font-size: 1rem;
            padding-left: 1vw;
        }

        .userImageAndUsername {
            grid-template-columns: 1fr 2fr 4fr 4fr;
        }

        .usernameAndCreatedAt {
            margin-top: 1.2vh;
            row-gap: 5px;
        }

        i {
            font-size: 1.5rem;
            margin-right: -20vw;
        }

        .text-center {
            align-self: start;
            margin-top: 1.2vh;
        }
    }   
</style>