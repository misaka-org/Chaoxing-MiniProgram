const util = require('./util.js');
const log = require('./log.js');
const config = require('./config.js');

class API {
	constructor(username = "", password = "") {
		this.cookies = util.getStorage(`cookies-${username}`, {});
		this.updatetime = util.getStorage(`cookies-updatetime-${username}`, 0)
		this.uid = "";
		this.username = username;
		this.password = password;
	}

	/**
	 * 检查登录
	 */
	checkLogin = async () => {
		if (!Object.keys(this.cookies).length) {
			console.log("自动登录 未登录")
			await this.login();
		}
		if (this.updatetime + 6 * 24 * 3600 * 1000 <= new Date().getTime()) {
			console.log("自动登录 登录过期")
			await this.login();
		}
	}

	/**
	 * 登录
	 */
	login = async () => {
		const account = await util.get('https://passport2-api.chaoxing.com/v11/loginregister', {
			"cx_xxt_passport": "json",
			"roleSelect": "true",
			"uname": this.username,
			"code": this.password,
			"loginType": "1",
		})
		Object.assign(this.cookies, account.cookies);
		util.setStorage(`cookies-${this.username}`, this.cookies);
		this.updatetime = new Date().getTime();
		util.setStorage(`cookies-updatetime-${this.username}`, this.updatetime);
		console.log("登录", account, this.updatetime);
		await this.getUID();
		return account;
	}

	/**
	 * 获取UID
	 */
	getUID = async () => {
		await this.checkLogin();
		this.uid = this.cookies.UID != undefined ? this.cookies.UID : this.cookies._uid;
		return this.uid;
	}

	/**
	 * 获取课程
	 */
	getCourse = async () => {
		await this.checkLogin();
		const url = 'https://mooc1-api.chaoxing.com/mycourse/backclazzdata';
		const res = await util.get(url, {
			'view': 'json',
			'rss': '1',
		}, this.cookies)
		Object.assign(this.cookies, res.cookies);
		var data = res.channelList.filter(item => {
			return item.cataName == '课程' && item.content.course != undefined;
		});
		var data = data.map(item => {
			return {
				'课程': item.content.course.data[0].name,
				'班级': item.content.name,
				'教师': item.content.course.data[0].teacherfactor,
				'courseName': item.content.course.data[0].name,
				'courseId': item.content.course.data[0].id,
				'classId': item.key,
				'isShow': item.cfid == -1, // 是否在文件夹内
				'img': item.content.course.data[0].imageurl,
				'school': item.content.course.data[0].schools,
			};
		});
		data.sort((a, b) => b.isShow - a.isShow);
		console.log("获取课程", res, data)
		return data;
	}

	/**
	 * 获取活动
	 * @param {*} courseId 
	 * @param {*} classId 
	 */
	getActivity = async (courseId, classId) => {
		await this.checkLogin();
		const url = 'https://mobilelearn.chaoxing.com/v2/apis/active/student/activelist'
		const res = await util.get(url, {
			'fid': '0',
			'courseId': courseId,
			'classId': classId,
			'showNotStartedActive': '0',
		}, this.cookies)
		Object.assign(this.cookies, res.cookies);
		var data = res['data']['activeList'];
		var data = data.sort((a, b) => b.startTime - a.startTime).map(item => {
			return {
				'type': Number(item.otherId),
				'name': item.nameOne,
				'time': item.nameFour ? item.nameFour : '无',
				'activeId': item.id,
				'courseId': courseId,
				'classId': classId,
				'img': item.logo,
				'isExpire': item.endTime < (new Date().getTime()) && item.endTime, // 是否过期
			};
		});
		var data = data.filter(item => {
			return 0 <= item.type && item.type <= 5;
		})
		console.log("获取活动", res, data)
		return data.slice(0, 50);
	}

	/**
	 * 获取活动详情
	 * @param {*} activeId 
	 */
	getActivityInfo = async (activeId) => {
		await this.checkLogin();
		const url = 'https://mobilelearn.chaoxing.com/v2/apis/active/getPPTActiveInfo'
		const res = await util.get(url, {
			'activeId': activeId,
		}, this.cookies)
		Object.assign(this.cookies, res.cookies);
		const data = res.data;
		console.log("获取活动详情", res, data);
		return data;
	}

