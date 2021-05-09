<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
            <h3>Change Password</h3>
        </div>
        <form action="javascript:void(0)">
            <div>
                <label for="oldPassword">Current Password</label>
                <input type="password" id="oldPassword">
            </div>
            <div>
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword">
            </div>
            <button @click="updateAccountPassword">Save</button>
        </form>
        <p>{{ updatePasswordStatus }}</p>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButtonHeader from "../../components/BackButtonHeader.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Password",

        components: {
            BackButtonHeader,
            NavigationBar
        },

        data: function() {
            return {
                userAccountData: cookies.get("userData"),
                updatePasswordStatus: "",
                updateUserPassword: {
                    loginToken: cookies.get("loginToken")
                },
            }
        },

        methods: {
            updateAccountPassword: function() {

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
                        let updateAccountData = JSON.stringify(res.data);
                        cookies.set("userData", updateAccountData);
                        this.updatePasswordStatus = "Saved."
                        this.$router.push('Account');
                    }).catch((err) => {
                        err;
                        this.updatePasswordStatus = "An error occured while trying to save your changes.";
                    });
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 30px;
    }

    #backButtonAndTitle {
        display: grid;
        place-items: center;
        grid-template-columns: 1.2fr 3fr 1fr;
        width: 100%;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
        min-height: 10vh;
    }

    h3 {
        color: #7398A5;
    }

    p, label {
        font-size: 0.95rem;
    }

    form {
        display: grid;
        place-items: center;
        row-gap: 30px;
    }

    div {
        display: grid;
        row-gap: 20px;
    }

    input {
        border-radius: 5px;
        border: 1px solid rgba(211, 211, 211, 0.8);
        padding: 2%;
        width: 80vw;
    }

    input:focus {
        outline: none;
    }

    button {
        border: 1px solid #9FBFCC;
        padding: 3%;
        color: #7398A5;
        border-radius: 3px;
        width: 80vw;
    }
</style>