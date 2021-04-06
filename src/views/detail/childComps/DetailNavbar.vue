<template>
  <nav-bar>
    <div slot="left" class="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="center">
      <div class="center-item"
           v-for="(item,index) in titles"
           :class="{active : index === currentIndex}" @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "ChildNavbar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.center {
  display: flex;
  font-size: 12px;
}
.center-item {
  flex: 1;
}
.active {
  color:  var(--color-high-text);
}
.left {
  margin-top: 5px;
}
</style>
