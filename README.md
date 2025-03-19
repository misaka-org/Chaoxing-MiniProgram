<center><div align="center">

<img src="https://avatars.githubusercontent.com/u/163529042?v=4" width="300" height="300" style="border-radius: 50%"></img>

<img alt="version" src="https://img.shields.io/github/last-commit/Misaka-OpenSource/Chaoxing-WechatMiniProgram.svg?style=for-the-badge&label=%E6%9C%80%E5%90%8E%E6%9B%B4%E6%96%B0&logo=velog&logoColor=BE95FF&color=7B68EE"/></img>
<img alt="stars" src="https://img.shields.io/github/stars/Misaka-OpenSource/Chaoxing-WechatMiniProgram.svg?style=for-the-badge&label=Stars&logo=undertale&logoColor=orange&color=orange"/></img>
<img alt="forks" src="https://img.shields.io/github/forks/Misaka-OpenSource/Chaoxing-WechatMiniProgram.svg?style=for-the-badge&label=Forks&logo=stackshare&logoColor=f92f60&color=f92f60"/></img>
<img alt="pr" src="https://img.shields.io/github/issues-pr-closed/Misaka-OpenSource/Chaoxing-WechatMiniProgram.svg?style=for-the-badge&label=PR&logo=addthis&logoColor=green&color=0AC18E"/></img>
<img alt="issues" src="https://img.shields.io/github/issues/Misaka-OpenSource/Chaoxing-WechatMiniProgram.svg?style=for-the-badge&label=Issues&logo=openbugbounty&logoColor=e38dff&color=e38dff"/></img>

</div></center>

<div align="center" style="font-weight:bold"><b>学习通快捷签到 自建微信小程序 · 签到如此简单！</b></div>  

## ✨ 历程

