<template>
  <div class="home">
    <TopNav/>
    <SwiperTop/>
    <IconList/>
    <MusicList/>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/home/TopNav'
import SwiperTop from '@/components/home/SwiperTop'
import IconList from '@/components/home/IconList'
import MusicList from '@/components/home/MusicList'
export default {
  name: 'HomeView',
  components: {TopNav,SwiperTop,IconList,MusicList
  }
}
</script>
