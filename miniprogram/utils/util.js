
/**
 * 写入缓存
 * @param {string} key 
 * @param {object} value 
 */
const setStorage = (key, value) => {
	wx.setStorageSync(key, value)
}

/**
 * 读取缓存
 * @param {string} key 
 * @param {*} defaultValue
 */
const getStorage = (key, defaultValue = null) => {
	const value = wx.getStorageSync(key);
	if (value === '')
		return defaultValue;
	return value;
}

const showLoading = (msg) => {
	wx.showLoading({
		title: msg,
		mask: true,
	})
}

const hideLoading = () => {
	wx.hideLoading({
		noConflict: true,
	});
}

const showInfo = (msg, icon = "none", mask = false) => {
	wx.showToast({
		title: msg,
		mask: mask,
		icon: icon,
	})
}

module.exports = {
	setStorage,
	getStorage,
	info: wx.getAccountInfoSync(),
	device: wx.getDeviceInfo(),
	showLoading,
	hideLoading,
	showInfo,
}