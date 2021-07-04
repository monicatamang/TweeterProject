<template>
    <section>
        <page-header title="Home"></page-header>
        <desktop-nav-bar></desktop-nav-bar>
        <all-tweets :isTweetsFiltered="true"></all-tweets>
        <!-- <div id="displayProfileAndTweets">
            <profile-details :userProfile="ownerData"></profile-details>
            <div></div>
            <all-tweets :isTweetsFiltered="true"></all-tweets>
        </div> -->
        <!-- <div id="mobileTweets">
            <all-tweets :isTweetsFiltered="true"></all-tweets>
        </div> -->
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import PageHeader from "../components/PageHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    import DesktopNavBar from "../components/DesktopNavBar.vue";
    // import ProfileDetails from "../components/ProfileDetails.vue";

    export default {
        name: "Feed",

        components: {
            PageHeader,
            AllTweets,
            NavigationBar,
            DesktopNavBar,
            // ProfileDetails
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