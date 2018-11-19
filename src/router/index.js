import Vue from 'vue'
import Router from 'vue-router'
import Enter from '@/components/Enter'
import Login from '@/components/Login'
import Register from '@/components/Register'
import OrderCenter from '@/components/OrderCenter'
import Payment from '@/components/Payment'
import UserCenter from '@/components/UserCenter'
import TradingHall from '@/components/TradingHall'
import OrderInfo from '@/components/OrderInfo'
import OrderShow from '@/components/OrderShow'
import OrderEdit from '@/components/OrderEdit'
import ForgetPasswd from '@/components/ForgetPasswd'
import SubPayment from '@/components/common/SubPayment'
import Upload from '@/components/upload'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Enter',
      component: Enter
    }, 
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgetPasswd',
      name: 'ForgetPasswd',
      component: ForgetPasswd
    },
    {
      path: '/tradinghall',
      name: 'TradingHall',
      component: TradingHall,
      meta: {authRequired: true}
    },
    {
      path: '/ordercenter',
      name: 'OrderCenter',
      component: OrderCenter,
      meta: {authRequired: true}
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      meta: {authRequired: true}
    },
    {
      path: '/common/subpayment',
      name: 'SubPayment',
      component: SubPayment,
      meta: {authRequired: true}
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      component: UserCenter,
      meta: {authRequired: true}
    },
    {
      path: '/orderinfo',
      name: 'OrderInfo',
      component: OrderInfo,
      meta: {authRequired: true}
    },
    {
      path: '/ordershow',
      name: 'OrderShow',
      component: OrderShow,
      meta: {authRequired: true}
    },
    {
      path: '/orderedit',
      name: 'OrderEdit',
      component: OrderEdit,
      meta: {authRequired: true}
    }
    ]
})

router.beforeEach((to, from, next) => {    //判断是否需要登录拦截
  if (to.meta.authRequired) {        //存在token正常跳转
    if (sessionStorage.getItem('status') == 1) {
      next()
    } else {
      next({path: '/'})
    }
  } else {
    next()
  }
})

export default router

