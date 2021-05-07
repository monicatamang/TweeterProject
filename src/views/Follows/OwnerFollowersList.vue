<template>
    <section>
        <button @click="goBackToPreviousPage">Back</button>
        <h1>Followers</h1>
        <article v-for="follower in followersList" :key="follower.userId">
            <img :src="follower.imageUrl" :alt="`${follower.username}'s profile picture.`">
            <h4>{{ follower.username }}</h4>
            <p>{{ follower.bio }}</p>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "Owner-Followers-List",

        data: function() {
            return {
                userId: cookies.get("userData").userId
            }
        },

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            },

            getOwnerFollowersFromAPI: function() {
                this.$store.dispatch("getOwnerFollowers", this.userId);
            }
        },

        computed: {
            followersList: function() {
                return this.$store.state.ownerFollowersList; 
            }
        },

        mounted: function() {
            this.getOwnerFollowersFromAPI();
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