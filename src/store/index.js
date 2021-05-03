import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
// import cookies from "vue-cookies"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // ownerTweets: [],
    numberOfTweetLikes: 0,
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

    addTweetLikes: function(state) {
      state.numberOfTweetLikes++;
    },

    subtractTweetLikes: function(state) {
      if(state.numberOfTweetLikes < 0) {
        state.numberOfTweetLikes = 0;
      } else {
        state.numberOfTweetLikes--;
      }
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
