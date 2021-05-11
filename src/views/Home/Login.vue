<template>
    <section>
        <authorization-header></authorization-header>
        <h1>Login</h1>
        <p id="welcomeMessage">Welcome Back. Please enter your account details.</p>
        <p id="createAccountLink">New user? <router-link to="/CreateAccount">Create Account</router-link></p>
        <error-login-toast v-if="loginError"></error-login-toast>
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
            attemptLogin: function() {

                this.loginStatus = "Authenticating";

                // Sending an axios request to log the user into their account
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

                    // If the network is done and no errors occur, print a success message to the user
                    this.loginStatus = "Account Authenticated";

                    // Set the user's login token as a cookie
                    this.loginToken = res.data.loginToken;
                    cookies.set("loginToken", res.data.loginToken);

                    // Converting the return data from the API into JSON format which stores the user's data as a cookie and can be accessed by views or components
                    let userDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", userDataJSON);

                    // Taking the user to the feed page
                    this.$router.push('/Discover');
                }).catch((err) => {
                    err;
                    this.loginError = true;
                    this.loginStatus = "";
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
        border: 1px solid rgba(211, 211, 211, 0.6);
        border-radius: 3px;
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

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        h1 {
            font-size: 2.2rem;
        }

        #welcomeMessage, #createAccountLink {
            font-weight: 300;
        }

        #welcomeMessage {
            font-size: 1.1rem;
        }

        #createAccountLink {
            font-size: 1rem;
        }

        form {
            row-gap: 50px;
        }

        div {
            row-gap: 20px;
        }

        label {
            font-size: 1.1rem;
        }

        #loginButton {
            padding: 3% 0%;
            font-size: 1.15rem;
        }

        input {
            padding: 3%;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        h1 {
            font-size: 2.2rem;
        }

        #welcomeMessage {
            font-size: 1.2rem;
        }

        #createAccountLink {
            font-size: 1.1rem;
        }

        label {
            font-size: 1.1rem;
        }

        div {
            row-gap: 30px;
        }

        form {
            row-gap: 60px;
        }

        #loginButton {
            padding: 2.5% 0%;
            font-size: 1.15rem;
            margin-bottom: 10vh;
        }

        input {
            padding: 3%;
        }

        form + p {
            display: none;
        }
    }

    @media only screen and (min-width: 1024px) {

        input, textarea {
            padding: 1%;
        }

        form {
            width: 40vw;
            margin-top: 5vh;
        }

        #loginButton {
            padding: 2%;
            font-size: 1rem;
            margin-bottom: 15vh;
        }
    }
</style>