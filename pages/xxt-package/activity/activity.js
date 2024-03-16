import util from '../../../api/util';
import API from '../../../api/api';
import LZString from '../../../api/lz-string.min';

Page({
	data: {
		activities: [],
	},

	onLoad(options) {
		if (options.from == 'capture')
			wx.redirectTo({
				url: '/pages/tabbar-package/login/login',
			})
		const username = options.username;
		const password = options.password;
		const classId = options.classId;
		const courseId = options.courseId;
		const api = new API(username, password);
		api.getActivity(courseId, classId)
			.then(activities => {
				this.setData({
					'activities': activities,
					'username': username,
					'password': password,
					'options': options,
				})
			})
			.finally(() => {
				wx.setNavigationBarTitle({
					title: `活动列表 - ${options.courseName}`,
				})
				util.showInfo("获取活动成功");
			})
	},

	navigate(e) {
		const username = this.data.username;
		const password = this.data.password;
		const index = e.currentTarget.dataset.index;
		const allData = JSON.stringify(Object.assign(
			this.data.activities[index], {
			'username': username,
			'password': password,
			'nickname': this.data.options.nickname,
			'uid': this.data.options.uid,
		}));
		console.log("活动数据", allData);
		const compress = LZString.compressToBase64(allData)
		wx.navigateTo({
			url: `/pages/xxt-package/signin/signin?data=${compress}`,
		})
	},

	onPullDownRefresh() {
		wx.showModal({
			title: '确认重新获取课程吗?',
			content: '获取次数过多可能造成风控',
		})
			.then(res => {
				if (res.confirm) {
					this.onLoad(this.data.options);
				}
			})
	},
})