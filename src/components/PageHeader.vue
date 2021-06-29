<template>
    <v-app-bar flat color="white">
        <v-spacer></v-spacer>
        <v-app-bar-title>{{ title }}</v-app-bar-title>
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
    
</style>