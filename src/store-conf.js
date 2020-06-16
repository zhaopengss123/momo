/**
 * @module 定义全局Store
 */

import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state:{
      openId: '',
      phone: false,
      userInfo:{}
    },
    getters:{
      getOpenid:state=>{
        return state.openId;
      }
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