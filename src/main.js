// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { NavBar ,Col , Row , Button, Form , Field , Toast , Cell, CellGroup, Rate, RadioGroup, Radio, Image as VanImage, Icon, Popup, Dialog, Tag} from 'vant';
import 'lib-flexible/flexible'
import Axios from './axios-conf';
import stores from './store-conf';

const store = stores(Vue);
Axios(Vue, store);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Rate);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Toast);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
