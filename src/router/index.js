import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from '@/view/login'
import OrderListComponent from '@/view/orderList'
import EvaluateComponent from '@/view/evaluate'

Vue.use(Router)
let router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent,
    },
    {
      path: '/order',
      name: 'Order',
      component: OrderListComponent,
    },
    {
      path: '/evaluate',
      name: 'Evaluate',
      component: EvaluateComponent,
    }
  ]
})


export default router;