<template>
    <section>
        <h1>Feed Page</h1>
        <all-tweets></all-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import NavigationBar from "../components/NavigationBar.vue";
    import AllTweets from '../components/AllTweets.vue';

    export default {
        name: "Feed",
        components: {
            NavigationBar,
            AllTweets
        },
    }
</script>

<style scoped>
    
</style>