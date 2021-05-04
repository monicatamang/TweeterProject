<template>
    <section>
        <page-header></page-header>
        <article>
            <img :src="ownerProfileData.imageUrl" alt="">
            <h1>@{{ ownerProfileData.username }}</h1>
            <p>{{ ownerProfileData.bio }}</p>
            <!-- <count-owner-followers></count-owner-followers> -->
            <!-- <count-owner-follows></count-owner-follows> -->
            <router-link to="/EditProfile">Edit Profile</router-link>
            <owner-profile-tweets></owner-profile-tweets>
            <navigation-bar></navigation-bar>
        </article>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import PageHeader from "../../components/PageHeader.vue";
    // import CountOwnerFollowers from "../../components/Follows/CountOwnerFollowers";
    // import CountOwnerFollows from "../../components/Follows/CountOwnerFollows.vue";
    import OwnerProfileTweets from "../../components/UserProfiles/OwnerProfileTweets.vue";
    import NavigationBar from "../../components/NavigationBar.vue";

    export default {
        name: "Profile",

        components: {
            PageHeader,
            // CountOwnerFollowers,
            // CountOwnerFollows,
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
        place-items: center;
    }

    .hideProfile {
        display: none;
    }

    button {
        border: 1px solid black;
    }

    input, textarea {
        border: 1px solid black;
    }

    div {
        display: grid;
    }

    img {
        /* clip-path: circle(); */
        width: 40vw;
    }
</style>