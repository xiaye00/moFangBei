const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false, //语法检测
  //配置代理跨域
   devServer:{
     proxy:{
       "/api":{
         target:"http://gmall-h5-api.atguigu.cn"
       }
     }
   }
})
