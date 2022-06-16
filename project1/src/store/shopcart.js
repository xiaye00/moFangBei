import { reqCartList, reqCartDelete, reqCarCheck } from "@/api";
const state = {
    carList: []
}
const actions = {
    //获取购物车列表
    async getListCar(context) {
        let result = await reqCartList()
        if (result.code == 200) {
            context.commit('GETLISTCAR', result.data)
        }
    },
    //删除购物车列表
    async deleteCarList(context, skuId) {
        let result = await reqCartDelete(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车商品选择状态
    async checkCar(context, { skuId, isChecked }) {
        let result = await reqCarCheck(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选产品
    deleteAll({ dispatch, getters }) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let PromiseAll = []
    getters.carList.cartInfoList.forEach(item => {
      let promise =item.isChecked==1?dispatch('deleteCarList',item.skuId):' '
      //将每一次返回的全部产品添加到数组中
      PromiseAll.push(promise)
    });
    //只要全部的p1|p2....都成功，返回结果即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(PromiseAll);
    },
    //修改全部产品的状态
    updateAll({dispatch,state},isChecked){
        let promiseAll = []
        state.carList[0].cartInfoList.forEach((item)=>{
            let promise =dispatch('checkCar',{skuId:item.skuId,
            isChecked})
            promiseAll.push(promise)
        })
//最终返回结果
return Promise.all(promiseAll)

    }
}
const mutations = {
    GETLISTCAR(state, carList) {
        state.carList = carList
    }
}
const getters = {
    carList(state) {
        return state.carList[0] || {}
    }
}

export default {
    state, actions, mutations, getters
}