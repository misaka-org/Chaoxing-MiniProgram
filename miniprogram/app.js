import config from '@utils/config';
import util from '@utils/util';
import log from '@utils/log';

App({
	onLaunch(options) {
		log.info("App 启动参数", options)

		this.autoUpdate();
		this.setCaptureListener();
	},

	autoUpdate() { // 更新小程序
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager();
			updateManager.onCheckForUpdate(res => {
				if (res.hasUpdate) {
					wx.showModal({
						title: '更新提示',
						content: '检测到新版本，是否下载新版本并重启小程序？',
						showCancel: false, // 隐藏取消按钮
						confirmText: "确定更新", // 只保留确定更新按钮
						complete: () => {
							wx.showLoading();
							updateManager.onUpdateReady(function () {
								wx.hideLoading()
								updateManager.applyUpdate()
							})
							updateManager.onUpdateFailed(function () {
								wx.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您重新打开当前小程序哟~',
								})
							})
						}
					})
				}
			})
		}
		else {
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
	},

	setCaptureListener() { // 监听截屏事件
		wx.onUserCaptureScreen(() => {
			return {
				'query': "from=capture",
				'promise': new Promise(resolve => {
					const pages = getCurrentPages();
					const currentPage = pages[pages.length - 1]; // 当前页面
					const query = Object.entries({
						...currentPage.options,
						'from': 'capture',
					})
						.map(([key, value]) => `${key}=${value}`)
						.join('&');
					log.info("用户截屏", {
						"route": currentPage.route,
						'query': query,
					})
					util.showInfo("您已截屏\n请注意隐私安全")
					resolve({
						'query': query,
					})
				})
			}
		})
		wx.onScreenRecordingStateChanged(res => {
			if (res.state == 'start')
				util.showInfo("您正在录屏\n请注意隐私安全")
			if (res.state == 'stop')
				util.showInfo("您已录屏\n请注意隐私安全")
		})
	},
})