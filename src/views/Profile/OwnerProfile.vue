<template>
    <section>
        <profile-details :userProfile="ownerData"></profile-details>
        <tweet-card :tweets="ownerTweets"></tweet-card>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import TweetCard from "../../components/Tweets/TweetCard.vue";
    import ProfileDetails from "../../components/ProfileDetails.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Profile",

        components: {
            ProfileDetails,
            TweetCard,
            NavigationBar
        },

        data() {
            return {
                ownerData: [cookies.get("userData")],
                ownerId: cookies.get("userData").userId
            }
        },

        methods: {
            getTweetsFromAPI() {
                this.$store.dispatch("getAllTweets");
            }
        },

        computed: {
            // Filtering tweets from all the tweets that only belong to the account holder and printing it to the page
            ownerTweets() {
                return this.$store.state.allTweets.filter((singleTweet) => singleTweet.userId === this.ownerId);
            }
        }
    }
</script>

<style scoped>
    /* section {
        display: grid;
        place-items: center;
        row-gap: 10px;
        margin-top: 5vh;
        padding: 0vh 0vh 11vh 0vh;
        background: rgba(245, 245, 245, 0.3);
    } */

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