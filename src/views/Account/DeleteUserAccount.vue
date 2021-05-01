<template>
    <section>
        <h1>Delete Account Page</h1>
        <h4>Verify your password</h4>
        <p>Re-enter your Tweeter password to delete your account.</p>
        <input type="password" id="deleteAccountPassword" placeholder="password">
        <button @click="deleteUserProfile">Confirm</button>
        <router-link to="/Account">Cancel</router-link>
    </section>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: "delete-user-profile",
        data() {
            return {
                deleteUserAccountStatus: ""
            }
        },
        methods: {
            deleteUserProfile: function() {
                this.deleteUserAccountStatus = "Deleting Account"

                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: `DELETE`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        password: document.getElementById("deleteAccountPassword").value
                    }
                }).then((res) => {
                    console.log(res);
                    this.deleteUserAccountStatus = "Your account has been successfully deleted. You will be logged out automatically.";
                    this.$router.push('/');
                }).catch((err) => {
                    this.deleteUserAccountStatus = "Failed to Delete Account.";
                    console.log(err);
                });
            }
        },
    }
</script>

<style scoped>
    button {
        border: 1px solid black;
    }

    section {
        display: grid;
        place-items: center;
    }

    input {
        border: 1px solid black;
    }

    div {
        display: grid;
    }
</style>