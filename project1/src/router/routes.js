//引入一级路由
// import Detail from '@/pages/Detail'
// import Search from '@/pages/Search'
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
//路由信息
export default [
    {
        path: "/center",
        component: Center,
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: myOrder
            },
            {
                path: 'grouporder',
                component: groupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                //其他停留当前
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component: Trade,
        //路由独享守卫
        /* 只能从购物车界面，跳转到交易界面 */
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else {
                //其他停留当前
                next(false)
            }
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        name: 'shopcart',
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta: { show: true }
    },
    {
        path: "/detail/:skuId",
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: "/home",
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: { show: true },
        name: 'search'
    },
    //重定向 启动项目 定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]