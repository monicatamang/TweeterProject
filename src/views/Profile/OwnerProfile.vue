<template>
    <section>
        <owner-profile-details></owner-profile-details>
        <owner-profile-tweets></owner-profile-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import OwnerProfileDetails from "../../components/UserProfiles/OwnerProfileDetails.vue";
    import OwnerProfileTweets from "../../components/Tweets/OwnerProfileTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Profile",

        components: {
            OwnerProfileDetails,
            OwnerProfileTweets,
            NavigationBar
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

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        section {
            padding: 0vh 0vh 20vh 5vh;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        /* section {
            padding: 0vh 0vh 20vh 5vh;
            width: 100%;
        } */
    }
</style>