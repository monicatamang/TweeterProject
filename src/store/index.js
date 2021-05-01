import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allUsersData: [],
  },

  mutations: {
    getAllUsersData: function(state, data) {
      state.allUsersData = data;
    }
  },

  actions: {

  },
  getters: {
  },
})
