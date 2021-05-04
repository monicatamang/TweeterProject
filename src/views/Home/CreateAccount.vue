<template>
    <section>
        <authorization-header></authorization-header>
        <h1>Create Account</h1>
        <p id="instructions">Please enter the following information below.</p>
        <p id="loginLink">Have an account already? <router-link to="Login">Log in</router-link></p>
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
                <label for="createAccountBio">Bio</label>
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
                    cookies.set("loginToken", res.data.loginToken);
                    this.createUserAccountStatus = "Account Created";

                    // Converting the returned data from the API into JSON format to be stored as cookie so that the user's data can be stored semi-permanently and accessed from any component or view
                    let userDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", userDataJSON);

                    this.$router.push('Feed');
                }).catch((err) => {
                    console.log(err);
                    this.createUserAccountStatus = "Username or email already exists.";
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

    input, textarea {
        padding: 3% 5%;
        box-shadow: 1px 1px 5px lightgrey;
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
</style>