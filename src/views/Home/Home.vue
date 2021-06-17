<template>
    <section>
        <article id="mobileHome">
            <post-it-logo></post-it-logo>
            <h1>Welcome to Post-It</h1>
            <p>Join our growing community of 10,000+ students from all over the world</p>
            <img id="earth" src="../../assets/earthWhiteBackground.jpg" alt="A clipart of earth in a soft blue colour where the dark blue shaded area represents North and South America.">
            <div id="homeButtonsContainer">
                <button @click="takeUserToLoginPage" class="homeButtons" id="loginButton">Login</button>
                <button @click="takeUserToCreateAccountPage" class="homeButtons" id="createAccountButton">Create Account</button>
            </div>
        </article>
        <article id="desktopHome">
            <earth-image-background></earth-image-background>
            <div id="contentContainer">
                <post-it-logo></post-it-logo>
                <h1>Welcome to Post-It</h1>
                <p>Join our growing community of 10,000+ students from all over the world</p>
                <div id="homeButtonsContainer">
                    <button @click="takeUserToLoginPage" class="homeButtons" id="loginButton">Login</button>
                    <button @click="takeUserToCreateAccountPage" class="homeButtons" id="createAccountButton">Create Account</button>
                </div>
            </div>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import PostItLogo from "../../components/PostItLogo.vue";
    import EarthImageBackground from "../../components/EarthImageBackground.vue";

    export default {
        name: "Home",

        components: {
            PostItLogo,
            EarthImageBackground
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

                // If the user has a login token, take the user to the feed page
                if(this.loginToken !== null) {
                    this.$router.push('/Feed');
                }
            }
        }
    }
</script>

<style scoped>
    section, article, #homeButtonsContainer {
        display: grid;
        place-items: center;
    }  

    article {
        row-gap: 10px;
        min-height: 85vh;
        margin-top: 5vh;
        text-align: center;
    }

    h1, .homeButtons {
        letter-spacing: 1px;
    }

    p {
        letter-spacing: 0.5px;
    }

    h1 {
        font-size: 1.8rem;
        margin-top: -2vh;
    }

    p {
        color: var(--accentDarkColor);
        padding: 0% 10%;
        margin: -4vh 0vh 1vh 0vh;
        font-size: 0.9rem;
    }

    img {
        width: 50vw;
        margin-top: -2vh;
    }

    #homeButtonsContainer {
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
        background: var(--mainDarkColor);
    }

    #loginButton {
        color: var(--mainDarkColor);
        border: 0.8px solid var(--mainDarkColor);
    }

    #desktopHome {
        display: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        h1 {
            font-size: 2.5rem;
        }

        p {
            font-size: 1.3rem;
            font-weight: 300;
            padding: 0% 15%;
        }
        
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

        h1 {
            font-size: 2.5rem;
        }

        p {
            font-size: 1.2rem;
            font-weight: 300;
            padding: 0% 15%;
        }
        
        img {
            width: 25vw;
            margin-top: -3vh;
        }

        article {
            row-gap: 50px;
        }

        #homeButtonsContainer {
            grid-template-columns: 1fr 1fr;
            column-gap: 20px;
        }

        .homeButtons {
            font-size: 1.15rem;
            padding: 4%;
        }
    }

    @media only screen and (min-width: 1024px) {

        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1rem;
            font-weight: 300;
            padding: 0% 20%;
        }

        #mobileHome {
            display: none;
        } 

        #desktopHome, #contentContainer {
            display: grid;
            place-items: center;
        }

        #desktopHome {
            grid-template-columns: 1fr 1fr;
            width: 100%;
            height: 100vh;
            margin-top: 0vh;
        }

        #homeButtonsContainer {
            width: 15vw;
        }

        .homeButtons {
            font-size: 0.9rem;
            padding: 4%;
        }

        #contentContainer {
            row-gap: 50px;
        }
    }
</style>