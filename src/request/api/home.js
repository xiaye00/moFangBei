import service from '@/request/index'
//获取首页轮播图数据
export function getBanner(params) {
    return service({
        method:'get',
        url:'/banner?type=2'
    })
}
//获取推荐单个
export function getMusicList(params) {
    return service({
        method:'get',
        url:'/personalized?limit=15'
    })
}
//关键字搜索  /search/multimatch?keywords=海阔天空
export function getSearchMusic(data) {
    return service({
        method:'get',
        url:`/search?keywords=${data}`
    })
}
//登录
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
//获取用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}