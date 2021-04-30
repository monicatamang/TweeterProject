import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isEditProfileOpen: true
  },

  mutations: {
    closeEditProfilePage: function(state, data) {
      state.isEditProfileClosed = data
    }
  },

  actions: {

  },
  getters: {
  },
})
