import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
//封装游客身份模块uuid--->生成一个随机字符串(不能在变了)
import { getUUID } from "@/utils/uuid_token";
const state={
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const actions={
    //获取详情信息
    // async getGoodInfo(context,Id){
    //    let  result= await reqGoodsInfo(Id)
    //    if(result.code==200){
    //        context.commit('GETGOODINFO',result.data)
    //    }
    // },
    async getGoodInfo(context,skuId){
       let result = await reqGoodsInfo(skuId)
       if(result.code==200){
           context.commit('GETGOODINFO',result.data)
       }
    },
    //加入购物车的||修改某一个产品的个数
    async addOrUpdateShopCart(context,{skuId,skuNum}){
  //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    //不需要在三连环（仓库存储数据了）
    //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //代表服务器加入购物车成功
        if(result.code==200){
            return 'ok'
        }else{
            //代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations ={

    GETGOODINFO(state,goodInfo){
        state.goodInfo =goodInfo
    }
}
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,actions,mutations,getters
}