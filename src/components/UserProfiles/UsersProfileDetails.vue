<template>
    <section>
        <!-- Printing a user's profile data to their profile page -->
        <div v-for="user in allCurrentUsers" :key="user.userId">
            <img :src="user.imageUrl" :alt="`${user.username}'s profile image.`">
            <h1>@{{ user.username }}</h1>
            <p>{{ user.bio }}</p>
        </div>
    </section>
</template>

<script>
    export default {
        name: "users-profile-details",

        computed: {
            userId: function() {
                return this.$route.params.userId;
            },

            // Filtering through all users who currently have an account and only returning a user's data if it belongs to them
            allCurrentUsers: function() {
                return this.$store.state.allUsers.filter((user) => user.userId === Number(this.userId)); 
            }
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