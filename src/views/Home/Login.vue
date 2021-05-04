<template>
    <section>
        <!-- Create a LoginHeader component -->
        <header>
            <router-link to="/">Back</router-link>
            <h1>Login</h1>
            <div></div>
        </header>
        <p>Welcome Back. Please enter your account details.</p>
        <p>New user? <router-link to="CreateAccount">Create Account</router-link></p>
        
        <error-login-toast v-if="loginError" :class="{ showErrorToast: loginError }"></error-login-toast>

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
    import ErrorLoginToast from "../../components/Login/ErrorLoginToast.vue";

    export default {
        name: "Login",

        components: {
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
                this.loginStatus = "Authenticating"
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
                    console.log(err);
                    // this.loginStatus = "The username and password you entered did not match our records. Please double-check and try again.";
                    this.loginError = true;
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

    div {
        display: grid;
    }

    header {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 2fr 1fr;
    }

    input {
        border: 1px solid black;
    }

    .showErrorToast {
        opacity: 1;
        top: 5vh;
        background: indianred;
        transition: all 3s ease-in-out;
    }
</style>