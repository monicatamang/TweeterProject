<template>
    <header>
        <router-link to="/">
            <i class="fas fa-angle-left fa-2x" id="backIcon"></i>
        </router-link>
        <img src="../../assets/logoBlue.jpg" alt="Post-It's logo of a blue sticky note with the bottom right corner slightly folded.">
    </header>
</template>

<script>
    export default {
        name: "create-account-header"
    }
</script>

<style scoped>
    header {
        display: grid;
        width: 100%;
    }

    img {
        width: 8vw;
        margin-bottom: 2vh;
        justify-self: center;
        align-self: center;
    }

    a {
        display: grid;
        text-decoration: none;
        width: 8%;
        margin: 5%;
    }

    #backIcon {
        display: grid;
        place-items: center;
        color: #636D6E;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        box-shadow: 1px 1px 5px lightgrey;
        justify-self: start;
        align-self: start;
    }
</style>