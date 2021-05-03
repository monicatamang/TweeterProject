<template>
    <section>
        <router-link to="/Account">Back</router-link>
        <h1>Update Email</h1>
        <h3>Current</h3>
        <p>{{ userData.email }}</p>
        <form action="javascript:void(0)">
            <label for="newEmail">Email</label>
            <input type="text" id="newEmail" @keypress="isTyping = true">
            <input type="submit" id="saveNewEmail" value="Save" v-if="isTyping" @click="updateUserAccountEmail">
        </form>
        <p>{{ updateEmailStatus }}</p>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Update-Email",
        components: {
            NavigationBar,
        },
        data: function() {
            return {
                isTyping: false,
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
                    this.$router.push('Account');
                }).catch((err) => {
                    this.updateEmailStatus = "An error occured while trying to save your changes.";
                    console.log(err);
                });
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
    }

    input {
        border: 1px solid black;
    }
</style>