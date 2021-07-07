<template>
    <section>
        <desktop-nav-bar></desktop-nav-bar>
        <div id="displayProfileAndTweets">
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
                oneUserProfile: []
            }
        },

        computed: {
            usersProfileImage: function() {
                return this.$route.params.imageUrl;
            },

            usersProfileUsername: function() {
                return this.$route.params.username;
            },

            userIdNum: function() {
                return this.$route.params.userId;
            },

            profileTweets: function() {
                return this.$store.state.allTweets.filter((userTweet) => userTweet.userId === Number(this.userIdNum));
            }
        },

        mounted() {
            let storeUsers = this.$store.state.allUsers.filter((user) => user.userId === this.userIdNum);
            if(storeUsers.length === 0) {
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
                res;
                this.oneUserProfile = res.data
            }).catch((err) => {
                console.log(err);
            });
            } 
            else {
                this.oneUserProfile = storeUsers;
            }

            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null) {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    #displayProfileAndTweets {
        display: none;
    }

    @media only screen and (min-width: 1024px) {

        section {
            display: grid;
            place-items: center;
        }
        
        #displayProfileAndTweets {
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