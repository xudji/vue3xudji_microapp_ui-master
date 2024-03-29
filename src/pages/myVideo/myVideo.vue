<template>
  <view class="viewport">
    <template class="content">
      <view class="creativeClone">
        <view class="create" @click="goCreate">
          <view class="createText">创作短视频</view>
          <image class="image" src="../../../static/images/order_bg.png" mode="heightFix"></image>
        </view>
      </view>

  <myVedioContent class="marginBottom"></myVedioContent>
    </template>

  </view>
  <Xtabbar :currentPage="1"></Xtabbar>
</template>


<script setup lang="ts">
  import Xtabbar from '@/components/Xtabbar.vue'
  import myVedioContent from './components/myVedioContent.vue'
  import { onMounted, ref } from 'vue'
  import { onLoad, onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app'


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
  .marginBottom{
  margin-bottom: 150rpx;
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
