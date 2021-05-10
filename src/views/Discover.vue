<template>
    <section>
        <discover-header></discover-header>
        <div>
            <owner-profile-details id="ownerProfile"></owner-profile-details>
            <all-tweets></all-tweets>
            <navigation-bar id="mobileAndTabletNavBar"></navigation-bar>
            <desktop-navigation-bar id="desktopNavBar"></desktop-navigation-bar>
        </div>
    </section>
</template>

<script>
    import DiscoverHeader from "../components/Discover/DiscoverHeader.vue";
    import OwnerProfileDetails from "../components/UserProfiles/OwnerProfileDetails.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    import DesktopNavigationBar from "../components/DesktopNavigationBar.vue";

    export default {
        name: "Discover",

        components: {
            DiscoverHeader,
            OwnerProfileDetails,
            AllTweets,
            NavigationBar,
            DesktopNavigationBar
        },
    }
</script>

<style scoped>
    section {
        background: rgba(245, 245, 245, 0.3);
    }

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