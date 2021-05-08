<template>
    <section>
        <page-header></page-header>
        <all-tweets></all-tweets>
        <navigation-bar></navigation-bar>
    </section>
</template>

<script>
    // import cookies from "vue-cookies";
    import PageHeader from "../components/PageHeader.vue";
    import AllTweets from "../components/Tweets/AllTweets.vue";
    import NavigationBar from "../components/NavigationBar.vue";

    export default {
        name: "Discover",

        components: {
            PageHeader,
            AllTweets,
            NavigationBar
        },
    }
</script>

<style scoped>
    section {
        background: rgba(245, 245, 245, 0.3);
    }

    .hideAllTweets {
        display: none;
    }

    input, button {
        border: 1px solid black;
        width: 100%;
    }

    /* section {
        background: rgba(245, 245, 245, 0.1);
    } */

    img {
        width: 40px;
        height: 40px;
        clip-path: circle();
        object-fit: cover;
    }
</style>