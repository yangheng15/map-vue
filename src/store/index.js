import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    screenCustomerPoolData: [],
    screenMyCustomerData: [],
    tabId: 0,
    screeningCriteria: {},
  },
  mutations: {
    ['UPDATESCREEN'](state, data) {
      state.screenCustomerPoolData = data;
    },
    ['UPDATEMYSCREEN'](state, data) {
      state.screenMyCustomerData = data;
    },
    ['SETTABID'](state, data) {
      state.tabId = data;
    },
    ['SCREENING'](state, data){
      state.screeningCriteria = data;
    }
  },
  actions: {
    UPDATESCREEN({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$httpGet({
          url: "/api/customerPool/app",
          params
        }).then((res) => {
          commit('UPDATESCREEN', res.data)
          resolve();
        });
      })

    },
    UPDATEMYSCREEN({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$httpGet({
          url: "/api/customer/appOwner",
          params
        }).then((res) => {
          commit('UPDATEMYSCREEN', res.data)
          resolve();
        });
      })

    },
  }
})

export default store;