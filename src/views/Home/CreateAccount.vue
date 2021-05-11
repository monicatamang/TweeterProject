<template>
    <section>
        <authorization-header></authorization-header>
        <h1>Create Account</h1>
        <p id="instructions">Please enter the following information below.</p>
        <p id="loginLink">Have an account already? <router-link to="/Login">Log in</router-link></p>
        <form action="javascript:void(0)">
            <div>
                <label for="createAccountUsername">Username*</label>
                <input type="text" id="createAccountUsername">
            </div>
            <div>
                <label for="createAccountEmail">Email*</label>
                <input type="text" id="createAccountEmail">
            </div>
            <div>
                <label for="createAccountPassword">Password*</label>
                <input type="password" id="createAccountPassword">
            </div>
            <div>
                <label for="createAccountBio">Bio*</label>
                <textarea id="createAccountBio"></textarea>
            </div>
            <div>
                <label for="createAccountBirthDate">Date of Birth*</label>
                <input type="date" id="createAccountBirthDate">
            </div>
            <div>
                <label for="createAccountImageUrl">Image URL</label>
                <input type="URL" id="createAccountImageUrl">
            </div>
            <input type="submit" id="createAccountButton" value="Create Account" @click="createUserAccount">
        </form>
        <p>{{ createUserAccountStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import AuthorizationHeader from "../../components/AuthorizationHeader.vue";

    export default {
        name: "Create-Account",

        components: {
            AuthorizationHeader
        },

        data: function() {
            return {
                createUserAccountStatus: "",
            }
        },

        methods: {
            createUserAccount: function() {

                this.createUserAccountStatus = "Creating Account";

                // Sending an axios request that creates a new account for a user
                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`,
                    },
                    data: {
                        email: document.getElementById(`createAccountEmail`).value,
                        username: document.getElementById(`createAccountUsername`).value,
                        password: document.getElementById(`createAccountPassword`).value,
                        bio: document.getElementById(`createAccountBio`).value,
                        birthdate: document.getElementById(`createAccountBirthDate`).value,
                        imageUrl: document.getElementById(`createAccountImageUrl`).value
                    }
                }).then((res) => {

                    // If the network is done and no errors occur, set the user's login token as a cookie
                    cookies.set("loginToken", res.data.loginToken);

                    // Printing a success message to the user
                    this.createUserAccountStatus = "Account Created";

                    // Converting the returned data from the API into JSON format which stores the user's data as a cookie and can be accessed by views or components
                    let userDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", userDataJSON);

                    // Taking the user to the feed page
                    this.$router.push('/Discover');
                }).catch((err) => {
                    err;

                    // If the network is done and page errors, print an error message to the user
                    this.createUserAccountStatus = "Failed to create account.";
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

    h1 {
        font-size: 1.8rem;
    }

    #instructions, #loginLink {
        color: #636D6E;
        text-align: center;
    }

    #instructions {
        margin-top: 1.5vh;
        padding: 0% 10%;
        font-size: 0.9rem;
    }

    #loginLink {
        margin-top: -3vh;
        font-size: 0.85rem;
    }

    #loginLink > a {
        color: #9FBFCC;
    }

    form {
        display: grid;
        row-gap: 40px;
        margin-top: 4vh;
        text-align: left;
        width: 70vw;
    }

    input, textarea {
        padding: 3% 5%;
        border: 1px solid rgba(211, 211, 211, 0.6);
        border-radius: 3px;
    }

    textarea {
        height: 15vh;
    }

    input:focus, textarea:focus {
        outline: #9FBFCC;
    }

    label {
        font-size: 0.9rem;
        font-weight: 300;
    }

    #createAccountBirthDate {
        font-size: 0.9rem;
        font-weight: 300;
        padding-left: 5%;
    }

    #createAccountButton {
        color: white;
        font-weight: 700;
        border-radius: 30px;
        margin-top: 3vh;
        padding: 5% 0%;
        background: #9FBFCC;
    }

    div {
        display: grid;
        row-gap: 10px;
        width: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        h1 {
            font-size: 2.1rem;
        }

        #instructions, #loginLink {
            font-weight: 300;
        }

        #instructions {
            font-size: 1.1rem;
        }

        #loginLink {
            font-size: 1rem;
        }

        label {
            font-size: 1.1rem;
        }

        div {
            row-gap: 20px;
        }

        form {
            row-gap: 50px;
        }

        #createAccountBirthDate {
            font-size: 1.1rem;
            padding-left: 3%;
        }

        #createAccountButton {
            padding: 3% 0%;
            font-size: 1.15rem;
        }

        input, textarea {
            padding: 3%;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
            
        h1 {
            font-size: 2.2rem;
        }

        #instructions {
            font-size: 1.2rem;
        }

        #loginLink {
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

        #createAccountBirthDate {
            font-size: 1.1rem;
            padding-left: 2%;
        }

        #createAccountButton {
            padding: 2.5% 0%;
            font-size: 1.15rem;
            margin-bottom: 5vh;
        }

        input, textarea {
            padding: 3%;
        }
    }

    @media only screen and (min-width: 1024px) {

        #logo {
            width: 0vw;
        }

        input, textarea {
            padding: 1%;
        }

        form {
            width: 40vw;
            margin-top: 5vh;
        }

        #createAccountBirthDate {
            font-size: 0.9rem;
            padding-left: 2%;
        }

        #createAccountButton {
            padding: 2%;
            font-size: 1rem;
            margin-bottom: 5vh;
        }
    }
</style>