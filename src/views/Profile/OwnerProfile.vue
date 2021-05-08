<template>
    <section>
        <article id="ownerProfileDetails">
            <img :src="ownerProfileData.imageUrl" :alt="`${ownerProfileData.username}'s profile image.`">
            <h1>@{{ ownerProfileData.username }}</h1>
            <p>{{ ownerProfileData.bio }}</p>
            <owner-profile-stats></owner-profile-stats>
            <router-link to="/EditProfile">Edit Profile</router-link>
        </article>
        <owner-profile-tweets></owner-profile-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    // import PageHeader from "../../components/PageHeader.vue";
    import OwnerProfileStats from "../../components/Follows/OwnerProfileStats.vue";
    import OwnerProfileTweets from "../../components/UserProfiles/OwnerProfileTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Profile",

        components: {
            // PageHeader,
            OwnerProfileStats,
            OwnerProfileTweets,
            NavigationBar,
        },

        data: function() {
            return {
                ownerProfileData: cookies.get("userData")
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        row-gap: 10px;
        place-items: center;
        padding: 5vh 0vh 13vh 0vh;
        background: rgba(245, 245, 245, 0.3);
    }

    article {
        background: white;
    }

    #ownerProfileDetails {
        display: grid;
        place-items: center;
        row-gap: 20px;
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
        /* color: black; */
        color: #7398A5;
        font-size: 0.9rem;
        /* border: 1px solid rgba(211, 211, 211, 0.8); */
        border: 1px solid #9FBFCC;
        /* background: #636D6E; */
        border-radius: 30px;
        width: 55vw;
        padding: 1vh 0vh;
        text-align: center;
    }

    p {
        padding: 0vw 15vw;
        /* color: #636D6E; */
        font-size: 0.95rem;
    }

    .v-application p {
        margin-bottom: 0px;
    }
</style>