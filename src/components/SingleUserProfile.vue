<template>
    <article>
       <h1>Email</h1>
       <p>{{ updatedUserProfileData.email }}</p>
       <h1>Username</h1>
       <p>{{ updatedUserProfileData.username }}</p>
       <h1>Password</h1>
       <p>{{ updatedUserProfileData.password }}</p>
       <h1>Bio</h1>
       <p>{{ updatedUserProfileData.bio }}</p>
       <h1>Date of Birth</h1>
       <p>{{ updatedUserProfileData.birthdate }}</p>

       <!-- *Put image description -->
       <img :src="updatedUserProfileData.imageUrl" alt="">
    </article>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: "single-user-profile",
        data: function() {
            return {
                updatedUserProfileData: {}
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
                    // Returned data from API is an Object
                    this.updatedUserProfileData = res.data[0];
                }).catch((err) => {
                    console.log(err);
                })
            },

            updateUserProfileDataToStore: function() {
                this.$store.commit("updateUserProfile", this.updatedUserProfileData);
            }
        },
        created: function() {
            this.printUpdatedUserData();
            this.updateUserProfileDataToStore();
        },
    }
</script>

<style scoped>
    img {
        width: 20vw;
    }
</style>