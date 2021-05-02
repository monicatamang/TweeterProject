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
        name: "user-profile-bios",

        data() {
            return {
                getAllUserBiosStatus: "",
                allUsers: []
            }
        },

        props: {
            userProfileId: Number
        },

        methods: {
            getAllUserBios: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: this.userProfileId
                    }
                }).then((res) => {
                    this.allUsers = res.data;
                }).catch((err) => {
                    console.log(err);
                    this.getAllUserBiosStatus = "Could not load bio.";
                })
            }
        },

        created: function() {
            this.getAllUserBios();
        },
    }
</script>

<style scoped>

</style>