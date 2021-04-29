<template>
    <section>
        <router-link to="Profile">Cancel</router-link>
        <h1>Edit Profile Page</h1>
        <form action="javascript:void(0)">
            <div>
                <label for="editProfileEmail">Email</label>
                <input type="text" id="editProfileEmail" @keypress="isTyping = true">
            </div>
            <div>
                <label for="editProfileUsername">Username</label>
                <input type="text" id="editProfileUsername" @keypress="isTyping = true">
            </div>
            <div>
                <label for="editProfilePassword">Password</label>
                <input type="text" id="editProfilePassword" @keypress="isTyping = true">
            </div>
            <div>
                <label for="editProfileBio">Bio</label>
                <textarea id="editProfileBio"></textarea>
            </div>
            <div>
                <label for="editProfileBirthDate">Date of Birth</label>
                <input type="date" id="editProfileBirthDate" @keypress="isTyping = true">
            </div>
            <div>
                <label for="editProfileImageUrl">Image URL</label>
                <input type="text" id="editProfileImageUrl" @keypress="isTyping = true">
            </div>
            <input type="submit" id="saveButton" value="Save" @click="editUserProfile" v-if="isTyping">
        </form>
        <p>{{ editProfileStatus }}</p>
    </section>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: "Edit-Profile",
        data: function() {
            return {
                isTyping: true,
                editProfileStatus: "",
                originalUserProfileData: {},
                editUserProfileData: {
                    email: "",
                    username: "",
                    bio: "",
                    birthdate: "",
                    imageUrl: ""
                },
            }
        },
        methods: {
            attemptEditUserProfile: function() {
                if ((document.getElementById(`editProfileEmail`).value === "") && (document.getElementById(`editProfileUsername`).value === "") && (document.getElementById(`editProfilePassword`).value === "") && (document.getElementById(`editProfileBio`).value === "") && (document.getElementById(`editProfileBirthDate`).value === "") && (document.getElementById(`editProfileImageUrl`).value === "")) {
                    this.isTyping = false;
                }
            },

            editUserProfile: function() {
                this.editProfileStatus = `Saving`;
                axios.request({
                    url: `https://tweeterest.ml/api/users`,
                    method: `PATCH`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get(`loginToken`),
                        email: document.getElementById(`editProfileEmail`).value,
                        username: document.getElementById(`editProfileUsername`).value,
                        password: document.getElementById(`editProfilePassword`).value,
                        bio: document.getElementById(`editProfileBio`).value,
                        birthdate: document.getElementById(`editProfileBirthDate`).value,
                        imageUrl: document.getElementById(`editProfileImageUrl`).value
                    }
                }).then((res) => {
                    // Axios has converted this from JSON format to an Object already
                    this.originalUserProfileData = cookies.get(`userProfileDataJSON`);
                   
                    // If the edit input field is not empty, update the input field value to whatever the user has enter
                    // If the user leaves the input field empty, set the user's data to what they originally had
                    if(document.getElementById(`editProfileEmail`).value !== "") {
                        this.editUserProfileData.email = res.data.email;
                    } else {
                        this.editUserProfileData.email = this.originalUserProfileData.email;
                    }

                    if (document.getElementById(`editProfileUsername`).value !== "") {
                        this.editUserProfileData.username = res.data.username;
                    } else {
                        this.editUserProfileData.username = this.originalUserProfileData.username;
                    }

                    if (document.getElementById(`editProfileBio`).value !== "") {
                        this.editUserProfileData.bio = res.data.bio;
                    } else {
                        this.editUserProfileData.bio = this.originalUserProfileData.bio;
                    }

                    if (document.getElementById(`editProfileBirthDate`).value !== "") {
                        this.editUserProfileData.birthdate = res.data.birthdate;
                    } else {
                        this.editUserProfileData.birthdate = this.originalUserProfileData.birthdate;
                    }

                    if (document.getElementById(`editProfileImageUrl`).value !== "") {
                        this.editUserProfileData.imageUrl = res.data.imageUrl;
                    } else {
                        this.editUserProfileData.imageUrl = this.originalUserProfileData.imageUrl;
                    }
                    
                    console.log(this.editUserProfileData);
                    this.$router.push('Profile');
                }).catch((err) => {
                    console.log(this.editUserProfileData);
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
    }

    div {
        display: grid;
    }

    p {
        color: black;
    }
</style>