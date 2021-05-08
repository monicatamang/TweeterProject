<template>
    <div id="statsContainer">
        <router-link :to="{ name: 'OwnerFollowersList', params: { userId: userId } }">
            <div class="profileStats">
                <p>{{ displayFollowers }}</p>
                <p>Followers</p>
            </div>
        </router-link>
        <router-link :to="{ name: 'OwnerFollowingList', params: { userId: userId } }">
            <div class="profileStats">
                <p>{{ displayFollows }}</p>
                <p>Following</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "owner-profile-stats",

        data: function() {
            return {
                userId: cookies.get("userData").userId
            }
        },

        methods: {
            ownerFollows: function() {
                this.$store.dispatch("getOwnerFollows", cookies.get("userData").userId);
            },

            getOwnerFollowersFromAPI: function() {
                this.$store.dispatch("getOwnerFollowers", this.userId);
            },
        },

        computed: {
            displayFollows:function() {
                return this.$store.state.displayOwnerFollows; 
            },

            displayFollowers: function() {
                return this.$store.state.displayOwnerFollowers;
            }
        },

        mounted: function() {
            this.ownerFollows();
            this.getOwnerFollowersFromAPI();
        },
    }
</script>

<style scoped>
    #statsContainer {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
        column-gap: 20px;
    }

    .profileStats {
        display: grid;
        place-items: center;
        grid-template-columns: auto 1fr;
        column-gap: 15px;
    }

    p {
        font-size: 0.95rem;
        font-weight: 700;
    }

    a {
        text-decoration: none;
    }

    .v-application a {
        color: black;
    }

    .v-application p {
        margin-bottom: 0px;
    }
</style>