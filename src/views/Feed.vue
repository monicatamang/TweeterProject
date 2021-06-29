<template>
    <section>
        <page-header title="Feed"></page-header>
        <all-tweets :isTweetsFiltered="true"></all-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import PageHeader from "../components/PageHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            PageHeader,
            AllTweets,
            NavigationBar
        }
    }
</script>

<style scoped>
   
</style>