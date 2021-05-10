<template>
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
                this.logOutStatus = "Logging out"

                axios.request({
                    url: "https://tweeterest.ml/api/login",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get("loginToken")
                    }
                }).then((res) => {
                    console.log(res);
                    cookies.remove("loginToken");
                    cookies.remove("userData");
                    this.$router.push('Login');
                }).catch((err) => {
                    this.logOutStatus = `${err}. Log out failed. You can try reloading the page. If the error persists, please try again in a few minutes.`;
                });
            }
        },
    }
</script>

<style scoped>
    button {
        border: 1px solid #9FBFCC;
        padding: 3%;
        font-weight: 700;
        color: #7398A5;
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