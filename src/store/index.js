import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTweets: [],
  },

  mutations: {
    getAllTweets: function(state, data) {
      state.allTweets = data;
    },
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
      })
    },
  },

  getters: {
  },
})
