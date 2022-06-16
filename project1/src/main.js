import Vue from 'vue'
import App from './App.vue'
//引入store仓库
import store from '@/store'

//引入路由器
import router from '@/router'
Vue.config.productionTip = false
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carsousel'
import Pagination from '@/components/Pagination'
import { Button,MessageBox} from 'element-ui';
//第一个参数：全局组件名字 第二个参数：哪一个组件
Vue.component('typenav',TypeNav)
Vue.component('carsousel',Carsousel)
Vue.component('pagination',Pagination)
// C:\Users\lenovo\Desktop\project_1\node_modules\swiper\css\swiper.css
//注册全局组件
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入MockServer.js ----mock数据
import '@/mock/mockServe'
//引入swiper样式
import  'swiper/css/swiper.css'
//统一引入
import * as API from '@/api'
//引入表单校验插件
import "@/plugins/validate";
new Vue({
  render: h => h(App),
  //注册路由:kv一致省略v,对象的简写形示
  //注册路由信息：此时组件身上都有$router,$route属性
  router,
  //安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册仓库：组件实例身上多一个属性$store
  store
}).$mount('#app')
