<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
            <h3>Change Username</h3>
            <div></div>
        </div>
        <p>Your current username is @{{ userAccountData.username }}.</p>
        <form action="javascript:void(0)">
            <label for="newUsername">Username</label>
            <input type="text" id="newUsername" @keypress="isTyping = true">
            <button @click="updateAccountUsername" v-if="isTyping">Save</button>
        </form>
        <p>{{ updateUsernameStatus }}</p>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButtonHeader from "../../components/BackButtonHeader.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Username",
        
        components: {
            BackButtonHeader,
            NavigationBar
        },

        data: function() {
            return {
                isTyping: false,
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
        row-gap: 20px;
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
    }
</style>