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
        background: #9FBFCC;
        padding: 3%;
        font-weight: 700;
        color: white;
        border-radius: 3px;
        margin-top: 4vh;
    }
</style>