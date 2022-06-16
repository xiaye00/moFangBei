<template>
  <div>
    <!-- 三级联动全局组件 -->
    <typenav />
    <ListContainer />
    <Rank />
    <Recommend />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />

    <Brand />
  </div>
</template>

<script>
//引入
import { mapState } from "vuex";
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    //获取floor数据
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>