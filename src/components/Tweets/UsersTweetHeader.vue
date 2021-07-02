<template>
    <v-app-bar flat color="white" class="py-sm-10">
        <v-row>
            <v-col cols="3" class="ml-sm-15">
                <v-btn fab color="white" x-small>
                    <v-icon @click="goBackToPreviousPage">mdi-chevron-left</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-app-bar-title class="text-center pb-sm-12 mr-sm-15 text-sm-h5">{{ title }}</v-app-bar-title>
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