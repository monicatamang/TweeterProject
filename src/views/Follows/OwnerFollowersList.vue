<template>
    <section>
        <button @click="goBackToPreviousPage">Back</button>
        <h1>Followers</h1>
        <article v-for="follower in followers" :key="follower.userId">
            <img :src="follower.imageUrl" :alt="`${follower.username}'s profile picture.`">
            <h4>{{ follower.username }}</h4>
            <p>{{ follower.bio }}</p>
        </article>
    </section>
</template>

<script>
    export default {
        name: "Owner-Followers-List",

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            }
        },

        computed: {
            followers: function() {
                return this.$route.params.allOwnerFollowers;
            }
        },
    }
</script>

<style scoped>

</style>