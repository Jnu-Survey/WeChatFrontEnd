<template>
	<view class="container">
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			getUserInfo(e) {
				// let token = wx.getStorageSync('token') || '';
				// if(!token) {
				// 	console.log("该用户没有token！");
				// }
				// else {
				// 	console.log("token存在！")
				// }
				// if (e.detail.errMsg !== "getUserInfo:ok") uni.message("获取用户信息失败！");
				wx.checkSession({
					success() {
						//session_key 未过期，并且在本生命周期一直有效
						console.log("session_key 未过期，并且在本生命周期一直有效!");
					},
					fail() {
						// session_key 已经失效，需要重新执行登录流程
						console.log("session_key 已经失效，需要重新执行登录流程");
						//重新登录
						wx.login({
							success(res) {
								if (res.code) {
									console.log("获取用户凭证成功！");
									console.log(res.code);
									console.log(e.detail);
									//发起网络请求
									wx.request({
										url: 'https://example.com/onLogin',    //服务器请求地址
										data: {
											code: res.code,   //用户登录凭证
											encryptedData: e.detail.encryptedData,   //完整用户信息密文
											iv: e.detail.iv,   //加密算法的初始向量 
											rawDate: e.detail.rawData,   //用户信息原始数据
											signature: e.detail.signature, //使用sha1得到的字符串
											userInfo: e.detail.userInfo //用户昵称地址等用户信息
										},
									
										success(res) {
											console.log("请求服务器成功！")
											// console.log("获取后端返回token" + res.token);
											// wx.setStorageSync('token', res.token); //将token保存在本地缓存
										}
									})
									// wx.setStorageSync('token', "dosifhiowelhjrweiuj"); //将token保存在本地缓存
								} else {
									console.log('获取用户凭证失败！' + res.errMsg)
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
