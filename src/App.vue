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
      loginToken: cookies.get("userData").loginToken
    }
  },

  mounted: function() {
    // if(this.loginToken) {
    //   this.$router.push("/Feed");
    // } else {
    //   this.$router.push("/");
    // }
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
    /* --backgroundColor: rgba(191, 215, 237, 0.2); */
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
