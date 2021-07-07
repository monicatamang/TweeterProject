<template>
    <section>
        <page-header-with-button title="Edit Profile"></page-header-with-button>
        <div id="displayTitleAndButton">
            <back-button></back-button>
            <h1>Edit Profile</h1>
            <div></div>
        </div>
        <v-divider></v-divider>
        <form action="javascript:void(0)">
            <div id="editImage">
                <img :src="currentUserData.imageUrl" :alt="`@${currentUserData}'s profile image.`" v-if="currentUserData.imageUrl !== ''">
                <v-avatar :color="color" size="120" class="mb-10 mt-md-16" v-else-if="currentUserData.imageUrl === ''">
                    <v-icon large dark>mdi-account</v-icon>
                </v-avatar>
                <label for="editImageUrl" id="imageUrlLabel">Image URL</label>
                <input type="URL" id="editImageUrl">
            </div>
            <div id="editUserBio">
                <label for="editBio">Bio</label>
                <textarea id="editBio"></textarea>
            </div>
            <div id="editDateOfBirth">
                <label for="editBirthDate">Birthdate</label>
                <input type="date" id="editBirthDate" :placeholder="currentUserData.birthdate">
            </div>
            <input type="submit" id="saveEditProfileButton" value="Save" @click="editUserProfile">
            <p id="editProfileStatus">{{ editProfileStatus }}</p>
        </form>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PageHeaderWithButton from "../../components/PageHeaderWithButton.vue";
    import BackButton from "../../components/BackButton.vue";

    export default {
        name: "Edit-Profile",

        components: {
            PageHeaderWithButton,
            BackButton
        },

        data() {
            return {
                color: "#60A3D9",
                editProfileStatus: "",
                currentUserData: cookies.get("userData"),
                updateUserProfileData: {
                    loginToken: cookies.get("loginToken")
                },
            }
        },

        methods: {
            // Creating a function that will update a user's bio, birthdate and image url
            editUserProfile() {
                // Printing a loading message
                this.editProfileStatus = "Saving";
                // Creating conditional to check whether the user has entered content in the input fields before updating their profile and sending it to the API
                // If the user leaves the input fields empty, leave the user's original data as is
                if (document.getElementById("editImageUrl").value !== null) {
                        this.updateUserProfileData.imageUrl = document.getElementById("editImageUrl").value;
                }
                if (document.getElementById("editBio").value !== null) {
                        this.updateUserProfileData.bio = document.getElementById("editBio").value;
                }
                if (document.getElementById("editBirthDate").value !== null) {
                        this.updateUserProfileData.birthdate = document.getElementById("editBirthDate").value;
                }

                // Configuring an axios request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // Sending an object with the user's updated bio, birthdate, imageUrl, and loginToken
                    data: this.updateUserProfileData
                }).then((res) => {
                    // If the network is done and no errors occur, update the user's cookies with the new bio, birthdate and/or image url
                    let updatedUserDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", updatedUserDataJSON);
                    // Taking the user back to their profile page
                    this.$router.push('/Profile');
                }).catch((err) => {
                    // If the network is done and page errors, print an error message to the user
                    this.editProfileStatus = "An error occured while trying to save your changes. Please refresh the page and try again.";
                    err;
                })
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
    section {
        background: white;
        height: 100%;
    }

    #backButtonAndTitle {
        display: grid;
        place-items: center;
        grid-template-columns: 1.2fr 3fr 1fr;
        width: 100%;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
        min-height: 10vh;
    }

    form {
        display: grid;
        row-gap: 30px;
        place-items: center;
        margin-top: 5vh;
    }

    #editProfileStatus {
        text-align: center;
        padding: 0% 5%;
        margin-bottom: 3vh;
    }

    p {
        text-align: center;
    }

    label {
        font-size: 0.95rem;
        justify-self: start;
    }

    #editImage, #editUserBio, #editDateOfBirth  {
        display: grid;
        place-items: center;
        row-gap: 20px;
    }

    #editImageUrl, #editBio, input {
        border-radius: 3px;
        border: 1px solid rgba(211, 211, 211, 0.8);
        padding: 2%;
        width: 80vw;
    }

    img {
        width: 40vw;
        clip-path: circle();
        object-fit: cover;
        margin-bottom: 5vh;
    }

    input:focus, textarea:focus {
        outline: none;
    }

    #saveEditProfileButton {
        background: var(--primaryColor);
        color: white;
        font-weight: 700;
        border-radius: 20px;
    }

    #displayTitleAndButton {
        display: none;
    }

    @media only screen and (min-width: 768px) {
        
        img {
            width: 35vw;
        }

        label, p, #editDateOfBirth {
            font-size: 1.1rem;
            font-weight: 300;
        }

        #saveEditProfileButton {
            font-size: 1.1rem;
            margin-bottom: 5vh;
        }

        form {
            row-gap: 60px;
        }
    }

    @media only screen and (min-width: 1024px) {

        section {
            background: whitesmoke;
            display: grid;
            place-items: center;
            margin-top: 6vh;
        }

        img {
            width: 15vw;
            margin: 5vh 0vh;
        }

        form {
            width: 50%;
            box-shadow: 1px 5px 5px lightgrey;
            background: white;
            row-gap: 50px;
            border-radius: 10px;
            margin-bottom: 6vh;
        }

        #editImageUrl, #editBio, input {
            width: 30vw;
        }

        label, p, #editDateOfBirth {
            font-size: 0.8rem;
            font-weight: 300;
        }

        p {
            margin-top: -20vh;
        }

        #saveEditProfileButton {
            width: 10vw;
            font-size: 0.8rem;
            padding: 10px;
            margin-bottom: 10vh;
            background: white;
            border: 1px solid var(--primaryColor);
            color: var(--primaryColor);
        }

        #saveEditProfileButton:hover {
            background: var(--primaryColor);
            color: white;
            font-weight: 700;
        }

        #displayTitleAndButton {
            display: grid;
            place-items: center;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 30%;

            position: fixed;
            top: 0;
            width: 100%;
            box-shadow: 1px 5px 5px lightgrey;
            z-index: 1;
            background: white;
        }

        h1 {
            font-weight: 400;
            font-size: 1.2rem;
        }
    }
</style>