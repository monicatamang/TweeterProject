<template>
    <!-- <section>
        <discover-header></discover-header>
        <div>
            <input id="searchInput" type="text" placeholder="Search Friends">
        </div>
        <navigation-bar id="mobileAndTabletNavBar"></navigation-bar>
    </section> -->
    <section>
        <discover-header></discover-header>
        <div id="searchBar">
            <input id="searchInput" type="text" placeholder="Search for People">
            <v-btn medium rounded text @click="searchUsers">Search</v-btn>
        </div>
        <h4>{{ resultsStatus }}</h4>
        <all-tweets :class="{ hideUsers: isSearching }"></all-tweets>
        <article>
            <v-card class="pa-1" elevation="0" outlined relative v-for="result in results" :key="result.userId">
                    <v-container>
                        <v-row>
                            <v-col cols="2">
                                <router-link :to="{ name: 'UsersProfiles', params: { userId: result.userId } }" v-if="result.userId !== ownerId">
                                    <v-avatar size="55">
                                        <img :src="result.imageUrl" :alt="`@${result.username}'s Post It profile photo.`">
                                    </v-avatar>
                                </router-link>
                                <router-link to="/Profile" v-else>
                                    <v-avatar size="55">
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
        </article>
        <navigation-bar id="mobileAndTabletNavBar"></navigation-bar>
        <!-- <div>
            <owner-profile-details id="ownerProfile"></owner-profile-details>
            <all-tweets></all-tweets>
            <navigation-bar id="mobileAndTabletNavBar"></navigation-bar>
            <desktop-navigation-bar id="desktopNavBar"></desktop-navigation-bar>
        </div> -->
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import DiscoverHeader from "../components/Discover/DiscoverHeader.vue";
    // import OwnerProfileDetails from "../components/UserProfiles/OwnerProfileDetails.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    // import DesktopNavigationBar from "../components/DesktopNavigationBar.vue";

    export default {
        name: "Discover",

        data() {
            return {
                results: undefined,
                resultsStatus: "",
                isSearching: false,
                ownerId: cookies.get("userData").userId
            }
        },

        components: {
            DiscoverHeader,
            // OwnerProfileDetails,
            AllTweets,
            NavigationBar,
            // DesktopNavigationBar
        },

        methods: {
            searchUsers() {
                this.isSearching = true
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/search`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        searchInput: document.getElementById("searchInput").value
                    }
                }).then((res) => {
                    console.log(res);
                    this.results = res.data;
                    if(this.results.length === 0) {
                        this.resultsStatus = `0 Results Found.`;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
        }
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        margin-bottom: 25vh;
    }

    article {
        display: grid;
        place-items: center;
        row-gap: 10px;
        width: 90vw;
    }

    #searchBar {
        display: grid;
        place-items: center;
        width: 90vw;
        height: 3vh;
        position: relative;
        top: 13vh;
        margin-bottom: 3vh;
    }

    #searchInput {
        border: 1px solid lightgrey;
        border-radius: 20px;
        width: 100%;
        padding: 2% 3%;
        position: relative;
    }

    #searchInput:focus {
        outline: none;
    }

    img {
        clip-path: circle();
        object-fit: cover;
    }

    .v-card {
        top: 15vh;
        width: 90vw;
        height: 100%;
    }

    .v-card__title {
        font-size: 0.9rem;
    }

    .hideUsers {
        display: none;
    }

    .v-btn {
        position: absolute;
        top: 2px;
        right: 0;
    }

    #imageAndUsername {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 3fr;
    }

    section {
        background: rgba(245, 245, 245, 0.3);
    }

    section > div {
        background: var(--primaryColor);
    }

    #ownerProfile, #desktopNavBar {
        display: none;
    }

    @media only screen and (min-width: 1024px) {

        #mobileAndTabletNavBar {
            display: none;
        }

        #ownerProfile, #desktopNavBar {
            display: grid;
        }
    }
</style>