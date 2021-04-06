<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

export default {
    name: 'App',
    components: {
      TabBar,
      TabBarItem,
      MainTabBar
    },
}
</script>

<style>

</style>
