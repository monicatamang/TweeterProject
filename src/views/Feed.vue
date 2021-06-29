<template>
    <section>
        <feed-header title="Feed"></feed-header>
        <tweet-card :tweets="followingTweets"></tweet-card>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import FeedHeader from "../components/PageHeader.vue";
    import TweetCard from "../components/Tweets/TweetCard.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            FeedHeader,
            TweetCard,
            NavigationBar
        },

        data: function() {
            return {
                loginToken: cookies.get("userData").loginToken
            }
        },

        methods: {
            getAllTweetsFromAPI() {
                this.$store.dispatch("getAllTweets");
            },

            getUserFollowersFromAPI() {
                this.$store.dispatch("getOwnerFollows", cookies.get("userData").userId);
            }
        },

        computed: {
            allTweetsCreated() {
                return this.$store.state.allTweets; 
            },

            totalFollows: function() {
                return this.$store.state.ownerFollowsList;
            },

            followingTweets() {
                let filteredTweets = [];
                for(let i = 0; i < this.totalFollows.length; i++) {
                    for(let j = 0; j < this.allTweetsCreated.length; j++) {
                        if(this.totalFollows[i].userId === this.allTweetsCreated[j].userId) {
                            filteredTweets.unshift(this.allTweetsCreated[j]);
                        }
                    }
                }

                for(let i = 0; i < this.allTweetsCreated.length; i++) {
                    if(this.allTweetsCreated[i].userId === cookies.get("userData").userId) {
                        filteredTweets.unshift(this.allTweetsCreated[i]);
                    }
                }
                
                return filteredTweets;
            }
        },
    }
</script>

<style scoped>
   
</style>