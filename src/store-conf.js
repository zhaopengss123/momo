/**
 * @module 定义全局Store
 */

import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state:{
      openId: 'osHzdt5mqVBHOA5gN_hO8TY1GZP8',
      phone: false,
      userInfo:{}
    },
    getters:{

    },
    mutations:{
      editOpenId(state,text){
        state.openId = text
      },
      setUserInfo(state,str){
        state.userInfo = str;
      }
    }
  });
}