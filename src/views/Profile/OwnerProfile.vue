<template>
    <section>
        <desktop-nav-bar></desktop-nav-bar>
        <div id="displayProfileAndTweets">
            <profile-details :userProfile="ownerData"></profile-details>
            <div></div>
            <tweet-card :tweets="ownerTweets"></tweet-card>
        </div>
        <div id="mobileTweets">
            <profile-details :userProfile="ownerData"></profile-details>
            <tweet-card :tweets="ownerTweets"></tweet-card>
        </div>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import TweetCard from "../../components/Tweets/TweetCard.vue";
    import ProfileDetails from "../../components/ProfileDetails.vue";
    import NavigationBar from "../../components/NavigationBar.vue";
    import DesktopNavBar from "../../components/DesktopNavBar.vue";

    export default {
        name: "Profile",

        components: {
            ProfileDetails,
            TweetCard,
            NavigationBar,
            DesktopNavBar
        },

        data() {
            return {
                ownerData: [cookies.get("userData")],
                ownerId: cookies.get("userData").userId
            }
        },

        methods: {
            // Making an axios request from the store to get all tweets
            getTweetsFromAPI() {
                this.$store.dispatch("getAllTweets");
            }
        },

        computed: {
            // Filtering tweets from all the tweets that only belong to the account holder and printing it to the page
            ownerTweets() {
                return this.$store.state.allTweets.filter((singleTweet) => singleTweet.userId === this.ownerId);
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null) {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    section {
        margin-bottom: 7vh;
    }

    #displayProfileAndTweets {
        display: none;
    }

    @media only screen and (min-width: 768px) {
        
        section {
            margin-bottom: 5vh;
        }
    }

    @media only screen and (min-width: 1024px) {

        section {
            display: grid;
            place-items: center;
        }
        
        #displayProfileAndTweets {
            display: grid;
            place-items: center;
            grid-template-columns: 1fr 1fr;
            width: 80%;
        }

        #mobileTweets {
            display: none;
        }
    }
</style>