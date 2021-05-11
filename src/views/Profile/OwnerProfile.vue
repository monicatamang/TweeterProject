<template>
    <section>
        <owner-profile-details></owner-profile-details>
        <owner-profile-tweets></owner-profile-tweets>
        <navigation-bar id="mobileAndTabletNavBar"></navigation-bar>
        <desktop-navigation-bar id="desktopNavBar"></desktop-navigation-bar>
    </section>
</template>

<script>
    import OwnerProfileDetails from "../../components/UserProfiles/OwnerProfileDetails.vue";
    import OwnerProfileTweets from "../../components/Tweets/OwnerProfileTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";
    import DesktopNavigationBar from "../../components/DesktopNavigationBar.vue";

    export default {
        name: "Profile",

        components: {
            OwnerProfileDetails,
            OwnerProfileTweets,
            NavigationBar,
            DesktopNavigationBar
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 10px;
        margin-top: 5vh;
        padding: 0vh 0vh 11vh 0vh;
        background: rgba(245, 245, 245, 0.3);
    }

    #desktopNavBar {
        display: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        section {
            padding: 0vh 0vh 20vh 5vh;
        }
    }

    @media only screen and (min-width: 1024px) {

        #mobileAndTabletNavBar {
            display: none;
        }

        #desktopNavBar {
            display: grid;
        }

        section {
            width: 23.6vw;
        }
    }
</style>