	/**
	 * 获取活动结果 HTML
	 * @param {*} activeId 
	 * @param {*} courseId 
	 * @param {*} classId 
	 */
	getActivityResult = async (activeId, courseId, classId) => {
		await this.checkLogin();
		const url = 'https://mobilelearn.chaoxing.com/widget/sign/pcStuSignController/preSign'
		const html = await util.getText(url, {
			'activeId': activeId,
			'courseId': courseId,
			'classId': classId,
		}, this.cookies)
		return html;
	}

	/**
	 * 获取考勤名单
	 * @param {*} activeId
	 * @param {*} classId 
	 */
	getAttendList = async (activeId, classId) => {
		await this.checkLogin();
		const url = 'https://mobilelearn.chaoxing.com/widget/sign/pcTeaSignController/getAttendList'
		const res = await util.get(url, {
			'activeId': activeId,
			'classId': classId,
			'appType': 15,
			'fid': 0,
		}, this.cookies)
		const typeConfig = ["未签", "已签", "教师代签", null, null, "缺勤", null, null, "事假", "迟到", "早退", null, "公假"];
		const data = {
			'未签名单': res.data.weiqianList.map(item => {
				return {
					'name': item.name,
					'uid': item.uid,
					'status': typeConfig[item.status],
					'submittime': "",
				}
			}),
			'已签名单': res.data.yiqianList.map(item => {
				return {
					'name': item.name,
					'uid': item.uid,
					'submittime': item.submittime,
					'address': item.title,
					'status': typeConfig[item.status],
				}
			}),
		}
		console.log("获取考勤名单", data, res)
		return data;
	}

	/**
	 * 预签到 HTML
	 * @param {*} activeId 
	 * @param {*} courseId 
	 * @param {*} classId 
	 */
	beforeSign = async (activeId, courseId, classId) => {
		await this.checkLogin();
		const url = 'https://mobilelearn.chaoxing.com/newsign/preSign'
		const html = await util.getText(url, {
			'activePrimaryId': activeId,
			'courseId': courseId,
			'classId': classId,
			'uid': await this.getUID(),
			'appType': '15',
			'general': '1',
			'sys': '1',
			'ls': '1',
			'tid': '',
			'ut': 's',
		}, this.cookies)
		console.log("预签到, 访问签到页面")
		return html;
	}

	/**
	 * 普通签到
	 * @param {*} activeId 
	 * @param {*} objectId  上传的图片的ID
	 * 
	 * @param {*} longitude 
	 * @param {*} latitude 
	 * @param {*} addressText 
	 * 
	 * @param {*} signCode 签到码
	 * @param {*} role 手势
	 * 
	 * @param {*} enc 
	 */
	defaultSign = async (activeId, objectId = null, longitude = null, latitude = null, addressText = null, signCode = null, role = null, enc = null, nickname = null) => {
		await this.checkLogin();
		const url = 'https://mobilelearn.chaoxing.com/pptSign/stuSignajax';
		const randomNickname = ['龙傲天', '聂云竹', '君莫邪', '唐舞麟', '叶青雨', '江玉饵'];
		if (!addressText)
			addressText = "中华人民共和国";
		const data = {
			'activeId': activeId,
			'objectId': objectId,

			'uid': await this.getUID(),
			'clientip': '',
			'useragent': '',

			'longitude': longitude && !enc ? String(longitude).substring(0, 10) : -1,
			'latitude': latitude && !enc ? String(latitude).substring(0, 10) : -1,
			'address': addressText && !enc ? addressText : "",
			'location': JSON.stringify({ 'result': 1, 'latitude': latitude, 'longitude': longitude, 'address': addressText }),

			'signCode': signCode,
			'role': role,
			'enc': enc,

			'name': nickname ? nickname : randomNickname[Math.floor(Math.random() * randomNickname.length)],
			'appType': '15',
			'ifTiJiao': '1',
			'fid': '0',
		};
		const res = await util.getText(url, data, this.cookies)
		log.info("通用签到", res, data);
		return res;
	}

