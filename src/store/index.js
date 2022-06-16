import { createStore } from 'vuex'
import { getMusicLyric } from "@/request/api/item";
import { getPhoneLogin } from "@/request/api/home";
export default createStore({
  state: {
    playList:[{//播放列表
        al:{
          id: 88188476,
          name: "晚风",
          pic: 109951164919449760,
          picUrl: "https://p2.music.126.net/lCblKUB1hLND5FxiVI1_Lw==/109951164919449758.jpg",
          pic_str: "109951164919449758"
        },
        id: 1953161217,
        name: "晚风",
        ar:[{name: "莫方北"}]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页的显示
    lyricList:{}, //存放歌词
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
    token:"",
    user:{},//用户信息
  },
  getters: {
  },
  mutations: {
    //暂停按钮显示与否
    ISBTNSHOW(state,value){
      state.isbtnShow = value
    },
    //播放列表
    updatePlayList(state, value) {
      state.playList = value
      console.log(state.playList);
    },
    
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    //展示详情
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    //修改歌词
    UPDATELYRIC(state,value){
      state.lyricList = value
    },
    //当前时间
    updateCurrentTime(state,value){
      // console.log(state.currentTime);
      state.currentTime=value
    },
    //总时长
    updateDuration(state,value){
      state.duration=value
    },
    //添加歌曲
    pushPlayList(state,value){
      state.playList.push(value)
    },
    //登录状态
    updateIsLogin:function(state,value){
      state.isLogin=true
    },
    updateToken(state,value){
      state.token=value
      localStorage.setItem('token',state.token)
    },
    updateUser(state,value){
      state.user=value
    }
  },
  actions: {
    async getLyric(context,value){
      let res = await getMusicLyric(value)
      // console.log(res);
      context.commit('UPDATELYRIC',res.data.lrc)
    },
    async getLogin(context,value){
      let res=await getPhoneLogin(value);
      // console.log(res);
      return res
    },
  },
  modules: {
  }
})
