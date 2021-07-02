<template>
    <section>
        <profile-details :userProfile="oneUserProfile" :followUserId="Number(userIdNum)"></profile-details>
        <tweet-card :tweets="profileTweets"></tweet-card>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import axios from "axios";
    import TweetCard from "../../components/Tweets/TweetCard.vue";
    import ProfileDetails from "../../components/ProfileDetails.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Users-Profiles",

        components: {
            ProfileDetails,
            TweetCard,
            NavigationBar
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
        },
    }
</script>

<style scoped>
    
</style>