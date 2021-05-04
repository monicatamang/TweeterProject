<template>
    <div>
        <i class="fas fa-exclamation-circle fa-3x" id="warning"></i>
        <p>The username and password you entered did not match our records. Please double-check and try again.</p>
    </div>
</template>

<script>
    export default {
        name: "error-login-toast"
    }
</script>

<style scoped>
    div {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 3fr;
        padding: 5%;

        position: absolute;
        top: -5vh;
        opacity: 0;
        transition: all 3s ease-in-out;
        /* padding: 10% 5%; */

        background: #636D6E;
    }
    /* div {
        position: absolute;
    } */

    #warning {
        color: white;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    p {
        font-size: 0.80rem;
        padding: 0% 8%;
        color: white;
    }
</style>