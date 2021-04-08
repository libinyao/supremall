<template>
  <div id="detail">
    <detail-navbar class="detail-navbar" @titleClick="titleClick" ref="detailNavBar"/>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="titleScroll">
      <detail-swiper :top-image="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavbar from "@/views/detail/childComps/DetailNavbar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";

import Scroll from "@/components/common/Scroll/Scroll";

import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail"

import {debounce} from "@/components/common/Utils";

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    this.iid = this.$route.params.iid
    this.getDetail()
    this.getRecommend()
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);
    })
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh,500)
    this.$Bus.$on(' detail-goodsItemImageLoaded',message => {
      console.log(message);
      refresh()
    })
  },
  updated() {
    // this.themeTopYs = []
    //
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs);
  },

  methods: {
    //详情页数据
    getDetail() {
      getDetail(this.iid).then(res => {
        //console.log(res);
        const data = res.result
        //拿到轮播图数据
        this.topImage = data.itemInfo.topImages
        //拿到商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //拿到店铺信息
        this.shop = new Shop(data.shopInfo)
        //拿到商品详情数据
        this.detailInfo = data.detailInfo
        //拿到参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //取出评论
        if(data.rate.cRate !== 0 ){
          this.commentInfo = data.rate.list[0]
        }
        //点击跳转位置时获取高度 nextTick函数等待DOM被渲染完成时执行并返回一个回调函数，图片不一定加载完成
        // this.$nextTick(() => {
        //   this.themetopYs.push(0)
        //   this.themetopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themetopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themetopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themetopYs);
        // })
      })
    },
    //推荐数据
    getRecommend() {
      getRecommend().then(res => {
        //console.log(res);
        this.recommends = res.data.list
      })
    },
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    titleScroll(position){
      const positionY =  -position.y
      let length = this.themeTopYs.length
      for(let i = 0; i<length; i++ ) {
        if(this.currentIndex !== i &&((i<length-1 && positionY >= this.themeTopYs[i])||
          (i === length-1 && positionY > this.themeTopYs[i]))){
          this.currentIndex = i
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }
      }
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-navbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
