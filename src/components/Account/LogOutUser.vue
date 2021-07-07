<template>
    <div id="logoutButtonContainer">
        <button @click="logOutUser">Log out</button>
        <p>{{ logOutStatus }}</p>
    </div>
</template>

<script>
    import cookies from "vue-cookies";
    import axios from "axios"

    export default {
        name: "log-out-user",

        data() {
            return {
                logOutStatus: ""
            }
        },

        methods: {
            // Creating a function that logs a user out
            logOutUser() {
                // Printing a loading message to the user
                this.logOutStatus = "Logging out";
                // Configuring an axios request with the url, type and loginToken
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/login`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get("loginToken")
                    }
                }).then((res) => {
                    // If the network is done and no errors occur, remove the user's cookies
                    cookies.remove("loginToken");
                    cookies.remove("userData");
                    // Taking the user back to the login page
                    this.$router.push('/Login');
                    res;
                }).catch((err) => {
                    // If the network is done and the page errors, print an error message to the user
                    this.logOutStatus = "Log out failed. You can try reloading the page. If the error persists, please try again in a few minutes.";
                    err;
                });
            }
        },
    }
</script>

<style scoped>
    #logoutButtonContainer {
        justify-self: center;
        padding: 0;
        width: 90%;
    }

    button {
        border: 1px solid var(--primaryColor);
        padding: 3%;
        width: 100%;
        font-weight: 700;
        color: var(--primaryColor);
        border-radius: 30px;
        margin-top: 4vh;
    }

    p {
        text-align: center;
    }

    @media only screen and (min-width: 768px) {

        button {
            font-size: 1.3rem;
            padding: 2%;
        }
    }

    @media only screen and (min-width: 1024px) {

        #logoutButtonContainer {
            width: 100%;
            background: white;
            display: grid;
            align-self: center;
            border-radius: 10px;
            margin-bottom: 1vh;
        }

        #logoutButtonContainer:hover {
            background: var(--primaryColor);
        }

        button {
            font-size: 0.9rem;
            border: none;
            padding: 2vh;
            margin-top: 0vh;
        }

        button:hover {
            color: white;
        }

        p {
            position: absolute;
            bottom: -10%;
            left: 40%;
            right: 40%;
            font-size: 0.7rem;
        }
    }
</style>