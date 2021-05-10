<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
            <h3>Delete Account</h3>
        </div>

        <h4>Verify your password</h4>
        <p>Re-enter your password to delete your account.</p>
        <div id="confirmPasswordInput">
            <input type="password" id="deleteAccountPassword" placeholder="Password">
            <button @click="deleteUserProfile">Confirm</button>
        </div>
        <router-link to="/Account">Cancel</router-link>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButtonHeader from "../../components/BackButtonHeader.vue";

    export default {
        name: "Delete-Account",

        components: {
            BackButtonHeader
        },

        data: function() {
            return {
                deleteUserAccountStatus: ""
            }
        },

        methods: {
            deleteUserProfile: function() {
                this.deleteUserAccountStatus = "Deleting Account"

                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: `DELETE`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        password: document.getElementById("deleteAccountPassword").value
                    }
                }).then((res) => {
                    res;
                    this.deleteUserAccountStatus = "Your account has been successfully deleted. You will be logged out automatically.";
                    this.$router.push('/');
                }).catch((err) => {
                    err;
                    this.deleteUserAccountStatus = "Failed to Delete Account.";
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
        text-align: center;
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

    #confirmPasswordInput {
        display: grid;
        place-items: center;
        row-gap: 20px;
    }

    p {
        font-size: 0.95rem;
        padding: 0vw 5vw; 
    }

    input {
        border-radius: 3px;
        border: 1px solid rgba(211, 211, 211, 0.8);
        padding: 2%;
        width: 80vw;
    }

    input:focus {
        outline: none;
    }

    button {
        background: #9FBFCC;
        padding: 3%;
        color: white;
        border-radius: 3px;
        width: 80vw;
        font-weight: 700;
    }

    .v-application a {
        color: #7398A5;
        font-size: 0.9rem;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            row-gap: 40px;
        }
        
        div {
            position: relative;
            top: 0;
        }

        h3 {
            font-size: 1.3rem;
        }

        h4, p {
            font-size: 1.1rem;
        }

        p {
            font-weight: 300;
        }

        button {
            font-size: 1.1rem;
            padding: 2%;
        }

        .v-application a {
            font-size: 1rem;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        section {
            row-gap: 40px;
        }

        #backButtonAndTitle {
            min-height: 13vh;
            grid-template-columns: 1fr 4fr 1fr;
        }

        h3 {
            font-size: 1.3rem;
        }

        h4, p {
            font-size: 1.1rem;
        }

        p {
            font-weight: 300;
        }

        button {
            font-size: 1.2rem;
            padding: 2%;
        }

        input, button {
            width: 50vw;
        }

        .v-application a {
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        section, form {
            row-gap: 30px;
        }

        #backButtonAndTitle {
            min-height: 15vh;
            grid-template-columns: 1fr 4fr 1fr;
        }

        input, button {
            width: 20vw;
        }

        button {
            font-size: 1rem;
        }
    }
</style>