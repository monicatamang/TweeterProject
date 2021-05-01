<template>
    <section>
        <h1>Welcome to Tweeter</h1>
        <p>See what's happening in the world right now.</p>
        <div>
            <button @click="takeUserToCreateAccountPage">Create Account</button>
            <button @click="takeUserToLoginPage">Login</button>
        </div>
    </section>
</template>

<script>
    import cookies from "vue-cookies"

    export default {
        name: "Home",
        data: function() {
            return {
                loginToken: cookies.get(`loginToken`)
            }
        },
        methods: {
            takeUserToCreateAccountPage: function() {
                this.$router.push('CreateAccount');
            },

            takeUserToLoginPage: function() {
                this.$router.push('Login');
            },
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        min-height: 100vh;
    }

    div {
        display: grid;
        place-items: center;
    }

    button {
        border: 1px solid black;
    }
</style>