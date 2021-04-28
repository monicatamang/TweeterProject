import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myProfileData: {
      email: "",
      username: "",
      password: "",
      bio: "",
      birthDate: "",
      imageUrl: ""
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  }
})
