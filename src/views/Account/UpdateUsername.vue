<template>
    <section>
        <page-header-with-button title="Username"></page-header-with-button>
        <v-divider></v-divider>
        <article>
            <p>Your current username is @{{ userAccountData.username }}.</p>
            <form action="javascript:void(0)">
                <input type="text" id="newUsername" placeholder="New Username">
                <button @click="updateAccountUsername">Save</button>
            </form>
        </article>
        <p>{{ updateUsernameStatus }}</p>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PageHeaderWithButton from "../../components/PageHeaderWithButton.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Username",
        
        components: {
            PageHeaderWithButton,
            NavigationBar
        },

        data() {
            return {
                userAccountData: cookies.get("userData"),
                updateUsernameStatus: "",
                updateCurrentUsername: {
                    loginToken: cookies.get("userData").loginToken
                }
            }
        },

        methods: {
            updateAccountUsername() {

                this.updateUsernameStatus = "Saving";

                // If the user has changed their username, store their new username as a variable
                if (document.getElementById("newUsername").value !== "") {
                    this.updateCurrentUsername.username = document.getElementById("newUsername").value;
                }

                // Sending an axios request that will update the current user's username on the page and in the API
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: this.updateCurrentUsername
                }).then((res) => {

                    // Updating the user's data and setting it as a cookie
                    let updateAccountData = JSON.stringify(res.data);
                    cookies.set("userData", updateAccountData);

                    // Taking the user back to the previous page
                    this.$router.go(-1);
                }).catch((err) => {
                    err;

                    // If the network is done and page errors, print an error message to the user
                    this.updateCurrentUsernameStatus = "An error occured while trying to save your changes.";
                });
            }
        },
    }
</script>

<style scoped>
    section {
        background: white;
        height: 100%;
    }

    article {
        display: grid;
        place-items: center;
        row-gap: 10px;
        margin-top: 5vh;
    }

    p {
        font-size: 0.95rem;
    }

    form {
        display: grid;
        place-items: center;
        row-gap: 20px;
        width: 80%;
    }

    input {
        border-radius: 3px;
        border: 1px solid rgba(211, 211, 211, 0.8);
        padding: 2%;
        width: 100%;
    }

    input:focus {
        outline: none;
    }

    button {
        border: 1px solid var(--primaryColor);
        padding: 3%;
        color: var(--primaryColor);
        border-radius: 30px;
        width: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        p, input, button {
            font-size: 1.2rem;
        }

        input, button {
            width: 60vw;
        }

        p {
            padding: 0vw;
            font-size: 1.2rem;
            font-weight: 300;
        }

        form {
            row-gap: 40px;
            margin-top: 1vh;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        section {
            padding-left: 5vw;
            row-gap: 50px;
        }

        #backButtonAndTitle {
            min-height: 13vh;
            grid-template-columns: 1fr 2fr 1fr;
        }

        input {
            width: 60vw;
        }

        p {
            padding: 0vw 10vw;
            font-size: 1.1rem;
            font-weight: 300;
        }

        label {
            font-size: 1.1rem;
            font-weight: 300;
        }
    }

    @media only screen and (min-width: 1024px) {

        section, form {
            row-gap: 30px;
        }

        #mobileNavBar {
            display: none;
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