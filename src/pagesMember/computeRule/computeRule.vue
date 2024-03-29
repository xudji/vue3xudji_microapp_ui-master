<template>
  <view class="viewport">
    <view class="ruleContent">
      <view class="ruleTitle">
        算力规则:
      </view>
      <view class="ruleMain">
        1、算力及权益购买：在权益页面购买相应的会员及功能权益。
      </view>
      <view class="ruleMain">
        2、权益使用：定制形象、定制音色、极速克隆权益按次数消费，每次定制消耗1次定制次数。
      </view>
      <view class="ruleMain">
        2、算力使用：可用于抵扣“合成短视频”的功能权益。
      </view>
      <view class="ruleMain">
        3、算力消耗：1算力=短视频时长1秒。
      </view>
      <view class="ruleMain">
        4、业务变更：平台相关的权益规则会根据业务情况、运营成本及策略发生不定时调整，请关注最新规则。
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
  import { useGuessList } from '@/composables'
  import { useMemberStore } from '@/stores'
  // 获取屏幕边界到安全区域距离
  const { safeAreaInsets } = uni.getSystemInfoSync()
  // 订单选项
  const orderTypes = [
    { type: '1', text: '待付款', icon: 'icon-currency' },
    { type: '2', text: '待发货', icon: 'icon-gift' },
    { type: '3', text: '待收货', icon: 'icon-check' },
    { type: '4', text: '待评价', icon: 'icon-comment' },
  ]
  // 获取会员信息
  const memberStore = useMemberStore()

  const { guessRef, onScrolltolower } = useGuessList()
</script>


<style lang="scss" scoped>
  page {
    height: 100%;
    overflow: hidden;
    background-color: #f7f7f8;
  }

  .viewport {
    height: 100vh;
    background-color: #00C8A4;
  }
  .ruleContent {
    font-size: 24rpx;
    color: #262626;
    padding: 40rpx 20rpx 20rpx 20rpx;
    .ruleTitle {
      margin-bottom: 8rpx;
    }
    .ruleMain{
      line-height: 2;
    }
  }
</style>
