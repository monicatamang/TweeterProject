<template>
    <header>
        <i class="fas fa-angle-left fa-2x" id="backIcon" @click="goBackToPreviousPage"></i>
    </header>
</template>

<script>
    export default {
        name: "users-profile-header",

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped>
    #backIcon {
        display: grid;
        place-items: center;
        color: #636D6E;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        box-shadow: 1px 1px 5px lightgrey;
        margin: 2vh 0vh 0vh 2vh;
    }
</style>