import Vue from 'vue'
import Router from 'vue-router'
import IndexComponent from '@/view/index/index'
import PublishComponent from '@/view/publish/index'
import PublishDetailComponent from '@/view/publish/detail'
import UserComponent from '@/view/user/index'
import BuyComponent from '@/view/index/buy'
import SellComponent from '@/view/index/sell'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: IndexComponent,
    },
    {
      path: '/buy',
      name: 'Buy',
      component: BuyComponent,
    },
    {
      path: '/sell',
      name: 'Sell',
      component: SellComponent,
    },
    {
      path: '/publish',
      name: 'Publish',
      component: PublishComponent
    },
    {
      path: '/publishdetail',
      name: 'Publishdetail',
      component: PublishDetailComponent
    },
    {
      path: '/user',
      name: 'User',
      component: UserComponent
    },
  ]
})
