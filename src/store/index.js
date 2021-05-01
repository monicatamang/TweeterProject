import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTweets: []
  },

  mutations: {
    sendUserTweet: function(state, data) {
      // The user's tweet will be added to the top of the feed page
      state.userTweets.unshift(data);
    }
  },

  actions: {

  },

  getters: {
  },
})
