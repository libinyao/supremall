<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper/index'

export default {
  name: "HomeSwiper",
  props:{
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isImage: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImageLoad() {
      if (!this.isImage){
        this.$emit('swiperImageLoad')
        this.isImage = true
      }
    }
  }
}
</script>

<style scoped>

</style>
