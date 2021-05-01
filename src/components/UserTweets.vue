<template>
    <article>
        <h1>Tweets</h1>
        <div v-for="userTweet in userTweetCards" :key="userTweet.tweetId">
            <img :src="userTweet.userImageUrl" :alt="`User Profile image for`+ userTweet.username" id="userProfileImage">
            <h4>{{ userTweet.username }}</h4>
            <p>{{ userTweet.content }}</p>
            <p>{{ userTweet.createdAt }}</p>
            
            <img :src="userTweet.tweetImageUrl" :alt="`${userTweet.username}'s image attached to this tweet.`">
            
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
        </div>
    </article>
</template>

<script>
    export default {
        name: "user-tweets",

        data: function() {
            return {
                userTweetsStatus: "",
            }
        },

        methods: {
            userTweetsFromAPI: function() {
                this.$store.dispatch("getUserTweetsFromAPI");
            }
        },

        computed: {
            userTweetCards: function() {
                return this.$store.userTweets; 
            }
        },

        mounted: function() {
            this.userTweetsFromAPI();
        },
}
</script>

<style scoped>
    div {
        display: grid;
    }

    div, button {
        border: 1px solid black;
    }

    img {
        width: 30vw;
    }

    #userProfileImage {
        clip-path: circle();
    }
</style>