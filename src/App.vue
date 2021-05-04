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

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    font-family: 'Oxygen', sans-serif;
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
