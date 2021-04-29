<template>
    <section>
        <div v-for="tweet in feedTweets" :key="`tweet + ${tweet.tweetId}`" >
            <h4>{{ tweet.username }}</h4>
            <p>{{ tweet.content }}</p>
            <p>{{ tweet.createdAt }}</p>
        </div>
    </section>
</template>

<script>
    import cookies from 'vue-cookies'

    export default {
        name: "all-tweets",
        data: function() {
            return {
                loginToken: cookies.get(`loginToken`)
            }
        },

        mounted: function() {
            if(this.loginToken !== null) {
                this.printAllTweetsToFeedPage();
            }
        },

        methods: {
            getAllTweetsFromAPI: function() {
                this.$store.dispatch("allTweetsFromAPI");
            },

            printAllTweetsToFeedPage: function() {
                this.$store.commit("getAllTweets");
            }
        },
        computed: {
            feedTweets() {
                return this.$store.state.allTweets; 
            }
        },
    }
</script>

<style scoped>

</style>