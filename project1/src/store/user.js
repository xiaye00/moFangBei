
import { reqGetCode,reqUserRegister,reqUserlogin,reqUserInfo,reqLogout } from "@/api";
import { setToken,getToken,removeToken } from "@/utils/token";
//登录与注册模块
const state ={
    code:'',
    token:getToken(),
    userInfo:''
}
const actions ={
    //获取验证码
   async getCode(context,phone){
       //获取验证码接口，把验证码返回，正常情况下，后台把验证码发到手机上【省钱
      let result = await reqGetCode(phone)
      if(result.code==200){
          context.commit('GETCODE',result.data)
          return 'ok'
      }else{
          return Promise.reject(new Error('faile'))
      }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
          return "ok";
        } else {
          return Promise.reject(new Error("faile"));
        }
      },
    //用户登录
       async userLogin(context,data){
          let result =  await reqUserlogin(data)
          //服务器下发token，用户唯一标识符
          //将经常通过带token找服务器要用户信息进行展示
          if(result.code==200){
              //用户已经登录成功且获取到token
              context.commit('USERLOGIN',result.data.token)
              //持久化存储token
              setToken(result.data.token)
              return 'ok'
          }else{
              return Promise.reject(new Error('faile'))
          }
      },
      //获取用户信息
    async getUserInfo(context){
      let result = await reqUserInfo()
      if(result.code==200){
          context.commit('GETUSERINFO',result.data)
          return 'ok'
      }else{
          return Promise.reject(new Error('faile'))
      }
    },
    //用户退出
      async  userLogout(context){
          //只向服务器发起一次请求，通知服务器清除token
         let result =  await  reqLogout()
         //action中不能操作state，提交mutation修改state
        if(result.code==200){
            context.commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
        }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清除本地存储
    CLEAR(state){
        //将仓库用户信息清除
        state.token ='',
        state.userInfo = '',
        //本地存储数据清空
        removeToken()
    }
}
const getters = {}

export default {
    state,actions,mutations,getters
}