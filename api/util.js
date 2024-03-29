// 此文件封装 GET / POST 方法
import config from './config';

/**
 * GET请求
 * @param {string} url 
 * @param {object} data 
 * @param {object} cookies
 */
const get = (url, data = {}, cookies = {}, timeout = 15000) => {
	showLoading("请稍候")
	return new Promise((resolve, reject) => {
		wx.request({
			method: "GET",
			url: url,
			data: data,
			timeout: timeout,
			header: {
				'content-type': 'application/json',
				'cookie': stringifyCookie(cookies),
			},
			success(res) {
				resolve(Object.assign(res.data, {
					'cookies': parseCookie(res.cookies)
				}));
			},
			fail(err) {
				reject(err)
			},
			complete() {
				hideLoading();
			},
		})
	})
}


/**
 * POST请求
 * @param {string} url 
 * @param {object} data 
 * @param {object} cookies
 */
const post = (url, data = {}, cookies = {}, timeout = 15000) => {
	showLoading("请稍候")
	return new Promise((resolve, reject) => {
		wx.request({
			method: "POST",
			url: url,
			data: data,
			timeout: timeout,
			header: {
				'content-type': 'application/json',
				'cookie': stringifyCookie(cookies),
			},
			success(res) {
				resolve(Object.assign(res.data, {
					'cookies': parseCookie(res.cookies)
				}));
			},
			fail(err) {
				reject(err)
			},
			complete() {
				hideLoading();
			},
		})
	})
}

/**
 * GET网页请求
 * @param {string} url 
 * @param {object} data 
 * @param {object} cookies
 */
const getText = (url, data = {}, cookies = {}) => {
	showLoading("请稍候")
	return new Promise((resolve, reject) => {
		wx.request({
			method: "GET",
			url: url,
			data: data,
			header: {
				'cookie': stringifyCookie(cookies),
			},
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				reject(err);
			},
			complete() {
				hideLoading();
			},
		})
	})
}

/**
 * 上传文件
 * @param {string} url
 * @param {string} filePath
 * @param {object} formData
 * @param {object} cookies
 */
const uploadFile = (url, filePath, formData = {}, cookies = {}) => {
	return new Promise((resolve, reject) => {
		wx.uploadFile({
			url: url,
			filePath: filePath,
			name: 'file',
			formData: formData,
			header: {
				'cookie': stringifyCookie(cookies),
			},
			success(res) {
				const data = JSON.parse(res.data);
				console.log("上传文件", data);
				resolve(data);
			},
			fail(err) {
				reject(err)
			},
		})
	})
}

/**
 * 延时函数
 * @param {number} seconds 秒
 */
const delay = (seconds) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, seconds * 1000);
	});
}

/**
 * 解析返回的cookies
 * @param {string[]} cookieList wx.request返回的cookies列表
 */
const parseCookie = (cookieList = []) => {
	let cookies = {};
	for (let i = 0; i < cookieList.length; i++) {
		const parts = cookieList[i].split(';');
		const nameValue = parts[0].split('=');
		const name = nameValue[0].trim();
		const value = decodeURIComponent(nameValue[1]);
		cookies[name] = value;
	}
	return cookies;
}

/**
 * 把cookies列表编码成header中的格式
 * @param {string[]} cookieObject 编码cookies
 */
const stringifyCookie = (cookieObject = {}) => {
	return Object.entries(cookieObject).map(
		([name, value]) => `${name}=${encodeURIComponent(value)}`).join(';');
}

let cache = {};

/**
 * 写入缓存
 * @param {string} key 
 * @param {object} value 
 */
const setStorage = (key, value) => {
	Object.assign(cache, {
		[key]: value,
	})
	wx.setStorageSync(key, value)
}

/**
 * 读取缓存
 * @param {string} key 
 * @param {*} defaultValue
 */
const getStorage = (key, defaultValue = null) => {
	if (cache[key] != undefined)
		return cache[key];
	const value = wx.getStorageSync(key);
	if (value === '')
		return defaultValue;
	return value;
}

/**
 * 获取服务器Host
 */
const getHost = () => {
	const host = getStorage("host", config.host)
	return host;
}

/**
 * 修改服务器Host
 */
const setHost = (host = null) => {
	if (host)
		setStorage("host", host);
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

/**
 * 国测局gcj02 转 GPS坐标系
 * @param {*} lng 
 * @param {*} lat 
 */
const Gcj02ToWgs84 = (lng, lat) => {
	lng = Number(lng), lat = Number(lat);
	let PI = 3.1415926535897932384626;
	let a = 6378245.0;
	let ee = 0.00669342162296594323;
	if ((lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false)) {
		return [lng, lat]
	}
	else {
		let dlat = ((lng, lat) => {
			let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
			ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
			ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
			return ret
		})(lng - 105.0, lat - 35.0);
		let dlng = ((lng, lat) => {
			let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
			ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
			ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
			return ret
		})(lng - 105.0, lat - 35.0);
		let radlat = lat / 180.0 * PI;
		let magic = Math.sin(radlat);
		magic = 1 - ee * magic * magic;
		let sqrtmagic = Math.sqrt(magic);
		dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
		dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
		let mglat = lat + dlat;
		let mglng = lng + dlng;
		const res = {
			'latitude': lat * 2 - mglat,
			'longitude': lng * 2 - mglng,
		};
		return res;
	}
}

/**
 * GPS坐标系 转 国测局gcj02
 * @param {*} lng 
 * @param {*} lat 
 */
const Wgs84ToGcj02 = (lng, lat) => {
	lng = Number(lng), lat = Number(lat);
	let PI = 3.1415926535897932384626;
	let a = 6378245.0;
	let ee = 0.00669342162296594323;
	if ((lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false)) {
		return [lng, lat]
	} else {
		let dlat = ((lng, lat) => {
			let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
			ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
			ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
			return ret
		})(lng - 105.0, lat - 35.0);
		let dlng = ((lng, lat) => {
			let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
			ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
			ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
			return ret
		}
		)(lng - 105.0, lat - 35.0);
		let radlat = lat / 180.0 * PI;
		let magic = Math.sin(radlat);
		magic = 1 - ee * magic * magic;
		let sqrtmagic = Math.sqrt(magic);
		dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
		dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
		let mglat = lat + dlat;
		let mglng = lng + dlng;
		const res = {
			'latitude': mglat,
			'longitude': mglng,
		};
		return res;
	}
}

module.exports = {
	get,
	post,
	delay,
	getText,
	uploadFile,
	setStorage,
	getStorage,
	info: wx.getAccountInfoSync(),
	showLoading,
	hideLoading,
	showInfo,
	getHost,
	setHost,
	Gcj02ToWgs84,
	Wgs84ToGcj02,
}