<template>
    <section>
        <discover-header></discover-header>
        <all-tweets></all-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import DiscoverHeader from "../components/Discover/DiscoverHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Discover",

        components: {
            DiscoverHeader,
            AllTweets,
            NavigationBar
        },
    }
</script>

<style scoped>
    section {
        background: rgba(245, 245, 245, 0.3);
    }
</style>