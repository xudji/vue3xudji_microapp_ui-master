<template>
  <view class="viewport">
    <!-- 自定义导航栏 -->
    <!-- <CustomNavbar /> -->
    <!-- 滚动容器 -->
      <!-- <PageSkeleton /> -->
      <template >
        <!-- 自定义轮播图 -->
       <!-- <XtxSwiper :list="bannerList" /> -->
        <!-- 头部，创作短视频，急速克隆 -->
        <CreativeClone></CreativeClone>
        <!-- 分类面板 -->
        <CategoryPanel :list="categoryList" />
        <!-- 热门活动 -->
        <HotActive></HotActive>
        <!-- 热门推荐 -->
        <!-- <HotPanel :list="hotList" /> -->
        <!-- 猜你喜欢 -->
        <XtxTemp ref="guessRef" class="margin" />
        <Xtabbar :currentPage="0"></Xtabbar>
      </template>
  </view>

</template>

<script setup lang="ts">
import Xtabbar from '@/components/Xtabbar.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad,onPullDownRefresh , onReachBottom ,onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import HotActive from './components/HotActive.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import CreativeClone from './components/CreativeClone.vue'
import type { XtxGuessInstance } from '@/types/components'
// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  let listData = res.result.slice(0,4).map((item, index) => {
    return {
      ...item,
      name: index === 0 ? 'AI创作' :
             index === 1 ? '我的短视频' :
             index === 2 ? '定制数字人' :
             index === 3 ? '定制音色' :
             item.name
    }
  })
  categoryList.value = listData
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 是否加载中标记
const isLoading = ref(false)

// 页面加载
onLoad(async () => {
  // isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  // isLoading.value = false
})

// 我的短视频模板
const guessRef = ref<XtxGuessInstance>()
  // 滚动触底事件
const onScrolltolower = () => {
    guessRef.value?.getMore()
}
// 当前下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  console.log('下拉刷新')
  // 开始动画
  isTriggered.value = true
  // 加载数据
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  // 关闭动画
  isTriggered.value = false
}



</script>


<style lang="scss" scoped>
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
.margin{
  margin-bottom: 150rpx;
}
</style>
