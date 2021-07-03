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

        data: function() {
            return {
                loginToken: cookies.get("loginToken"),
                ownerData: cookies.get("userData")
            }
        },

        // Recieving a boolean value from the Feed view which allows certain tweets to be shown on the Feed page if the account holder is following certain users
        props: {
            isTweetsFiltered: Boolean
        },

        methods: {
            getAllTweetsFromAPI() {
                this.$store.dispatch("getAllTweets");
            },

            getUserFollowersFromAPI() {
                this.$store.dispatch("getOwnerFollows", cookies.get("userData").userId);
            },
        },
        
        computed: {
            allTweetsCreated() {
                return this.$store.state.allTweets;
            },

            totalFollows() {
                return this.$store.state.ownerFollowsList;
            },

            followingTweets() {
                // If the tweets are supposed to be filtered, check to see if any users that the account holder is following, has created a tweet and append that tweet to the filteredTweets array
                if(this.isTweetsFiltered) {
                    let filteredTweets = [];
                    for(let i = 0; i < this.totalFollows.length; i++) {
                        for(let j = 0; j < this.allTweetsCreated.length; j++) {
                            if(this.totalFollows[i].userId === this.allTweetsCreated[j].userId) {
                                filteredTweets.unshift(this.allTweetsCreated[j]);
                            }
                        }
                    }

                    // If the account holder has created tweets, append that tweet to the filteredTweets array as well
                    for(let i = 0; i < this.allTweetsCreated.length; i++) {
                        if(this.allTweetsCreated[i].userId === cookies.get("userData").userId) {
                            filteredTweets.unshift(this.allTweetsCreated[i]);
                        }
                    }
                    return filteredTweets;
                } 
                
                // If the tweets are not supposed to be filtered, print all tweets to the page
                else {
                    return this.$store.state.allTweets;
                }
            }
        },
    }
</script>

<style scoped>
    
</style>