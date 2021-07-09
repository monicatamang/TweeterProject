<template>
    <article>
        <div v-for="result in results" :key="result.userId" class="cardContainer">
            <v-card class="pa-5 pa-sm-10 pa-md-5" elevation="0" v-if="result.imageUrl !== '' && result.imageUrl !== null">
                <v-container>
                    <v-row>
                        <v-col cols="2" sm="1" md="2">
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
                        <v-col cols="10" sm="11" md="10" class="ml-md-n5">
                            <v-card-title>@{{ result.username }}</v-card-title>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-text>{{ result.bio }}</v-card-text>
            </v-card>
            <v-card class="pa-5 pa-sm-10 pa-md-5" elevation="0" v-if="result.imageUrl === '' || result.imageUrl === null">
                <v-container>
                    <v-row>
                        <v-col cols="2" sm="1" md="2">
                            <router-link :to="{ name: 'UsersProfiles', params: { userId: result.userId } }" v-if="result.userId !== ownerId">
                                <v-avatar size="45" :color="color">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                            </router-link>
                            <router-link to="/Profile" v-else>
                                <v-avatar size="45" :color="color">
                                    <v-icon dark>mdi-account</v-icon>
                                </v-avatar>
                            </router-link>
                        </v-col>
                        <v-col cols="10" sm="11" md="10" class="d-sm-flex justify-start mt-sm-n2 ml-md-n5">
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
                ownerId: cookies.get("userData").userId,
                color: "#60A3D9"
            }
        }
    }
</script>

<style scoped>
    article {
        display: grid;
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

    img {
        object-fit: cover;
    }

    @media only screen and (min-width: 768px) {

        .v-card__title {
            font-size: 1.2rem;
        }

        .v-card__text {
            font-size: 1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        article {
            width: 40%;
            margin: 25vh 0vw 4vh 0vw;
            row-gap: 30px;
        }

        .cardContainer {
            border-bottom: none;
            border-radius: 10px;
            width: 100%;
            box-shadow: 3px 5px 5px lightgrey;
        }

        .v-card {
            width: 100%;
            border-radius: 10px;
        }

        .v-card__title {
            font-size: 0.9rem;
        }

        .v-card__text {
            font-size: 0.8rem;
        }
    }   
</style>