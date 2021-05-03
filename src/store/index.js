import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
// import cookies from "vue-cookies"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // ownerTweets: [],
    numberOfTweetLikes: undefined,
    allTweets: [],
    allComments: [],
  },

  mutations: {
    getAllTweetsCreated: function(state, data) {
      state.allTweets = data;
    },

    getAllCommentsCreated: function(state, data) {
      state.allComments = data;
    },

    calculateTweetLikes: function(state) {
      state.numberOfTweetLikes++;
    }

    // getOwnerTweet: function(state, data) {
    //   state.ownerTweets.unshift(data);
    // }
  },

  actions: {
    getAllTweets: function(context) {
      axios.request({
        url: "https://tweeterest.ml/api/tweets",
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
        }
      }).then((res) => {
        context.commit("getAllTweetsCreated", res.data)
      }).catch((err) => {
        console.log(err);
      });
    },
  },

  getters: {
    
  },
})
