<template>
    <article>
        <div v-for="tweet in getSingleTweet" :key="tweet.tweetId" class="tweetCard">
            <div class="userInfoContainer">
                <div>
                    <router-link :to="{
                        name: 'UsersProfiles',
                        params: {
                            tweetId: tweet.tweetId,
                            userId: tweet.userId,
                            userimageUrl: tweet.userImageUrl, 
                            username: tweet.username
                        }
                    }" v-if="tweet.userId !== ownerData.userId">
                            <img :src="tweet.userImageUrl" :alt="`Profile image of ${tweet.username}`" class="userImage">
                    </router-link>

                    <router-link to="/Profile" v-else>
                        <img :src="tweet.userImageUrl" :alt="`User Profile image for ${tweet.username}`" class="userImage">
                    </router-link>
                </div>

                <div class="usernameAndDate">
                    <h4>@{{ tweet.username }}</h4>
                    <p class="tweetDate">{{ tweet.createdAt }}</p>
                </div>

                <div class="spacer"></div>

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
            <div class="tweetLikesContainer">
                <tweet-likes :tweetIdNum="Number(tweetId)"></tweet-likes>
                <div></div>
                <div></div>
            </div>
        </div>
    </article>
</template>

<script>
    import cookies from "vue-cookies";
    import TweetLikes from "./TweetLikes.vue";

    export default {
        name: "print-users-tweet",

        components: {
            TweetLikes
        },

        data: function() {
            return {
                ownerData: cookies.get("userData")
            }
        },

        props: {
            tweetId: Number
        },

        methods: {
            getAllTweetsFromStore: function() {
                this.$store.dispatch("getAllTweets");
            }
        },
        
        computed: {
            // When the page reloads, the tweetId will always be defined
            getSingleTweet: function() {
                return this.$store.state.allTweets.filter((singleTweet) => singleTweet.tweetId === this.tweetId);
            }
        },
    }
</script>

<style scoped>
    article {
        display: grid;
        place-items: center;
        background: 1px 1px solid rgba(211, 211, 211, 0.1);
        margin-top: 3vh;
    }

    .tweetCard {
        display: grid;
        row-gap: 20px;
        width: 90vw;
        border-radius: 10px;
        box-shadow: 1px 1px 5px lightgrey;
        padding: 3vh;
    }

    .userImage {
        clip-path: circle();
        width: 60px;
        height: 60px;
        object-fit: cover;
    }

    .userInfoContainer {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 3fr 1fr 1fr;
    }

    .usernameAndDate {
        display: grid;
        row-gap: 2px;
    }

    .tweetLikesContainer {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr;
        width: 100%;
    }

    /* h4 {
        font-size: 1rem;
    } */

    .tweetDate {
        font-weight: 300;
        font-size: 0.8rem;
        margin-bottom: 0px;
    }


    /* .tweetContent {
        margin-bottom: 5vh;
    } */

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

    /* .v-application p {
        margin-bottom: 5px;
    } */
    
    a {
        text-decoration: none;
    }
</style>