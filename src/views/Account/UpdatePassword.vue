<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button></back-button>
            <h3>Change Password</h3>
        </div>
        <form action="javascript:void(0)">
            <label for="newPassword">New Password</label>
            <input type="password" id="newPassword">
            <button @click="updateAccountPassword">Save</button>
        </form>
        <p>{{ updatePasswordStatus }}</p>
        <navigation-bar id="mobileNavBar"></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButton from "../../components/BackButton.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Password",

        components: {
            BackButton,
            NavigationBar
        },

        data: function() {
            return {
                userAccountData: cookies.get("userData"),
                updatePasswordStatus: "",
                updateUserPassword: {
                    loginToken: cookies.get("loginToken")
                },
            }
        },

        methods: {
            updateAccountPassword: function() {

                this.updatePasswordStatus = "Saving";

                // Updating the value of the user's password to the new password they entered into the input field
                if (document.getElementById("newPassword").value !== null) {
                        this.updateUserPassword.password = document.getElementById("newPassword").value;
                }

                // Sending an axios request that will update the current user's password on the page and in the API
                axios.request({
                    url: "https://tweeterest.ml/api/users",
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
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
        display: grid;
        place-items: center;
        row-gap: 30px;
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

    p, label {
        font-size: 0.95rem;
        justify-self: start;
    }

    form {
        display: grid;
        place-items: center;
        row-gap: 30px;
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
        border: 1px solid #9FBFCC;
        padding: 2.5%;
        color: #7398A5;
        border-radius: 3px;
        width: 80vw;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            width: 100vw;
            padding-left: 15vw;
            row-gap: 40px;
        }

        label {
            font-size: 1.1rem;
            font-weight: 300;
        }

        p {
            padding: 0vw 10vw;
            font-size: 1.1rem;
            font-weight: 300;
        }

        h3 {
            font-size: 1.3rem;
        }

        #backButtonAndTitle {
            grid-template-columns: 1.2fr 4fr 1fr;
        }

        input, button {
            width: 60vw;
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

        input, button {
            width: 60vw;
        }

        button {
            padding: 2.5%;
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
            row-gap: 40px;
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