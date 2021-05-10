<template>
    <section>
        <feed-header></feed-header>
        <div>
            <all-tweets :isTweetsFiltered="true"></all-tweets>
            <navigation-bar></navigation-bar>
        </div>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import FeedHeader from "../components/Feed/FeedHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            FeedHeader,
            AllTweets,
            NavigationBar
        },

        data: function() {
            return {
                loginToken: cookies.get("loginToken")
            }
        },
    }
</script>

<style scoped>
    section {
        background: rgba(245, 245, 245, 0.3);
        padding-bottom: 5.5vh;
    }
</style>