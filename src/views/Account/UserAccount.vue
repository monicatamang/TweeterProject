<template>
    <section>
        <h1>Account Page</h1>
        <router-link to="UpdateEmail">
            <div>
                <h4>Email</h4>
                <p>{{ userAccountData.email }}</p>
            </div>
        </router-link>
        <div>
            <h4>Username</h4>
            <p>{{ userAccountData.username }}</p>
        </div>
        <h4>Password</h4>
        <!-- <form action="javascript:void(0)">
            <input type="submit" id="saveAccountButton" value="Save" v-if="isTyping">
            <div>
                <p>Current Email: {{ userAccountData.email }}</p>
                <label for="accountEmail">Email</label>
                <input type="text" id="accountEmail" @keypress="isTyping = true">
            </div>
            <div>
                <p>Current Username: {{ userAccountData.username }}</p>
                <label for="accountUsername">Username</label>
                <input type="text" id="accountUsername" @keypress="isTyping = true">
            </div>
            <div>
                <label for="oldPassword">Current Password</label>
                <input type="password" id="oldPassword" @keypress="isTyping = true">
            </div>
            <div>
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" @keypress="isTyping = true">
            </div>
        </form> -->
        <p>{{ userAccountStatus }}</p>
        <delete-user-profile></delete-user-profile>
        <log-out-user></log-out-user>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios"
    import cookies from "vue-cookies";
    import NavigationBar from "../../components/NavigationBar.vue";
    import LogOutUser from "../../components/LogOutUser.vue";
    import DeleteUserProfile from "../../components/DeleteUserProfile.vue";

    export default {
        name: "User-Account",

        components: {
            NavigationBar,
            LogOutUser,
            DeleteUserProfile
        },

        data: function() {
            return {
                isTyping: false,
                userAccountData: cookies.get("userData"),
                userAccountStatus: "",
                updateUserAccountData: {
                    loginToken: cookies.get("loginToken")
                },
            }
        },

        methods: {
            updateAccountData: function() {

                // Only update the password if the user enters the correct current password
                if (document.getElementById("oldpassword") === this.userAccountData.password) {
                    this.userAccountStatus = "Saving";
                    if (document.getElementById("accountEmail").value !== null) {
                        this.updateUserAccountData.email = document.getElementById("accountEmail").value;
                    

                        if (document.getElementById("accountUsername").value !== null) {
                            this.updateUserAccountData.username = document.getElementById("accountUsername").value;
                        }

                        if (document.getElementById("newPassword").value !== null) {
                            this.updateUserAccountData.password = document.getElementById("newPassword").value;
                        }

                        axios.request({
                            url: "https://tweeterest.ml/api/users",
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                            },
                            data: this.updateUserAccountData
                        }).then((res) => {
                            let updatedAccountData = JSON.stringify(res.data);
                            cookies.set("userData", updatedAccountData);
                        }).catch((err) => {
                            this.userAccountStatus = `${err}. An error occured while trying to save your changes.`;
                        });
                    }
                }
            }
        },
    }
</script>

<style scoped>
    input, textarea {
        border: 1px solid black;
        margin-bottom: 3vh;
    }

    div {
        display: grid;
    }
</style>