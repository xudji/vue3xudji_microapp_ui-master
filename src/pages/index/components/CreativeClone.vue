<template>
  <view class="creativeClone">
    <view class="navImg">
      <view class="create" @click="goCreate" >
        <view class="createText">创作短视频</view>
         <image src="../../../static/images/order_bg.png" mode=""></image>
      </view>
      <view class="clone" @click="goClone">
        <view class="cloneText">极速克隆</view>
 <image src="../../../static/images/order_bg.png" mode=""></image>
      </view>


    </view>
  </view>
</template>

<script setup lang="ts">

import { ref} from 'vue'

function goCreate(){
  console.log('创作短视频')
  uni.navigateTo({
    url:'/pages/create/create',
    success: res => {},
    fail: () => {},
    complete: () => {}
  });
}
function goClone(){
  console.log('极速克隆')
  uni.navigateTo({
    url:'/pages/clone/clone',
    success: res => {},
    fail: () => {},
    complete: () => {}
  });
}

</script>



<style lang="scss">
  .creativeClone{
    min-height: 200rpx;
    .navImg {
      display: flex;
      align-items: center;
      margin: 30rpx 30rpx 0rpx 30rpx;
      .create{
        width: 400rpx;
        height: 180rpx;
        margin-right: 20rpx;
        position: relative;
        .createText{
          position: absolute;
        }
      }
      .clone{
        width: 400rpx;
        height: 180rpx;
        margin-left: 20rpx;
        position: relative;
        .cloneText{
          position: absolute;
        }
      }
  }
  }
</style>
