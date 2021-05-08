<template>
  <v-app>
    <v-main>
      <!-- <transition name="fade"> -->
        <router-view/>
      <!-- </transition> -->
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

  // Every time the App.vue files is loaded onto the page, call the API that returns all the current users and all the tweets onto the page
  // When the API is called it will updated allUsers and allTweets in the store and which ever page is computing allTweets will always have the data each time the page is loaded 
  mounted: function() {
    this.$store.dispatch("getAllTweets");
    this.$store.dispatch("getAllUsers");
    // this.$store.dispatch("getOwnerFollows", cookies.get("userData").userId);

    if(!this.loginToken) {
      this.$router.push('/Login');
    }
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    font-family: 'Oxygen', sans-serif;
  }

  .v-app {
    background: rgba(245, 245, 245, 0.1);
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  /* .fade-enter-to, .fade-leave-from {
    opacity: 1;
  } */

  .fade-enter-active, .fade-leave-active {
    transition: all 1s ease
  }
</style>
