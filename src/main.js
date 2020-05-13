// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { NavBar } from 'vant';
import 'lib-flexible/flexible'
import Axios from './axios-conf';
import stores from './store-conf';
const store = stores(Vue);
Axios(Vue, store);
Vue.use(NavBar);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
