<template>
  <view class="viewport">
    <!-- 个人资料 -->
    <view class="profile" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <!-- 情况1：已登录 -->
      <view class="overview" v-if="memberStore.profile">
        <navigator url="/pagesMember/profile/profile" hover-class="none">
          <image class="avatar" :src="memberStore.profile.avatar" mode="aspectFill"></image>
        </navigator>
        <view class="meta">
          <view class="nickname">
            {{ memberStore.profile.nickname || memberStore.profile.account }}
          </view>
          <navigator class="extra" url="/pagesMember/profile/profile" hover-class="none">
            <text class="update">更新头像昵称</text>
          </navigator>
        </view>
      </view>
      <!-- 情况2：未登录 -->
      <view class="overview" v-else>
        <navigator url="/pages/login/login" hover-class="none">
          <image
            class="avatar gray"
            mode="aspectFill"
            src="https://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png"
          ></image>
        </navigator>
        <view class="meta">
          <navigator url="/pages/login/login" hover-class="none" class="nickname">
            未登录
          </navigator>
          <view class="extra">
            <text class="tips">点击登录账号</text>
          </view>
        </view>
      </view>

    </view>
    <!-- 尊享会员权益 -->
    <view class="orders">
      <view class="title">
        尊享会员权益
        <view class="navigator">
          <text class="icon-right"></text>开通会员
        </view>
      </view>
    </view>
      <!--余额组件 -->
      <view class="balance">
        <!-- 算力余额 -->
          <view class="balanceItem">
               <view class="balanceTitle">
                  算力余额
               </view>
               <view class="balanceMoney">
                  120
               </view>
          </view>
          <!-- 定制形象余额 -->
            <view class="balanceItem">
                 <view class="balanceTitle">
                    定制形象余额
                 </view>
                 <view class="balanceMoney">
                    0
                 </view>
            </view>
               <!-- 定制音色余额 -->
            <view class="balanceItem">
                 <view class="balanceTitle">
                    定制音色余额
                 </view>
                 <view class="balanceMoney">
                  0
                 </view>
            </view>
            <!-- 极速克隆余额 -->
            <view class="balanceItem">
                 <view class="balanceTitle">
                    极速克隆余额
                 </view>
                 <view class="balanceMoney">
                  0
                 </view>
            </view>
      </view>
      <!-- 算力规则 -->
      <view class="computePower" @click="goComputeRule">
           <text class="computePowerText">算力规则</text>
      </view>
    <Xtabbar :currentPage="2"></Xtabbar>
   </view>
</template>

<script setup lang="ts">
  import Xtabbar from '@/components/Xtabbar.vue'
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

// 去算力规则
function goComputeRule(){
  console.log('去算力规则')
  uni.navigateTo({
    url: `/pagesMember/computeRule/computeRule`,
    success: res => {},
    fail: () => {},
    complete: () => {}
  });
}

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

/* 用户信息 */
.profile {
  position: relative;
  .overview {
    display: flex;
    height: 120rpx;
    padding: 0 20rpx;
    color: #262626;
  }

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .gray {
    filter: grayscale(100%);
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    max-width: 180rpx;
    margin-bottom: 16rpx;
    font-size: 30rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .extra {
    display: flex;
    font-size: 20rpx;
  }

  .tips {
    font-size: 22rpx;
  }

  .update {
    padding: 3rpx 10rpx 1rpx;
    color: rgba(255, 255, 255, 0.8);
    border: 1rpx solid rgba(255, 255, 255, 0.8);
    margin-right: 10rpx;
    border-radius: 30rpx;
  }
}

/* 我的订单 */
.orders {
  padding: 30rpx;
  margin: 30rpx 20rpx 0rpx 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  .title {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #262626;
    .navigator {
      font-size: 24rpx;
     color: #262626;
      float: right;
    }
  }
}
.balance{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0rpx 20rpx 20rpx 20rpx;
  font-size: 28rpx;
  color: #262626;
  .balanceItem{
    margin-top: 30rpx;
    border-radius: 10rpx;
    width: 345rpx;
    height: 130rpx;
    background-color: #fff;
    padding: 20rpx 20rpx 20rpx 20rpx;
    .balanceTitle{

    }
    .balanceMoney{
      color: #ffaa00;
      font-weight: bold;
    }
  }
}

.computePower{
  margin-left: 20rpx;
  .computePowerText{
    font-size: 24rpx;
    color: #262626;
  }
}

</style>
