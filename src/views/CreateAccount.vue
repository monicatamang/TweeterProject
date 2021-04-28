<template>
    <section>
        <!-- Create a CreateAccountHeader component -->
        <header>
            <router-link to="/">Back</router-link>
            <h1>Create Account</h1>
            <div></div>
        </header>
        <p>Please enter the following information below.</p>
        <p>Have an account already? <router-link to="Login">Log in</router-link></p>
        <form action="javascript:void(0)">
            <div>
                <label for="createAccountEmail">Email</label>
                <input type="text" id="createAccountEmail">
            </div>
            <div>
                <label for="createAccountUsername">Username</label>
                <input type="text" id="createAccountUsername">
            </div>
            <div>
                <label for="createAccountPassword">Password</label>
                <input type="password" id="createAccountPassword">
            </div>
            <div>
                <label for="createAccountBio">Bio (Optional)</label>
                <textarea id="createAccountBio"></textarea>
            </div>
            <div>
                <label for="createAccountBirthDate">Date of Birth</label>
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
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: "Create-Account",
        data() {
            return {
                createUserAccountStatus: "",
            }
        },
        methods: {
            createUserAccount: function() {
                this.createUserAccountStatus = `Creating Account`;
                axios.request({
                    url: `https://tweeterest.ml/api/users`,
                    method: `POST`,
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
                        imageURL: document.getElementById(`createAccountImageUrl`).value
                    }
                }).then((res) => {
                    // When the user successfully creates an account, store the user's token in a cookie
                    cookies.set(`createAccountToken`, res.data.loginToken);
                    this.createUserAccountStatus = `Account Created`;
                    this.$router.push('Feed');
                }).catch((err) => {
                    console.log(err);
                    this.createUserAccountStatus = `Username or email already exists.`;
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

    header {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 2fr 1fr;
    }

    input, textarea {
        border: 1px solid black;
    }

    div {
        display: grid;
    }
</style>