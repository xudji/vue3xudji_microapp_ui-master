<template>
  <view class="viewport">
    <view class="big_out">
    		<!-- 左上角返回按钮 -->
    		<!-- 这里为什么要加4px，是因为这个左箭头<的高度为16rpx需要下降一半，就是8rpx=4px,可以自己试一下，我这里没有问题 -->
    		<view class="back"  :style="'margin-top:'+ (titletop+4)+'px'"  @click="back_page">
    			<view class="back_img">
    			</view>
    			<view class="back_text">

    			</view>
    		</view>
    	</view>

    <view class="logo">
      <image class="image" src="../../static/images/order_bg.png" mode="heightFix"></image>
    </view>
    <view class="login">
      <!-- 网页端表单登录 -->
      <!-- #ifdef H5 -->
      <input v-model="form.account" class="input" type="text" placeholder="请输入用户名/手机号码" />
      <input v-model="form.password" class="input" type="text" password placeholder="请输入密码" />
      <button @tap="onSubmit" class="button phone">登录</button>
      <!-- #endif -->

      <!-- 小程序端授权登录 -->
      <!-- #ifdef MP-WEIXIN -->
      <view class="button-privacy-wrap">
        <button :hidden="isAgreePrivacy" class="button-opacity button phone" @tap="checkedAgreePrivacy">
          请先阅读并勾选协议
        </button>
        <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
          手机号快捷登录
        </button>
      </view>
      <!-- #endif -->

      <view class="tips" :class="{ animate__shakeY: isAgreePrivacyShakeY }">
        <label class="label" @tap="isAgreePrivacy = !isAgreePrivacy">
          <radio class="radio" color="#28bb9c" :checked="isAgreePrivacy" />
          <text>我已阅读并同意<text class="link"> 用户协议 </text>及<text class="link"
              @tap="onOpenPrivacyContract"> 隐私政策</text>, 手机号未注册将自动创建账号</text>
        </label>
      </view>

      <view class="extra">
        <view class="options">
          <!-- 通用模拟登录 -->
          <button @tap="onGetphonenumberSimple">
            <text class="icon">模拟快捷登录</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>


<script setup lang="ts">
  import { postLoginAPI, postLoginWxMinAPI, postLoginWxMinSimpleAPI } from '@/services/login'
  import { useMemberStore } from '@/stores'
  import type { LoginResult } from '@/types/member'
  import { onLoad,onShow } from '@dcloudio/uni-app'
  import { ref } from 'vue'

  // #ifdef MP-WEIXIN
  // 获取 code 登录凭证
  let code = ''
  onLoad(async () => {
    const res = await wx.login()
    code = res.code
  })

  // 获取用户手机号码
  const onGetphonenumber : UniHelper.ButtonOnGetphonenumber = async (ev) => {
    await checkedAgreePrivacy()
    const { encryptedData, iv } = ev.detail
    const res = await postLoginWxMinAPI({ code, encryptedData, iv })
    loginSuccess(res.result)
  }
  // #endif

  // 模拟手机号码快捷登录（开发练习）
  const onGetphonenumberSimple = async () => {
    await checkedAgreePrivacy()
    const res = await postLoginWxMinSimpleAPI('13123456789')
    loginSuccess(res.result)
  }

  const loginSuccess = (profile : LoginResult) => {
    // 保存会员信息
    const memberStore = useMemberStore()
    memberStore.setProfile(profile)
    // 成功提示
    uni.showToast({ icon: 'success', title: '登录成功' })
    setTimeout(() => {
      // 页面跳转
      // uni.switchTab({ url: '/pages/my/my' })
      uni.navigateBack()
    }, 500)
  }

  // #ifdef H5
  // 传统表单登录，测试账号：13123456789 密码：123456，测试账号仅开发学习使用。
  const form = ref({
    account: '13123456789',
    password: '',
  })

  // 表单提交
  const onSubmit = async () => {
    await checkedAgreePrivacy()
    const res = await postLoginAPI(form.value)
    loginSuccess(res.result)
  }
  // #endif

  // 请先阅读并勾选协议
  const isAgreePrivacy = ref(false)
  const isAgreePrivacyShakeY = ref(false)
  const checkedAgreePrivacy = async () => {
    if (!isAgreePrivacy.value) {
      uni.showToast({
        icon: 'none',
        title: '请先阅读并勾选协议',
      })
      // 震动提示
      isAgreePrivacyShakeY.value = true
      setTimeout(() => {
        isAgreePrivacyShakeY.value = false
      }, 500)
      // 返回错误
      return Promise.reject(new Error('请先阅读并勾选协议'))
    }
  }

  const onOpenPrivacyContract = () => {
    // #ifdef MP-WEIXIN
    // 跳转至隐私协议页面
    wx.openPrivacyContract({})
    // #endif
  }


  // 返回自定义

  let  titleheight = ref<number>(0)
  let  titletop =ref<number>(0)
 function  getHeight() {
  				let res = uni.getMenuButtonBoundingClientRect();
  				titletop.value = res.top;
  				titleheight.value = res.height
  			}

  			//直接返回上一级
  	function back_page() {
  				uni.navigateBack({
  					delta: 1 // 返回的页面数
  				})
  			}

