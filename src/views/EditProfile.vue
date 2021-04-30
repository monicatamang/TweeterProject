<template>
    <section>
        <router-link to="Profile">Cancel</router-link>
        <h1>Edit Profile Page</h1>
        <!-- <single-user-profile></single-user-profile> -->
        <form action="javascript:void(0)">
            <div>
                <p>Current Email: {{ currentUserData.email }}</p>
                <label for="editProfileEmail">Email</label>
                <input type="text" id="editProfileEmail" @keypress="isTyping = true">
            </div>
            <div>
                <p>Current Username: {{ currentUserData.username }}</p>
                <label for="editProfileUsername">Username</label>
                <input type="text" id="editProfileUsername" @keypress="isTyping = true">
            </div>
            <div>
                <p>Current Password: {{ currentUserData.password }}</p>
                <label for="editProfilePassword">Password</label>
                <input type="password" id="editProfilePassword" @keypress="isTyping = true">
            </div>
            <div>
                <p>Current Date of Birth: {{ currentUserData.birthdate }}</p>
                <label for="editProfileBirthDate">Birthdate</label>
                <input type="date" id="editProfileBirthDate" @keypress="isTyping = true">
            </div>
            <div>
                <p>Current Bio: {{ currentUserData.bio }}</p>
                <label for="editProfileBio">Bio</label>
                <textarea id="editProfileBio" @keypress="isTyping = true"></textarea>
            </div>
            <div>
                <img :src="currentUserData.imageUrl" alt="">
                <label for="editProfileImageUrl">Image URL</label>
                <input type="text" id="editProfileImageUrl" @keypress="isTyping = true">
            </div>
            <input type="submit" id="saveButton" value="Save" @click="editUserProfile" v-if="isTyping">
        </form>
        <delete-user-profile></delete-user-profile>
        <p>{{ editProfileStatus }}</p>
    </section>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'
    // import SingleUserProfile from '../components/SingleUserProfile.vue';
    import DeleteUserProfile from '../components/DeleteUserProfile.vue';

    export default {
        name: "Edit-Profile",
        components: {
            // SingleUserProfile,
            DeleteUserProfile,
        },
        data: function() {
            return {
                isTyping: false,
                editProfileStatus: "",
                currentUserData: cookies.get(`userData`),
                updatedUserProfileData: 
                {
                    loginToken: cookies.get(`loginToken`)
                },
            }
        },
        methods: {
            editUserProfile: function() {
                // Printing a loading message to the user
                this.editProfileStatus = `Saving`;

                // If the edit input field is not empty, update the input field value to whatever the user has enter
                // If the user leaves the input field empty, set the user's data to what they originally had

                // Checking this conditional before sending the API request because we need the user's input data first so that we can send that data to the API to update their profile
                if(document.getElementById(`editProfileEmail`).value !== null) {
                        this.updatedUserProfileData.email = document.getElementById(`editProfileEmail`).value;
                    }

                if (document.getElementById(`editProfileUsername`).value !== null) {
                        this.updatedUserProfileData.username = document.getElementById(`editProfileUsername`).value;
                }

                if (document.getElementById(`editProfileBio`).value !== null) {
                        this.updatedUserProfileData.bio = document.getElementById(`editProfileBio`).value;
                }

                if (document.getElementById(`editProfileBirthDate`).value !== null) {
                        this.updatedUserProfileData.birthdate = document.getElementById(`editProfileBirthDate`).value;
                }

                if (document.getElementById(`editProfileImageUrl`).value !== null) {
                        this.updatedUserProfileData.imageUrl = document.getElementById(`editProfileImageUrl`).value;
                }

                axios.request({
                    url: `https://tweeterest.ml/api/users`,
                    method: `PATCH`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    
                    // Sending an object with the user's updated email, username, password, bio, birthdate, imageUrl, and loginToken
                    data: this.updatedUserProfileData

                }).then((res) => {
                    let updatedUserDataJSON = JSON.stringify(res.data);
                    cookies.set(`userData`, updatedUserDataJSON);
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