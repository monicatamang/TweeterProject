<template>
    <section>
        <div id="createAccountImage">
            <img src="../assets/createAccountImage.jpg" alt="A vector image of three different types of speech bubbles with a white-coloured outline. On the left hand side, there is a circular, right-sided speech bubble with three thick, horizontal white lines in the center. In the middle of the image, there is a rounded, rectangular right-sided speech bubble with the ends of the left-sided and right-sided speech bubble overlapping with the middle speech bubble. In the center of the middle speech bubble is a white coloured ellipsis. On the right hand side, there is a left-sided rounded, rectangular speech bubble with a white coloured ellipsis near the end of the speech bubble.">
        </div>
        <article>
            <post-it-logo></post-it-logo>
            <h1>Create Account</h1>
            <p id="instructions">Please enter the following information below.</p>
            <p id="loginLink">Have an account already? <router-link to="/Login">Log in</router-link></p>
            <form action="javascript:void(0)">
                <div>
                    <label for="createAccountUsername">Username*</label>
                    <input type="text" id="createAccountUsername">
                </div>
                <div>
                    <label for="createAccountEmail">Email*</label>
                    <input type="text" id="createAccountEmail">
                </div>
                <div>
                    <label for="createAccountPassword">Password*</label>
                    <input type="password" id="createAccountPassword">
                    <h6>Password must be a minimum of 12 characters.</h6>
                </div>
                <div>
                    <label for="createAccountBio">Bio</label>
                    <textarea id="createAccountBio"></textarea>
                </div>
                <div>
                    <label for="createAccountBirthDate">Date of Birth*</label>
                    <input type="date" id="createAccountBirthDate">
                </div>
                <div>
                    <label for="createAccountImageUrl">Image URL</label>
                    <input type="URL" id="createAccountImageUrl">
                </div>
                <input type="submit" id="createAccountButton" value="Create Account" @click="createUserAccount">
            </form>
            <p>{{ createUserAccountStatus }}</p>
        </article>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PostItLogo from "../components/PostItLogo.vue";

    export default {
        name: "Create-Account",

        components: {
            PostItLogo
        },

        data() {
            return {
                createUserAccountStatus: "",
            }
        },

        methods: {
            createUserAccount() {
                this.createUserAccountStatus = "Creating Account";
                // Sending an axios request that creates a new account for a user
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        email: document.getElementById(`createAccountEmail`).value,
                        username: document.getElementById(`createAccountUsername`).value,
                        password: document.getElementById(`createAccountPassword`).value,
                        bio: document.getElementById(`createAccountBio`).value,
                        birthdate: document.getElementById(`createAccountBirthDate`).value,
                        imageUrl: document.getElementById(`createAccountImageUrl`).value
                    }
                }).then((res) => {
                    // If the network is done and no errors occur, set the user's login token as a cookie
                    cookies.set("loginToken", res.data.loginToken);

                    // Printing a success message to the user
                    this.createUserAccountStatus = "Account Created";

                    // Converting the returned data from the API into JSON format which stores the user's data as a cookie and can be accessed by views or components
                    let userDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", userDataJSON);
                    
                    // Taking the user to the feed page
                    this.$router.push('/Discover');
                }).catch((err) => {
                    err;
                    // If the network is done and page errors, print an error message to the user
                    this.createUserAccountStatus = "Failed to create account.";
                });
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null) {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    section, article, form, div {
        display: grid;
        background: white;
    }

    section {
        padding: 5vh 0vw;
    }

    section, article {
        place-items: center;
        row-gap: 20px;
    }

    h1 {
        font-size: 1.7rem;
    }

    p {
        letter-spacing: 0.3px;
    }

    #instructions, #loginLink {
        color: var(--accentColorOne);
        text-align: center;
    }

    #instructions {
        margin-top: 1vh;
        font-size: 0.85rem;
    }

    #loginLink {
        margin-top: -3vh;
        font-size: 0.85rem;
    }

    #loginLink > a {
        color: var(--primaryColor);
    }

    form {
        row-gap: 40px;
        margin-top: 2vh;
        text-align: left;
        width: 70vw;
    }

    input, textarea {
        padding: 3% 5%;
        border: 1px solid rgba(211, 211, 211, 0.6);
        border-radius: 3px;
    }

    textarea {
        height: 15vh;
    }

    input:focus, textarea:focus {
        outline: var(--primaryColor);
    }

    label, #createAccountBirthDate {
        font-size: 0.9rem;
        font-weight: 300;
    }

    #createAccountBirthDate {
        padding-left: 5%;
    }

    #createAccountButton {
        color: white;
        font-weight: 700;
        border-radius: 30px;
        margin-top: 3vh;
        padding: 5% 0%;
        background: var(--primaryColor);
        letter-spacing: 1px;
    }

    div {
        row-gap: 10px;
        width: 100%;
    }

    #createAccountImage {
        display: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        h1 {
            font-size: 2.1rem;
        }

        #instructions, #loginLink {
            font-weight: 300;
        }

        label, #instructions, #createAccountBirthDate {
            font-size: 1.1rem;
        }

        #loginLink {
            font-size: 1rem;
        }

        div {
            row-gap: 20px;
        }

        form {
            row-gap: 50px;
        }

        #createAccountBirthDate {
            padding-left: 3%;
        }

        #createAccountButton {
            padding: 3% 0%;
            font-size: 1.15rem;
        }

        input, textarea {
            padding: 3%;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
            
        h1 {
            font-size: 2.2rem;
        }

        #instructions {
            font-size: 1.2rem;
        }

        label, #loginLink, #createAccountBirthDate {
            font-size: 1.1rem;
        }

        div {
            row-gap: 30px;
        }

        form {
            row-gap: 60px;
        }

        #createAccountBirthDate {
            padding-left: 2%;
        }

        #createAccountButton {
            padding: 2.5% 0%;
            font-size: 1.15rem;
            margin-bottom: 5vh;
        }

        input, textarea {
            padding: 3%;
        }
    }

    @media only screen and (min-width: 1024px) {

        img {
            width: 25vw;
            position: fixed;
            top: 25vh;
            bottom: 30vh;
            left: 25vh;
            right: 25vh;
        }

        #createAccountImage {
            display: grid;
            place-items: center;
            background: var(--primaryColor);
            width: 100%;
            height: 100%;
        }

        section {
            grid-template-columns: 1fr 1fr;
            padding: 0vh;
        }

        article {
            padding-top: 10vh;
        }

        input, textarea {
            padding: 1%;
            width: 100%;
        }

        form {
            width: 30vw;
            margin-top: 5vh;
        }

        #createAccountBirthDate {
            font-size: 0.9rem;
            padding-left: 2%;
        }

        #createAccountButton {
            padding: 2%;
            font-size: 1rem;
            margin-bottom: 5vh;
        }

        #createAccountButton:hover {
            background: white;
            color: var(--primaryColor);
            border: 1px solid var(--primaryColor);
        }
    }
</style>