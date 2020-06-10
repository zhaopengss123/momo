/**
 * @module 定义全局Store
 */

import Vuex from 'vuex';


export default (Vue) => {
  Vue.use(Vuex);
  return new Vuex.Store({
    state:{
      openId: null,
      phone: false
    },
    mutations:{
      editOpenId(state,text){
        state.openId = text
      }
    }
  });
}