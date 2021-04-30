<template>
    <section>
        <!-- If user has a login token, take the user to the feed page and show tweets, don't show home or login page -->
        <h1>Welcome to Tweeter</h1>
        <p>See what's happening in the world right now.</p>
        <div>
            <button @click="takeUserToCreateAccountPage">Create Account</button>
            <button @click="takeUserToLoginPage">Login</button>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            takeUserToCreateAccountPage: function() {
                this.$router.push('CreateAccount');
            },

            takeUserToLoginPage: function() {
                this.$router.push('Login');
            }
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