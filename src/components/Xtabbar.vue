<template>
  <view class="tabbar">
    <view class="tabbar-item" v-for="(item, index) in data.tabbarList" :key="index" @click="changeTabbar(item)">
      <img class="icon" :src="index == props.currentPage ? item.selectedIconPath : item.iconPath" />
      <view class="title" :style="index == props.currentPage ? { color: '#6cc2c1' } : ''">{{ item.text }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { reactive, defineProps, onMounted } from 'vue'

  const props = defineProps({
    currentPage: Number,
  })
  const data = reactive({
    tabbarList: [

      {
        "text": "创作中心",
        "pagePath": "/pages/index/index",
        "iconPath": "../static/tabs/home_default.png",
        "selectedIconPath": "../static/tabs/home_selected.png"

      },
      {
        "text": "我的",
        "pagePath": "/pages/myVideo/myVideo",
        "iconPath": "../static/tabs/category_default.png",
        "selectedIconPath": "../static/tabs/category_selected.png"
      },
      {
        "text": "个人中心",
        "pagePath": "/pages/my/my",
        "iconPath": "../static/tabs/user_default.png",
        "selectedIconPath": "../static/tabs/user_selected.png"
      }

    ],
  })

  const changeTabbar = function (item : any) {
    console.log(item.pagePath)
    uni.switchTab({
      url: item.pagePath
    })
    // uni.switchTab({
    //   url: item.pagePath,
    // })
  }

  onMounted(() => {
    uni.hideTabBar();
  })
</script>

<style lang="scss" scoped>
  .tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    box-sizing: border-box;
    padding: 15rpx 0rpx 55rpx 0rpx;
    background-color: #f8f8f8;
    border-top: #cfcfcf 1px solid;
    z-index: 20;

    .tabbar-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 28px;
        height: 28px;
      }

      .title {
        font-size: 10px;
      }
    }
  }
</style>
