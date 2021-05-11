<template>
    <header>
        <router-link to="/">
            <i class="fas fa-angle-left fa-2x" id="backIcon"></i>
        </router-link>
        <i class="fas fa-sticky-note fa-2x" id="logo"></i>
    </header>
</template>

<script>
    export default {
        name: "authorization-header"
    }
</script>

<style scoped>
    header {
        display: grid;
        width: 100%;
    }

    #logo {
        width: 8vw;
        margin-bottom: 2vh;
        justify-self: center;
        align-self: center;
        color: #9FBFCC;
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

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        #logo {
            font-size: 2.3rem;
            margin-top: -1vh;
            width: 4vw;
        }

        #backIcon {
            width: 50px;
            height: 50px;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        #logo {
            font-size: 2.3rem;
            margin-top: -1vh;
            width: 3vw;
        }

        #backIcon {
            width: 55px;
            height: 55px;
        }
    }

    @media only screen and (min-width: 1024px) {

        #logo {
            width: 2vw;
        }
    }
</style>