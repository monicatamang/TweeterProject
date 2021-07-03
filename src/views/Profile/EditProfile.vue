<template>
    <section>
        <desktop-nav-bar></desktop-nav-bar>
        <page-header-with-button title="Edit Profile"></page-header-with-button>
        <v-divider></v-divider>
        <form action="javascript:void(0)">
            <div id="editImage">
                <img :src="currentUserData.imageUrl" :alt="`@${currentUserData}'s profile image.`" v-if="currentUserData.imageUrl !== ''">
                <v-avatar :color="color" size="120" v-else-if="currentUserData.imageUrl === ''">
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
        </form>
        <p id="editProfileStatus">{{ editProfileStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PageHeaderWithButton from "../../components/PageHeaderWithButton.vue";
    import DesktopNavBar from "../../components/DesktopNavBar.vue";

    export default {
        name: "Edit-Profile",

        components: {
            PageHeaderWithButton,
            DesktopNavBar
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
            editUserProfile() {
                this.editProfileStatus = "Saving";
                // Creating conditional to check whether the user has entered content in the input fields before updating their profile and sending it to the API
                if (document.getElementById("editImageUrl").value !== null) {
                        this.updateUserProfileData.imageUrl = document.getElementById("editImageUrl").value;
                }

                if (document.getElementById("editBio").value !== null) {
                        this.updateUserProfileData.bio = document.getElementById("editBio").value;
                }

                if (document.getElementById("editBirthDate").value !== null) {
                        this.updateUserProfileData.birthdate = document.getElementById("editBirthDate").value;
                }

                // If the user leaves the input fields empty, leave the user's original data as is

                // Sending an axios request to update the user's profile data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                    // Sending an object with the user's updated email, username, password, bio, birthdate, imageUrl, and loginToken
                    data: this.updateUserProfileData

                }).then((res) => {
                    // If the network is done and no errors occur, convert the returned data from the API into JSON format which stores the user's data as a cookie and can be accessed by views or components
                    let updatedUserDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", updatedUserDataJSON);

                    // Taking the user back to their profile page
                    this.$router.push('/Profile');
                }).catch((err) => {
                    err;

                    // If the network is done and page errors, print an error message to the user
                    this.editProfileStatus = "An error occured while trying to save your changes.";
                })
            }   
        },
    }
</script>

<style scoped>
    section {
        background: white;
        height: 100%;
    }

    #imageUrlLabel {
        margin-top: 5vh;
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
    }

    label, p {
        justify-self: start;
    }

    label {
        font-size: 0.95rem;
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

        #backButtonAndTitle {
            min-height: 15vh;
            grid-template-columns: 1fr 4fr 1fr;
        }

        img {
            width: 15vw;
            margin: 5vh 0vh;
        }

        #editImageUrl, #editBio, input {
            width: 30vw;
        }

        label, p, #editDateOfBirth {
            font-size: 0.8rem;
            font-weight: 300;
        }

        form {
            row-gap: 50px;
        }

        #saveEditProfileButton {
            width: 10vw;
            font-size: 0.8rem;
            padding: 0.5%;
            margin-bottom: 10vh;
        }
    }
</style>