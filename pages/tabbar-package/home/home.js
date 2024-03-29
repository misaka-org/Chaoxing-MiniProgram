import config from '../../../api/config';
import util from '../../../api/util';
import API from '../../../api/api';
import log from '../../../api/log';

Page({
	data: {
		swiperList: config.swiperList.map(item => `${config.cdn}${item}`),
		notice: config.notice, // 公告
		products: config.products.filter(item => item.appid != util.info.miniProgram.appId),
		config: {
			'notice': {
				speed: 60,
				loop: -1,
				delay: 0,
			},
		}
	},

	onLoad(options) {
		if (options.from == 'capture')
			wx.redirectTo({
				url: '/pages/tabbar-package/login/login',
			})
		this.setData({
			'history': util.getStorage('history', []),
		})
	},

	changeTabbar(e) { // 切换tabbar页面
		wx.switchTab({
			url: `/pages/tabbar-package/${e.detail.value}/${e.detail.value}`,
		})
	},

	navigate(e) { // 进入其他页面
		wx.navigateTo({
			url: e.currentTarget.dataset.url,
		})
	},

	
	onShareAppMessage() { // 邀请用户
		const uid = util.getStorage('uid', null);
		log.info("邀请者", uid);
		return {
			title: `邀您一起快捷学习通签到，远离缺勤 ~`,
			imageUrl: '/static/image/share.png',
			path: `/pages/tabbar-package/login/login?inviter=${uid}`,
		}
	},

	toMiniProgram(e) { // 跳转其他小程序
		console.log("跳转其他小程序", e)
		wx.openEmbeddedMiniProgram({
			'appId': e.currentTarget.dataset.appid,
			'extraData': {},
		})
			.catch(e => {
				this.showInfo("用户取消打开小程序")
			})
	},

	showOfficial(e) { // 显示引导公众号
		this.setData({
			'showOfficial': true,
		})
	},

	lookImage(e) { // 查看图片
		wx.previewImage({
			urls: this.data.swiperList,
			current: this.data.swiperList[e.detail.index],
		})
	},

	toQQ() { // 去QQ图片
		wx.navigateTo({
			url: '/pages/about-package/qqchat/qqchat',
		})
	},
})