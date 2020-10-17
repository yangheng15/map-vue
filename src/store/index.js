import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    screenCustomerPoolData: [],
    screenMyCustomerData: [],
    tabId: 0
    // dic_client_grade: [],
  },
  mutations: {
    ['UPDATESCREEN'](state, data) {
      console.log(data);
      state.screenCustomerPoolData = data;
    },
    ['UPDATEMYSCREEN'](state, data) {
      console.log(data);
      state.screenMyCustomerData = data;
    },
    ['SETTABID'](state, data) {
      console.log(data);
      state.tabId = data;
    }
    // ['UPDATEDIC'](state, data) {
    //   state.dic_client_grade = data;
    // }
  },
  actions: {
    UPDATESCREEN({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$httpGet({
          url: "/api/customerPool/app",
          params
        }).then((res) => {
          console.log(res.data);
          commit('UPDATESCREEN', res.data)
          resolve();
        });
      })
      
    },
    UPDATEMYSCREEN({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$httpGet({
          url: "/api/customer/appOwner",
          params
        }).then((res) => {
          console.log(res.data);
          commit('UPDATEMYSCREEN', res.data)
          resolve();
        });
      })
      
    },
    // UPDATEDIC({ commit }) {
    //   Vue.prototype.$httpGet({
    //     url: "/dics/tree",
    //   }).then((res) => {
    //     console.log(res.data);
    //     const data = res.data.find(it => it.type === 'dic_client_grade').childs;
    //     commit('UPDATEDIC', data)
    //   });
    // }

  }
})

export default store;