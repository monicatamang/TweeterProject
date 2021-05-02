import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
// import cookies from "vue-cookies"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTweets: [],
    allUsers: []
  },

  mutations: {
    updateAllTweets: function(state, data) {
      state.allTweets = data;
    },

    getAllUsers: function(state, data) {
      state.allUsers = data;
    }
  },

  actions: {
    getAllTweets: function(context) {
      axios.request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
        },
      }).then((res) => {
        context.commit("updateAllTweets", res.data)
      }).catch((err) => {
        console.log(err);
      });
    },

    getAllUsers: function(context) {
      axios.request({
          url: "https://tweeterest.ml/api/users",
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
          },
      }).then((res) => {
          context.commit("getAllUsers", res.data);
      }).catch((err) => {
          console.log(err);
          this.getAllUsersStatus = "An error has occured while loading users.";
      });
  },
  },

  getters: {
    
  },
})
