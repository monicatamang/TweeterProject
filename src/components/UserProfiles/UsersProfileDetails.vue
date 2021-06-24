<template>
    <section>
        <!-- Printing a user's profile data to their profile page -->
        <div v-for="user in currentUsers" :key="user.userId">
            <img :src="user.imageUrl" :alt="`${user.username}'s profile image.`">
            <h1>@{{ user.username }}</h1>
            <p>{{ user.bio }}</p>
        </div>
    </section>
</template>

<script>
    import axios from "axios"

    export default {
        name: "users-profile-details",

        data() {
            return {
                currentUsers: undefined
            }
        },

        methods: {
            currentUserProfile() {
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        userId: this.currentUserId
                    }
                }).then((res) => {
                    res;
                    this.currentUsers = res.data;
                }).catch((err) => {
                    err;
                });
            }
        },

        computed: {
            currentUserId: function() {
                return this.$route.params.userId;
            }
        },

        mounted() {
            this.currentUserProfile();
        },
    }
</script>

<style scoped>
    section {
        margin-top: 3vh;
    }

    div {
        display: grid;
        row-gap: 20px;
        place-items: center;
        text-align: center;
    }

    h1 {
        font-size: 1.4rem;
    }

    p {
        padding: 0vw 15vw;
        font-size: 0.95rem;
    }

    img {
        clip-path: circle();
        width: 30vw;
        height: 30vw;
        object-fit: cover;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        div {
            width: 85vw;
            margin-left: 15vw;
            row-gap: 40px;
        }

        img {
            width: 25vw;
            height: 25vw;
        }

        h1 {
            font-size: 1.8rem;
        }

        p {
            padding: 0vw 3vw;
            font-size: 1.1rem;
            font-weight: 300;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

        div {
            width: 90vw;
            margin-left: 10vw;
            row-gap: 40px;
            padding-top: 0vh;
        }

        img {
            width: 20vw;
            height: 20vw;
        }

        h1 {
            font-size: 1.8rem;
        }

        p {
            padding: 0vw 3vw;
            font-size: 1.1rem;
            font-weight: 300;
        }
    }

    @media only screen and (min-width: 1024px) {

        div {
            width: 73.3vw;
            margin-left: 25vw;
            row-gap: 20px;
        }

        img {
            width: 100px;
            height: 100px;
        }

        h1 {
            font-size: 1.1rem;
        }

        p {
            font-size: 0.8rem;
            font-weight: 300;
        }
    }
</style>