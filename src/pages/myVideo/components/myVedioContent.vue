<template>
  <view class="caption">
    <text class="text">我的短视频</text>
  </view>
  <view class="guess">
    <view class="guess-item" v-for="item in guessList" :key="item.id">
      <!-- 合成中有状态显示 -->
      <view class="createStatus" :class="{
         createFailColor: createState === 'fail',
         creatingColor: createState === 'creating',
         createQueueColor: createState === 'queue'
       }" v-if="item.id">
        <text class="createText">合成失败</text>
      </view>
      <image @click="goGood(item)" class="nameImageTop" mode="aspectFill" :src="item.picture"></image>
      <view class="nameBar">
        <view class="name"> {{ item.name.slice(0,19) }} </view>
        <!-- 合成失败显示 -->
        <image @click="goMore" class="nameImage" src="../../static/images/stars.png" mode="heightFix"></image>
      </view>
      <view class="time">
        <text class="small">编辑时间: 2021-02-03{{ item.price }}</text>
      </view>
    </view>
  </view>
  <view class="loading-text">
    {{ finish ? '没有更多数据~' : '正在加载...' }}
  </view>
</template>

<script setup lang="ts">
  import Xtabbar from '@/components/Xtabbar.vue'
  import { getHomeGoodsGuessLikeAPI } from '@/services/home'
  import type { PageParams } from '@/types/global'
  import type { GuessItem } from '@/types/home'

  import { onMounted, ref } from 'vue'
  import { onLoad, onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app'


  // 合成状态逻辑
  let createState = ref<string>('fail')

  function goCreate() {
    console.log('创作短视频')
    uni.navigateTo({
      url: '/pages/create/create',
      success: res => { },
      fail: () => { },
      complete: () => { }
    });
  }

  const isLoading = ref(false)
  // 分页参数
  const pageParams : Required<PageParams> = {
    page: 1,
    pageSize: 10,
  }

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
  // 组件挂载完毕
  onLoad(() => {
    console.log('进来了')
    getHomeGoodsGuessLikeData()
  })

  onPullDownRefresh(() => {
    console.log("下拉刷新")
  })
  onReachBottom(() => {
    console.log("上拉加载更多")
    getHomeGoodsGuessLikeData()
  })


  // 猜你喜欢的列表
  const guessList = ref<GuessItem[]>([])
  const onScrolltolower = () => {
    console.log('触发了下拉刷新')
    getHomeGoodsGuessLikeData()
  }

  // 下拉刷新
  // 当前下拉刷新状态
  const isTriggered = ref(false)
  // 自定义下拉刷新被触发
  const onRefresherrefresh = async () => {
    console.log('下拉刷新')
    // 开始动画
    isTriggered.value = true
    getHomeGoodsGuessLikeData()
    // 关闭动画
    isTriggered.value = false
  }


  // 视频点击跳转
  function goGood(item) {
    console.log('跳转到具体的视频', item.id)
    uni.navigateTo({
      url: `/pages/goods/goods?id=${item.id}`,
      success: res => { },
      fail: () => { },
      complete: () => { }
    });
  }

  function goMore(item) {
    console.log('打开更多菜单')
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
  .content{

  }

  .scroll-view {
    flex: 1;
    overflow: hidden;
  }

  :host {
    display: block;
  }

  .creativeClone {
    min-height: 330rpx;
    .create {
      width: 100%;
      margin: 20rpx 20rpx 20rpx 20rpx;
      position: relative;

      .createText {
        position: absolute;
      }

      .image {
        border-radius: 10rpx;
        width: 100%;
        height: 330rpx;
      }
    }
  }

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

    .guess-item {
      width: 345rpx;
      margin-bottom: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      background-color: #fff;

      .createFailColor {
        background-color: #C4605F;
      }

      .creatingColor {
        background-color: #24D38E;
      }

      .createQueueColor {
        background-color: #EB813B;
      }

      .createStatus {
        width: 120rpx;
        height: 50rpx;
        border-radius: 12rpx;
        position: absolute;
        z-index: 2;
        margin: 10rpx;
        text-align: center;
        vertical-align: middle;

        .createText {
          color: #fff;
          font-size: 24rpx;
        }
      }

      .nameImageTop {
        height: 204rpx;
        position: relative;
      }

      .nameBar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .name {
          height: 35rpx;
          margin: 10rpx 0;
          font-size: 26rpx;
          color: #262626;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .nameImage {
          height: 32rpx;
        }
      }

      .time {
        line-height: 1;
        padding-top: 4rpx;
        font-size: 26rpx;

        .small {
          font-size: 80%;
        }
      }

    }



  }

  // 加载提示文字
  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
</style>