+ 2024/03 我们开发了本项目，无需后端即可使用。
+ 2024/04 学习通的mobilelearn子域拦截UA中含有小程序的请求, 只能由服务器转发请求, 本项目失去了无后端开发的优势，暂停维护。
+ 2024/06 某SB同行大量举报学习通签到小程序。
+ 2024/09 基于本项目的小程序被举报封号，我们启动了自建小程序方案，鼓励用户注册小程序自用。
+ 2024/09 学习通官方以内容侵权为由投诉多个公众号的文章。
+ 2024/10 我们计划重启开源版本。
+ 2024/12 截至 2025年3月8日的 [小程序上传数据](http://27.30.79.244:24800/)，已有846个小程序成功上传，另有114个填写有误。有需要的同学可以填写问卷！

## 🎃 免责声明

本项目仅作为交流学习使用，通过本项目加深网络通信、接口编写、交互设计等方面知识的理解。
任何人或组织使用项目中代码进行的任何违法行为与本人无关。如有触及相关平台规定或者权益，烦请联系 [邮箱](mailto:complaint@micono.eu.org) 改正。

> 2022年2月11日，教育部等五部门关于加强普通高校在线客服课程教学管理的若干意见要求，严禁以任何形式传播考试内容及答案作弊手法。本项目不提供考试或作业答案！

> 本项目默认您有基本的JavaSript、Python基础，能熟练部署服务器软件，部署交流请到 QQ频道 或 Discussion，过于简单的问题可能被直接关闭！

> 项目贡献者不对您使用本项目造成的任何后果 (如封号、被教师约谈等) 负责！

## 🎉 版本对比
<table style="text-align: center">
    <tr>
        <th colspan=2>版本对比</th>
        <th>开源版</th>
        <th>非开源版</th>
    </tr>
    <tr>
        <td rowspan=5>签到功能</td>
        <td>位置签到</td>
        <td>支持地图自选位置</td>
        <td>支持自动获取教师设置的位置</td>
    </tr>
    <tr>
        <td>拍照签到</td>
        <td>支持上传任意图片</td>
        <td>支持借用同学签到照片</td>
    </tr>
    <tr>
        <td>手势签到</td>
        <td>手动</td>
        <td>支持一键获取手势</td>
    </tr>
    <tr>
        <td>签到码签到</td>
        <td>手动输入</td>
        <td>支持一键获取签到码</td>
    </tr>
    <tr>
        <td>二维码签到</td>
        <td>不支持绕过二维码，但可以解决单台手机只能签一人</td>
        <td>支持扫一次签多用户</td>
    </tr>
    <tr>
        <td rowspan=2>其他差异</td>
        <td>滑块验证码</td>
        <td><a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/39c95d5b4a20ce4e8b4f8e3ed7bd038cc15b4490/miniprogram/pages/home/home.js#L165">可接入免费接口</a></td>
        <td>支持自动通过</td>
    </tr>
    <tr>
        <td>多用户</td>
        <td>不支持</td>
        <td>支持</td>
    </tr>
    <tr>
        <td colspan=2>使用方式 / 用户协议</td>
        <td><a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/LICENSE">GPLv3许可证</a></td>
        <td>原则上仅供您和您的朋友使用，禁止倒卖、滥用！</td>
    </tr>
    <tr>
        <td rowspan=2>部署教程</td>
        <td>服务端</td>
        <td><a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/server/README.md">自行部署教程</a></td>
        <td>默认使用我们的服务器 (<a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/server/README.md">可自行部署</a>)</td>
    </tr>
    <tr>
        <td>小程序端</td>
        <td><a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/miniprogram/README.md">自行部署教程</a></td>
        <td>填写问卷，提供小程序代码上传密钥 (<a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/miniprogram/no-open.md">填写教程</a>)</td>
    </tr>
</table>

> 请注意：GPLv3具有“传染性”，即在您开发的软件中使用GPLv3自由软件的整体或部分，都将使您的软件也变成GPLv3自由软件。

> 无论选择哪种版本，部署及使用过程均未收取任何费用，如果您遭到欺骗，请立即申请退款！

## 🗒️ 页面展示

#### 开源版

|                                                        **登录页**                                                        |                                                      **课程列表页**                                                      |                                                      **签到列表页**                                                      |                                                      **定位签到页**                                                      |                                                      **拍照签到页**                                                      |
| :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| <div align="center"> <img src="https://github.com/user-attachments/assets/4e7bbb6b-cde4-4767-860b-f33c4a9fdb9c"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/f7179f80-e0cc-4eb8-bd8e-89b9465fa088"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/1c201277-8374-496f-b986-ea84a1fd659a"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/126dd771-215b-4f6d-a95a-d0c191398b1d"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/dfeab9f7-b155-4514-9519-2a8caf7dae44"/> </div> |

#### 非开源版

|                                                         **首页**                                                         |                                                        **登录页**                                                        |                                                    **批量扫码签到页**                                                    |                                                      **课程列表页**                                                      |
| :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| <div align="center"> <img src="https://github.com/user-attachments/assets/6d354e43-6a51-4e70-8d3c-e8b53d52e625"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/71ef9c44-309b-489e-9ef7-4f08e3840d91"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/d73b4df3-c43f-4a6a-8f38-46e661654652"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/fb7c4141-330c-483e-8c1f-2461e0361bfb"/> </div> |

|                                                      **签到列表页**                                                      |                                                      **手势签到页**                                                      |                                                      **拍照签到页**                                                      |                                                      **定位签到页**                                                      |
| :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| <div align="center"> <img src="https://github.com/user-attachments/assets/b3bbd3b8-d359-4c2a-be7d-aa3bce4c47f9"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/e2539952-d160-48ab-a99b-1e70234f16b6"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/63f9c939-7334-4c0b-8efd-d7a3db6d09cf"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/6807e267-10bd-49c0-9ea7-69b778ab5556"/> </div> |

#### 网页入口

> 为了防止小程序被封，我们隐藏了体验小程序的入口，使用网页跳转进入（这部分代码在 [这里](https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/web/README.md)）  
> 请注意：这不是网页版签到，只是小程序入口！  

|                                                        **登录页**                                                        |                                                      **课程列表页**                                                      |
| :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| <div align="center"> <img src="https://github.com/user-attachments/assets/25e6c246-3241-4b06-9a44-a9b8f5199f38"/> </div> | <div align="center"> <img src="https://github.com/user-attachments/assets/38596dfc-6212-45d2-b46c-a4aa11cdc241"/> </div> |

<div align="center" style="font-weight:bold">扫码体验非开源版</div>  
<img src="https://github.com/user-attachments/assets/c279019d-d2fd-49b0-b1c7-b704e510438b" width="250" height="250" style="border-radius: 50%"></img>

## 🎗️ 交流学习

<div style="display: none;" id="concat"></div>

+ [QQ频道](https://pd.qq.com/s/f1mli0e35)（推荐）
+ [Discussion](https://github.com/misaka-org/Chaoxing-MiniProgram/discussions)
+ [QQ](https://qm.qq.com/q/24Qzm6avhS)
+ [用户文档评论区](https://doc.micono.eu.org) （完善中）

> 我们依靠非开源版中的广告获得收益，未来可能提供更多增值服务。但已有的免费签到渠道永远不会关闭！

## 🏆 特别鸣谢

本项目的小程序上传服务器 由 [萝莉猫](https://www.loricat.cn) 公益赞助！
