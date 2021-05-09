<template>
    <section>
        <authorization-header></authorization-header>
        <h1>Login</h1>
        <p id="welcomeMessage">Welcome Back. Please enter your account details.</p>
        <p id="createAccountLink">New user? <router-link to="CreateAccount">Create Account</router-link></p>
        
        <!-- <error-login-toast v-if="loginError" :class="{ showErrorToast: loginError }"></error-login-toast> -->
        <error-login-toast v-if="loginError"></error-login-toast>
        <!-- <error-login-toast id="toastError"></error-login-toast> -->

        <form action="javascript:void(0)">
            <div>
                <label for="loginEmail">Email</label>
                <input type="text" id="loginEmail">
            </div>
            <div>
                <label for="loginPassword">Password</label>
                <input type="password" id="loginPassword">
            </div>
            <input type="submit" id="loginButton" value="Login" @click="attemptLogin">
        </form>
        <p>{{ loginStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import AuthorizationHeader from "../../components/AuthorizationHeader.vue";
    import ErrorLoginToast from "../../components/Login/ErrorLoginToast.vue";

    export default {
        name: "Login",

        components: {
            AuthorizationHeader,
            ErrorLoginToast
        },

        data: function() {
            return {
                loginStatus: "",
                loginToken: "",
                loginError: false
            }
        },

        methods: {
            // showErrorToastMessage: function() {
            //     // document.getElementsById("toastError").style.position = "absolute";
            //     document.getElementsById("toastError").style.top = "-10vh";
            //     document.getElementsById("toastError").style.opacity = "0";
            //     document.getElementsById("toastError").style.transition = "all 3s ease-in-out";
            // },

            attemptLogin: function() {

                this.loginStatus = "Authenticating";

                axios.request({
                    url: "https://tweeterest.ml/api/login",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`,
                    },
                    data: {
                        email: document.getElementById("loginEmail").value,
                        password: document.getElementById("loginPassword").value
                    }
                }).then((res) => {
                    this.loginStatus = "Account Authenticated";
                    this.loginToken = res.data.loginToken;
                    cookies.set("loginToken", res.data.loginToken);

                    // Converting the returned data from the API into JSON format to be stored as cookie so that the user's data can be stored semi-permanently and accessed from any component or view
                    let userDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", userDataJSON);

                    this.$router.push('Feed');
                }).catch((err) => {
                    err;
                    // this.loginStatus = "The username and password you entered did not match our records. Please double-check and try again.";
                    this.loginError = true;
                    this.loginStatus = "";
                    // this.showErrorToastMessage();
                });
            },
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 20px;
    }

    h1 {
        font-size: 1.8rem;
    }

    #welcomeMessage, #createAccountLink {
        color: #636D6E;
        text-align: center;
    }

    #welcomeMessage {
        margin-top: 1.5vh;
        padding: 0% 5%;
        font-size: 0.9rem;
    }

    #createAccountLink {
        margin-top: -3vh;
        font-size: 0.85rem;
    }

    #createAccountLink > a {
        color: #9FBFCC;
        /* font-weight: 700; */
        /* text-decoration: none; */
    }

    form {
        display: grid;
        row-gap: 40px;
        margin-top: 4vh;
        text-align: left;
        width: 70vw;
    }

    input {
        padding: 3% 5%;
        /* box-shadow: 1px 1px 5px lightgrey; */
        /* border: 1px solid rgba(211, 211, 211, 0.4); */
        border: 1px solid rgba(211, 211, 211, 0.6);
        border-radius: 5px;
    }

    input:focus, textarea:focus {
        outline: none;
    }

    div {
        display: grid;
        row-gap: 10px;
        width: 100%;
    }

    label {
        font-size: 0.9rem;
        font-weight: 300;
    }

    #loginButton {
        color: white;
        font-weight: 700;
        border-radius: 30px;
        margin-top: 3vh;
        padding: 5% 0%;
        background: #9FBFCC;
    }

    /* .showErrorToast {
        top: 0vh;
        opacity: 1;
        transition: all 3s ease-in-out;
    } */
</style>