<template>
    <v-app-bar flat elevate-on-scroll color="white" class="py-10 py-sm-15 hidden-md-and-up">
        <v-row class="mb-10 mb-sm-0 mt-sm-1">
            <v-col cols="3" class="ml-sm-15">
                <v-btn fab small color="white" class="ml-3 ml-sm-0">
                    <v-icon @click="goBackToPreviousPage">mdi-chevron-left</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="6" class="mt-1 ml-2 ml-sm-n7">
                <v-app-bar-title class="text-center pb-sm-15 mr-sm-16 text-sm-h5">{{ title }}</v-app-bar-title>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-app-bar>
</template>

<script>
    export default {
        name: "users-tweet-header",

        props: {
            title: String
        },

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>
    
</style>