<template>
    <div>
        <button @click="followUser" id="followButton">Follow</button>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "follow-users",

        data: function() {
            return {
                isFollowingUser: false
            }
        },

        props: {
            followUserId: Number
        },

        methods: {
            followUser: function() {

                // If the account holder is following another user, then send a POST request to create a follow relationship with that user and change the button text to "Following"
                if (this.isFollowingUser) {
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
                        document.getElementById("followButton").innerText = "Following";
                    }).catch((err) => {
                        console.log(err);
                    });
                } 

                // If the account holder un-follows a user, then send DELETE request to delete a follow relationship with that user and change the button text back to "Follow"
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
                        document.getElementById("followButton").innerText = "Follow";
                    }).catch((err) => {
                        console.log(err);
                    });

                }
            }
        },
    }
</script>

<style scoped>
    button {
        border: 1px solid black;
    }
</style>