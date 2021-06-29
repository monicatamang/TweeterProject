<template>
  <v-app>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import cookies from "vue-cookies";

export default {
  name: 'App',

  data: function() {
    return {
      loginToken: cookies.get("loginToken")
    }
  },

  mounted: function() {
    // Each time the this view is loaded onto the page, it will make an API request to get all the current tweets and user onto the page and avoid having undefined variables
    this.$store.dispatch("getAllTweets");
    this.$store.dispatch("getAllUsers");
  },
};
</script>

<style>
  :root {
    --primaryFont: 'Oxygen', sans-serif;
    --primaryColor: #9FBFCC;
    --secondaryColor: #CDE0E6;
    --tertiaryColor: #E6F1F3;
    --accentColorOne: #636D6E;
    /* --backgroundColor: rgb(245, 245, 245); */
    --backgroundColor: whitesmoke;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: var(--primaryFont);
  }

  .v-main__wrap {
    background: var(--backgroundColor);
  }
</style>
