<template>
    <main>
        <home-header></home-header>
        <img src="../../assets/earth.jpg" alt="A clipart of earth in a soft blue colour where the dark blue shaded area represents North and South America.">
        <div>
            <button @click="takeUserToLoginPage" class="homeButtons" id="loginButton">Login</button>
            <button @click="takeUserToCreateAccountPage" class="homeButtons" id="createAccountButton">Create Account</button>
        </div>
    </main>
</template>

<script>
    import cookies from "vue-cookies";
    import HomeHeader from "../../components/Home/HomeHeader.vue";

    export default {
        name: "Home",

        components: {
            HomeHeader,
        },

        data: function() {
            return {
                loginToken: cookies.get("loginToken")
            }
        },

        methods: {
            takeUserToCreateAccountPage: function() {
                this.$router.push('/CreateAccount');
            },

            takeUserToLoginPage: function() {
                this.$router.push('/Login');
                if (this.loginToken !== null) {
                    this.$router.push('/Feed');
                }
            },
        },
    }
</script>

<style scoped>
    main {
        display: grid;
        place-items: center;
        row-gap: 10px;
        min-height: 95vh;
    }

    img {
        width: 50vw;
        margin-top: -2vh;
    }

    div {
        display: grid;
        place-items: center;
        row-gap: 30px;
        width: 70vw;
    }

    .homeButtons {
        font-weight: 700;
        width: 100%;
        padding: 5%;
        border-radius: 30px;
        /* box-shadow: 1px 1px 5px lightgrey; */
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
</style>