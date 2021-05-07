<template>
    <div>
        <router-link :to="{ name: 'OwnerFollowingList', params: { userId: userId } }">{{ displayFollows }} Following</router-link>
    </div>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "count-owner-follows",

        data: function() {
            return {
                userId: cookies.get("userData").userId
            }
        },

        methods: {
            ownerFollows: function() {
                this.$store.dispatch("getOwnerFollows", cookies.get("userData").userId);
            }
        },

        computed: {
            displayFollows:function() {
                return this.$store.state.displayOwnerFollows; 
            },
        },

        mounted: function() {
            this.ownerFollows();
        },
    }
</script>

<style scoped>

</style>