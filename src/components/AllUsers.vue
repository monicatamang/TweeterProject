<template>
    <article>
        <div v-for="user in users" :key="user.userId">
            <router-link :to="{ 
                name: 'UserProfileDetails', 
                params: {
                    imageUrl: user.imageUrl, 
                    username: user.username,
                    bio: user.bio
                } 
            }">
                <img :src="user.imageUrl" :alt="`User Profile Details for` + user.username">
                <h4>@{{ user.username }}</h4>
                <all-tweets></all-tweets>
                <div></div>
            </router-link>
        </div>
        <p>{{ getAllUsersStatus }}</p>
    </article>
</template>

<script>
    import axios from "axios";
    // import AllTweets from "./AllTweets.vue";

    export default {
        name: "all-users",

        components: {
            // AllTweets,
        },

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
        },

        mounted: function() {
            this.getAllUsers();
        }
    }
</script>

<style scoped>
    img {
        clip-path: circle();
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    a {
        display: grid;
        place-items: center;
        /* grid-template-columns: 1fr 1fr 2fr; */
        text-align: center;
    }
</style>