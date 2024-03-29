const config = {
	cdn: "https://testingcf.jsdelivr.net/gh/Misaka-OpenSource/Chaoxing-WechatMiniProgram", // GitHub代理地址
	
	tententMapKey: '', // 腾讯地图开放平台 Key
	baiduMapKey: '', // 百度地图开放平台 Key

	location: { // 默认位置（GPS坐标系 wgs84）
		latitude: '',
		longitude: '',
		name: '',
	},
	
	swiperList: [
		"/static/swiper/1.jpg",
		"/static/swiper/ad/1.png",
		"/static/swiper/ad/2.png",
		"/static/swiper/2.jpg",
		"/static/swiper/ad/3.png",
	],
	notice: "欢迎大家使用小程序, 本小程序仅用于快捷签到, 请勿滥用, 谢谢合作！", // 公告
	products: [{
		'img': '/static/image/友情推荐/御坂美琴1.png',
		'title': 'Misaka 学习',
		'appid': 'wxefe36d85978840fa',
	}, {
		'img': '/static/image/友情推荐/御坂美琴1.png',
		'title': '早八不迟到S',
		'appid': 'wx39fef30273f9b8c0',
	}, , {
		'img': '/static/image/友情推荐/IDECEO.png',
		'title': 'IDCEO',
		'appid': 'wx116c38d790eccd59',
	}, {
		'img': '/static/image/友情推荐/御坂美琴2.png',
		'title': 'Misaka Network',
		'appid': 'wxb42fe32e6e071916',
	}],
}

module.exports = config;