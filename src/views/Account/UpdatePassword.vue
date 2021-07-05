<template>
    <section>
        <page-header-with-button title="Password"></page-header-with-button>
        <div id="displayTitleAndButton">
            <back-button></back-button>
            <h1>Password</h1>
            <div></div>
        </div>
        <v-divider></v-divider>
        <form action="javascript:void(0)">
            <p>Please enter your new password.</p>
            <input type="password" id="newPassword" placeholder="New Password">
            <button @click="updateAccountPassword" id="saveButton">Save</button>
        </form>
        <p>{{ updatePasswordStatus }}</p>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PageHeaderWithButton from "../../components/PageHeaderWithButton.vue";
    import NavigationBar from "../../components/NavigationBar.vue";
    import BackButton from "../../components/BackButton.vue";

    export default {
        name: "Update-Password",

        components: {
            PageHeaderWithButton,
            NavigationBar,
            BackButton
        },

        data() {
            return {
                userAccountData: cookies.get("userData"),
                updatePasswordStatus: "",
                updateUserPassword: {
                    loginToken: cookies.get("loginToken")
                },
            }
        },

        methods: {
            updateAccountPassword() {

                this.updatePasswordStatus = "Saving";

                // Updating the value of the user's password to the new password they entered into the input field
                if (document.getElementById("newPassword").value !== null) {
                        this.updateUserPassword.password = document.getElementById("newPassword").value;
                }

                // Sending an axios request that will update the current user's password on the page and in the API
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: this.updateUserPassword
                    }).then((res) => {
                        // Updating the user's data and setting it as a cookie
                        let updateAccountData = JSON.stringify(res.data);
                        cookies.set("userData", updateAccountData);

                        // When the user has successfully updated their password, print a success message to the user
                        this.updatePasswordStatus = "Saved.";

                        // Taking the user back to the previous page
                        this.$router.go(-1);
                    }).catch((err) => {
                        err;

                        // If the network is done and page errors, print an error message to the user
                        this.updatePasswordStatus = "An error occured while trying to save your changes.";
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

    p {
        font-size: 0.95rem;
        text-align: center;
    }

    form {
        display: grid;
        place-items: center;
        row-gap: 30px;
        margin-top: 5vh;
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

    #saveButton {
        border: 1px solid var(--primaryColor);
        padding: 2.5%;
        color: var(--primaryColor);
        border-radius: 30px;
        width: 80vw;
    }

    #displayTitleAndButton {
        display: none;
    }

    @media only screen and (min-width: 768px) {

        p {
            padding: 0vw;
            font-size: 1.2rem;
            font-weight: 300;
        }

        input, #saveButton {
            width: 60vw;
            font-size: 1.2rem;
        }

        #saveButton {
            padding: 2%;
            margin-top: 1vh;
        }
    }

    @media only screen and (min-width: 768px) {

        p {
            padding: 0vw;
            font-size: 1.2rem;
            font-weight: 300;
        }

        input, #saveButton {
            width: 60vw;
            font-size: 1.2rem;
        }

        #saveButton {
            padding: 2%;
            margin-top: 1vh;
        }
    }

    @media only screen and (min-width: 1024px) {

        #displayTitleAndButton {
            display: grid;
            place-items: center;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 30%;
        }

        h1 {
            font-size: 1.2rem;
            font-weight: 400;
        }

        p {
            margin-top: 5vh;
            font-size: 0.9rem;
        }

        input, #saveButton {
            font-size: 0.8rem;
        }

        input {
            width: 30%;
            padding: 1%;
        }

        #saveButton {
            width: 10%;
            padding: 8px;
            margin-top: 1vh;
        }

        #saveButton:hover {
            background: var(--primaryColor);
            color: white;
            font-weight: 700;
        }
    }
</style>