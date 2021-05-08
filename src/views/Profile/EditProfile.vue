<template>
    <section>
        <edit-profile-header></edit-profile-header>
        <form action="javascript:void(0)">
            <div id="editImage">
                <img :src="currentUserData.imageUrl" :alt="`@${currentUserData}'s profile image.`">
                <label for="editImageUrl">Image URL</label>
                <input type="URL" id="editImageUrl" @keypress="isTyping = true">
            </div>
            <div id="editUserBio">
                <label for="editBio">Bio</label>
                <textarea id="editBio" @keypress="isTyping = true"></textarea>
            </div>
            <div id="editDateOfBirth">
                <label for="editBirthDate">Birthdate</label>
                <p>{{ currentUserData.birthdate }}</p>
                <input type="date" id="editBirthDate" @keypress="isTyping = true">
            </div>
            <input type="submit" id="saveEditProfileButton" value="Save" @click="editUserProfile" v-if="isTyping">
        </form>
        <p>{{ editProfileStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import EditProfileHeader from "../../components/UserProfiles/EditProfileHeader.vue";

    export default {
        name: "Edit-Profile",

        components: {
            EditProfileHeader,
        },

        data: function() {
            return {
                isTyping: false,
                editProfileStatus: "",
                currentUserData: cookies.get("userData"),
                updateUserProfileData: {
                    loginToken: cookies.get("loginToken")
                },
            }
        },

        methods: {
            editUserProfile: function() {
                // Printing a loading message to the user
                this.editProfileStatus = "Saving";

                // If the edit input field is not empty, update the input field value to whatever the user has enter
                // If the user leaves the input field empty, leave the user's original data as is

                // Checking this conditional before sending the API request because we need the user's input data first so that we can send that data to the API to update their profile

                if (document.getElementById("editImageUrl").value !== null) {
                        this.updateUserProfileData.imageUrl = document.getElementById("editImageUrl").value;
                }

                if (document.getElementById("editBio").value !== null) {
                        this.updateUserProfileData.bio = document.getElementById("editBio").value;
                }

                if (document.getElementById("editBirthDate").value !== null) {
                        this.updateUserProfileData.birthdate = document.getElementById("editBirthDate").value;
                }

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
                    let updatedUserDataJSON = JSON.stringify(res.data);
                    cookies.set("userData", updatedUserDataJSON);
                    console.log(res.data);
                    this.$router.push('Profile');
                }).catch((err) => {
                    this.editProfileStatus = "An error occured while trying to save your changes.";
                    console.log(err);
                })
            }   
        },
    }
</script>

<style scoped>
    section {
        background: rgba(245, 245, 245, 0.3);
    }

    form {
        display: grid;
        row-gap: 30px;
        place-items: center;
        margin-top: 5vh;
    }

    label, p {
        justify-self: start;
    }

    #editImage {
        display: grid;
        place-items: center;
        row-gap: 20px;
    }

    #editImageUrl, input {
        border-radius: 5px;
        border: 1px solid rgba(211, 211, 211, 0.8);
        /* box-shadow: 1px 1px 5px lightgrey; */
        padding: 2%;
        width: 80vw;
    }

    #editUserBio {
        display: grid;
        place-items: center;
        row-gap: 20px;
    }

    #editBio {
        border-radius: 5px;
        /* box-shadow: 1px 1px 5px lightgrey; */
        border: 1px solid rgba(211, 211, 211, 0.8);
        padding: 2%;
        width: 80vw;
    }

    #editDateOfBirth {
        display: grid;
        place-items: center;
        row-gap: 20px;
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
</style>