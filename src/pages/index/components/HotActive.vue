<template>
  <!-- 推荐专区 -->
  <view class="hotActive">
    <text class="text">热门活动</text>
  </view>
  <view class="active">
    <scroll-view class='scrollContainer' scroll-x>
      <view class='scrollitem' v-for="(item, index) in hotsArr" :key="index">
        <view class="hotActiveText">
             {{item.name}}
        </view>
        <image class="scrollimage" :src="item.contentPic"></image>
      </view>
      <view class="EmptyData" v-if="hotsArr.length==0">暂无数据</view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
  import type { HotArr } from '@/types/hotActive'
  import { ref } from 'vue'
  let hotsArr = ref<HotArr[]>([{ contentPic: '../../../static/images/order_bg.png', id: 0 ,name:'开通尊享无忧会员'}, { contentPic: '../../../static/images/order_bg.png', id: 1 ,name:'购买数字直播机器'}, { contentPic: '../../../static/images/order_bg.png', id: 2,name:'开通其他会员' }])
</script>



<style lang="scss">
  /* 热门推荐 */
  .hotActive {
    display: flex;
    margin: 20rpx 20rpx 20rpx  10rpx;
    color: #262626;
    padding: 0 20rpx;
  }

  .active {
    // 容器
    .scrollContainer {
      height: 234rpx;
      white-space: nowrap;
      position: relative;
    }
    // 容器项
    .scrollitem {
      display: inline-block;
      margin-left: 30rpx;
      height: 334rpx;
        position: relative;
        .scrollimage {
          width: 375rpx;
          height: 200rpx;
        }
        .hotActiveText{
        position: absolute;
      }
    }
    .EmptyData {
      text-align: center;
      margin-top: 50rpx;
    }
  }
</style>
