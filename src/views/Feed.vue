<template>
    <section>
        <feed-header title="Feed"></feed-header>
        <div>
            <owner-profile-details id="ownerProfile"></owner-profile-details>
            <all-tweets :isTweetsFiltered="true"></all-tweets>
            <!-- <all-tweets></all-tweets> -->
            <navigation-bar id="mobileAndTabletNavBar"></navigation-bar>
            <desktop-navigation-bar id="desktopNavBar"></desktop-navigation-bar>
        </div>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import FeedHeader from "../components/Feed/FeedHeader.vue";
    import OwnerProfileDetails from "../components/UserProfiles/OwnerProfileDetails.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    import DesktopNavigationBar from "../components/DesktopNavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            FeedHeader,
            OwnerProfileDetails,
            AllTweets,
            NavigationBar,
            DesktopNavigationBar
        },

        data: function() {
            return {
                loginToken: cookies.get("loginToken")
            }
        },
    }
</script>

<style scoped>
    /* section {
        background: var(--backgroundColor);
        padding-bottom: 5.5vh;
    } */

    #ownerProfile, #desktopNavBar {
        display: none;
    }

    @media only screen and (min-width: 1024px) {

        #mobileAndTabletNavBar {
            display: none;
        }

        #ownerProfile, #desktopNavBar {
            display: grid;
        }
    }
</style>