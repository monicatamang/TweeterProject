<template>
    <div>
        <!-- Add "follow" buttons on users' profiles, not including the account holder's profile -->
        <button v-if="followUserId !== ownerData.userId" @click="checkFollows" :id="`followButton${followUserId}`">Follow</button>
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
                ownerData: cookies.get("userData"),
                countFollows: [],
                displayFollows: 0
            }
        },

        // Receiving the follow user id from the UsersProfile view
        props: {
            followUserId: Number
        },

        methods: {
            getAllFollowsFromAPI: function() {
                // Sending an axios request that gets all the users that the account holder is following
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/follows`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    params: {
                        userId: cookies.get("userData").userId
                    }
                }).then((res) => {
                    res;
                    this.countFollows = res.data;

                    // Checking to see if the account holder is already following a user on their follows list
                    for (let i = 0; i < this.countFollows.length; i++) {
                        if(this.countFollows[i].userId === this.followUserId) {
                            this.isFollowingUser = true;
                            document.getElementById(`followButton${this.followUserId}`).innerHTML = "Following";
                            document.getElementById(`followButton${this.followUserId}`).style.background = "#9FBFCC";
                            document.getElementById(`followButton${this.followUserId}`).style.color = "white";
                            document.getElementById(`followButton${this.followUserId}`).style.border = "1px solid #9FBFCC";
                        }
                    }

                    // Updating the amount of follows that the account holder currently has
                    this.displayFollows = res.data.length;
                }).catch((err) => {
                    err;
                });
            },

            // On click, if the account holder is not following a user, send an axios request that "creates" a follow
            checkFollows: function() {
                if(!this.isFollowingUser) {
                    axios.request({
                        url: `${process.env.VUE_APP_API_URL}/follows`,
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            followId: this.followUserId
                        }
                    }).then((res) => {
                        res;

                        // If the network is done and no errors occur, increase the number of follows the account holder has by one
                        this.isFollowingUser = true;
                        this.displayFollows++;

                        // Change the button text and colour when the account holder follows another user
                        document.getElementById(`followButton${this.followUserId}`).innerHTML = "Following";
                        document.getElementById(`followButton${this.followUserId}`).style.background = "#9FBFCC";
                        document.getElementById(`followButton${this.followUserId}`).style.color = "white";
                        document.getElementById(`followButton${this.followUserId}`).style.border = "1px solid #9FBFCC";
                    }).catch((err) => {
                        err;
                    });
                } 

                else {
                    // On click, if the account holder is already following a user, send an axios that "deletes" a follow
                    axios.request({
                        url: `${process.env.VUE_APP_API_URL}/follows`,
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: {
                            loginToken: cookies.get("loginToken"),
                            followId: this.followUserId
                        }
                    }).then((res) => {
                        res;
                         // If the network is done and no errors occur, decrease the number of follows the account holder has by one
                        this.isFollowingUser = false;
                        this.displayFollows--;

                        // Change the button text and colour when the account holder unfollows another user
                        document.getElementById(`followButton${this.followUserId}`).innerHTML = "Follow";
                        document.getElementById(`followButton${this.followUserId}`).style.background = "white";
                        document.getElementById(`followButton${this.followUserId}`).style.color = "#7398A5";
                        document.getElementById(`followButton${this.followUserId}`).style.border = "1px solid #9FBFCC";
                    }).catch((err) => {
                        err;
                    });
                }
            }
        },

        mounted: function() {
            // When the page refreshes, send an axios request to get all the users the account holder follows and avoid data being undefined
            this.getAllFollowsFromAPI();
        },
    }
</script>

<style scoped>
    div {
        display: grid;
        place-items: center;
    }

    button {
        color: #7398A5;
        font-size: 0.9rem;
        border: 1px solid #9FBFCC;
        border-radius: 30px;
        width: 55vw;
        padding: 1vh 0vh;
        text-align: center;
        margin-top: 3vh;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        div {
            width: 85vw;
            margin-left: 15vw;
            row-gap: 40px;
        }

        button {
            width: 30vw;
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        div {
            width: 90vw;
            margin-left: 10vw;
            row-gap: 40px;
            padding-top: 0vh;
        }

        button {
            width: 25vw;
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        div {
            width: 73.3vw;
            margin-left: 25vw;
        }

        button {
            width: 10vw;
            font-size: 0.8rem;
            padding: 1vh;
        }
    }
</style>