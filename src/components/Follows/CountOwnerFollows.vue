<template>
    <div>
        <router-link :to="{
            name: 'OwnerFollowingList',
            params: {
                username: ownerData.username,
                followsList: allOwnerFollows
            }
        }">
            <h4>{{ numberOfFollows }} Following</h4>
        </router-link>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "count-owner-follows",

        data: function() {
            return {
                numberOfFollows: undefined,
                allOwnerFollows: [],
                ownerData: cookies.get("userId")
            }
        },

        methods: {
            countOwnerFollows: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/follows",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: cookies.get("userId")
                    }
                }).then((res) => {
                    this.numberOfFollows = res.data.length;
                    this.allOwnerFollows = res.data;
                }).catch((err) => {
                    console.log(err);
                });
            }
        },

        mounted () {
            this.countOwnerFollows();
        },
    }
</script>

<style scoped>

</style>