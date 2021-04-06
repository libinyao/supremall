<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      before: 0
    },
    pullUpLoad: {
      type: Boolean,
      before: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: true,
      mouseWheel: true,
      observeDOM: true,
      observeImage: true
    })
    this.scroll.on('scroll',position =>{
      this.$emit('scroll',position)
    })
    this.scroll.on('pullingUp',() => {
      // console.log('蚌埠住辣');
      this.$emit('pullingUp')

    })
  },
  methods: {
    scrollTo(x, y, time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
