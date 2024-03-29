//拦截器 拦截只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页。
// 页面名单
const whiteList = [
	'/pages/add/index',
	'/pages/auction/index',
	'/pages/tim/record',
	'/pages/mine/index',
]

uni.addInterceptor('switchTab', {
	// tabbar页面跳转前进行拦截
	invoke (e) {
		console.log(11111111111111111111)
	},
	success (e) {
		// console.log(e)
	}
})
