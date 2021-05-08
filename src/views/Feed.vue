<template>
    <section>
        <article>
            <feed-header></feed-header>
            <!-- <page-header></page-header> -->
            <all-tweets :isTweetsFiltered="true"></all-tweets>
            <navigation-bar></navigation-bar>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import FeedHeader from "../components/Feed/FeedHeader.vue";
    // import PageHeader from "../components/PageHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            FeedHeader,
            // PageHeader,
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
    }
</style>