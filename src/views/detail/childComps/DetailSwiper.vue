<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImage">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";
export default {
  name: "DetailSwiper",
  components: {Swiper,SwiperItem},
  props: {
    topImage:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
