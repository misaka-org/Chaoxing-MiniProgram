import config from '../../../api/config';
import util from '../../../api/util';
import API from '../../../api/api';
import log from '../../../api/log';

import LZString from '../../../api/lz-string.min';

const typeConfig = ["拍照签到", "普通签到", "二维码签到", "手势签到", "位置签到", "签到码签到"];

Page({
	data: {
		data: {}, // 签到活动信息
		fileList: [], // 本地图片链接
		srcList: [], // 图片链接
		notice: "", // 通知栏

		result: "", // 签到结果

		config: {
			'notice': {
				speed: 60,
				loop: -1,
				delay: 0,
			},
			'typeConfig': typeConfig,
		},

		signLocation: { // 签到坐标（百度坐标系 bd09ll）
			longitude: config.location.longitude,
			latitude: config.location.latitude,
			name: config.location.name,
		},
		mapLocation: Object.assign({ // 地图坐标 (国测局坐标系 gcj02)
			id: 666,
		}, config.location),

		html: "", // 预签到 HTML
		showChooseType: false, // 是否显示手动选择类型
		pickerList: typeConfig.map((item, index) => { // 类型选择器
			return {
				'label': item,
				'value': index,
			}
		}),
	},

	typeChange(e) { // 选择器修改 签到类型
		this.setData({
			'data.type': e.detail.value[0],
		})
	},

	async onLoad(options) {
		if (options.from == 'capture')
			wx.redirectTo({
				url: '/pages/tabbar-package/login/login',
			})

		this.getUserLocation()

		const data = JSON.parse(LZString.decompressFromBase64(options.data));
		console.log("活动内容", data, options)
		const type = options.type != undefined ? options.type : ''; // 是否是help代签

		this.data.api = new API(data.username, data.password);
		this.setData({
			'notice': config.notice,
			'type': type,
			'data': data,
			'rawBase64': options.data,
		})

		this.data.token = data.type == 0 ? await this.data.api.getToken() : '';
		this.data.html = await this.data.api.beforeSign(data.activeId, data.courseId, data.classId);
		this.data.html = await this.data.api.errorLocation(data.activeId);
	},

	getUserLocation() { // 获取用户位置
		wx.getLocation({
			'type': 'gcj02',
		})
			.then(gcj02 => {
				log.info("获取用户位置", gcj02)

				API.allToBaidu(gcj02.longitude, gcj02.latitude)
					.then(bd09ll => this.setData({
						'signLocation.longitude': bd09ll.x,
						'signLocation.latitude': bd09ll.y,
					}))

				API.getAddressText(gcj02.longitude, gcj02.latitude)
					.then(res => {
						this.setData({
							'signLocation.name': res.address,
						})
					})

				this.setData({
					'mapLocation': Object.assign(this.data.mapLocation, gcj02),
					'showSetting': false,
				})
			})
			.catch(e => {
				util.showInfo("用户拒绝定位")
				console.log("用户拒绝定位", e)
			})
	},

	async signin(e) { // 提交签到
		const data = this.data.data;
		const objectId = this.data.srcList.length != 0 ? this.data.srcList[0] : 0;

		this.setHistoryAddress(this.data.signLocation);
		let res = "";

		if (data.type == 0 || data.type == 1) { // 图片/普通
			if (objectId == 0) {
				const ok = await wx.showModal({
					title: '确认直接签到吗?',
					content: '你还没有上传图片',
				})
				if (ok.confirm != true)
					return;
			}
			res = await this.data.api.defaultSign(data.activeId, objectId, null, null, null, null, null, null, data.nickname);
		}

		if (data.type == 3 || data.type == 5) { // 签到码/手势
			res = await this.data.api.defaultSign(data.activeId, null, null, null, null, this.data.signCode, null, null, data.nickname);
		}

		if (data.type == 4) { // 位置
			const signLocation = this.data.signLocation;;
			res = await this.data.api.defaultSign(data.activeId, null, signLocation.longitude, signLocation.latitude, signLocation.name, null, null, null, data.nickname);
		}

		if (data.type == 2) { // 二维码
			const qrcode = await wx.scanCode();
			console.log("扫码结果", qrcode)
			let params = {};
			qrcode.result.split('?')[1].split('&').forEach(function (param) {
				const parts = param.split('=');
				const key = decodeURIComponent(parts[0]);
				const value = decodeURIComponent(parts[1]);
				params[key] = value;
			});
			const enc = params.enc;
			const signLocation = this.data.signLocation;
			res = await this.data.api.defaultSign(data.activeId, null, signLocation.longitude, signLocation.latitude, signLocation.name, null, null, enc, data.nickname);
		}

		const msg = API.getResult(res);
		util.showInfo(msg);
		this.setData({
			'result': msg,
		})
		if (res.startsWith('success'))
			this.setHistory();
	},

	chooseLocation() { // 选择位置
		wx.chooseLocation(this.data.mapLocation) // 国测局坐标系 gcj02
			.then(gcj02 => {
				log.info("用户选择位置", gcj02)

				API.allToBaidu(gcj02.longitude, gcj02.latitude)
					.then(bd09ll => this.setData({
						'signLocation.latitude': bd09ll.y,
						'signLocation.longitude': bd09ll.x,
						'signLocation.name': gcj02.name ? gcj02.name : gcj02.address,
					}))

				this.setData({
					'mapLocation': Object.assign(this.data.mapLocation, gcj02),
				})
			})
			.catch(e => {
				util.showInfo("取消位置选择")
				console.log("取消位置选择", e)
			})
	},

	input(e) { // 输入内容
		this.setData({
			[`${e.currentTarget.dataset.input}`]: e.detail.value,
		})
	},

	setHistory() { // 写入签到记录
		let history = util.getStorage('history', []);
		history = [...history, this.data.data];
		util.setStorage('history', history);
	},

	handleAdd(e) {
		const files = e.detail.files;
		const token = this.data.token;
		const fileList = this.data.fileList;
		const data = this.data.data;
		files.forEach(file => {
			this.setData({
				fileList: [...fileList, {
					...file,
					'status': 'loading'
				}],
			});
			const length = fileList.length;

			const task = wx.uploadFile({
				url: `https://pan-yz.chaoxing.com/upload?_token=${token}`,
				filePath: file.url,
				name: 'file',
				formData: {
					'puid': data.uid
				},
				success: res => {
					const data = JSON.parse(res.data);
					console.log("图片上传成功", data)
					util.showInfo("图片上传成功")
					this.setData({
						[`fileList[${length}].status`]: 'done',
						[`srcList[${length}]`]: data.objectId,
					});
				},
			});
			task.onProgressUpdate((res) => {
				this.setData({
					[`fileList[${length}].percent`]: Math.floor(res.progress * 0.99),
				});
			});
		})
	},
	handleRemove(e) {
		const index = e.detail.index;
		this.data.fileList.splice(index, 1);
		this.data.srcList.splice(index, 1);
		this.setData({
			'fileList': this.data.fileList,
			'srcList': this.data.srcList,
		});
	},

	rotateFn(e) { // 卡片翻面
		const id = e.currentTarget.dataset.id
		this.animation_main = wx.createAnimation({
			duration: 400,
			timingFunction: 'linear'
		})
		this.animation_back = wx.createAnimation({
			duration: 400,
			timingFunction: 'linear'
		})

		if (id == 1) { // 点击正面
			this.animation_main.rotateY(180).step()
			this.animation_back.rotateY(0).step()
			this.setData({
				animationMain: this.animation_main.export(),
				animationBack: this.animation_back.export(),
			})
		} else { // 点击背面
			this.animation_main.rotateY(0).step()
			this.animation_back.rotateY(-180).step()
			this.setData({
				animationMain: this.animation_main.export(),
				animationBack: this.animation_back.export(),
			})
		}
	},

	setHistoryAddress(location = null) { // 记录常用位置
		if (!location)
			return;
		console.log("记录地址", location)
		const addressList = util.getStorage('address', []);
		if (addressList.some(item => ( // 已经有这个地址
			Math.abs(Number(item.longitude) - Number(location.longitude)) <= 1e-4 &&
			Math.abs(Number(item.latitude) - Number(location.latitude)) <= 1e-4
		)))
			return;

		location = {
			'time': new Date().toDateString(),
			...location,
		}

		if (!addressList.length || addressList[0].type != 'top') // 如果不是置顶的
			addressList.splice(0, 0, location);
		else
			addressList.splice(1, 0, location);
		util.setStorage('address', addressList);
	},

	closePopup(e) { // 关闭 Popup
		this.setData({
			[e.currentTarget.dataset.key]: false,
		})
	},
	openPopup(e) { // 开启 Popup
		this.setData({
			[e.currentTarget.dataset.key]: true,
		})
	},

	log(e) { // 输出所有data数据
		log.info("所有数据", this.data);
	},
})