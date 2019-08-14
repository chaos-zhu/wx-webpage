<template>
    <div class="index">
		<alert v-model="show" :title="'Tips'">
			此demo用于调试微信JS-SDK功能<br><hr><br>
			主要技术如下：<br><br>
			1、前端：vue-cli2、vue、vue-router、axios、vux.ui等<br><br>
			2、后端：基于node.js的express框架开发的获取微信签名的接口<br><br><hr>
			因订阅号权限问题，获取wx签名采用测试账号提供的appId<br><br>
			<span style="color:red;">
				此微信网页Demo已开启wx.config的debug模式选项<br><br>
				因此测试JS-SDK过程中可能会出现操作提示弹窗<br><br>
				另外98%的功能测试正常不排除有小Bug<br>
			</span>
		</alert>
		<box gap="10px 10px" class="box">
			<x-button :gradients="['#6F1BFE', '#9479DF']" @click.native="$router.push('/getUserInfo')">获取用户信息</x-button>
			<x-button style="margin-top:20px;" :gradients="['#1D62F0', '#19D5FD']" @click.native="$router.push('/chooseImage')">微信图片功能</x-button>
			<x-button :gradients="['#FF2719', '#FF61AD']" @click.native="$router.push('/record')">音频接口功能</x-button>
			<x-button :gradients="['#c46156', '#56b9c4']" @click.native="$router.push('/getLocation')">获取用户位置</x-button>
			<x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="closeWindow">关闭微信网页</x-button>
			<x-button :disabled='false' @click.native="scanQRCode">调用扫一扫(无权限)</x-button>
			<x-button :disabled='true'>已加载自定义分享给朋友/朋友圈</x-button>
		</box>
    </div>
</template>

<script>
import { Loading, Box } from 'vux'
import axios from 'axios'
export default {
		name: 'Home',
		components: {
			Loading,
			Box
		},
		data() {
			return {
				show: false
			}
		},
		mounted() {
			if (!sessionStorage.getItem('show')) {
				this.show = true
				sessionStorage.setItem('show', true)
			}

			this.shareData()

			// 如果存在code则保存到sessionStorage
			try {
				let href = location.href
				let code = href.split('?')[1].split('&')[0].slice(5)
				sessionStorage.setItem('code', code)
			} catch (error) {
				console.log('未授权', error)
			}
			// 判断用户有没有授权过，没有则请求授权
			if(!sessionStorage.getItem('code')){
				this.getUserInfo()
			}
		},
		methods: {
			// 调用扫一扫
			scanQRCode() {
				wx.scanQRCode({
					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function (res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
				})
			},
			// 用户进入即可请求授权，保存请求得到的code
			getUserInfo() {
				let appId = localStorage.getItem('appId')
				let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURI('http://wx.zhulijun.club/')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
				location.href = url
			},
			// 分享（在加载完wx.config后调用一次即可）
			shareData() {
					// 分享给朋友
					wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
						wx.updateAppMessageShareData({ 
								title: 'Hello朋友(自定义的分享标题)', // 分享标题
								desc: '这里是一段对该页面的文案描述', // 分享描述
								link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: 'http://qiniu.zhulijun.club/qiniu/avatar.jpeg', // 分享图标
								success: () => {
									// 设置成功
								}
						})
					})
					// 分享到盆友圈
					wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
						wx.updateTimelineShareData({ 
								title: '分享到朋友圈~(Test)', // 分享标题
								link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: 'http://qiniu.zhulijun.club/qiniu/avatar.jpeg', // 分享图标
								success: () => {
									// 设置成功
								}
						})
					})
			},
			// 关闭微信网页
			closeWindow() {
				wx.closeWindow()
			}
		}
}
</script>

<style lang="less" scoped>
.index{
	.box{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
}
</style>
