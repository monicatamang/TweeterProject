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

    // If the user does not has a login token, automatically take the user to the login page
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
    background: rgba(245, 245, 245, 0.3);
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 1s ease
  }
</style>
