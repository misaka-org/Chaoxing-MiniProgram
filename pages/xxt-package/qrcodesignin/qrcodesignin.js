import util from '../../../api/util';
import API from '../../../api/api';
import log from '../../../api/log';
import config from '../../../api/config';


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

		wx.getLocation()
			.then(res => {
				this.setData({
					'location': Object.assign(this.data.location, res),
					'showSetting': false,
				})
			})
			.catch(e => {
				util.showInfo("用户拒绝定位")
				this.setData({
					'showSetting': true,
				})
			})
	},

	chooseLocation() { // 手动选择位置
		wx.chooseLocation()
			.then(res => {
				log.info("用户选择位置", res)
				this.setData({
					'location': res,
				})
			})
			.catch(e => {
				util.showInfo("取消位置选择")
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
					const longitude = Number(this.data.location.longitude) + 0.0065; // 家人们谁懂啊, 学习通定位有偏差
					const latitude = Number(this.data.location.latitude) + 0.0060;
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