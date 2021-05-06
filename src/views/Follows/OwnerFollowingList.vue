<template>
    <section>
        <button @click="goBackToPreviousPage">Back</button>
        <h1>Following</h1>
        <article v-for="follow in follows" :key="follow.userId">
            <img :src="follow.imageUrl" :alt="`${follow.username}'s profile picture.`">
            <h4>{{ follow.username }}</h4>
            <p>{{ follow.bio }}</p>
        </article>
    </section>
</template>

<script>
    export default {
        name: "Owner-Following-List",

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            }
        },

        computed: {
            follows: function() {
                return this.$route.params.followsList;
            },
        },
    }
</script>

<style scoped>

</style>