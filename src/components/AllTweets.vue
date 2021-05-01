<template>
    <section>
        <article v-for="tweet in allUsersTweets" :key="tweet.tweetId">
            <img :src="tweet.userImageUrl" :alt="`User Profile image for`+ tweet.username" id="userProfileImage">
            <h4>{{ tweet.username }}</h4>
            <p>{{ tweet.content }}</p>
            <p>{{ tweet.createdAt }}</p>
            <!-- Add image alt tag -->
            <img :src="tweet.tweetImageUrl" alt="">
        </article>
    </section>
</template>

<script>
    export default {
        name: "all-tweets",

        methods: {
            getAllTweetsFromAPI: function() {
                this.$store.dispatch("getAllTweets");
            }
        },

        computed: {
            allUsersTweets: function() {
                return this.$store.state.allTweets; 
            }
        },

        mounted: function() {
            this.getAllTweetsFromAPI();
        },
    }
</script>

<style scoped>
    article {
        display: grid;
    }

    article, button {
        border: 1px solid black;
    }

    img {
        width: 30vw;
    }

    #userProfileImage {
        clip-path: circle();
    }
</style>