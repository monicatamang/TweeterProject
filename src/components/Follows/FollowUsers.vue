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
                    console.log(res);
                    this.countFollows = res.data;

                    // Looking through all the account hodler's follows and seeing if the account holder has followed a certain user already
                    for (let i = 0; i < this.countFollows.length; i++) {
                        if(this.countFollows[i].userId === this.followUserId) {
                            this.isFollowingUser = true;
                            document.getElementById(`followButton${this.followUserId}`).innerHTML = "Following";
                        }
                    }

                    // this.$store.commit("updateOwnerFollows", res.data.length);

                    // Updating the amount of follows to the page
                    this.displayFollows = res.data.length;
                }).catch((err) => {
                    console.log(err);
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
                        console.log(res);

                        this.isFollowingUser = true;
                        this.displayFollows++;

                        // this.$store.commit("addOwnerFollows");

                        document.getElementById(`followButton${this.followUserId}`).innerHTML = "Following";
                    }).catch((err) => {
                        console.log(err);
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
                        console.log(res);

                        this.isFollowingUser = false;
                        this.displayFollows--;

                        // this.$store.commit("subtractOwnerFollows");

                        document.getElementById(`followButton${this.followUserId}`).innerHTML = "Follow";
                    }).catch((err) => {
                        console.log(err);
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
    button {
        border: 1px solid black;
    }
</style>