<template>
  <div class="floorBanner">
    <div class="swiper-container" ref="floor1Swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(carousel, index) in list"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
//引包
import Swiper from 'swiper'
export default {
  name: "Carsousel",
  props: ["list"],
  watch: {
    list: {
            //现通过watch监听bannerList属性的属性值的变化
    //如果执行handler方法，代表组件实例值已经存在[数组:四个元素]
    //当前这个函数执行:只能保证bannerList数据已经有了，但是你没办法保证v-for已经执行结束了
    //v-for执行完毕，才有结构[你现在在watch当中没办法保证的]
    //netxTick:在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。
      //立即监听
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小圆球切换图片
              clickable:true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>