<template>
    <div>
        <button @click="backToPreviousPage">Back</button>
        <h1>Tweet Page</h1>
        <router-link :to="{
            name: 'UsersProfileDetails',
            params: {
                tweetId: usersTweetId,
                userId: usersUserId,
                imageUrl: usersProfileImage, 
                username: tweetUsername,
            }
        }" v-if="tweetUsername !== ownerData.username">
                <img :src="usersProfileImage" :alt="`Profile image of ${tweetUsername}`" id="userProfileImage">
        </router-link>

        <router-link to="/Profile" v-else>
            <img :src="usersProfileImage" :alt="`User Profile image for ${tweetUsername}`" id="userProfileImage">
        </router-link>

        <!-- <h4  @onload="getUsersDataFromAPI">@{{ tweetUsername }}</h4>
        <p  @onload="getUsersDataFromAPI">{{ tweetContent }}</p>
        <p  @onload="getUsersDataFromAPI">{{ tweetCreationDate }}</p>
        <p  @onload="getUsersDataFromAPI">{{ tweetImage }}</p> -->

        <!-- If the user refreshes the page and the parameters being passed to the UsersTweet view is defined, print it on the view, else, make an API call to retrieve the data and pass it to the UsersTweet view -->
        <!-- <div v-if="tweetUsername !== undefined || tweetContent !== undefined || tweetCreationDate !== undefined || tweetImage !== undefined">
            <h4>@{{ tweetUsername }}</h4>
            <p>{{ tweetContent }}</p>
            <p>{{ tweetCreationDate }}</p>
            <p>{{ tweetImage }}</p>
        </div> -->

        <div @onload="getUsersDataFromAPI">
            <h4>@{{ tweetUsername }}</h4>
            <p>{{ tweetContent }}</p>
            <p>{{ tweetCreationDate }}</p>
            <p>{{ tweetImage }}</p>
        </div>

        <!-- <article v-else>
            <div v-for="userTweet in usersTweetsCreated" :key="userTweet.tweetId">
                <h4>@{{ userTweet.username }}</h4>
                <p>{{ userTweet.content }}</p>
                <p>{{ userTweet.createdAt }}</p>
                <p>{{ userTweet.tweetImageUrl }}</p>
            </div>
        </article> -->

        <!-- Edit button -->
        <div v-if="tweetUsername === ownerData.username">
            <router-link :to="{ 
                name: 'EditTweet',
                params: {
                    tweetId: usersTweetId,
                    userImageUrl: usersProfileImage,
                    username: tweetUsername,
                    content: tweetContent,
                    createdAt: tweetCreationDate,
                    tweetImageUrl: tweetImage
                }
            }">
                <button>Edit</button>
            </router-link>
        
        <!-- Delete button -->
            <router-link :to="{
                name: 'DeleteTweet',
                params: {
                    tweetId: usersTweetId,
                    username: tweetUsername
                }
            }">
                <button>Delete</button>
            </router-link>
        </div>

        <!-- <comments-on-tweets :idOfTweet="usersTweetId"></comments-on-tweets> -->
        
        <!-- <create-comments :usernameOfTweet="tweetUsername" :idOfTweet="usersTweetId"></create-comments> -->
        <navigation-bar></navigation-bar>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    // import PrintUsersTweet from "../../components/Tweets/PrintUsersTweet.vue";
    // import CreateComments from "../../components/Comments/CreateComments.vue";
    // import CommentsOnTweets from "../../components/Comments/CommentsOnTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Tweet",

        data: function() {
            return {
                ownerData: cookies.get("userData"),
                // allTweetsFromAPI: []
                usersTweetsCreated: []
            }
        },

        components: {
            // PrintUsersTweet,
            // CreateComments,
            // CommentsOnTweets,
            NavigationBar
        },

        methods: {
            backToPreviousPage: function() {
                this.$router.go(-1);
            },

            getUsersDataFromAPI: function() {
                if(this.usersTweetId === undefined || this.usersUserId === undefined || this.usersProfileImage === undefined || this.tweetUsername === undefined || this.tweetContent === undefined || this.tweetCreationDate === undefined || this.tweetImage === undefined) {
                    axios.request({
                        url: "https://tweeterest.ml/api/tweets",
                        method: "GET",
                        headers: {
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                        },
                        params: {
                            userId: this.usersUserId
                        }
                    }).then((res) => {
                        this.usersTweetsCreated = res.data;
                        console.log("Working");
                    }).catch((err) => {
                        console.log("notWorking");
                        console.log(this.userId);
                        console.log(err);
                    });
                }
            },

            // sendAPIRequest: function() {
            //     if(this.usersTweetId === undefined || this.usersUserId === undefined || this.usersProfileImage === undefined || this.usersProfileImage === undefined) {

            //     }
            // }
        },

        computed: {
            usersTweetId: function() {
                return this.$route.params.tweetId; 
            },

            usersUserId: function() {
                return this.$route.params.userId; 
            },

            usersProfileImage: function() {
                return this.$route.params.userImageUrl; 
            },

            tweetUsername: function() {
                return this.$route.params.username; 
            },

            tweetContent: function() {
                return this.$route.params.content; 
            },

            tweetCreationDate: function() {
                return this.$route.params.createdAt; 
            },

            tweetImage: function() {
                return this.$route.params.tweetImageUrl;
            },

            // allTweetsFromStore: function() {
            //     return this.$route.params.allTweets;
            // }
        },
    }
</script>

<style scoped>
    img {
        /* clip-path: circle(); */
        width: 50vw;
    }

    button {
        border: 1px solid black;
    }
</style>