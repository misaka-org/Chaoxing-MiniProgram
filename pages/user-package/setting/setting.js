import util from '../../../api/util';
import API from '../../../api/api';
import log from '../../../api/log';
import config from '../../../api/config';

Page({
	data: {
		userInfo: {},
		disableButton: true,

		protocol: "",
		host: "",
	},

	onLoad(options) { },

	onShow() {
		const accounts = util.getStorage('accounts', []);
		const activeIndex = util.getStorage('activeIndex', 0);
		this.setData({
			'userInfo': accounts[activeIndex],
			'accountNum': util.getStorage('accounts', []).length,
		})
	},

	info() {
		util.showInfo("请在学习通APP修改")
	},
})