<template>
    <div>
        <div v-for="tweet in getSingleTweet" :key="tweet.tweetId">
            <!-- From the tweet page, when the user's profile image is click, take them to the user's profile page -->
            <router-link :to="{
                name: 'UsersProfileDetails',
                params: {
                    tweetId: tweet.tweetId,
                    userId: tweet.userId,
                    userimageUrl: tweet.userImageUrl, 
                    username: tweet.username
                }
            }" v-if="tweet.userId !== ownerData.userId">
                    <img :src="tweet.userImageUrl" :alt="`Profile image of ${tweet.username}`">
            </router-link>

            <router-link to="/Profile" v-else>
                <img :src="tweet.userImageUrl" :alt="`User Profile image for ${tweet.username}`">
            </router-link>

            <!-- Printing tweet data on a single user's tweet -->
            <div>
                <h4>@{{ tweet.username }}</h4>
                <p>{{ tweet.content }}</p>
                <p>{{ tweet.createdAt }}</p>
                <img :src="tweet.tweetImageUrl" :alt="`${tweet.username}'s image attached to this tweet.`">
            </div>

            <!-- Edit button -->
            <div v-if="tweet.username === ownerData.username">
                <router-link :to="{ 
                    name: 'EditTweet',
                    params: {
                        tweetId: tweet.tweetId,
                        userId: tweet.userId,
                        userImageUrl: tweet.userImageUrl,
                        username: tweet.username,
                        content: tweet.content,
                        createdAt: tweet.createdAt,
                    }
                }">
                    <button>Edit</button>
                </router-link>
            
                <!-- Delete button -->
                <router-link :to="{
                    name: 'DeleteTweet',
                    params: {
                        tweetId: tweet.tweetId,
                        userId: tweet.userId
                    }
                }">
                    <button>Delete</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "print-users-tweet",

        data() {
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

        // mounted () {
        //     this.getAllTweetsFromStore();
        // },

        computed: {
            // When the page reloads, the tweetId will always be defined
            getSingleTweet: function() {
                return this.$store.state.allTweets.filter((singleTweet) => singleTweet.tweetId === this.tweetId);
            }
        },
    }
</script>

<style scoped>
    img {
        width: 30vw;
    }
</style>