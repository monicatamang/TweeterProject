<template>
    <main>
        <home-header id="mobileHomeHeader"></home-header>
        <img id="earth" src="../../assets/earth.jpg" alt="A clipart of earth in a soft blue colour where the dark blue shaded area represents North and South America.">
        <div id="homeButtonsContainer">
            <button @click="takeUserToLoginPage" class="homeButtons" id="loginButton">Login</button>
            <button @click="takeUserToCreateAccountPage" class="homeButtons" id="createAccountButton">Create Account</button>
        </div>
        <desktop-home-page id="desktopHome"></desktop-home-page>
    </main>
</template>

<script>
    import cookies from "vue-cookies";
    import HomeHeader from "../../components/Home/HomeHeader.vue";
    import DesktopHomePage from "../../components/Home/DesktopHomePage.vue";

    export default {
        name: "Home",

        components: {
            HomeHeader,
            DesktopHomePage
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
            }
        }
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

    #homeButtonsContainer {
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

    #desktopHome {
        display: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        img {
            width: 38vw;
            margin-top: -2vh;
        }

        .homeButtons {
            width: 80%;
            font-size: 1.3rem;
            padding: 3%;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        img {
            width: 25vw;
            margin-top: -3vh;
        }

        main {
            row-gap: 50px;
        }

        div {
            grid-template-columns: 1fr 1fr;
            column-gap: 20px;
        }

        .homeButtons {
            font-size: 1.15rem;
            padding: 4%;
        }
    }

    @media only screen and (min-width: 1024px) {

        #mobileHomeHeader, #earth, #homeButtonsContainer {
            display: none;
        } 

        #desktopHome {
            display: grid;
        }
    }
</style>