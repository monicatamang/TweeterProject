<template>
    <section>
        <div v-for="user in allCurrentUsers" :key="user.userId">
            <img :src="user.imageUrl" :alt="`${user.username}'s profile image.`">
            <h4>@{{ user.username }}</h4>
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
    div {
        display: grid;
        place-items: center;
    }

    img {
        width: 40vw;
    }
</style>