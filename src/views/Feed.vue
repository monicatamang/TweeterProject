<template>
    <section>
        <page-header title="Feed"></page-header>
        <desktop-nav-bar></desktop-nav-bar>
        <all-tweets :isTweetsFiltered="true"></all-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import PageHeader from "../components/PageHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    import DesktopNavBar from "../components/DesktopNavBar.vue";

    export default {
        name: "Feed",

        components: {
            PageHeader,
            AllTweets,
            NavigationBar,
            DesktopNavBar
        }
    }
</script>

<style scoped>

</style>