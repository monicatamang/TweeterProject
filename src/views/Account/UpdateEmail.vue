<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button-header></back-button-header>
            <h3>Change Email</h3>
            <div></div>
        </div>
        <p>Your current email is {{ userData.email }}. What would you like to change it to?</p>
        <form action="javascript:void(0)">
            <label for="newEmail">Email</label>
            <input type="text" id="newEmail">
            <input type="submit" id="saveNewEmail" value="Save" @click="updateUserAccountEmail">
        </form>
        <p>{{ updateEmailStatus }}</p>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButtonHeader from "../../components/BackButtonHeader.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Email",

        components: {
            BackButtonHeader,
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
            updateUserAccountEmail: function() {
                this.updateEmailStatus = "Saving";

                if (document.getElementById("newEmail").value !== null) {
                    this.updateEmail.email = document.getElementById("newEmail").value;
                }

                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: this.updateEmail
                }).then((res) => {
                    let updateAccountData = JSON.stringify(res.data);
                    cookies.set("userData", updateAccountData);
                    this.$router.go(-1);
                }).catch((err) => {
                    err;
                    this.updateEmailStatus = "An error occured while trying to save your changes.";
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

    p {
        font-size: 0.95rem;
        text-align: center;
        padding: 0vw 5vw;
    }

    form {
        display: grid;
        row-gap: 20px;
    }

    label {
        font-size: 0.95rem;
    }

    input {
        border-radius: 5px;
        border: 1px solid rgba(211, 211, 211, 0.8);
        padding: 2%;
        width: 80vw;
    }

    input:focus {
        outline: none;
    }

    #saveNewEmail {
        border: 1px solid #9FBFCC;
        color: #7398A5;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        section {
            width: 100vw;
            padding-left: 15vw;
            row-gap: 40px;
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

        h3 {
            font-size: 1.3rem;
        }

        #backButtonAndTitle {
            grid-template-columns: 1.2fr 4fr 1fr;
        }

        input {
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
</style>