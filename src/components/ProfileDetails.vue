<template>
    <article>
        <div v-for="userData in userProfile" :key="userData.userId">
            <v-card flat class="py-10" v-if="userData.imageUrl !== ''">
                <div>
                    <v-avatar size="100">
                        <img :src="userData.imageUrl" :alt="`${userData.username}'s profile image.`">
                    </v-avatar>
                </div>
                <v-card-title class="text-sm-h5">@{{ userData.username }}</v-card-title>
                <v-card-subtitle>{{ userData.bio }}</v-card-subtitle>
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
                    <v-avatar size="100" :color="color">
                        <v-icon dark x-large>mdi-account</v-icon>
                    </v-avatar>
                </div>
                <v-card-title>@{{ userData.username }}</v-card-title>
                <v-card-subtitle class="my-2">{{ userData.bio }}</v-card-subtitle>
                <v-card-text><v-icon class="mr-2 mb-2">mdi-cake-variant</v-icon>{{ userData.birthdate }}</v-card-text>
                <div v-if="ownerData.userId === userData.userId" class="ownerProfileInfo">
                    <owner-profile-stats></owner-profile-stats>
                    <router-link to="/EditProfile">
                        <v-btn outlined rounded :color="color" class="pa-sm-5">Edit Profile</v-btn>
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

        data: function() {
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

        
    }
</style>