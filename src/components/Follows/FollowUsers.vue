<template>
    <div v-if="followUserId !== ownerData.userId">
        <button @click="isFollowingUser = !isFollowingUser, checkFollows()" id="followButton">Follow</button>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "follow-users",

        data: function() {
            return {
                // isFollowingUser: false,
                isFollowingUser: JSON.parse(cookies.get("isFollowing")),
                ownerData: cookies.get("userData")
            }
        },

        methods: {
            checkFollows: function() {
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

                        cookies.set("isFollowing", JSON.stringify(true));
                        document.getElementById("followButton").innerHTML = "Following";

                        console.log(this.isFollowingUser);
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

                        cookies.set("isFollowing", JSON.stringify(false));
                        document.getElementById("followButton").innerHTML = "Follow";
                        console.log(this.isFollowingUser);
                        
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        },

        mounted: function() {
            if(this.isFollowingUser) {
                this.isFollowingUser = JSON.parse(cookies.get("isFollowing"));
                document.getElementById("followButton").innerHTML = "Following";
                console.log(this.isFollowingUser);
                    
            } 
                
            else {
                this.isFollowingUser = JSON.parse(cookies.get("isFollowing"));
                document.getElementById("followButton").innerHTML = "Follow";
                console.log(this.isFollowingUser);
            }
        },

        // methods: {
        //     followUser: function() {

        //         if(this.isFollowingUser) {
        //             axios.request({
        //                 url: "https://tweeterest.ml/api/follows",
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
        //                 },
        //                 data: {
        //                     loginToken: cookies.get("loginToken"),
        //                     followId: this.followUserId
        //                 }
        //             }).then((res) => {
        //                 console.log(res);
        //                 document.getElementById("followButton").innerText = "Following";
        //                 console.log("following");
        //                 console.log(this.isFollowingUser);
        //             }).catch((err) => {
        //                 console.log(err);
        //             });
        //         }
        //     },

        //     unfollowUser: function() {
        //         if(!this.isfollowingUser) {
        //             axios.request({
        //                 url: "https://tweeterest.ml/api/follows",
        //                 method: "DELETE",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
        //                 },
        //                 data: {
        //                     loginToken: cookies.get("loginToken"),
        //                     followId: this.followUserId
        //                 }
        //             }).then((res) => {
        //                 console.log(res);
        //                 document.getElementById("followButton").innerText = "Follow";
        //                 console.log("unfollowing");
        //                 console.log(this.isFollowingUser);
        //             }).catch((err) => {
        //                 console.log(err);
        //             });

        //         }
        //     },

        //     checkFollows: function() {
        //         if(this.isFollowingUser) {
        //             this.isfollowingUser = true;
        //             this.followUser();
        //             document.getElementById("followButton").innerText === "Following";
        //         } else {
        //             this.isfollowingUser = false;
        //             this.unfollowUser();
        //             document.getElementById("followButton").innerText === "Follow";
        //         }
        //     },
        // },

        // mounted:function() {
        //     // if(this.isFollowingUser === false && document.getElementById("followButton").innerText === "Follow") {
        //     //     this.followUser();
        //     //     document.getElementById("followButton").innerText === "Following"

        //     // }
        //     // if(this.isFollowingUser === true && document.getElementById("followButton").innerText === "Follow") {
        //     //     document.getElementById("followButton").innerText === "Following"
        //     //     // this.isfollowingUser = true;
        //     //     this.isfollowingUser = false;
        //     //     this.unfollowUser();
        //     // } 
            
        //     // else if (this.isFollowingUser === false && document.getElementById("followButton").innerText === "Following") {
        //     //     document.getElementById("followButton").innerText === "Follow"
        //     //     // this.isfollowingUser = false;
        //     //     this.isfollowingUser = true;
        //     //     this.followUser();
        //     // }

        //     // else if (this.isFollowingUser === false && document.getElementById("followButton").innerText === "Follow") {
        //     //     this.isFollowingUser = true;
        //     //     this.followUser();
        //     // }
        // },

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