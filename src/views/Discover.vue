<template>
    <div>
        <page-header></page-header>
        <!-- <all-tweets></all-tweets> -->
        <navigation-bar></navigation-bar>
    </div>
</template>

<script>
    import PageHeader from "../components/PageHeader.vue";
    // import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    export default {
        name: "Discover",

        components: {
            PageHeader,
            // AllTweets,
            NavigationBar
        },
    }
</script>

<style scoped>

</style>