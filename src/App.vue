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

  data() {
    return {
      loginToken: cookies.get("loginToken")
    }
  },

  mounted() {
    // If the user does not have a login token, take the user to the Home page
    if(this.loginToken === null) {
      this.$router.push("/");
    }
    // If the page refreshes, get all tweets and users
    this.$store.dispatch("getAllTweets");
    this.$store.dispatch("getAllUsers");
  },
};
</script>

<style>
  :root {
    --primaryFont: 'Oxygen', sans-serif;
    --primaryColor: #60A3D9;
    --secondaryColor: #BFD7ED;
    --tertiaryColor: #E6F1F3;
    --accentColorOne: #636D6E;
    --backgroundColor: rgba(211, 211, 211, 0.2);
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
