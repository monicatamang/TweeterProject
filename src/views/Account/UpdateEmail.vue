<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
            <h3>Change Email</h3>
            <div></div>
        </div>
        <p>Your current email is {{ userData.email }}. What would you like to change it to?</p>
        <!-- <update-email-header></update-email-header> -->
        <!-- <p>Your current email is {{ userData.email }}. What would you like to change it to?</p> -->
        <!-- <h4>{{ userData.email }}</h4> -->
        <form action="javascript:void(0)">
            <label for="newEmail">Email</label>
            <input type="text" id="newEmail" @keypress="isTyping = true">
            <input type="submit" id="saveNewEmail" value="Save" v-if="isTyping" @click="updateUserAccountEmail">
        </form>
        <p>{{ updateEmailStatus }}</p>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButtonHeader from "../../components/BackButtonHeader.vue";
    // import UpdateEmailHeader from "../../components/Account/UpdateEmailHeader.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Email",

        components: {
            BackButtonHeader,
            // UpdateEmailHeader,
            NavigationBar
        },

        data: function() {
            return {
                isTyping: false,
                userData: cookies.get("userData"),
                updateEmailStatus: "",
                updateEmail: {
                    loginToken: cookies.get("loginToken")
                }
            }
        },

        methods: {
            updateUserAccountEmail: function() {
                this.updateEmailStatus = "Saving";

                if (document.getElementById("newEmail").value !== null) {
                    this.updateEmail.email = document.getElementById("newEmail").value;
                }

                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: this.updateEmail
                }).then((res) => {
                    let updateAccountData = JSON.stringify(res.data);
                    cookies.set("userData", updateAccountData);
                    this.$router.go(-1);
                }).catch((err) => {
                    this.updateEmailStatus = "An error occured while trying to save your changes.";
                    console.log(err);
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

    p {
        font-size: 0.95rem;
        text-align: center;
        padding: 0vw 5vw;
    }

    form {
        display: grid;
        row-gap: 20px;
    }

    label {
        font-size: 0.95rem;
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

    #saveNewEmail {
        border: 1px solid #9FBFCC;
        color: #7398A5;
    }
</style>