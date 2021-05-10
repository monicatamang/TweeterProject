<template>
    <div>
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

        props: {
            followUserId: Number
        },

        methods: {
            getAllFollowsFromAPI: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: cookies.get("userData").userId
                    }
                }).then((res) => {
                    res;

                    this.countFollows = res.data;

                    // Looking through all the account hodler's follows and seeing if the account holder has followed a certain user already
                    for (let i = 0; i < this.countFollows.length; i++) {
                        if(this.countFollows[i].userId === this.followUserId) {
                            this.isFollowingUser = true;
                            document.getElementById(`followButton${this.followUserId}`).innerHTML = "Following";
                            document.getElementById(`followButton${this.followUserId}`).style.background = "#9FBFCC";
                            document.getElementById(`followButton${this.followUserId}`).style.color = "white";
                            document.getElementById(`followButton${this.followUserId}`).style.border = "1px solid #9FBFCC";
                        }
                    }

                    // this.$store.commit("updateOwnerFollows", res.data.length);

                    // Updating the amount of follows to the page
                    this.displayFollows = res.data.length;
                }).catch((err) => {
                    err;
                });
            },

            checkFollows: function() {
                if(!this.isFollowingUser) {
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
                        res;

                        this.isFollowingUser = true;
                        this.displayFollows++;

                        // this.$store.commit("addOwnerFollows");

                        document.getElementById(`followButton${this.followUserId}`).innerHTML = "Following";

                        document.getElementById(`followButton${this.followUserId}`).style.background = "#9FBFCC";
                        document.getElementById(`followButton${this.followUserId}`).style.color = "white";
                        document.getElementById(`followButton${this.followUserId}`).style.border = "1px solid #9FBFCC";
                    }).catch((err) => {
                        err;
                    });
                } 

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
                        res;

                        this.isFollowingUser = false;
                        this.displayFollows--;

                        // this.$store.commit("subtractOwnerFollows");

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
            // When the page refreshes send the API request to get all the account holder's follows
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