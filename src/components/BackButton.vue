<template>
    <i class="fas fa-angle-left fa-2x" id="backIcon" @click="goBackToPreviousPage"></i>
</template>

<script>
    export default {
        name: "back-button-header",

        methods: {
            goBackToPreviousPage: function() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>
    #backIcon {
        display: grid;
        place-items: center;
        color: var(--accentDarkColor);
        border-radius: 100%;
        width: 40px;
        height: 40px;
        box-shadow: 1px 1px 5px lightgrey;
        justify-self: start;
        align-self: start;
        margin: 2vh 0vw 0vh 5vw;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) {

        #backIcon {
            width: 50px;
            height: 50px;
        }
    }
</style>