<template>
    <div>
        <div v-for="user in allCurrentUsers" :key="user.userId">
            <p>{{ user.bio }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "users-profile-bios",

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

</style>