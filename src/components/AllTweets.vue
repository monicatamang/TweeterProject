<template>
    <section>
        <article v-for="tweet in allTweetsCreated" :key="tweet.tweetId">
            <img :src="tweet.userImageUrl" :alt="`User Profile image for` + tweet.username" id="userProfileImage">
            <h4>{{ tweet.username }}</h4>
            <p>{{ tweet.content }}</p>
            <p>{{ tweet.createdAt }}</p>
            <!-- Add image alt tag -->
            <img :src="tweet.tweetImageUrl" alt="">
            <!-- <all-users></all-users> -->

            <!-- If the tweet belongs to the account holder, the user is allowed to edit and delete their tweets -->
            <div v-if="tweet.username === userData.username">
                <router-link :to="{ 
                    name: 'EditTweet',
                    params: {
                        tweetId: tweet.tweetId,
                        userImageUrl: tweet.userImageUrl,
                        username: tweet.username,
                        content: tweet.content,
                        createdAt: tweet.createdAt,
                        tweetImageUrl: tweet.tweetImageUrl
                    }
                }">
                <button>Edit</button>
                </router-link>

                <router-link :to="{
                    name: 'DeleteTweet',
                    params: {
                        tweetId: tweet.tweetId,
                        username: tweet.username
                    }
                }">
                    <button>Delete</button>
                </router-link>
            </div>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    // import AllUsers from "./AllUsers.vue";

    export default {
        name: "all-tweets",

        data: function() {
            return {
                loginToken: cookies.get("loginToken"),
                userData: cookies.get("userData")
            }
        },

        components: {
            // AllUsers,
        },

        methods: {
            getAllTweetsFromAPI: function() {
                this.$store.dispatch("getAllTweets");
            }
        },

        computed: {
            allTweetsCreated: function() {
                return this.$store.state.allTweets; 
            }
        },

        mounted: function() {
            this.getAllTweetsFromAPI();
        },
    }
</script>

<style scoped>
    article {
        display: grid;
    }

    article, button {
        border: 1px solid black;
        width: 100%;
    }

    img {
        width: 30vw;
    }

    #userProfileImage {
        clip-path: circle();
    }
</style>