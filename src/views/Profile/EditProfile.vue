<template>
    <section>
        <router-link to="/Profile">Close</router-link>
        <h1>Edit Profile Page</h1>
        <form action="javascript:void(0)">
            <input type="submit" id="saveEditProfileButton" value="Save" @click="editUserProfile" v-if="isTyping">
            <div>
                <img :src="currentUserData.imageUrl" alt="">
                <label for="editImageUrl">Image URL</label>
                <input type="URL" id="editImageUrl" @keypress="isTyping = true">
            </div>
            <div>
                <label for="editBio">Bio</label>
                <textarea id="editBio" @keypress="isTyping = true"></textarea>
            </div>
            <div>
                <p>Current Date of Birth: {{ currentUserData.birthdate }}</p>
                <label for="editBirthDate">Birthdate</label>
                <input type="date" id="editBirthDate" @keypress="isTyping = true">
            </div>
        </form>
        <p>{{ editProfileStatus }}</p>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "Edit-Profile",
        data: function() {
            return {
                isTyping: false,
                editProfileStatus: "",
                currentUserData: cookies.get(`userData`),
                updateUserProfileData: {
                    loginToken: cookies.get(`loginToken`)
                },
            }
        },
        methods: {
            editUserProfile: function() {
                // Printing a loading message to the user
                this.editProfileStatus = `Saving`;

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
                    this.editProfileStatus = `An error occured while trying to save your changes.`
                    console.log(err);
                })
            }   
        },
    }
</script>

<style scoped>
    input, textarea {
        border: 1px solid black;
        margin-bottom: 3vh;
    }

    div {
        display: grid;
    }

    img {
        width: 20vw;
    }
</style>