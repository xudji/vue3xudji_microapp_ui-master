<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import routingIntercept from '@/utils/permission.ts'


onLaunch(() => {
  console.log('App Launch')
   routingIntercept()

})
onShow(() => {
  console.log('App Show')
 uni.hideTabBar();

})
onHide(() => {
  console.log('App Hide')
})

// 所有路由跳转前拦截
// const methodToPatch = ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack']
// methodToPatch.map(item => {
//     const original = uni[item] //
//     uni[item] = function(opt = {}, needAuth) {
//          if (needAuth) { // 需要登录且未登录
//            console.log(111)
//            uni.showModal({
//            title: '登录提示',
//            content: '你还未登录，登录后畅享平台功能',
//            cancelText: "取消", // 取消按钮的文字
//            confirmText: "登录", // 确认按钮的文字
//            showCancel: true, // 是否显示取消按钮，默认为 true
//            success: (res) => {
//            if(res.confirm) {
//            console.log('comfirm') //点击确定之后执行的代码
//            uni.navigateTo({
//              url:'/pages/login/login'
//            })
//            } else {
//            console.log('cancel') //点击取消之后执行的代码
//            }
//            }
//            })
//          } else {
//              return original.call(this, opt)
//          }
//     }
// })



</script>

<style lang="scss">
// 字体图标
@import '@/styles/fonts.scss';
@import '@/styles/base.scss';
</style>
