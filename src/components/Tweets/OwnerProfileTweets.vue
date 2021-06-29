<template>
    <article id="ownerTweets">
        <!-- <owner-profile-tweets-header id="desktopOwnerTweetsHeader"></owner-profile-tweets-header> -->
        <tweet-card :tweets="ownerTweets"></tweet-card>
    </article>
</template>

<script>
    import cookies from "vue-cookies";
    // import OwnerProfileTweetsHeader from "../Tweets/OwnerProfileTweetsHeader.vue";
    import TweetCard from "./TweetCard.vue";
    // import TweetLikes from "./TweetLikes.vue";

    export default {
        name: "owner-profile-tweets",

        components: {
            // OwnerProfileTweetsHeader,
            TweetCard
            // TweetLikes
        },

        data() {
            return {
                userId: cookies.get("userData").userId,
                userTweetsStatus: "",
            }
        },

        computed: {
            // Filtering tweets from all the tweets that only belong to the account holder and printing it to the page
            ownerTweets() {
                return this.$store.state.allTweets.filter((singleTweet) => singleTweet.userId === this.userId);
            }
        }
    }
</script>

<style scoped>
    /* #ownerTweets {
        display: grid;
        background: rgba(245, 245, 245, 0.3);
        row-gap: 8px;
    }

    .userImage {
        clip-path: circle();
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    .tweetCard {
        display: grid;
        row-gap: 20px;
        width: 95vw;
        border-radius: 10px;
        border: 1px solid rgba(99, 109, 110, 0.15);
        padding: 3vh;
        background: white;
    }

    .userInfoContainer {
        display: grid;
        column-gap: 15px;
        grid-template-columns: 1fr 4fr 1fr;
    }

    .usernameAndDate {
        display: grid;
        row-gap: 2px;
        align-self: start;
    }

    .tweetLikesAndComments {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr;
    }

    .tweetDate {
        font-weight: 300;
        font-size: 0.8rem;
        margin-bottom: 0px;
    }

    .tweetComments {
        text-decoration: none;
        color: #7398A5;
        font-size: 0.9rem;
        width: 10vw;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    .v-list-item {
        display: grid;
        row-gap: 15px;
    }

    .v-list-item__title {
        color: black;
        font-size: 1rem;
    }

    .v-list-item::after {
        content: none;
    }
    
    a {
        text-decoration: none;
    }

    h4 {
        font-size: 0.95rem;
    }

    .tweetContent {
        font-size: 0.9rem;
    }

    #desktopOwnerTweetsHeader {
        display: none;
    } */

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        .tweetCard {
            width: 82vw;
            height: 25vh;
            margin-left: 8vw;
        }

        .userImage {
            width: 65px;
            height: 65px;
        }

        h4 {
            font-size: 1.1rem;
        }

        .usernameAndDate {
            align-self: start;
            margin-top: 0.3vh;
            row-gap: 5px;
        }

        .tweetDate {
            font-size: 0.9rem;
        }

        i {
            font-size: 1.5rem;
            margin-right: -38vw;
        }

        .text-center {
            align-self: start;
            margin-top: 0.3vh;
        }

        .tweetComments {
            font-size: 1rem;
            padding-left: 1vw;
        }

        .tweetContent {
            font-size: 1rem;
            padding-left: 1vw;
        }

        .userInfoContainer {
            grid-template-columns: 1fr 3fr 3fr 1fr;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        .tweetCard {
            width: 88vw;
            height: 30vh;
            margin-left: 10vw;
        }

        .userImage {
            width: 65px;
            height: 65px;
        }

        h4 {
            font-size: 1.1rem;
        }

        .usernameAndDate {
            margin-top: 1.2vh;
            row-gap: 5px;
        }

        i {
            font-size: 1.5rem;
            margin-right: -40vw;
        }

        .text-center {
            align-self: start;
            margin-top: 1.2vh;
        }

        .tweetComments {
            font-size: 1rem;
            padding-left: 1vw;
        }

        .tweetContent {
            font-size: 1rem;
            padding-left: 1vw;
        }

        .userInfoContainer {
            grid-template-columns: 1fr 5fr 5fr 1fr;
        }
    }

    @media only screen and (min-width: 1024px) {

        #desktopOwnerTweetsHeader {
            display: grid;
        }

        #ownerTweets {
            padding-top: 10vh;
        }
        
        .tweetCard {
            width: 50vw;
            margin-left: 35vw;
        }

        .userInfoContainer {
            grid-template-columns: 1fr 15fr auto 1fr;
        }

        .tweetContent, .tweetComments {
            padding-left: 0.5vw;
        }

        .tweetLikesAndComments {
            grid-template-columns: 3fr 3fr 1fr;
        }
    }
</style>