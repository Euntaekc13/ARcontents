import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './models/auth'
import User from './models/user'
import Profile from './models/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    User,
    Profile
  }
})
