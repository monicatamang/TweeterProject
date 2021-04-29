<template>
    <section>
        <h1>Profile Page</h1>
        <router-link to="/">
            <button @click="logOutUser">Logout</button>
        </router-link>
        <form action="javascript:void(0)">
            <div>
                <label for="profileEmail">Email</label>
                <input type="text" id="profileEmail">
            </div>
            <div>
                <label for="profileUsername">Username</label>
                <input type="text" id="profileUsername">
            </div>
            <div>
                <label for="profilePassword">Password</label>
                <input type="password" id="profilePassword">
            </div>
            <div>
                <label for="profileBio">Bio</label>
                <textarea id="profileBio"></textarea>
            </div>
            <div>
                <label for="profileBirthDate">Date of Birth</label>
                <input type="date" id="profileBirthDate">
            </div>
            <div>
                <label for="profileImageUrl">Image URL</label>
                <input type="URL" id="profileImageUrl">
            </div> -->
            <input type="submit" id="saveButton" value="Save" @click="editUserProfile">
        </form>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import NavigationBar from "../components/NavigationBar.vue";
    import axios from "axios"
    import cookies from "vue-cookies";

    export default {
        name: "Profile",
        data: function() {
            return {
                editProfileStatus: "",
                userEditedData: {}
            }
        },
        components: {
            NavigationBar
        },
        methods: {
            logOutUser: function() {
                cookies.remove(`loginToken`);
            },

            editUserProfile: function() {
                this.editProfileStatus = `Saving`
                axios.request({
                    url: `https://tweeterest.ml/api/users`,
                    method: `PATCH`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    data: {
                        loginToken: cookies.get(`loginToken`),
                        email: document.getElementById(`profileEmail`),
                        username: document.getElementById(`profileUsername`),
                        password: document.getElementById(`profilePassword`),
                        bio: document.getElementById(`profileBio`),
                        birthdate: document.getElementById(`profileBirthDate`),
                        imageUrl: document.getElementById(`profileImageUrl`)
                    }
                }).then((res) => {
                    this.userEditedData = res.data;
                    this.editProfileStatus = `Saved`
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                    this.editProfileStatus = `An error occurred while saving the changes.`
                    console.log(cookies.get(`loginToken`));
                });
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
</style>