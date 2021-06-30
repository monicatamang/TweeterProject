<template>
    <!-- <v-btn dark depressed outlined color="#9FBFCC" @click="logOutUser">Log out</v-btn> -->
    <div>
        <button @click="logOutUser">Log out</button>
        <p>{{ logOutStatus }}</p>
    </div>
</template>

<script>
    import cookies from "vue-cookies";
    import axios from "axios"

    export default {
        name: "log-out-user",

        data: function() {
            return {
                logOutStatus: ""
            }
        },

        methods: {
            logOutUser: function() {
                // Printing a loading message to the user
                this.logOutStatus = "Logging out";

                // Sending an axios request which deletes the user's login token in the API and logs the user out of their account
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/login`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken")
                    }
                }).then((res) => {
                    res;

                    // If the network is done and no errors occur, remove the user's login token and data
                    cookies.remove("loginToken");
                    cookies.remove("userData");

                    // Once the user has successfully logged out of their account, take them back to the login page
                    this.$router.push('/Login');
                }).catch((err) => {
                    err;

                    // If the network is done and the page errors, print an error message to the user
                    this.logOutStatus = "Log out failed. You can try reloading the page. If the error persists, please try again in a few minutes.";
                });
            }
        },
    }
</script>

<style scoped>
    /* .v-btn {
        margin-top: 3vh;
        width: 90%;
        justify-self: center;
        font-weight: bold;
    } */

    button {
        border: 1px solid var(--primaryColor);
        padding: 3%;
        font-weight: 700;
        color: var(--primaryColor);
        border-radius: 3px;
        margin-top: 4vh;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        button {
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        button {
            font-size: 1.1rem;
            padding: 2.5%;
        }
    }

    @media only screen and (min-width: 1024px) {

        button {
            font-size: 0.8rem;
            padding: 1%;
            width: 10vw;
        }
    }
</style>