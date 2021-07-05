<template>
    <section>
        <page-header title="Home"></page-header>
        <desktop-nav-bar></desktop-nav-bar>
        <all-tweets :isTweetsFiltered="true"></all-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
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
        },

        data() {
            return {
                ownerData: [cookies.get("userData")]
            }
        },
    }
</script>

<style scoped>
    @media only screen and (min-width: 1024px) {

        section {
            display: grid;
            place-items: center;
        }
    }
</style>