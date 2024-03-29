<template>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      url="/pages/index/index"
      v-for="item in list"
      :key="item.id"
    >
      <image class="icon" :src="item.icon"></image>
      <text class="text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import type { CategoryItem } from '@/types/home'

import { ref, onMounted } from 'vue'
const props = defineProps<{
  list: CategoryItem[] // 接口
}>()

</script>



<style lang="scss">
.category {
  margin: 20rpx 0 0;
  padding: 10rpx 0;
  display: flex;
  justify-content: space-evenly;
  min-height: 168rpx;

  .category-item {
    width: 150rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    .icon {
      width: 100rpx;
      height: 100rpx;
    }
    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}

</style>
