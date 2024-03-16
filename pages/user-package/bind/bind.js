import util from '../../../api/util';
import API from '../../../api/api';
import log from '../../../api/log';
import config from '../../../api/config';


Page({
	data: {
		account: [],
		activeIndex: 0,

		usernameValue: '',
		passwordValue: '',

		agreePrivacy: false,

		menuTemp: { // 菜单临时数据
			index: -1,
			status: null, // 账号状态
		},
	},

	input(e) { // 输入绑定
		const key = e.currentTarget.dataset.key;
		this.setData({
			[`${key}Value`]: e.detail.value,
		})
	},

	login(e) { // 添加账号
		const username = this.data.usernameValue;
		const password = this.data.passwordValue;
		const that = this;
		if (!this.data.agreePrivacy) {
			this.setData({
				'visiblePopupPrivacy': true,
			})
			return;
		}
		log.info("登录", username, password)
		if (username == "") {
			util.showInfo("帐号不能为空!")
			return;
		}
		if (password == "") {
			util.showInfo("密码不能为空!")
			return;
		}
		if (this.data.account.some(item => item.username == username)) {
			util.showInfo("账号不能重复!")
			return;
		}

		const api = new API(username, password);
		api.login()
			.then(res => {
				util.showInfo(res.mes);
				if (res.status) {
					api.getUserInfo()
						.then(userinfo => {
							util.showInfo("登录成功")
							const account = that.data.account.concat([{
								'username': username,
								'password': password,
								'uid': res.cookies.UID,
								'nickname': userinfo.name,
								'school': userinfo.school,
								'sex': userinfo.sex,
							}]);
							that.setData({
								'account': account,
								'usernameValue': '',
								'passwordValue': '',
								'activeIndex': account.length - 1,
							})
							util.setStorage('accounts', account);
							util.setStorage('activeIndex', account.length - 1);
						})
						.catch(e => {
							util.showInfo("网络不稳定 请稍后再试");
						})
				}
			})
			.catch(e => {
				util.showInfo("网络不稳定 请稍后再试");
			})
	},

	agreePrivacy(e) { // 同意用户协议
		this.setData({
			'agreePrivacy': !this.data.agreePrivacy,
			'visiblePopupPrivacy': false,
		})
	},

	openPrivacyContract(e) { // 跳转 用户服务协议/隐私政策
		const type = e.currentTarget.dataset.type;
		switch (type) {
			case "fuwu": {
				wx.redirectTo({
					url: '/pages/about-package/protocol/protocol',
				})
				return;
			}
			case "yinsi": {
				wx.openPrivacyContract();
				return;
			}
		}
	},

	changeAccount(e) { // 切换当前账号
		console.log(this.data)
		const index = e.currentTarget.dataset.index;
		if (index >= 2) {
			util.showInfo("暂时无法切换")
			return;
		}
		const accounts = this.data.account;
		const api = new API(accounts[index].username, accounts[index].password);
		api.login()
			.then(res => {
				util.showInfo(res.mes);
				if (res.status) {
					util.showInfo("登录成功")
					this.setData({
						'activeIndex': index,
					});
					util.setStorage('activeIndex', index);
				}
			})
			.catch(e => {
				util.showInfo("网络不稳定 请稍后再试");
			})
	},

	showPassword(e) { // 显示密码
		this.setData({
			'showPassword': !Boolean(this.data.showPassword),
		}, () => {
			setTimeout(() => {
				this.setData({
					'showPassword': false,
				})
			}, 3 * 1000);
		})
	},

	menu(e) { // 查看菜单
		console.log("菜单", e)
		const index = e.currentTarget.dataset.index;
		if (index != this.data.menuTemp.index) {
			const accounts = this.data.account;
			const api = new API(accounts[index].username, accounts[index].password);
			api.login()
				.then(res => {
					this.setData({
						'menuTemp.status': res.status,
					})
				})
				.catch(e => {
					util.showInfo("网络不稳定 请稍后再试");
				})
		}
		this.setData({
			'visiblePopupMenu': true,
			'menuTemp.index': index,
			'showPassword': false,
		})
	},

	copyPassword(e) { // 复制密码
		const index = e.currentTarget.dataset.index;
		wx.showModal({
			title: '请勿将学习通密码发送给他人',
			content: `密码：${this.data.account[index].password}`,
			confirmText: '复制密码',
			cancelText: '取消复制',
		})
			.then(res => {
				if (res.confirm) {
					wx.setClipboardData({
						data: this.data.account[index].password,
					})
				}
			})
	},

	logout(e) { // 退出登录
		const index = e.currentTarget.dataset.index;
		const activeIndex = this.data.activeIndex;
		const account = this.data.account;
		wx.showModal({
			title: '确认退出登录吗?',
			content: `即将退出账号${account[index].nickname}`,
		})
			.then(res => {
				if (!res.confirm)
					return;
				if (account.length == 1) { // 只有一个账号
					this.setData({
						'account': [],
						'visiblePopupMenu': false,
					})
					util.setStorage('accounts', []);
					return;
				}
				if (index <= activeIndex) { // 删除前面的账号
					account.splice(index, 1);
					this.setData({
						'account': account,
						'activeIndex': Math.max(activeIndex - 1, 0),
						'visiblePopupMenu': false,
					})
					util.setStorage('activeIndex', Math.max(activeIndex - 1, 0));
					util.setStorage('accounts', account);
					return;
				}
				if (index > activeIndex) { // 删除后面的账号
					account.splice(index, 1);
					this.setData({
						'account': account,
						'visiblePopupMenu': false,
					})
					util.setStorage('accounts', account);
					return;
				}
			})
	},

	onLoad(options) {
		this.setData({
			'type': options.type != undefined ? options.type : '',
			'usernameValue': options.username != undefined ? options.username : '',
			'passwordValue': options.password != undefined ? options.password : '',
		});
	},

	onShow() {
		this.setData({
			'account': util.getStorage('accounts', []),
			'activeIndex': util.getStorage('activeIndex', 0),
		}, () => {
			this.setData({
				'activeIndex': Math.min(1, this.data.activeIndex),
			})
			util.setStorage('activeIndex', Math.min(1, this.data.activeIndex))
		});
		console.log("账号列表", this.data.account)
	},

	closePopup(e) {
		this.setData({
			[`visiblePopup${e.currentTarget.dataset.key}`]: false,
		})
	},

	onShareAppMessage() {
		const index = this.data.menuTemp.index >= 0 ? this.data.menuTemp.index : this.data.activeIndex;
		const username = this.data.account[index].username;
		const password = this.data.account[index].password;
		const uid = util.getStorage('uid', null);
		if (password.includes('=') || password.includes('&')) {
			util.showInfo("密码中含有不支持的符号!")
			throw "密码中含有不支持的符号";
		}
		if (password == '' || username == '') {
			util.showInfo("手机号或密码为空!")
			throw "手机号或密码为空";
		}
		return {
			title: '快速添加我的账号',
			imageUrl: '',
			path: `/pages/tabbar-package/login/login?to=bind&username=${username}&password=${password}&inviter=${uid}&type=share`,
		}
	},

	log() {
		console.log("数据", this.data)
	},
})