<template>
    <section>
        <router-link to="/Profile">Back</router-link>
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

        computed: {
            followers: function() {
                return this.$route.params.allOwnerFollowers;
            }
        },
    }
</script>

<style scoped>

</style>