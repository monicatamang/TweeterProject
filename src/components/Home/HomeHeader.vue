<template>
    <header>
        <i class="fas fa-sticky-note fa-2x" id="logo"></i>
        <h1>Welcome to Post-It</h1>
        <p>Join our growing community of 10,000+ students from all over the world</p>
    </header>
</template>

<script>
    export default {
        name: "home-header"
    }
</script>

<style scoped>
    header {
        display: grid;
        place-items: center;
        row-gap: 30px;
        text-align: center;
        margin-top: 2vh;
    }

    #logo {
        color: #9FBFCC;
    }

    h1 {
        font-size: 1.8rem;
    }

    p {
        color: #636D6E;
        padding: 0% 10%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
        
        #logo {
            font-size: 2.5rem; 
        }

        h1 {
            font-size: 2.5rem;
        }

        p {
            font-size: 1.3rem;
            font-weight: 300;
            padding: 0% 15%;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        
        header {
            margin-top: 5vh;
            width: 100%;
        }

        h1 {
            font-size: 2.5rem;
        }

        p {
            font-size: 1.2rem;
            font-weight: 300;
            padding: 0% 15%;
        }
    }

    @media only screen and (min-width: 1025px) {

        h1 {
            font-size: 2.7rem;
        }

        p {
            font-size: 1.1rem;
            font-weight: 300;
            padding: 0% 20%;
        }
    }
</style>