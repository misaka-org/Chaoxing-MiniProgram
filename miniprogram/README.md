## 小程序端部署教程

> 本教程仅供有小程序开发基础的人阅读，不提供任何形式的指导！
> Issue 或 Discussion 仅处理 Bug或功能请求！

### 前置步骤

1. 注册小程序 [微信公众平台](https://mp.weixin.qq.com)
2. 设置小程序名称、类目等 (不能选游戏类目)
3. 小程序备案 + 小程序微信认证 (非企业30元/年)
4. 申请小程序开发接口 (需要 `wx.chooseLocation` 和 `wx.getLocation`，可去淘宝代开通)
5. 设置小程序服务器域名 (需要已备案的域名)

### 上传小程序代码

1. 注册 [百度地图开放平台](https://lbsyun.baidu.com) 和 [天地图开放平台](http://lbs.tianditu.gov.cn) 的密钥
2. 在 `miniprogram/utils` 目录下创建 `config.js` 并填入下面的内容。
	```js
	const config = {
		baseUrl: "https://example.com", // 服务器域名
		cdn: "https://testingcf.jsdelivr.net/gh/Misaka-org/Chaoxing-WechatMiniProgram@static", // GitHub代理地址

		baiduMapKey: '', // 百度地图开发平台
		tianMapKey: '', // 天地图开放平台

		swiperList: [
			"/static/swiper/1.jpg",
			"/static/swiper/2.jpg",
			"/static/swiper/3.jpg",
		],
		notice: "本小程序由公众号御坂网络Misaka免费提供，谨防倒卖！",
	}
	module.exports = config;
	```
3. 安装 [TDesign组件库](https://tdesign.tencent.com/miniprogram/getting-started)
4. 上传代码