<template>
    <div>
        <button @click="deleteUserProfile">Delete</button>
        <p>{{ deleteUserProfileStatus }}</p>
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: "delete-user-profile",
        data() {
            return {
                deleteUserProfileStatus: ""
            }
        },
        methods: {
            deleteUserProfile: function() {
                axios.request({
                    url: `https://tweeterest.ml/api/users`,
                    method: `DELETE`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get(`loginToken`),
                        password: this.currentUserAccount[0].password
                    }
                }).then((res) => {
                    console.log(res);
                    this.deleteUserProfileStatus = `Your account has been successfully deleted. You will be automatically logged out.`;
                    this.$router.push('/');
                    // ADD POPUP TO CONFIRM DELETION
                }).catch((err) => {
                    console.log(this.currentUserProfile[0].password);
                    this.deleteUserProfileStatus = `Failed to Delete Account.`;
                    console.log(err);
                });
            }
        },
        computed: {
            currentUserAccount: function() {
                return this.$store.state.currentUserProfileData;
            }
        },
    }
</script>

<style scoped>
    button {
        border: 1px solid black;
    }
</style>