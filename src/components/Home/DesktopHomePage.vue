<template>
    <article>
        <div id="desktopHomeContainer">
            <home-header></home-header>
            <div id="desktopHomeButtonsContainer">
                <button @click="takeUserToLoginPage" class="homeButtons" id="loginButton">Login</button>
                <button @click="takeUserToCreateAccountPage" class="homeButtons" id="createAccountButton">Create Account</button>
            </div>
        </div>
        <img src="../../assets/earth.jpg" alt="A clipart of earth in a soft blue colour where the dark blue shaded area represents North and South America.">
    </article>
</template>

<script>
    import HomeHeader from "./HomeHeader.vue";

    export default {
        name: "desktop-home-page",

        components: {
            HomeHeader
        },

        methods: {
            takeUserToCreateAccountPage: function() {
                this.$router.push('/CreateAccount');
            },

            takeUserToLoginPage: function() {
                this.$router.push('/Login');
            },
        }
    }
</script>

<style scoped>
    article {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
    }

    img {
        width: 25vw;
    }

    #desktopHomeContainer {
        display: grid;
        place-items: center;
        row-gap: 20vh;
    }

    .homeButtons {
        font-weight: 700;
        width: 100%;
        padding: 5%;
        border-radius: 30px;
    }

    .homeButtons:active {
        box-shadow: none;
    }

    #createAccountButton {
        color: white;
        background: #9FBFCC;
    }

    #loginButton {
        color: #9FBFCC;
        border: 0.7px solid #9FBFCC;
    }

    #desktopHomeButtonsContainer {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
        column-gap: 20px;
        width: 60%;
    }
</style>