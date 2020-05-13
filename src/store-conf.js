/**
 * @module 定义全局Store
 */

import Vuex from 'vuex';


export default (Vue) => {
  Vue.use(Vuex);
  return new Vuex.Store({
    modules: {
    }
  });
}