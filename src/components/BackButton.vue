<template>
    <v-btn text class="py-md-8 hidden-sm-and-down" @click="goBackToPreviousPage">
        <v-icon size="20">mdi-keyboard-backspace</v-icon>
        Back
    </v-btn>
</template>

<script>
    export default {
        name: "back-button",

        methods: {
            // Taking the user to the previous page
            goBackToPreviousPage() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>
    
</style>