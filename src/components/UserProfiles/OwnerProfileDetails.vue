<template>
    <article>
        <!-- Printing the account holder's profile details on their own profile page -->
        <desktop-logo id="desktopHeader"></desktop-logo>
        <img :src="ownerProfileData.imageUrl" :alt="`${ownerProfileData.username}'s profile image.`">
        <h1>@{{ ownerProfileData.username }}</h1>
        <p>{{ ownerProfileData.bio }}</p>
        <owner-profile-stats></owner-profile-stats>
        <router-link to="/EditProfile">Edit Profile</router-link>
    </article>
</template>

<script>
    import cookies from "vue-cookies";
    import DesktopLogo from "../DesktopLogo.vue";
    import OwnerProfileStats from "../../components/Follows/OwnerProfileStats.vue";

    export default {
        name: "owner-profile-details",

        data: function() {
            return {
                ownerProfileData: cookies.get("userData")
            }
        },

        components: {
            DesktopLogo,
            OwnerProfileStats
        },
    }
</script>

<style scoped>
    article {
        display: grid;
        place-items: center;
        row-gap: 20px;
        background: white;
        text-align: center;
        padding-bottom: 5vh;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
    }

    img {
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
    }

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