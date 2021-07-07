<template>
    <section>
        <article id="mobileHome">
            <post-it-logo></post-it-logo>
            <h1>Welcome to Post-It</h1>
            <p>Join our growing community of 10,000+ students from all over the world</p>
            <img src="../assets/heroImage.png" alt="A vector image of a left-sided and right-sided speech bubble in between a larger circle that has a dashed outline. The right-sided speech bubble is a dark blue colour with long, white curved lines and the left-sided speech bubble is a light blue colour with dark blue curved lines. In the right-sided speech bubble, there is a women with short, middle parted black hair, wearing blue hoop earrings, happily smiling at the man in the left-sided speech bubble with her eyes closed. In the left-sided speech bubble, there is a man smiling at the women in the right-sided speech bubble. The man has curly black hair wearing a black, long sleeve polo shirt.">
            <div id="homeButtonsContainer">
                <button @click="takeUserToLoginPage" class="homeButtons" id="loginButton">Login</button>
                <button @click="takeUserToCreateAccountPage" class="homeButtons" id="createAccountButton">Create Account</button>
            </div>
        </article>
        <article id="desktopHome">
            <div id="heroImageContainer">
                <img src="../assets/heroImage.png" alt="A vector image of a left-sided and right-sided speech bubble in between a larger circle that has a dashed outline. The right-sided speech bubble is a dark blue colour with long, white curved lines and the left-sided speech bubble is a light blue colour with dark blue curved lines. In the right-sided speech bubble, there is a women with short, middle parted black hair, wearing blue hoop earrings, happily smiling at the man in the left-sided speech bubble with her eyes closed. In the left-sided speech bubble, there is a man smiling at the women in the right-sided speech bubble. The man has curly black hair wearing a black, long sleeve polo shirt.">
            </div>
            <div id="spacer"></div>
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
    import PostItLogo from "../components/PostItLogo.vue";

    export default {
        name: "Home",

        components: {
            PostItLogo
        },

        data() {
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
        },

        mounted() {
            // If the user returns back to the website and has a login token, automatically take the user to the Feed page
            if(this.loginToken) {
              this.$router.push("/Feed");
            }
        },
    }
</script>

<style scoped>
    section {
        background: white;
        height: 100%;
        padding-top: 5vh;
    }

    article, #homeButtonsContainer {
        display: grid;
        place-items: center;
    }  

    article {
        row-gap: 10px;
        min-height: 85vh;
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
        background: var(--primaryColor);
    }

    #loginButton {
        color: var(--primaryColor);
        border: 0.8px solid var(--primaryColor);
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

        #heroImageContainer {
            position: fixed;
            top: 0px;
            left: 0px;
            display: grid;
            place-items: center;
            width: 50%;
            height: 100%;
            background: var(--primaryColor);
        }

        img {
            display: block;
            width: 25vw;
        }
    }
</style>