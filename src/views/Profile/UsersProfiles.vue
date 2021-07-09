<template>
    <section>
        <desktop-nav-bar></desktop-nav-bar>
        <!-- Display this section only if the viewport is 1024px or above -->
        <div id="displayProfileAndTweetsDesktop" v-if="screensize >= 1024">
            <profile-details :userProfile="oneUserProfile" :followUserId="Number(userIdNum)"></profile-details>
            <div></div>
            <tweet-card :tweets="profileTweets"></tweet-card>
        </div>
        <div id="mobileTweets">
            <profile-details :userProfile="oneUserProfile" :followUserId="Number(userIdNum)"></profile-details>
            <tweet-card :tweets="profileTweets"></tweet-card>
        </div>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import axios from "axios";
    import TweetCard from "../../components/Tweets/TweetCard.vue";
    import ProfileDetails from "../../components/ProfileDetails.vue";
    import NavigationBar from "../../components/NavigationBar.vue";
    import DesktopNavBar from "../../components/DesktopNavBar.vue";

    export default {
        name: "Users-Profiles",

        components: {
            ProfileDetails,
            TweetCard,
            NavigationBar,
            DesktopNavBar
        },

        data() {
            return {
                ownerId: cookies.get("userData").userId,
                oneUserProfile: [],
                screensize: window.innerWidth
            }
        },

        methods: {
            // Creating a function that will store the size of the viewport as a variable
            handleResize() {
                this.screensize = window.innerWidth;
            }
        },

        computed: {
            // Getting the user's id from the route
            userIdNum() {
                return this.$route.params.userId;
            },

            // Filtering the user's tweets based on their id
            profileTweets() {
                return this.$store.state.allTweets.filter((userTweet) => userTweet.userId === Number(this.userIdNum));
            },
        },

        mounted() {
            // If the page refreshes, get all users from the store and filter the users based on their id
            let storeUsers = this.$store.state.allUsers.filter((user) => user.userId === this.userIdNum);
            // If there are no users in the stored in the store, send an axios request to get all users
            if(storeUsers.length === 0) {
                // Configuring the request with the url, type and user id
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/users`,
                method: "GET",
                headers: {
                        "Content-Type": "application/json"
                    },
                params: {
                    userId: this.userIdNum
                }
            }).then((res) => {
                // If the network is done and there are no errors, store the returned data as a variable
                this.oneUserProfile = res.data;
                res;
            }).catch((err) => {
                err;
            });
            }
            // If there are users stored in the store, get the users from the store
            else {
                this.oneUserProfile = storeUsers;
            }

            // Listening for when the viewport size has changed
            window.addEventListener("resize", this.handleResize);

            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null) {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    #displayProfileAndTweetsDesktop {
        display: none;
    }

    @media only screen and (min-width: 1024px) {

        section {
            display: grid;
            place-items: center;
        }
        
        #displayProfileAndTweetsDesktop {
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