// app.js
App({
	onLaunch() {
		this.autoUpdate();
		this.setCapture();
	},

	autoUpdate() { // 更新小程序
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager();
			updateManager.onCheckForUpdate(res => {
				if (res.hasUpdate) {
					wx.showModal({
						title: '更新提示',
						content: '检测到新版本，是否下载新版本并重启小程序？',
						showCancel: false,//隐藏取消按钮
						confirmText: "确定更新",//只保留确定更新按钮
						complete: () => {
							wx.showLoading();
							updateManager.onUpdateReady(function () {
								wx.hideLoading()
								updateManager.applyUpdate()
							})
							updateManager.onUpdateFailed(function () {
								wx.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
								})
							})
						}
					})
				}
			})
		} else {
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
	},

	setCapture() { // 设置截屏事件
		wx.onUserCaptureScreen(res => {
			console.log('用户截屏了')
			return {
				query: "from=capture",
			}
		}
		)
	},
})