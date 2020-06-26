/**
 * @module 定义全局Store
 */

import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state:{
     // openId: 'osHzdt5mqVBHOA5gN_hO8TY1GZP8',//赵鹏
       // openId: 'osHzdt1sHyCDADec5l6crHUgWsZM', //李阳
     openId: 'osHzdt1S0IebegxuWAVw44PnABvs', //董继
      //openId: 'osHzdt0qayanjXEcYMFBIHZ_gRt8', //黄
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