<template>
    <article>
        <div v-for="result in results" :key="result.userId" class="cardContainer">
            <v-card class="pa-5" elevation="0" v-if="result.imageUrl !== ''">
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <router-link :to="{ name: 'UsersProfiles', params: { userId: result.userId } }" v-if="result.userId !== ownerId">
                                <v-avatar size="45">
                                    <img :src="result.imageUrl" :alt="`@${result.username}'s Post It profile photo.`">
                                </v-avatar>
                            </router-link>
                            <router-link to="/Profile" v-else>
                                <v-avatar size="45">
                                    <img :src="result.imageUrl" :alt="`@${result.username}'s Post It profile photo.`">
                                </v-avatar>
                            </router-link>
                        </v-col>
                        <v-col cols="10">
                            <v-card-title>@{{ result.username }}</v-card-title>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-text>{{ result.bio }}</v-card-text>
            </v-card>
            <v-card class="pa-5" elevation="0" v-if="result.imageUrl === ''">
                <v-container>
                    <v-row>
                        <v-col cols="2">
                            <router-link :to="{ name: 'UsersProfiles', params: { userId: result.userId } }" v-if="result.userId !== ownerId">
                                <v-avatar size="45" color="black">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                            </router-link>
                            <router-link to="/Profile" v-else>
                                <v-avatar size="45" color="#60A3D9">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                            </router-link>
                        </v-col>
                        <v-col cols="10">
                            <v-card-title>@{{ result.username }}</v-card-title>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-text>{{ result.bio }}</v-card-text>
            </v-card>
        </div>
    </article>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "user-card",

        props: {
            results: Array
        },

        data() {
            return {
                ownerId: cookies.get("userData").userId
            }
        }
    }
</script>

<style scoped>
    article {
        display: grid;
        /* row-gap: 8px; */
        /* margin-top: 1vh; */
    }

    .cardContainer {
        border-bottom: 1px solid rgba(211, 211, 211, 0.5);
    }

    a {
        text-decoration: none;
    }

    .v-card__title, .v-card__subtitle {
        padding: 2%;
    }

    .v-card__title {
        font-size: 1.1rem;
    }

    .v-card__text {
        font-size: 0.9rem;
    }
</style>