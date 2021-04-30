<template>
    <section>
        <router-link to='/Account'>Back</router-link>
        <h1>Update Password</h1>
        <form action="javascript:void(0)">
            <div>
                <label for="oldPassword">Current Password</label>
                <input type="password" id="oldPassword" @keypress="isTyping = true">
            </div>
            <div>
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" @keypress="isTyping = true">
            </div>
            <input type="submit" id="saveNewPasswordButton" value="Save" @click="updateAccountPassword">
        </form>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Password",

        components: {
            NavigationBar,
        },

        data: function() {
            return {
                isTyping: false,
                userAccountData: cookies.get("userData"),
                updatePasswordStatus: "",
                updateUserPassword: {
                    loginToken: cookies.get("loginToken")
                },
            }
        },

        methods: {
            updateAccountPassword: function() {

                // If the current password the user enters matches the password that is currently stored in the browser then proceed with changing the user's password
                if (document.getElementById("oldPassword").value === this.userAccountData.password) {
                    
                    this.updatePasswordStatus = "Saving";

                    if (document.getElementById("newPassword").value !== null) {
                        this.updateUserPassword.password = document.getElementById("newPassword").value;
                    }

                    axios.request({
                        url: "https://tweeterest.ml/api/users",
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                        },
                        data: this.updateUserPassword
                    }).then((res) => {
                        cookies.set("userData", JSON.stringify(res.data));
                        this.updatePasswordStatus = `Saved.`
                    }).catch((err) => {
                        this.updatePasswordStatus = `${err}. An error occured while trying to save your changes.`;
                    });
                } else {
                    console.log("Not the right password");
                    console.log(this.userAccountData.password);
                }
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

    div {
        display: grid;
    }
</style>