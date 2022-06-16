//home模块小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";


const state = {
    //state中数据默认初始值，服务器返回对象，返回数组，【根据接口返回值初始化】
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList : []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        // console.log('修改仓库数据')
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    //通过api里面的函数调用。向服务器发请求，获取服务器数据
    async categoryList(context) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            context.commit('CATEGORYLIST', result.data)
            // console.log(result) 
        }
    },
    //获取首页轮播图的数据
    async getBannerList(context) {
        // console.log('获取服务器数据')
        let result = await reqGetBannerList()
        if (result.code == 200) {
            context.commit('GETBANNERLIST', result.data)
            // console.log(result) 
        }
        // let result = await reqGetBannerList()
        // console.log(result) 
    },
    //获取floor数据
    async getFloorList(context){
        let result = await reqFloorList()
        // console.log(result) 
        if(result.code == 200){
            context.commit('GETFLOORLIST',result.data)
        }
    }
}
//计算属性
const getters = {}
export default {

    state, mutations, actions, getters
}