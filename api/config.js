const config = {
	cdn: "https://cdn.jsdelivr.net/gh/Misaka-OpenSource/Chaoxing-WechatMiniProgram", // GitHub代理地址
	
	location: {
		latitude: '',
		longitude: '',
		name: '',
	},
	swiperList: [
		"/static/swiper/1.jpg",
		"/static/swiper/2.jpg",
	],
	notice: "欢迎大家使用小程序, 本小程序仅用于快捷签到, 请勿滥用, 谢谢合作！", // 公告
	products: [{
		'img': '/static/image/友情推荐/御坂美琴.png',
		'title': 'Misaka 学习',
		'appid': 'wxefe36d85978840fa',
	}],
}

module.exports = config;