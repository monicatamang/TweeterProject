<template>
    <v-app-bar flat color="white" class="py-sm-10 hidden-md-and-up">
        <v-spacer></v-spacer>
        <v-app-bar-title class="pb-sm-13 text-sm-h5">{{ title }}</v-app-bar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>
    export default {
        name: "feed-header",

        props: {
            title: String
        },
    }
</script>

<style scoped>
    .v-app-bar-title__content {
        font-size: 2rem;
    }
</style>