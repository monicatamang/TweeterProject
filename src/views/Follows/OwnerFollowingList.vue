<template>
    <section>
        <button @click="goBackToPreviousPage">Back</button>
        <h1>Following</h1>
        <div v-for="follow in followingList" :key="follow.userId">

            <router-link :to="{ name: 'UsersProfiles', params: { userId: follow.userId } }">
                <img :src="follow.imageUrl" :alt="`${follow.username}'s profile image.`">
            </router-link>
            <h1>@{{ follow.username }}</h1>
            <p>{{ follow.bio }}</p>
        </div>
    </section>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "Owner-Following-List",

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            },

            getOwnerFollowsFromAPI: function() {
                this.$store.dispatch("getOwnerFollows", cookies.get("userData").userId);
            }
        },

        computed: {
            followingList: function() {
                return this.$store.state.ownerFollowsList;
            }
        },

        mounted: function() {
            this.getOwnerFollowsFromAPI();
        },
    }
</script>

<style scoped>
    img {
        width: 40px;
        height: 40px;
        clip-path: circle();
        object-fit: cover;
    }
</style>