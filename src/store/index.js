import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
// import cookies from "vue-cookies"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTweets: []
  },

  mutations: {
    updateAllTweets: function(state, data) {
      state.allTweets = data;
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
    }
  },

  getters: {
    
  },
})
