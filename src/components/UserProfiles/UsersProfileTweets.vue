<template>
    <article>
        <h3>Tweets</h3>
        <p>{{ usersProfileTweetsStatus }}</p>
        <div v-for="userTweet in profileTweets" :key="userTweet.tweetId">
            <img :src="userTweet.userImageUrl" :alt="`${userTweet.username}'s Profile Photo.`">
            <h4>@{{ userTweet.username }}</h4>
            <p>{{ userTweet.content }}</p>
            <p>{{ userTweet.createdAt }}</p>
            <!-- <tweet-likes :tweetIdNum="usersProfileTweet.tweetId"></tweet-likes> -->
            <!-- <print-tweet-likes :userTweetIdNum="usersProfileTweet.tweetId"></print-tweet-likes> -->
        </div>
    </article>
</template>

<script>
    // import TweetLikes from "../Tweets/TweetLikes.vue";
    // import PrintTweetLikes from "../Tweets/PrintTweetLikes.vue";

    export default {
        name: "users-profile-tweets",

        components: {
            // TweetLikes,
            // PrintTweetLikes,
        },

        data: function() {
            return {
                usersProfileTweetsStatus: ""
            }
        },

        computed: {
            userId: function() {
                return this.$route.params.userId;
            },

            profileTweets: function() {
                return this.$store.state.allTweets.filter((userTweet) => userTweet.userId === Number(this.userId));
            }
        },
    }
</script>

<style scoped>
    img {
        /* clip-path: circle(); */
        width: 30vw;
    }
</style>