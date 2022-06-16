<template>
  <div>
    <MusicTop :playlist="state.playlist" />
    <ItemList  :songs='state.songs' :subscribedCount="state.playlist.subscribedCount" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList,getItemList } from "@/request/api/item";
import MusicTop from '@/components/item/MusicTop'
import ItemList from '@/components/item/ItemList'
export default {
  setup() {
    const state = reactive({
      playlist: {}, //歌单的详情页的数据
      songs:[]   //歌单列表数据
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      console.log(id);
      //   获取歌单详情页
      let res = await getMusicItemList(id);
      console.log(res,'歌单详情');
      state.playlist = res.data.playlist;

      // 获取歌单列表
      let result = await getItemList(id)
      console.log(result,'歌单列表') 
      state.songs = result.data.songs

      //防止页面刷新,数据丢失,将数据保存到sessionStorage中
      sessionStorage.setItem('itemDetail',JSON.stringify(state))
    });
    return { state };
  },
  components:{MusicTop,ItemList }
}
</script>

<style>
</style>