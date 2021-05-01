<template>
    <section>
        <article v-if="!loginToken">
            <p>Please login</p>
            <router-link to="/Login">Login</router-link>
        </article>
        <article v-else>
            <h1>Feed Page</h1>
            <!-- <all-users></all-users> -->
            <div v-for="tweet in allUserTweets" :key="tweet.tweetId" id="tweetCard">
                <div id="userDetailsInTweet">
                    <div id="emptyCircle"></div>
                    <h4>{{ tweet.username }}</h4>
                    <div></div>
                    <button>Edit</button>
                </div>
                <p>{{ tweet.content }}</p>
                <img :src="tweet.imageUrl" alt="User Image">
                <p>{{ tweet.createdAt }}</p>
            </div>
            <!-- <create-tweet @userCreatedTweet="printUserTweet"></create-tweet> -->
            <!-- <navigation-bar @printUserTweet="userTweeterTweet"></navigation-bar> -->
            <navigation-bar></navigation-bar>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    // import AllUsers from "../components/AllUsers.vue";
    // import CreateTweet from "../components/CreateTweet.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Feed",

        components: {
            // AllUsers,
            // CreateTweet,
            NavigationBar,
        },

        data: function() {
            return {
                loginToken: cookies.get("loginToken"),
                // userTweetDetails: {}
            }
        },

        computed: {
            allUserTweets: function() {
                return this.$store.state.userTweets;
            }
        },

        // methods: {
        //     printUserTweet: function(data) {
        //         this.userTweetDetails = data;
        //         // console.log(this.userTweetDetails.username);
        //     }
        // },
    }
</script>

<style scoped>
    #tweetCard {
        border: 1px solid black;
    }

    #emptyCircle {
        width: 30px;
        height: 30px;
        background: skyblue;
        border-radius: 100%; 
    }

    #userDetailsInTweet {
        display: grid;
        grid-template-columns: 1fr 1fr 4fr 2fr;
    }
</style>