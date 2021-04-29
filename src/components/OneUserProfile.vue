<template>
    <article>
        <h3>Email</h3>
        <p>{{ userProfileData[0].email }}</p>
        <h3>Username</h3>
        <p>{{ userProfileData[0].username }}</p>
        <h3>Bio</h3>
        <p>{{ userProfileData[0].bio }}</p>
        <h3>Date of Birth</h3>
        <p>{{ userProfileData[0].birthdate }}</p>
        <h3>Image URL</h3>
        <p>{{ userProfileData[0].imageUrl }}</p>
    </article>
</template>

<script>
    import axios from "axios"
    import cookies from "vue-cookies";

    export default {
        name: "one-user-profile",
        data: function() {
            return {
                userProfileData: [],
            }
        },
        methods: {
            getUserProfile: function() {
                axios.request({
                    url: `https://tweeterest.ml/api/users`,
                    method: `GET`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    // Sending the userId of the user who is currently logged in as params
                    // The user's id was initially set when the user either creates an account or logs in
                    params: {
                        userId: cookies.get(`userId`)
                    }
                }).then((res) => {
                    this.userProfileData = res.data;
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        mounted: function() {
            this.getUserProfile()
        },
    }
</script>

<style scoped>

</style>