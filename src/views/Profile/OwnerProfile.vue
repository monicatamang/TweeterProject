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
    section {
        margin-bottom: 7vh;
    }

    @media only screen and (min-width: 768px) {
        
        section {
            margin-bottom: 5vh;
        }
    }
</style>