import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import cookies from "vue-cookies"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTweets: [],
    allTweets: []
  },

  mutations: {
    sendUserTweet: function(state, data) {
      // The user's tweet will be added to the top of the feed page
      state.allTweets.unshift(data);
    },

    updateAllTweets: function(state, data) {
      state.allTweets = data;
    },

    updateUserTweetContent: function(state, data) {
      state.userTweets = data;
    }
  },

  actions: {
    getUserTweetsFromAPI: function(context) {
      axios.request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
          },
          params: {
              userId: cookies.get("userId")
          }
      }).then((res) => {
          context.commit("updateUserTweetContent", res.data);
      }).catch((err) => {
          console.log(err);
          this.userTweetsStatus = "Could not load tweets."
      });
    },

    getAllTweets: function(context) {
      axios.request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
        }
      }).then((res) => {
        context.commit("updateAllTweets", res.data)
      }).catch((err) => {
        console.log(err);
      });
    }
  },

  getters: {
    
  },
})
