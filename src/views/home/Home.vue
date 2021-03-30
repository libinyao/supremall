<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="scroll" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pullingUp="true" @pullingUp="pullingUpIncident">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']" @tabClick="tabClick">
      </tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/Scroll/Scroll";

import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import {getHomeMultidata, getHomeGoods} from "@/network/home";
import {debounce} from "@/components/common/Utils";


export default {
  name: "home",
  components: {
    NavBar,
    Scroll,
    GoodsList,
    BackTop,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: true
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //监听每张图片加载完成
    // this.$Bus.$on('goodsItemImageLoaded',message => {
    //   console.log(message);
    //   this.$refs.scroll.refresh()
    // })
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.$Bus.$on('goodsItemImageLoaded',message => {
      console.log(message);
      refresh()
    })
  },
  methods: {
    //监听点击
    //选择加载 流行','新款','精选
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    //回到顶部
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    //监听当前位置
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
    },
    //上拉加载更多
    pullingUpIncident(){
      this.getHomeGoods(this.currentType)

    },
    //防抖debounce/节流throttle
    //传一个函数，和一个等待时间
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //上拉加载更多 二次调用
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.scroll {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 51px;
  right: 0;
  left: 0;
}
</style>
