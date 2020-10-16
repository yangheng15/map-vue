import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    screenCustomerPoolData: [],
    // dic_client_grade: [],
  },
  mutations: {
    ['UPDATESCREEN'](state, data) {
      console.log(data);
      state.screenCustomerPoolData = data;
    },
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