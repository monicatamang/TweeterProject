<template>
    <article>
        <div v-for="userData in userProfile" :key="userData.userId">
            <v-card flat class="py-10" v-if="userData.imageUrl !== ''">
                <div>
                    <v-avatar size="100">
                        <img :src="userData.imageUrl" :alt="`${userData.username}'s profile image.`">
                    </v-avatar>
                </div>
                <v-card-title>@{{ userData.username }}</v-card-title>
                <v-card-subtitle>{{ userData.bio }}</v-card-subtitle>
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
                <v-card-subtitle>{{ userData.bio }}</v-card-subtitle>
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
        height: 50vh;
        text-align: center;
    }

    a {
        text-decoration: none;
    }

    .ownerProfileInfo {
        display: grid;
        place-items: center;
        row-gap: 15px;
    }

    .v-btn {
        margin-top: 2vh;
    }

    @media only screen and (min-width: 768px) {
        
        .v-card {
            height: 45vh;
        }
    }

    @media only screen and (min-width: 1024px) {

        
    }
</style>