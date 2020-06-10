// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { NavBar , Swipe, SwipeItem , Lazyload, DropdownMenu, DropdownItem, SwitchCell, Button, DatetimePicker, Field, Form, Popup,Picker,Dialog     } from 'vant';
import 'lib-flexible/flexible'
import Axios from './axios-conf';
import stores from './store-conf';

const store = stores(Vue);
Axios(Vue, store);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(SwitchCell);
Vue.use(Button);
Vue.use(DatetimePicker);
Vue.use(Field);
Vue.use(Form);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Dialog);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
