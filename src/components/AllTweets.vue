<template>
    <section>
        <article v-for="tweet in allTweetsCreated" :key="tweet.tweetId">
            
            <!-- If the user's profile picture on the tweet is not theirs, go to the other users' profile pages but if the user's profile picture on the tweet is theirs, go to their own profile page -->
            <router-link :to="{
                name: 'UserProfileDetails',
                params: {
                    imageUrl: tweet.userImageUrl, 
                    username: tweet.username,
                    userId: tweet.userId
                }
            }" v-if="tweet.username !== userData.username">
                <img :src="tweet.userImageUrl" :alt="`Profile image of` + tweet.username" id="userProfileImage">
            </router-link>

            <router-link to="/Profile" v-else>
                <img :src="tweet.userImageUrl" :alt="`User Profile image for` + tweet.username" id="userProfileImage">
            </router-link>

            <h4>@{{ tweet.username }}</h4>
            <p>{{ tweet.content }}</p>
            <p>{{ tweet.createdAt }}</p>
            <img :src="tweet.tweetImageUrl" :alt="`@${tweet.username}'s image attached to this tweet.`">

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

        methods: {
            getAllTweetsFromAPI: function() {
                this.$store.dispatch("getAllTweets");
            },

            // getAllUsersFromAPI: function() {
            //     this.$store.dispatch("getAllUsers");
            // }
        },

        computed: {
            allTweetsCreated: function() {
                return this.$store.state.allTweets; 
            },

            // allTweeterUsers: function() {
            //     return this.$store.state.allUsers;
            // }
        },

        mounted: function() {
            this.getAllTweetsFromAPI();
            // this.getAllUsersFromAPI();
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