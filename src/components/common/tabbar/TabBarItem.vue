<template>
  <div class="tab-ber-item" @click="btnClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
<!--    <div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>

</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path: String,
    activecolor:{
      type: String,
      default: 'red'
    }
  },
  data(){
    return{
      //isActive: false
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activecolor} : {}
    }
  },
  methods:{
    btnClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-ber-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-ber-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
/*.active{*/
/*  color: red;*/
/*}*/
</style>