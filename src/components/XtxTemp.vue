
<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">推荐模板</text>
  </view>
  <view class="guess">
    <view
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      @click="goGoods(item.id)"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
    </view>
  </view>
  <view class="loading-text">
    {{ finish ? '没有更多数据~' : '正在加载...' }}
  </view>
</template>


<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import { onLoad,onPullDownRefresh , onReachBottom ,onShow } from '@dcloudio/uni-app'
import type { PageParams } from '@/types/global'
import type { GuessItem } from '@/types/home'
import { onMounted, ref } from 'vue'

// 分页参数
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}
// 猜你喜欢的列表
const guessList = ref<GuessItem[]>([])
// 已结束标记
const finish = ref(false)
// 获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
  // 退出分页判断
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  // guessList.value = res.result.items
  // 数组追加
  guessList.value.push(...res.result.items)
  // 分页条件
  if (pageParams.page < res.result.pages) {
    // 页码累加
    pageParams.page++
  } else {
    finish.value = true
  }
}
// 重置数据
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  finish.value = false
}
 onPullDownRefresh(() => {
        console.log("下拉刷新")
})
 onReachBottom(() => {
        console.log("上拉加载更多")
        getHomeGoodsGuessLikeData()
})



// 组件挂载完毕
onMounted(() => {
  getHomeGoodsGuessLikeData()
})
// 暴露方法
defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})

function goGoods(id:number){
  uni.navigateTo({
    url:`/pages/goods/goods?id=${id}`
  })
}
</script>



<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: flex-start;
  line-height: 1;
  font-size: 32rpx;
  padding-bottom: 24rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    // &::before,
    // &::after {
    //   content: '';
    //   width: 20rpx;
    //   height: 20rpx;
    //   background-image: url(@/static/images/bubble.png);
    //   background-size: contain;
    //   margin: 0 10rpx;
    // }
  }
}
/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  margin-left: 10rpx;
  margin-right: 10rpx;
  .guess-item {
    width: 332rpx;
    padding: 0rpx 0rpx 0rpx 0rpx;
    margin-bottom: 26rpx;
    background-color: #fff;
  }
  .image {
    border-radius: 10rpx;
    width: 100%rpx;
    height: 500rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}

.loadMore{
  margin-top: -40rpx;
}
</style>
