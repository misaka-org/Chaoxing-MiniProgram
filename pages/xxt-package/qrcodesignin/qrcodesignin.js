import config from '../../../api/config';
import util from '../../../api/util';
import API from '../../../api/api';
import log from '../../../api/log';

Page({
	data: {
		results: [], // 签到结果
		location: { // 签到位置
			latitude: config.location.latitude,
			longitude: config.location.longitude,
			name: config.location.name,
		},
	},

	onLoad(options) {
		if (options.from == 'capture')
			wx.redirectTo({
				url: '/pages/tabbar-package/login/login',
			})

		const accounts = util.getStorage('accounts', []);
		if (accounts.length == 0) {
			util.showInfo('请先绑定账号!');
			wx.redirectTo({
				url: '/pages/user-package/bind/bind',
			})
			return;
		}

		wx.getLocation({
			'type': 'gcj02',
		})
			.then(gcj02 => {
				log.info("获取用户位置", gcj02)

				API.allToBaidu(gcj02.longitude, gcj02.latitude)
					.then(bd09ll => this.setData({
						'location.longitude': bd09ll.x,
						'location.latitude': bd09ll.y,
					}))

				API.getAddressText(gcj02.longitude, gcj02.latitude)
					.then(res => {
						this.setData({
							'location.name': res.address,
						})
					})

				this.setData({
					'showSetting': false,
				})
			})
			.catch(e => {
				util.showInfo("用户拒绝定位")
				console.log("用户拒绝定位", e)
				this.setData({
					'showSetting': true,
				})
			})
	},

	chooseLocation() { // 手动选择位置
		wx.chooseLocation() // 国测局坐标系 gcj02
			.then(gcj02 => {
				log.info("用户选择位置", gcj02)

				API.allToBaidu(gcj02.longitude, gcj02.latitude)
					.then(bd09ll => this.setData({
						'location.latitude': bd09ll.y,
						'location.longitude': bd09ll.x,
						'location.name': gcj02.name ? gcj02.name : gcj02.address,
					}))
			})
			.catch(e => {
				util.showInfo("取消位置选择")
				console.log("取消位置选择", e)
			})
	},

	scan() { // 扫码签到
		const accounts = util.getStorage('accounts', []);
		wx.scanCode()
			.then(qrcode => {
				log.info("扫码结果", qrcode)
				let params = {};
				qrcode.result.split('?')[1].split('&').forEach(param => {
					const parts = param.split('=');
					const key = decodeURIComponent(parts[0]);
					const value = decodeURIComponent(parts[1]);
					params[key] = value;
				});
				const enc = params.enc;
				const activeId = params.id;

				accounts.forEach(async account => {
					const api = new API(account.username, account.password);
					const html = await api.beforeSign(activeId, null, null);
					const longitude = Number(this.data.location.longitude);
					const latitude = Number(this.data.location.latitude);
					const addressText = this.data.location.name;
					const res = await api.defaultSign(activeId, null, longitude, latitude, addressText, null, null, enc, account.nickname);
					this.setData({
						results: this.data.results.concat([{
							...account,
							'result': API.getResult(res),
						}]),
					})
					util.showInfo(`${account.nickname}\n${res}`);

					let history = util.getStorage('history', []);
					history = [...history, {
						'username': account.username,
						'paasword': account.password,
						'activeId': activeId,
					}];
					util.setStorage('history', history);
				})
			})
			.catch(e => {
				util.showInfo("扫码失败")
			})
	},

	input(e) { // 输入内容
		this.setData({
			[`${e.currentTarget.dataset.input}`]: e.detail.value,
		})
	},

	toBind() { // 跳转账号绑定
		wx.redirectTo({
			url: '/pages/user-package/bind/bind',
		})
	},
})