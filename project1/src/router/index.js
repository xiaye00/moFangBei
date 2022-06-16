//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '@/router/routes'
//使用插件
Vue.use(VueRouter)

//引入store
import store from '@/store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//对外暴漏VueRouter实例
//配置路由
//第一:路径的前面需要有/(不是二级路由)
//路径中单词都是小写的
//component右侧V别给我加单引号【字符串：组件是对象（VueComponent类的实例）】
let router = new VueRouter({
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})


//全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {
  //to:获取到要跳转到的路由信息
  //from：获取到从哪个路由跳转过来来的信息
  //next: next() 放行  next(path) 放行  
  //方便测试 统一放行
  //  next();
  //用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token
  //用户信息
  let name = store.state.user.userInfo.name
  //用户已经登录了
  if (token) {
    //用户登录，不可以去login | 停留在首页
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      //已经登陆了,访问的是非登录与注册
      //登录了且拥有用户信息放行
      if (name) {
        next()
      } else {
        //没有用户信息,派发action让仓库存储用户信息在跳转
        try {
          //获取用户信息成功
          await store.dispatch('getUserInfo')
          //放行
          next()
        } catch (error) {
          //token失效了 获取不到用户信息，重新登录
          //清除token
          await store.dispatch('userLogout')
          next('/login')

        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path
    console.log(toPath)
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect='+toPath)
    } else {
      //去的不包括上面这些路由，(home|search|shopcart) 放行
      next()
    }
  }
})

export default router