<template>
  <div>
     <Header/>
      <!-- 路由组件出口的地方 -->
      <router-view></router-view>
      <!-- 在Home Search显示，在登录、注册隐藏 -->
      <!-- <Footer v-show="$route.path == '/home'|| $route.path=='/search' " /> -->
      <Footer v-show="$route.meta.show"  />
  </div>
  
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer'
export default {
  name:'App',
  components:{Header,Footer},
  mounted(){
        //组件挂载完毕：向服务器发请求
        //通知Vuex发请求，派发一个action 获取商品的三级列表的数据
        this.$store.dispatch('categoryList')
        console.log(this) 
  }

}
</script>

<style>

</style>