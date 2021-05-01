<template>
    <section>
        <article v-for="tweet in allUsersTweets" :key="tweet.tweetId">
            <img :src="tweet.userImageUrl" :alt="`User Profile image for`+ tweet.username" id="userProfileImage">
            <h4>{{ tweet.username }}</h4>
            <p>{{ tweet.content }}</p>
            <p>{{ tweet.createdAt }}</p>
            <!-- Add image alt tag -->
            <img :src="tweet.tweetImageUrl" alt="">

            <!-- IF THAT'S THE USER'S ID, SHOW THE EDIT AND DELETE BUTTON -->

            <!-- <div v-if="userId">
                <router-link :to="{ 
                    name: 'EditTweet',
                    params: {
                        tweetId: userTweet.tweetId,
                        userImageUrl: userTweet.userImageUrl,
                        username: userTweet.username,
                        content: userTweet.content,
                        createdAt: userTweet.createdAt,
                        tweetImageUrl: userTweet.tweetImageUrl
                    }
                }">
                <button>Edit</button>
                </router-link>

                <router-link :to="{
                    name: 'DeleteTweet',
                    params: {
                        tweetId: userTweet.tweetId,
                        username: userTweet.username
                    }
                }">
                    <button>Delete</button>
                </router-link>
            </div> -->
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "all-tweets",

        data: function() {
            return {
                userId: cookies.get("userId")
            }
        },

        methods: {
            getAllTweetsFromAPI: function() {
                this.$store.dispatch("getAllTweets");
            }
        },

        computed: {
            allUsersTweets: function() {
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
    }

    img {
        width: 30vw;
    }

    #userProfileImage {
        clip-path: circle();
    }
</style>