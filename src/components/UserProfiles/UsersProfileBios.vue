<template>
    <div>
        <div v-for="user in allUsers" :key="user.userId">
            <p>{{ user.bio }}</p>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "users-profile-bios",

        data() {
            return {
                getAllUserBiosStatus: "",
                allUsers: []
            }
        },

        props: {
            usersIds: Number
        },

        methods: {
            getAllUsersBios: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: this.usersIds
                    }
                }).then((res) => {
                    this.allUsers = res.data;
                }).catch((err) => {
                    console.log(err);
                    this.getAllUserBiosStatus = "Could not load bio.";
                })
            }
        },

        mounted: function() {
            this.getAllUsersBios();
        },
    }
</script>

<style scoped>

</style>