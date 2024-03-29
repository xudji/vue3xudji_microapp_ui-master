// 白名单
const whiteList = [
 'pages/index/index',
 'pages/login/login'
]
function hasPermission (url:string) {
	let islogin = uni.getStorageSync('isLogin');//isLogin是登录成功后在本地存储登录标识，存储一个能够判断用户登录的唯一标识就行
	islogin = Boolean(Number(islogin));//返回布尔值
    // 在白名单中或有登录判断条件可以直接跳转
    if(whiteList.indexOf(url) !== -1 || islogin) {
		console.log('通过')
        return true
    }
    return false
}

export default async function () {
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  // 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
  list.forEach(item => {
    uni.addInterceptor(item, {
        invoke (e) {
              if(!hasPermission(e.url)){
                console.log('没登陆')
                 // 测试,先注释
                 // uni.showModal({
                 //   title: '请登录',
                 //   content: '',
                 //   confirmText: '确认',
                 //   cancelText: '取消',
                 //   success: (res) => {
                 //     if (res.confirm) {
                 //       console.log(1111111)
                 //       uni.navigateTo({
                 //         url: 'pages/login/login'
                 //       })
                 //     }
                 //   }
                 // });
                 // return false
              } else {

                 return true
              }

          },
      fail(err) { // 失败回调拦截
        console.log(err)
      }
    })
  })
}
