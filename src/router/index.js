import Vue from 'vue'
import Router from 'vue-router'
import IndexComponent from '@/view/index/index'
import PublishComponent from '@/view/publish/index'
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
      component: IndexComponent
    },
    {
      path: '/publish',
      name: 'Publish',
      component: PublishComponent
    },
  ]
})
