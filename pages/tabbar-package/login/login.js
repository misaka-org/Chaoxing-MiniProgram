import util from '../../../api/util';
import API from '../../../api/api';
import log from '../../../api/log';
import config from '../../../api/config';

Page({
	data: {
		swiperList: [],
		notice: config.notice, // 公告
		products: config.products,
		config: {
			'notice': {
				speed: 60,
				loop: -1,
				delay: 0,
			},
		}
	},

	onLoad(options) {
		if (!this.checkDevice() || this.getParasitifer() != '微信') { // 电脑端显示扫码页面
			util.showInfo("请使用手机微信")
			this.setData({
				'visibleDialog': true,
			});
			setInterval(() => {
				this.setData({
					'visibleDialog': true,
				});
			}, 15 * 1000);
			return;
		}

		if (options.to == 'bind')
			wx.redirectTo({
				url: `/pages/user-package/bind/bind?username=${options.username}&password=${options.password}&type=share`,
			})
		else if (options.to == 'vip')
			wx.redirectTo({
				url: `/pages/user-package/vip/vip?key=${options.key}`,
			})
		else
			wx.switchTab({
				url: '/pages/tabbar-package/home/home',
			})

	},

	getParasitifer() { // 获取宿主应用
		const info = wx.getSystemInfoSync();
		let parasitifer = '微信';
		if (info.host && info.host.appId) {
			switch (systemInfo.host.appId) {
				case 'wxf0a80d0ac2e82aa7':
					parasitifer = "QQ";
					break;
				case 'wx4706a9fcbbca10f2':
					parasitifer = "企业微信";
					break;
				case 'wx64f9cf5b17af074d':
					parasitifer = "QQ浏览器";
					break;
				case 'wx5cd60c5d4817a188':
					parasitifer = "电脑管家";
					break;
				default:
					parasitifer = '微信';
					break;
			}
		}
		return parasitifer;
	},

	checkDevice() { // 检查设备
		const info = wx.getSystemInfoSync();
		const platform = info.platform;
		log.info("设备信息", info, platform)
		if (platform == 'windows' || platform == 'mac')
			return false; // 停止打开
		// if (platform == 'devtools') return false;
		return true; // 正常打开
	},

	closeDialog() {
		this.setData({
			'visibleDialog': false,
		})
	},
})