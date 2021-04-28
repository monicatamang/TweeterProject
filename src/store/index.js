import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTweets: [],
    allUsers: [],
  },

  mutations: {
    getAllTweets: function(state, data) {
      state.allTweets = data;
    },

    getAllUserData: function(state, data) {
      state.myProfileData = data;
    }
  },

  actions: {
    allTweetsFromAPI: function(context) {
      axios.request({
          url: `https://tweeterest.ml/api/tweets`,
          method: `GET`,
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
          }
      }).then((res) => {
        context.commit("getAllTweets", res.data);
      }).catch((err) => {
        console.log(err);
        this.allTweetsStatus = `Unable to load tweets. Please refresh the page.`;
      })
    },

    allUsersFromAPI: function(context) {
      axios.request({
          url: `https://tweeterest.ml/api/users`,
          method: `GET`,
          headers: {
              "Content-Type": "application/json",
              "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
          }
      }).then((res) => {
          context.commit("updateMyProfileData", res.data);
      }).catch((err) => {
          console.log(err);
          this.myProfileDataStatus = `Could not load information. Please refresh the page.`;
      });
    },
  },

  getters: {
  },
})
