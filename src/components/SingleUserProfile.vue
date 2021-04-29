<template>
    <article>
       <h1>Email</h1>
       <p>{{ updatedUserProfileData[0].email }}</p>
       <h1>Username</h1>
       <p>{{ updatedUserProfileData[0].username }}</p>
       <h1>Password</h1>
       <p>{{ updatedUserProfileData[0].password }}</p>
       <h1>Bio</h1>
       <p>{{ updatedUserProfileData[0].bio }}</p>
       <h1>Date of Birth</h1>
       <p>{{ updatedUserProfileData[0].birthdate }}</p>

       <!-- *Put image description -->
       <img :src="updatedUserProfileData[0].imageUrl" alt="">
    </article>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: "single-user-profile",
        data: function() {
            return {
                updatedUserProfileData: []
            }
        },
        methods: {
            printUpdatedUserData: function() {
                axios.request({
                    url: `https://tweeterest.ml/api/users`,
                    method: `GET`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
                    },
                    params: {
                        userId: cookies.get(`userId`)
                    }
                }).then((res) => {
                    this.updatedUserProfileData = res.data;
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        mounted () {
            this.printUpdatedUserData();
        },
    }
</script>

<style scoped>
    img {
        width: 20vw;
    }
</style>