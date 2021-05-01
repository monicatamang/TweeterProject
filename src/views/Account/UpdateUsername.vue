<template>
    <div>
        <router-link to="/Account">Back</router-link>
        <h1>Update Username</h1>
        <h3>Current</h3>
        <p>{{ userAccountData.username }}</p>
        <form action="javascript:void(0)">
            <label for="newUsername">Username</label>
            <input type="text" id="newUsername">
            <button @click="updateAccountUsername">Save</button>
        </form>
        <p>{{ updateUsernameStatus }}</p>
        <navigation-bar></navigation-bar>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Username",
        
        components: {
            NavigationBar,
        },

        data: function() {
            return {
                userAccountData: cookies.get("userData"),
                updateUsernameStatus: "",
                updateCurrentUsername: {
                    loginToken: cookies.get("loginToken")
                }
            }
        },

        methods: {
            updateAccountUsername: function() {
                this.updateUsernameStatus = `Saving`
                console.log(document.getElementById("newUsername").value);
                console.log(this.updateCurrentUsername);

                if (document.getElementById("newUsername").value !== "") {
                    this.updateCurrentUsername.username = document.getElementById("newUsername").value;
                }

                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: this.updateCurrentUsername
                }).then((res) => {
                    console.log(res);
                    let updateAccountData = JSON.stringify(res.data);
                    cookies.set("userData", updateAccountData);
                    this.$router.push('Account');
                }).catch((err) => {
                    this.updateCurrentUsernameStatus = "An error occured while trying to save your changes."
                    console.log(err);
                    console.log(cookies.get("userData"));
                });
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
    }

    input {
        border: 1px solid black;
    }
</style>