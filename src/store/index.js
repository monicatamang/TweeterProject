import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
// import cookies from "vue-cookies"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTweets: [],
    allUsers: [],
    userCommentsOnTweets: [],
    // tweetLikes: [],
    // commentLikes: []
  },

  mutations: {
    getAllTweetsCreated: function(state, data) {  
      state.allTweets = data;
    },

    addTweetToPage: function(state, data) {
      state.allTweets.unshift(data);
    },

    deleteTweetOnPage: function(state, data) {
      state.allTweets.splice(data);
    },

    getAllCurrentUsers: function(state, data) {
      state.allUsers = data;
    },

    printComments: function(state, data) {
      state.userCommentsOnTweets = data;
    },

    addCommentToTweet: function(state, data) {
      state.userCommentsOnTweets.unshift(data);
    },

    // totalTweetLikes: function(state, data) {
    //   state.tweetLikes = data;
    // },

    // totalCommentLikes: function(state, data) {
    //   state.commentLikes = data;
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
        // Filtering all the tweets to be in reverse order so that the most recent tweet is posted at the top of the feed page
        context.commit("getAllTweetsCreated", res.data.reverse());
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
        }
      }).then((res) => {
        context.commit("getAllCurrentUsers", res.data);
      }).catch((err) => {
        console.log(err);
      });
    },

    getUserComments: function(context, userTweetId) {
      axios.request({
          url: "https://tweeterest.ml/api/comments",
          method: "GET",
          headers: {
              "Content-type": "application/json",
              "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
          },
          params: {
              tweetId: userTweetId
          }
      }).then((res) => {
          context.commit("printComments", res.data);
      }).catch((err) => {
          console.log(err);
      });
    },

    // getNumberOfTweetLikes: function(context, userTweetId) {
    //   axios.request({
    //       url: "https://tweeterest.ml/api/tweet-likes",
    //       method: "GET",
    //       headers: {
    //           "Content-Type": "application/json",
    //           "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
    //       },
    //       params: {
    //         tweetId: userTweetId
    //       }
    //   }).then((res) => {
    //       context.commit("totalTweetLikes", res.data);
    //   }).catch((err) => {
    //       console.log(err);
    //   });
    // },

    // getNumberOfCommentLikes: function(context) {
    //   axios.request({
    //       url: "https://tweeterest.ml/api/comment-likes",
    //       method: "GET",
    //       headers: {
    //           "Content-Type": "application/json",
    //           "X-Api-Key": `${process.env.VUE_APP_TWEETER_API_KEY}`
    //       },
    //       params: {
    //           commentId: this.commentIdNum
    //       }
    //   }).then((res) => {
    //       context.commit("totalCommentLikes", res.data);
    //   }).catch((err) => {
    //       console.log(err);
    //   });
    // },
  },

  getters: {
    
  },
})
