<template>
    <section>
        <div id="backButtonAndTitle">
            <back-button></back-button>
            <h3>Edit Profile</h3>
            <div></div>
        </div>
        <form action="javascript:void(0)">
            <div id="editImage">
                <img :src="currentUserData.imageUrl" :alt="`@${currentUserData}'s profile image.`">
                <label for="editImageUrl">Image URL</label>
                <input type="URL" id="editImageUrl">
            </div>
            <div id="editUserBio">
                <label for="editBio">Bio</label>
                <textarea id="editBio"></textarea>
            </div>
            <div id="editDateOfBirth">
                <label for="editBirthDate">Birthdate</label>
                <p>{{ currentUserData.birthdate }}</p>
                <input type="date" id="editBirthDate">
            </div>
            <input type="submit" id="saveEditProfileButton" value="Save" @click="editUserProfile">
        </form>
        <p id="editProfileStatus">{{ editProfileStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import BackButton from "../../components/BackButton.vue";

    export default {
        name: "Edit-Profile",

        components: {
            BackButton
        },

        data: function() {
            return {
                editProfileStatus: "",
                currentUserData: cookies.get("userData"),
                updateUserProfileData: {
                    loginToken: cookies.get("loginToken")
                },
            }
        },

        methods: {
            editUserProfile: function() {

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
                    url: "https://tweeterest.ml/api/users",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
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
    #backButtonAndTitle {
        display: grid;
        place-items: center;
        grid-template-columns: 1.2fr 3fr 1fr;
        width: 100%;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
        min-height: 10vh;
    }

    h3 {
        color: #7398A5;
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
        background: #9FBFCC;
        color: white;
        font-weight: 700;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        img {
            width: 35vw;
        }

        h3 {
            font-size: 1.3rem;
        }

        label, p, #editDateOfBirth {
            font-size: 1.1rem;
            font-weight: 300;
        }

        #saveEditProfileButton {
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        #backButtonAndTitle {
            min-height: 13vh;
            grid-template-columns: 1fr 2fr 1fr;
        }

        img {
            width: 30vw;
        }

        label, p, #editDateOfBirth {
            font-size: 1.1rem;
            font-weight: 300;
        }

        #saveEditProfileButton {
            font-size: 1.2rem;
            padding: 1.5%;
            margin-bottom: 5vh;
        }

        #editImageUrl, #editBio, input {
            width: 50vw;
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