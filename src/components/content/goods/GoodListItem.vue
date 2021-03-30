<template>
  <div class="good-item">
    <img :src="goodsItem.show.img" alt="" @load="goodsItemImageLoaded">
    <h2></h2>
    <div class="good-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    goodsItemImageLoaded() {
      const message = '图片加载完毕'
      this.$Bus.$emit('goodsItemImageLoaded',message)
    }
  }
}
</script>

<style scoped>
.good-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.good-item img{
  width: 100%;
  border-radius: 5px;
}
.good-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;


}
.good-info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  margin-bottom: 3px;
}
.good-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.good-info .collect{
  position: relative;
}
.good-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
