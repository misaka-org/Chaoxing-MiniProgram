import util from 'util';
import log from 'log';

/**
 * HTTP请求
 * @param {*} method 
 * @param {*} url 
 * @param {*} data 
 * @param {*} cookies 
 * @param {*} timeout 
 * @param {*} showLoading 
 */
const request = (method, url, data, cookies, timeout, showLoading) => {
	if (showLoading)
		util.showLoading("请稍候")
	return new Promise((resolve, reject) => {
		wx.request({
			method: method,
			url: url,
			data: data,
			timeout: timeout,
			header: {
				'cookie': stringifyCookie(cookies),
			},
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				util.hideLoading();
			},
		})
	})
}

/**
 * GET请求
 * @param {string} url 
 * @param {object} data 
 * @param {object} cookies
 */
const get = (url, data = {}, cookies = {}, timeout = 15 * 1000, showLoading = true) => {
	return new Promise((resolve, reject) => {
		request("GET", url, data, cookies, timeout, showLoading)
			.then(res => {
				if (res.statusCode != 200) throw `HTTP ERROR ${res.statusCode}`;
				resolve(Object.assign(res.data, {
					'cookies': parseCookie(res.cookies)
				}));
			})
			.catch(e => reject(e))
	})
}


/**
 * GET请求Text
 * @param {string} url 
 * @param {object} data 
 * @param {object} cookies
 */
const getText = (url, data = {}, cookies = {}, timeout = 15 * 1000, showLoading = true) => {
	return new Promise((resolve, reject) => {
		request("GET", url, data, cookies, timeout, showLoading)
			.then(res => {
				if (res.statusCode != 200) throw `HTTP ERROR ${res.statusCode}`;
				resolve(res.data);
			})
			.catch(e => reject(e))
	})
}

/**
 * POST请求
 * @param {string} url 
 * @param {object} data 
 * @param {object} cookies
 */
const post = (url, data = {}, cookies = {}, timeout = 15000, showLoading = true) => {
	return new Promise((resolve, reject) => {
		request("POST", url, data, cookies, timeout, showLoading)
			.then(res => {
				if (res.statusCode != 200) throw `HTTP ERROR ${res.statusCode}`;
				resolve(Object.assign(res.data, {
					'cookies': parseCookie(res.cookies)
				}));
			})
			.catch(e => reject(e))
	})
}

// ------ 依赖函数 ------

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


module.exports = {
	get,
	post,
	getText,
}