import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      email: "",
      isAuth: false,
      isAdmin: false,
    }
  },
  mutations: {
    login(state, payload) {
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.user.isAuth = true;
      state.user.isAdmin = payload.isAdmin;
    },
    logout(state) {
      state.user.username = "";
      state.user.email = "";
      state.user.isAuth = false;
      state.user.isAdmin = false;
    },
    register(state, payload) {
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.user.isAuth = true;
      state.user.isAdmin = false;
    }
  },
  actions: {
  },
  getters: {
    getUsername(state) {
      return state.user.username;
    },
    getEmail(state) {
      return state.user.email;
    },
    getAdminStatus(state) {
      return state.user.isAdmin;
    },
    getAuthStatus(state) {
      return state.user.isAuth;
    },
  },
  modules: {
  }
})
