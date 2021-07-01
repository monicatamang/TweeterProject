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
    <!-- <article>
        Printing the account holder's profile details on their own profile page
        <desktop-logo id="desktopHeader"></desktop-logo>
        <img :src="userData.imageUrl" :alt="`${userData.username}'s profile image.`">
        <h1>@{{ userData.username }}</h1>
        <p>{{ userData.bio }}</p>
        <owner-profile-stats></owner-profile-stats>
        <router-link to="/EditProfile">Edit Profile</router-link>
    </article> -->
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
            // DesktopLogo,
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

    /* #background {
        width: 100%;
        height: 80px;
        background: var(--backgroundColor);
        position: absolute;
        top: 0;
    } */

    /* article {
        display: grid;
        place-items: center;
        row-gap: 20px;
        background: white;
        text-align: center;
        padding-bottom: 5vh;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
    } */

    /* img {
        clip-path: circle();
        width: 30vw;
        height: 30vw;
        object-fit: cover;
    }

    h1 {
        font-size: 1.4rem;
    }

    a {
        text-decoration: none;
        margin-top: 2vh;
    }

    .v-application a {
        color: #7398A5;
        font-size: 0.9rem;
        border: 1px solid #9FBFCC;
        border-radius: 30px;
        width: 55vw;
        padding: 1vh 0vh;
        text-align: center;
    }

    p {
        padding: 0vw 15vw;
        font-size: 0.95rem;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    #desktopHeader {
        display: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

        article {
            width: 88vw;
            margin-left: 5vw;
            row-gap: 40px;
            padding-top: 3vh;
        }
        
        img {
            width: 20vw;
            height: 20vw;
        }

        h1 {
            font-size: 1.8rem;
        }

        p {
            padding: 0vw 3vw;
            font-size: 1.1rem;
            font-weight: 300;
        }

        a {
            margin-top: 1vh;
        }

        .v-application a {
            font-size: 1rem;
            width: 30vw;
        }
    } */

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        article {
            width: 90vw;
            margin-left: 10vw;
            row-gap: 40px;
            padding-top: 3vh;
        }

        img {
            width: 15vw;
            height: 15vw;
        }

        .v-application a {
            font-size: 1rem;
            width: 20vw;
        }

        h1 {
            font-size: 1.8rem;
        }

        p {
            padding: 0vw 3vw;
            font-size: 1.1rem;
            font-weight: 300;
        }
    }

    @media only screen and (min-width: 1024px) {

        article {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 5;

            width: 25vw;
            margin-left: 0vw;
            border-right: 1px solid rgba(211, 211, 211, 0.3);
        }

        img {
            width: 50px;
            height: 50px;
        }

        .v-application a {
            font-size: 0.7rem;
            width: 7vw;
        }

        h1 {
            font-size: 0.9rem;
        }

        p {
            padding: 0vw 3vw;
            font-size: 0.7rem;
        }

        #desktopHeader {
            display: grid;
        }
    }
</style>