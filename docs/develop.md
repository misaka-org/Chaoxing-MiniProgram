# 部署教程

## 注意

本项目仅供学习使用, 请遵守相关法律法规！

本文档默认您有基础的小程序开发经验!

## 发布小程序

1. 到 [微信公众平台](https://mp.weixin.qq.com) 注册一个小程序

2. 填写小程序基本信息和类目, 完成小程序备案和微信认证

3. 将本项目下载到本地并导入开发者工具

4. 安装 [TDesign 组件库](https://tdesign.tencent.com/miniprogram)

    [官方安装教程](https://tdesign.tencent.com/miniprogram/getting-started)

    构建 npm

5. 在微信公众平台设置服务器域名，申请接口权限

	服务器 request域名：
	- https://api.map.baidu.com
	- https://apis.map.qq.com
	- https://mobilelearn.chaoxing.com
	- https://mooc1-api.chaoxing.com
	- https://pan-yz.chaoxing.com
	- https://passport2-api.chaoxing.com
	- https://sso.chaoxing.com

	服务器 upload域名：
	- https://pan-yz.chaoxing.com

	申请接口权限：
	- wx.chooseLocation 位置签到自选位置
	- wx.getLocation    获取自身位置

6. 填写百度地图开放平台 Key 和 腾讯地图开放平台 Key

7. 编译小程序 提交代码 提交审核

## 寻求帮助

	注意：
	- 开发者没有义务回答您的问题，提问应该包含问题详情、截屏、日志！
	- 不回复关于微信开放平台设置、开发者工具使用的问题，请移步微信小程序开发基础教程！
	- 请保持文明、和谐！