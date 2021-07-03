<template>
    <section>
        <page-header-with-header title="Delete Account"></page-header-with-header>
        <v-divider></v-divider>
        <article>
            <h4>Verify your password</h4>
            <p>Re-enter your password to delete your account.</p>
            <div id="confirmPasswordInput">
                <input type="password" id="deleteAccountPassword" placeholder="Password">
                <button @click="deleteUserProfile">Confirm</button>
            </div>
            <router-link to="/Account">Cancel</router-link>
        </article>
        <p>{{ deleteUserAccountStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PageHeaderWithHeader from "../../components/PageHeaderWithButton.vue";

    export default {
        name: "Delete-Account",

        components: {
            PageHeaderWithHeader
        },

        data() {
            return {
                deleteUserAccountStatus: ""
            }
        },

        methods: {
            deleteUserProfile() {

                this.deleteUserAccountStatus = "Deleting Account"

                // Sending an axios request that deletes a user's account
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: `DELETE`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get("userData").loginToken,
                        password: document.getElementById("deleteAccountPassword").value
                    }
                }).then((res) => {
                    res;

                    // If the network is done and no errors occur, print a success message to the user
                    this.deleteUserAccountStatus = "Your account has been successfully deleted. You will be logged out automatically.";

                    // When the user successfully deletes their account, they will automatically be taken to the home page
                    this.$router.push('/');
                }).catch((err) => {
                    err;

                    // If the network is done and the page errors, print an error message to the user
                    this.deleteUserAccountStatus = "Failed to Delete Account.";
                });
            }
        },
    }
</script>

<style scoped>
    section {
        background: white;
        height: 100%;
        text-align: center;
    }

    article {
        display: grid;
        place-items: center;
        row-gap: 20px;
        margin-top: 5vh;
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
        background: var(--primaryColor);
        padding: 3%;
        color: white;
        border-radius: 30px;
        width: 80vw;
        font-weight: 700;
    }

    .v-application a {
        color: var(--primaryColor);
        font-size: 0.9rem;
    }

    /* @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

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
    } */
</style>