	/**
	 * 优化返回值
	 */
	static getResult = (msg) => {
		if (!msg)
			return null;
		else if (msg == 'success')
			return '签到成功';
		else if (msg == 'success2')
			return '签到已过期，迟到';
		else if (msg.startsWith('validate'))
			return '您已被风控';
		else if (msg == 'errorLocation1' || msg == 'errorLocation2')
			return '不在签到范围内';
		else
			return msg;
	}

	/**
	 * 访问错误位置页面 HTML
	 * @param {*} activeId 
	 */
	errorLocation = async (activeId) => {
		await this.checkLogin();
		const url = 'https://mobilelearn.chaoxing.com/pptSign/errorLocation';
		const data = {
			'DB_STRATEGY': "PRIMARY_KEY",
			'STRATEGY_PARA': "activeId",
			'activeId': activeId,
			'uid': await this.getUID(),
			'location': JSON.stringify({ 'result': 1, 'latitude': 39.5426, 'longitude': 116.2329, 'address': '中国北京市' }),
			'errortype': "errorLocation2",
		};
		const html = await util.getText(url, data, this.cookies)
		console.log("访问错误位置页面")
		return html;
	}

	/**
	 * 获取超星云盘token
	 */
	getToken = async () => {
		await this.checkLogin();
		const url = 'https://pan-yz.chaoxing.com/api/token/uservalid';
		const res = await util.get(url, {}, this.cookies);
		return res._token;
	}

	/**
	 * 获取账号信息
	 */
	getUserInfo = async () => {
		await this.checkLogin();
		const url = 'https://sso.chaoxing.com/apis/login/userLogin4Uname.do'
		const res = await util.get(url, {}, this.cookies)
		const data = {
			name: res.msg.name,
			dept: res.msg.dept,
			phone: res.msg.phone,
			school: res.msg.schoolname,
			uid: res.msg.uid,
			sex: res.msg.sex >= 0 ? ["女", "男"][res.msg.sex] : '',
			unit: res.msg.unitConfigInfos,
		}
		console.log("获取用户信息", res, data)
		return data;
	}

	/**
	 * 上传文件到超星云盘
	 * @param {*} filePath 
	 * @param {*} uid 
	 */
	uploadFile = async (filePath, uid) => {
		const url = `https://pan-yz.chaoxing.com/upload?_token=${token}`;
		const res = await util.uploadFile(url, filePath, {
			'puid': uid,
		});
		console.log("上传文件", res)
		return res;
	}

	/**
	 * 使用腾讯云获取位置文本
	 * @param {*} longitude 
	 * @param {*} latitude 
	 */
	static getAddressText = async (longitude = null, latitude = null) => {
		const url = 'https://apis.map.qq.com/ws/geocoder/v1/';
		const res = await util.get(url, {
			'location': `${latitude},${longitude}`,
			'key': config.tententMapKey,
		})
		log.info("坐标转文本", res)
		return res.result;
	}

	/**
	 * GPS坐标系 转 国测局gcj02
	 * @param {*} longitude 
	 * @param {*} latitude 
	 */
	static Wgs84ToGcj02 = async (longitude = null, latitude = null) => {
		const url = 'https://apis.map.qq.com/ws/coord/v1/translate';
		const res = await util.get(url, {
			'locations': `${latitude},${longitude}`,
			'key': config.tententMapKey,
			'type': 1,
		})
		log.info("GPS坐标转国测局坐标", res)
		return res.locations[0];
	}

	/**
	 * 任意坐标系 转换
	 * @param {*} longitude 
	 * @param {*} latitude 
	 */
	static allToBaidu = async (longitude = null, latitude = null, from = 'gcj02', to = 'bd09ll') => {
		const list = ['wgs4', 'sougou', 'gcj02', null, 'bd09ll']
		const fromId = list.indexOf(from) + 1;
		const toId = list.indexOf(to) + 1;
		if (fromId <= 0 || toId <= 0) return;
		const url = 'https://api.map.baidu.com/geoconv/v1/';
		const data = {
			'coords': `${longitude},${latitude}`,
			'from': fromId,
			'to': toId,
		}
		const res = await util.get(url, {
			...data,
			'ak': config.baiduMapKey,
		})
		log.info("任意坐标转百度坐标", res, data)
		return res.result[0];
	}
}

module.exports = API;