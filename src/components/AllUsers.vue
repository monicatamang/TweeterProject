<template>
    <article>
        <!-- Creating a for-loop that will print each user's image and username to the feed page -->
        <!-- Inside the for-loop, the user's image, username and bio in a link so that when each user is clicked, it will go to the route that matches the user's username -->
        <div v-for="user in users" :key="user.userId">
            <router-link :to="{ 
                name: 'UserProfileDetails', 
                params: {
                    imageUrl: user.imageUrl, 
                    username: user.username,
                    bio: user.bio
                } 
            }" @click="userProfileIsClicked">
                <img :src="user.imageUrl" :alt="`User Profile Details for` + user.username">
                <h4>@{{ user.username }}</h4>
            </router-link>
        </div>
        <p>{{ getAllUsersStatus }}</p>
    </article>
</template>

<script>
    import axios from "axios"

    export default {
        name: "all-users",

        data: function() {
            return {
                getAllUsersStatus: "",
                users: []
            }
        },

        methods: {
            // Configuring an axios request to get all the users from the API
            getAllUsers: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "GET",
                    headers: {
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    }
                }).then((res) => {
                    this.users = res.data;
                }).catch((err) => {
                    console.log(err);
                    this.getAllUsersStatus = "An error has occured while loading users.";
                });
            },

            // Creating a function that will send the user's image, username and bio to the UserProfileDetails view
            userProfileIsClicked: function() {
                this.$store.commit("getAllUsersData", this.users);
            }
        },

        mounted: function() {
            this.getAllUsers();
        }
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 40vw;
    }

    a {
        display: grid;
        place-items: center;
        text-align: center;
    }
</style>