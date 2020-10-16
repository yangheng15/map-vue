import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ScreenCustomerPoolData: []
  },
  mutations: {
    ['UPDATE'](state, data) {
      state.ScreenCustomerPoolData = data; 
    }
  },
  actions: {
    updata({ commit }) {
      commit
    }
  }
})

export default store;