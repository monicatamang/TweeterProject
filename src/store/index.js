import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTweets: [],
    allUsers: [],
    userCommentsOnTweets: [],
    displayOwnerFollows: 0,
    ownerFollowsList: [],
    displayOwnerFollowers: 0,
    ownerFollowersList: []
  },

  mutations: {
    getAllTweetsCreated(state, data) {  
      state.allTweets = data;
    },

    addTweetToPage(state, data) {
      state.allTweets.unshift(data);
    },

    updateTweet(state, data) {
      state.allTweets[data.index].content = data.content;
    },

    deleteTweetOnPage(state, data) {
      state.allTweets.splice(data, 1);
    },

    getAllCurrentUsers(state, data) {
      state.allUsers = data;
    },

    // Getting all comments for one tweet and storing it in an array
    printComments(state, data) {
      state.userCommentsOnTweets = data;
    },

    // Adding a single comment to one tweet
    addCommentToTweet(state, data) {
      state.userCommentsOnTweets.unshift(data);
    },

    updateNumFollows(state, data) {
      state.displayOwnerFollows = data;
    },

    updateFollowsList(state, data) {
      state.ownerFollowsList = data;
    },

    updateNumFollowers(state, data) {
      state.displayOwnerFollowers = data;
    },

    updateFollowersList(state, data) {
      state.ownerFollowersList = data;
    },

    updateComment(state, data) {
      state.userCommentsOnTweets[data.index].content = data.content;
    },

    deleteComment(state, data) {
      state.userCommentsOnTweets.splice(data, 1);
    },
  },

  actions: {
    getAllTweets(context) {
      axios.request({
        url: `${process.env.VUE_APP_API_URL}/tweets`,
        method: "GET"
      }).then((res) => {
        context.commit("getAllTweetsCreated", res.data);
      }).catch((err) => {
        err;
      });
    },

    getAllUsers(context) {
      axios.request({
        url: `${process.env.VUE_APP_API_URL}/users`,
        method: "GET"
      }).then((res) => {
        context.commit("getAllCurrentUsers", res.data);
      }).catch((err) => {
        err;
      });
    },

    getUserComments(context, userTweetId) {
      axios.request({
          url: `${process.env.VUE_APP_API_URL}/comments`,
          method: "GET",
          headers: {
            "Content-type": "application/json"
          },
          params: {
              tweetId: userTweetId
          }
      }).then((res) => {
          context.commit("printComments", res.data);
      }).catch((err) => {
          err;
      });
    },

    getOwnerFollows(context, id) {
      axios.request({
          url: `${process.env.VUE_APP_API_URL}/follows`,
          method: "GET",
          headers: {
            "Content-type": "application/json"
          },
          params: {
              userId: id
          }
      }).then((res) => {
          context.commit("updateNumFollows", res.data.length);
          context.commit("updateFollowsList", res.data);
      }).catch((err) => {
          err;
      });
    },

    getOwnerFollowers(context, id) {
      axios.request({
          url: `${process.env.VUE_APP_API_URL}/followers`,
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          params: {
              userId: id
          }
      }).then((res) => {
          context.commit("updateNumFollowers", res.data.length);
          context.commit("updateFollowersList", res.data);
      }).catch((err) => {
          err;
      });
    }
  },

  getters: {
    
  },
})
