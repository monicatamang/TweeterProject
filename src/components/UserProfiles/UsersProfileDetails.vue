<template>
    <section>
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

    div {
        display: grid;
        place-items: center;
    }

    img {
        clip-path: circle();
        width: 30vw;
        height: 30vw;
        object-fit: cover;
    }
</style>