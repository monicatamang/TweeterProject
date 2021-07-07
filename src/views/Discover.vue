<template>
    <section>
        <page-header title="Discover"></page-header>
        <desktop-nav-bar></desktop-nav-bar>
        <v-divider></v-divider>
        <div id="searchBar">
            <input id="searchInput" type="text" placeholder="Search for People">
            <v-btn depressed medium rounded absolute dark :color="color" @click="searchUsers">Search</v-btn>
        </div>
        <h4>{{ searchResultsStatus }}</h4>
        <all-tweets :class="{ hideUsers: isSearching }"></all-tweets>
        <user-card :results="searchResults"></user-card>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import PageHeader from "../components/PageHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import UserCard from "../components/UserCard.vue";
    import NavigationBar from "../components/NavigationBar.vue";
    import DesktopNavBar from "../components/DesktopNavBar.vue";

    export default {
        name: "Discover",

        components: {
            PageHeader,
            AllTweets,
            UserCard,
            NavigationBar,
            DesktopNavBar
        },

        data() {
            return {
                searchResults: undefined,
                searchResultsStatus: "",
                isSearching: false,
                color: "#60A3D9",
                loginToken: cookies.get("loginToken")
            }
        },

        methods: {
            searchUsers() {
                this.isSearching = true
                this.searchResultsStatus = "";
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
                    res;
                    this.searchResults = res.data;
                    if(this.searchResults.length === 0) {
                        this.searchResultsStatus = `0 Results Found for "${document.getElementById("searchInput").value}"`;
                    }
                }).catch((err) => {
                    err;
                });
            },
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null) {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    section {
        margin-bottom: 3vh;
    }

    #searchBar {
        position: relative;
        display: grid;
        place-items: center;
        background: white;
        padding: 5% 0%;
    }

    input {
        width: 95%;
        padding: 2% 2% 2% 3%;
        border-radius: 20px;
        background: rgba(211, 211, 211, 0.3);
    }

    input:focus {
        outline: none;
    }

    .v-btn {
        right: 3%;
    }

    .hideUsers {
        display: none;
    }

    h4 {
        text-align: center;
    }

    @media only screen and (min-width: 768px) {

        input {
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        section {
            margin-top: 10.5vh;
            display: grid;
            place-items: center;
            margin-bottom: 0vh;
        }

        #searchBar {
            width: 40%;
            padding: 3% 0%;
            background: transparent;
            margin-bottom: -25vh;
        }

        input {
            width: 100%;
            padding: 3% 3% 3% 4%;
            font-size: 0.8rem;
            background: white;
            box-shadow: 1px 5px 5px lightgrey;
        }

        .v-btn {
            font-size: 0.7rem;
            right: 2%;
        }

        h4 {
            position: absolute;
            left: 10%;
            right: 10%;
            top: 30%;
        }
    }
</style>