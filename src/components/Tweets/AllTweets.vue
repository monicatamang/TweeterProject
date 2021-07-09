<template>
    <section>
        <tweet-card :tweets="followingTweets"></tweet-card>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import TweetCard from "./TweetCard.vue";

    export default {
        name: "all-tweets",

        components: {
            TweetCard
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                ownerData: cookies.get("userData")
            }
        },

        // Checking to see whether the all the tweets should be filtered based on who the account holder follows
        props: {
            isTweetsFiltered: Boolean
        },

        methods: {
            // Sending an axios request from the store to get all tweets
            getAllTweetsFromAPI() {
                this.$store.dispatch("getAllTweets");
            },

            // Sending an axios request from the store to get all followers
            getUserFollowersFromAPI() {
                this.$store.dispatch("getOwnerFollows", cookies.get("userData").userId);
            },
        },
        
        computed: {
            // Getting all tweets from the store
            allTweetsCreated() {
                return this.$store.state.allTweets;
            },

            // Getting the user's follows from the store
            totalFollows() {
                return this.$store.state.ownerFollowsList;
            },

            // Creating a function that will filter tweets based on whether the account holder follows a certain user
            followingTweets() {
                // If the tweets are supposed to be filtered, store the filtered tweets into a new array
                if(this.isTweetsFiltered) {
                    let filteredTweets = [];
                    for(let i = 0; i < this.totalFollows.length; i++) {
                        for(let j = 0; j < this.allTweetsCreated.length; j++) {
                            if(this.totalFollows[i].userId === this.allTweetsCreated[j].userId) {
                                filteredTweets.unshift(this.allTweetsCreated[j]);
                            }
                        }
                    }

                    // If the account holder has their own tweets, append their tweets to the filteredTweets array as well
                    for(let i = 0; i < this.allTweetsCreated.length; i++) {
                        if(this.allTweetsCreated[i].userId === cookies.get("userData").userId) {
                            filteredTweets.unshift(this.allTweetsCreated[i]);
                        }
                    }

                    // Return the filtered array of tweets
                    return filteredTweets.reverse();
                } 
                
                // If the tweets are not supposed to be filtered, print all tweets to the page
                else {
                    return this.$store.state.allTweets;
                }
            }
        },

        mounted() {
            // If the page refreshes and there are no tweets on the page, call the API from the store to get all tweets
            if(this.allTweetsCreated.length === 0) {
                this.getAllTweetsFromAPI();
            }

            // If the page refreshes and there are no follows, call the API from the store to get the user's follows
            if(this.totalFollows.length === 0) {
                this.getUserFollowersFromAPI();
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 1024px) {
        
        section {
            width: 40%;
        }
    }
</style>