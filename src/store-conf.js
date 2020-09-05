/**
 * @module 定义全局Store
 */

import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state:{
      userInfo:{}
    },
    getters:{
      getUserInfo:state=>{
        return state.userInfo;
      }
    },
    mutations:{
      setUserInfo(state,str){
        console.log(str)
        state.userInfo = str;
      }
    }
  });
}