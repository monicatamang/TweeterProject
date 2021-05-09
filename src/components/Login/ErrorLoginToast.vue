<template>
    <div id="errorToastMessageContainer">
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
    @keyframes errorToastAnimation {
        0% { top: -5vh; opacity: 0  }
        50% { top: 0vh; opacity: 1 }
        60% { left: 8px }
        70% { left: -8px }
        80% { left: 4px }
        90% { left: -4px }
        100% { left: 0px }
    }

    #errorToastMessageContainer {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 3fr;
        padding: 5%;

        position: absolute;
        background: #636D6E;
        animation: errorToastAnimation 0.5s ease-in-out;
    }

    #warning {
        color: white;
    }

    .v-application p {
        margin-bottom: 0px;
    }

    p {
        font-size: 0.8rem;
        padding: 0% 8%;
        color: white;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        p {
            font-size: 1rem;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        p {
            font-size: 1.1rem;
            font-weight: 300;
        }
    }
</style>