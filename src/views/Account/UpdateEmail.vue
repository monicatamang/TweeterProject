<template>
    <section>
        <page-header-with-button title="Email"></page-header-with-button>
        <v-divider></v-divider>
        <p>Your current email is {{ userData.email }}. What would you like to change it to?</p>
        <form action="javascript:void(0)">
            <input type="text" id="newEmail" placeholder="New Email">
            <input type="submit" id="saveNewEmail" value="Save" @click="updateUserAccountEmail">
        </form>
        <p>{{ updateEmailStatus }}</p>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PageHeaderWithButton from "../../components/PageHeaderWithButton.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Email",

        components: {
            PageHeaderWithButton,
            NavigationBar
        },

        data: function() {
            return {
                userData: cookies.get("userData"),
                updateEmailStatus: "",
                updateEmail: {
                    loginToken: cookies.get("loginToken")
                }
            }
        },

        methods: {
            updateUserAccountEmail() {

                this.updateEmailStatus = "Saving";

                // Updating the value of the user's email to the new email they entered into the input field
                if (document.getElementById("newEmail").value !== null) {
                    this.updateEmail.email = document.getElementById("newEmail").value;
                }

                // Sending an axios request that will update the user's current email on the page and in the API
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: this.updateEmail
                }).then((res) => {

                    // Updating the user's data and setting it as a cookie
                    let updateAccountData = JSON.stringify(res.data);
                    cookies.set("userData", updateAccountData);

                    // When the user successfully updates their email, take them back to the previous page that they were on
                    this.$router.go(-1);
                }).catch((err) => {
                    err;

                    // If the network is done and the page errors, print an error message to the user
                    this.updateEmailStatus = "An error occured while trying to save your changes.";
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

    form {
        display: grid;
        place-items: center;
        row-gap: 20px;
    }

    p {
        font-size: 0.95rem;
        text-align: center;
        padding: 0vw 5vw;
        margin: 5vh 0vw;
        font-weight: 300;
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

    #saveNewEmail {
        border: 1px solid var(--primaryColor);
        color: var(--primaryColor);
        border-radius: 30px;
    }

    @media only screen and (min-width: 768px) {

        p {
            padding: 0vw 15vw;
            font-size: 1.2rem;
        }

        input {
            width: 60vw;
            font-size: 1.2rem;
        }

        #saveNewEmail {
            margin-top: 2vh;
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

        input, #saveNewEmail {
            width: 20vw;
        }

        #saveNewEmail {
            font-size: 1rem;
        }
    }
</style>