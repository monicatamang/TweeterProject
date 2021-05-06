<template>
    <div>
        <button v-if="followUserId !== ownerData.userId" @click="isFollowingUser = !isFollowingUser, checkFollows()" :id="`followUser${followUserId}`">Follow</button>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "follow-users",

        data: function() {
            return {
                isFollowingUser: false,
                ownerData: cookies.get("userData")
            }
        },

        methods: {
            checkFollows: function() {
                // If the account holder is following a user, send a POST request to the API and set the cookie value to true and the button text to "Following"
                if(this.isFollowingUser) {
                    axios.request({
                        url: "https://tweeterest.ml/api/follows",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            followId: this.followUserId
                        }
                    }).then((res) => {
                        console.log(res);

                        // cookies.set("isFollowing", JSON.stringify(true));
                        document.getElementById(`followUser${this.followUserId}`).innerHTML = "Following";

                        // console.log(this.isFollowingUser);
                    }).catch((err) => {
                        console.log(err);
                    });
                } 
                
                // If the account holder unfollows a user, send a DELETE request to the API and set the cookies value to false and the button text to "Follow"
                else {
                    axios.request({
                        url: "https://tweeterest.ml/api/follows",
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            followId: this.followUserId
                        }
                    }).then((res) => {
                        console.log(res);

                        document.getElementById(`followUser${this.followUserId}`).innerHTML = "Follow";
                        console.log(this.isFollowingUser);
                        
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        },


        // The following lines of code will run when the page refreshes in order to keep track of the account holder's follows and un-follows
        mounted: function() {
            // If the account holder is following another user, get the cookie that is storing the value of true and change the button text to "Following"
            if(this.isFollowingUser) {
                // this.isFollowingUser = JSON.parse(cookies.get("isFollowing"));
                document.getElementById(`followUser${this.followUserId}`).innerHTML = "Following";
                console.log(this.isFollowingUser);
                    
            } 

            // If the account holder has unfollowed another user, get the cookie that is storing the value of false and change the button text to "Follow"    
            else {
                // this.isFollowingUser = JSON.parse(cookies.get("isFollowing"));
                document.getElementById(`followUser${this.followUserId}`).innerHTML = "Follow";
                console.log(this.isFollowingUser);
            }
        },

        computed: {
            followUserId: function() {
                return Number(this.$route.params.userId); 
            }
        },
    }
</script>

<style scoped>
    button {
        border: 1px solid black;
    }
</style>