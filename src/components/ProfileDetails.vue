<template>
    <article>
        <div v-for="userData in userProfile" :key="userData.userId">
            <v-card flat class="py-10" v-if="userData.imageUrl !== ''">
                <div>
                    <v-avatar size="100" class="hidden-sm-and-up">
                        <img :src="userData.imageUrl" :alt="`${userData.username}'s profile image.`">
                    </v-avatar>
                    <v-avatar size="60" class="hidden-sm-and-down">
                        <img :src="userData.imageUrl" :alt="`${userData.username}'s profile image.`">
                    </v-avatar>
                </div>
                <v-card-title>@{{ userData.username }}</v-card-title>
                <v-card-subtitle class="my-2 mb-md-3 mt-md-n1">{{ userData.bio }}</v-card-subtitle>
                <v-card-text><v-icon class="mr-2 mb-2">mdi-cake-variant</v-icon>{{ userData.birthdate }}</v-card-text>
                <div v-if="ownerData.userId === userData.userId" class="ownerProfileInfo">
                    <owner-profile-stats></owner-profile-stats>
                    <router-link to="/EditProfile">
                        <v-btn outlined rounded :color="color">Edit Profile</v-btn>
                    </router-link>
                </div>
                <div v-else>
                    <follow-users :followUserId="followUserId"></follow-users>
                </div>
            </v-card>
            <v-card flat class="py-10" v-else-if="userData.imageUrl === ''">
                <div>
                    <v-avatar size="100" :color="color" class="hidden-md-and-up">
                        <v-icon dark x-large>mdi-account</v-icon>
                    </v-avatar>
                    <v-avatar size="60" :color="color" class="hidden-sm-and-down">
                        <v-icon dark>mdi-account</v-icon>
                    </v-avatar>
                </div>
                <v-card-title>@{{ userData.username }}</v-card-title>
                <v-card-subtitle class="my-2 mb-md-3 mt-md-n1">{{ userData.bio }}</v-card-subtitle>
                <v-card-text><v-icon class="mr-2 mb-2">mdi-cake-variant</v-icon>{{ userData.birthdate }}</v-card-text>
                <div v-if="ownerData.userId === userData.userId" class="ownerProfileInfo">
                    <owner-profile-stats></owner-profile-stats>
                    <router-link to="/EditProfile">
                        <v-btn outlined rounded :color="color" class="pa-sm-5 py-md-2 px-md-4">Edit Profile</v-btn>
                    </router-link>
                </div>
                <div v-else>
                    <follow-users :followUserId="followUserId"></follow-users>
                </div>
            </v-card>
        </div>
    </article>
</template>

<script>
    import cookies from "vue-cookies";
    import FollowUsers from "./Follows/FollowUsers.vue";
    import OwnerProfileStats from "./Follows/OwnerProfileStats.vue";

    export default {
        name: "profile-details",

        props: {
            userProfile: Array,
            followUserId: Number
        },

        data() {
            return {
                ownerData: cookies.get("userData"),
                color: "#60A3D9"
            }
        },

        components: {
            FollowUsers,
            OwnerProfileStats
        }
    }
</script>

<style scoped>
    img {
        object-fit: cover;
    }

    .v-card {
        display: grid;
        place-items: center;
        height: 55vh;
        text-align: center;
    }

    a {
        text-decoration: none;
    }

    .ownerProfileInfo {
        display: grid;
        place-items: center;
        row-gap: 10px;
    }

    .v-btn {
        margin-top: 2vh;
    }

    .v-card__title, .v-card__subtitle, .v-card__text {
        padding: 0;
    }

    @media only screen and (min-width: 768px) {
        
        .v-card {
            height: 45vh;
        }

        .v-card__title {
            font-size: 1.5rem;
        }

        .v-card__subtitle {
            font-size: 1.1rem;
        }

        .v-btn {
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 1024px) {
        
        article {
            width: 30%;
            margin-top: 15vh;
            box-shadow: 3px 5px 5px lightgrey;
            position: fixed;
        }

        article, .v-card {
            border-radius: 15px;
        }

        .v-card {
            height: 100%;
            row-gap: 10px;
        }

        .v-card__title {
            font-size: 0.8rem;
        }

        .v-card__subtitle, .v-card__text, .v-btn {
            font-size: 0.7rem;
        }

        .v-btn {
            font-size: 0.6rem;
        }
    }
</style>