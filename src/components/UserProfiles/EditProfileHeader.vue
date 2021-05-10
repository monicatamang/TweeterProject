<template>
    <header>
        <i class="fas fa-angle-left fa-2x" id="backIcon" @click="goBackToPreviousPage"></i>
        <h3>Edit Profile</h3>
        <div></div>
    </header>
</template>

<script>
    export default {
        name: "edit-profile-header",

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>
    header {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 2fr 1fr;
        min-height: 10vh;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
        background: white;
    }

    h3 {
        color: #7398A5;
    }

    #backIcon {
        display: grid;
        place-items: center;
        color: #636D6E;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        box-shadow: 1px 1px 5px lightgrey;
    }
</style>