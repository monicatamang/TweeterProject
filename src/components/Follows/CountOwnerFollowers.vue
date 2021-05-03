<template>
    <div>
        <router-link :to="{
            name: 'OwnerFollowersList',
            params: {
                username: ownerData.username,
                followersList: allOwnerFollowers
            }
        }">
            <h4>{{ numberOfFollowers }} Followers</h4>
        </router-link>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "count-owner-followers",

        data() {
            return {
                numberOfFollowers: undefined,
                allOwnerFollowers: [],
                ownerData: cookies.get("userData")
            }
        },

        methods: {
            countOwnerFollowers: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/followers",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: cookies.get("userId")
                    }
                }).then((res) => {
                    this.numberOfFollowers = res.data.length;
                    this.allOwnerFollowers = res.data;
                }).catch((err) => {
                    console.log(err);
                });
            }
        },

        mounted: function() {
            this.countOwnerFollowers();
        },
    }
</script>

<style scoped>

</style>