onShow(()=>{
		console.log(11)
      getHeight();
	})

</script>

<style lang="scss" scoped>
  // 返回
  .big_out {
  		position: fixed;
  	    z-index: 999;
  		/* background-color: red; */
  	}

  	.back {
  		position: absolute;
  		height: 50rpx;
  		width: 120rpx;
  	}

  	.back_img {
  		/* 用border值来控制箭头粗细 */
  		border: 3px solid black;
  		/* 上、右、下、左  四个边框的宽度 */
  		border-width: 0px 2px 2px 0px;
  		display: inline-block;
  		/* padding值控制箭头大小 */
  		padding: 5px;
  		transform: rotate(135deg);
  		-webkit-transform: rotate(135deg);
  		margin-left: 30rpx;
  	}

  	.back_text {
  		float: right;
  	}




  page {
    height: 100%;
    overflow: hidden;
  }

  .viewport {
    height: 100%;
  }

  .logo {
    .image {
      height: 500rpx;
    }
  }
  .login {
    padding: 40rpx 20rpx 20rpx;
    margin-top: 260rpx;
    .input {
      width: 100%;
      height: 80rpx;
      font-size: 28rpx;
      border-radius: 72rpx;
      border: 1px solid #ddd;
      padding-left: 30rpx;
      margin-bottom: 20rpx;
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
      height: 90rpx;
      font-size: 28rpx;
      border-radius: 72rpx;
      color: #fff;
      .icon {
        font-size: 40rpx;
        margin-right: 6rpx;
      }
    }
    .phone {
      background-color: #28bb9c;
    }
    .wechat {
      background-color: #06c05f;
    }
    .extra {
      .options {

        button {
          padding: 0;
          background-color: transparent;

          &::after {
            border: none;
          }
        }
      }

      .icon {
        font-size: 24rpx;
        color: #444;
      }

      .icon-weixin::before {
        border-color: #06c05f;
        color: #06c05f;
      }
    }
  }

  // @keyframes animate__shakeY {
  //   0% {
  //     transform: translate(0, 0);
  //   }

  //   50% {
  //     transform: translate(0, -5rpx);
  //   }

  //   100% {
  //     transform: translate(0, 0);
  //   }
  // }

  // .animate__shakeY {
  //   animation: animate__shakeY 0.2s ease-in-out 3;
  // }

  .button-privacy-wrap {
    .button-opacity {
      opacity: 0;
      position: absolute;
      z-index: 1;
    }
  }
  .tips {
    margin-top: 60rpx;
    font-size: 24rpx;
    color: #444;
    padding-right: 30rpx;
    padding-left: 30rpx;
    .label{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .radio {
        transform: scale(0.6);
        margin-top: -6rpx;
      }

      .link {
        display: inline;
        color: #43BCF7;
      }
    }

  }
</style>
