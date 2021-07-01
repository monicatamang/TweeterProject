<template>
    <section>
        <page-header title="Discover"></page-header>
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

    export default {
        name: "Discover",

        components: {
            PageHeader,
            AllTweets,
            UserCard,
            NavigationBar
        },

        data() {
            return {
                searchResults: undefined,
                searchResultsStatus: "",
                isSearching: false,
                ownerId: cookies.get("userData").userId,
                color: "#60A3D9"
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
                    console.log(res);
                    this.searchResults = res.data;
                    if(this.searchResults.length === 0) {
                        this.searchResultsStatus = "0 Results Found.";
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
        margin-bottom: 4vh;
    }

    #searchBar {
        position: relative;
        display: grid;
        place-items: center;
        background: white;
        /* margin: 1vh 0vw; */
        padding: 5% 0%;
    }

    input {
        width: 95%;
        padding: 2% 2% 2% 3%;
        border-radius: 20px;
        background: whitesmoke;
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
        margin-top: 1vh;
    }
</style>