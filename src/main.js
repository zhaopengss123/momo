// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { NavBar , Swipe, SwipeItem ,ImagePreview, Lazyload, DropdownMenu, DropdownItem, SwitchCell, Button, DatetimePicker, Field, Form, Popup,Picker,Dialog,Uploader,Toast, Stepper, Step, Steps , Image as VanImage} from 'vant';
import 'lib-flexible/flexible'
import Axios from './axios-conf';
import stores from './store-conf';
import { PullRefresh } from 'vant';

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
Vue.use(Uploader);
Vue.use(Toast);
Vue.use(Stepper);
Vue.use(Step);
Vue.use(Steps);
Vue.use(PullRefresh);
Vue.use(VanImage);
Vue.use(ImagePreview);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
