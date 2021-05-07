<template>
    <div>
        <router-link :to="{ name: 'OwnerFollowersList', params: { userId: userId } }">{{ displayFollowers }} Followers</router-link>
    </div>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "count-owner-followers",

        data: function() {
            return {
                displayFollowers: 0,
                userId: cookies.get("userData").userId
            }
        },

        methods: {
            getOwnerFollowersFromAPI: function() {
                this.$store.dispatch("getOwnerFollowers", this.userId);
            }
        },

        mounted: function() {
            this.getOwnerFollowersFromAPI();
        },
    }
</script>

<style scoped>

</style>