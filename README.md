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

## 🎃 免责声明

本项目仅作为交流学习使用，通过本项目加深网络通信、接口编写、交互设计等方面知识的理解。
任何人或组织使用项目中代码进行的任何违法行为与本人无关。如有触及相关平台规定或者权益，烦请联系 [邮箱](mailto:complaint@micono.eu.org) 改正。

> 2022年2月11日，教育部等五部门关于加强普通高校在线客服课程教学管理的若干意见要求，严禁以任何形式传播考试内容及答案作弊手法。本项目不提供考试或作业答案！

> 默认您有基本的JavaSript、Python基础，能熟练部署服务器软件，我们不会提供任何形式的指导，任何部署问题都会被直接关闭！

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
        <td>同开源版</td>
    </tr>
    <tr>
        <td>手势签到</td>
        <td>不支持</td>
        <td>支持获取手势</td>
    </tr>
    <tr>
        <td>签到码签到</td>
        <td>不支持</td>
        <td>支持获取签到码</td>
    </tr>
    <tr>
        <td>二维码签到</td>
        <td>不支持绕过二维码，但可以解决单台手机只能签一人</td>
        <td>支持扫一次签多用户</td>
    </tr>
    <tr>
        <td rowspan=2>其他差异</td>
        <td>滑块验证码</td>
        <td>不支持</td>
        <td>支持</td>
    </tr>
    <tr>
        <td>多用户</td>
        <td>不支持</td>
        <td>支持至多2账号</td>
    </tr>
    <tr>
        <td colspan=2>使用方式</td>
        <td><a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/LICENSE">GPLv3许可证</a></td>
        <td>仅供您和您的朋友使用，不支持共享给陌生人使用</td>
    </tr>
    <tr>
        <td rowspan=2>部署教程</td>
        <td>服务端</td>
        <td>自行部署<a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/miniprogram/README.md">教程</a></td>
        <td>默认使用我们的服务器 (可<a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/server/README.md">自行部署</a>)</td>
    </tr>
    <tr>
        <td>小程序端</td>
        <td>自行部署<a href="https://github.com/misaka-org/Chaoxing-MiniProgram/blob/main/server/README.md">教程</a></td>
        <td>填写问卷，提供小程序代码上传密钥 (问卷链接在<a href="https://github.com/misaka-org/Chaoxing-MiniProgram/discussions">讨论区置顶</a>)</td>
    </tr>
</table>

> 请注意：GPLv3具有“传染性”，即在您开发的软件中使用GPLv3自由软件的整体或部分，都将使您的软件也变成GPLv3自由软件。

> 无论选择哪种版本，部署过程均未收取任何费用，如果您遭到欺骗，请立即申请退款！

