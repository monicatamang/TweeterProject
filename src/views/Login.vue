<template>
    <section>
        <div id="loginImage">
            <img src="../assets/loginImage.jpg" alt="A vector image of a middle-aged women typing on her black coloured laptop. She has short, black hair, dark blue oval-shaped earrings and necklace, wearing a light blue blazer. Her lipstick, nail colour and flower patterned shirt are also in a dark blue colour.">
        </div>
        <article>
            <post-it-logo></post-it-logo>
            <h1>Login</h1>
            <p id="welcomeMessage">Please enter your account details.</p>
            <p id="createAccountLink">New user? <router-link to="/CreateAccount">Create Account</router-link></p>
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
        </article>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PostItLogo from "../components/PostItLogo.vue";

    export default {
        name: "Login",

        components: {
            PostItLogo
        },

        data() {
            return {
                loginStatus: "",
                loginToken: ""
            }
        },

        methods: {
            // Creating a function that will log in a user
            attemptLogin() {
                // Printing a loading message
                this.loginStatus = "Authenticating";
                // Configuring the axios request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/login`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        email: document.getElementById("loginEmail").value,
                        password: document.getElementById("loginPassword").value
                    }
                }).then((res) => {
                    // Set the user's login token as a cookie
                    this.loginToken = res.data.loginToken;
                    cookies.set("loginToken", res.data.loginToken);

                    // Converting the return data from the API into JSON format which stores the user's data as a cookie and can be accessed by views or components
                    let userDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", userDataJSON);

                    // If the network is done and no errors occur, print a success message to the user
                    this.loginStatus = "Account Authenticated";

                    // Taking the user to the Feed page
                    this.$router.push('/Feed');
                }).catch((err) => {
                    err;
                    // If the network is done but the page errors, print an error message to the user
                    this.loginStatus = "Failed to log in. Please try again.";
                });
            },
        },
    }
</script>

<style scoped>
    #loginImage {
        display: none;
    }

    section, article, form, div {
        display: grid;
        background: white;
    }

    section {
        padding: 10vh 0vw 20vh 0vw;
        padding-top: 10vh;
    }

    section, article {
        place-items: center;
        row-gap: 20px;
    }

    h1 {
        font-size: 1.8rem;
    }

    #welcomeMessage, #createAccountLink {
        color: var(--accentColorOne);
        text-align: center;
        letter-spacing: 0.3px;
    }

    #welcomeMessage {
        margin-top: 1.5vh;
        font-size: 0.9rem;
    }

    #createAccountLink {
        margin-top: -3vh;
        font-size: 0.85rem;
    }

    #createAccountLink > a {
        color: var(--primaryColor);
    }

    form {
        row-gap: 40px;
        margin-top: 2vh;
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
        background: var(--primaryColor);
        letter-spacing: 1px;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        h1 {
            font-size: 2.2rem;
        }

        #welcomeMessage, #createAccountLink {
            font-weight: 300;
        }

        label, #welcomeMessage {
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

        label, #createAccountLink {
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

        #loginImage {
            display: grid;
            place-items: center;
            background: var(--primaryColor);
            width: 100%;
            height: 100%;
        }

        img {
            width: 20vw;
        }

        section {
            grid-template-columns: 1fr 1fr;
            padding: 0vh;
            height: 100%;
        }

        article {
            padding-top: 5vh;
            width: 100%;
        }

        div, #loginButton {
            width: 60%
        }

        input {
            padding: 1%;
            width: 100%;
        }

        form, div {
            text-align: left;
            place-items: center;
        }

        label {
            justify-self: start;
        }

        form {
            width: 40vw;
            margin-top: 0vh;
        }

        #loginButton {
            padding: 2%;
            font-size: 1rem;
            margin-bottom: 0vh;
            margin-top: 0vh;
        }

        #loginButton:hover {
            background: white;
            color: var(--primaryColor);
            border: 1px solid var(--primaryColor);
        }
    }
</style>