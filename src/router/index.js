import Vue from 'vue'
import Router from 'vue-router'
import IndexComponent from '@/view/index/index'
import PublishComponent from '@/view/publish/index'
import PublishDetailComponent from '@/view/publish/detail'
import UserComponent from '@/view/user/index'
import BuyComponent from '@/view/index/buy'
import SellComponent from '@/view/index/sell'
import LoginComponent from '@/view/index/login'
import BindphoneComponent from '@/view/user/bindphone'
import ReleaseInfoComponent from '@/view/user/releaseInfo'
import ReleaseDetailComponent from '@/view/user/list-detail/detail'
import ShopListComponent from '@/view/user/shop-list'
import BuyDetailComponent from '@/view/user/list-detail/buydetail'

Vue.use(Router)

export default new Router({
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
    {
      path: '/bindphone',
      name: 'Bindphone',
      component: BindphoneComponent
    },
    {
      path: '/releaseInfo',
      name: 'ReleaseInfo',
      component: ReleaseInfoComponent
    },
    {
      path: '/releasedetail',
      name: 'ReleaseDetail',
      component: ReleaseDetailComponent
    },
    {
      path: '/shoplist',
      name: 'ShopList',
      component: ShopListComponent
    },
    {
      path: '/buydetail',
      name: 'Buydetail',
      component: BuyDetailComponent
    }
    
    
  ]
})
