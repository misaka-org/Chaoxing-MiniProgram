const help = [{
    'question': "如何绑定账号?",
    'answer': "点击首页的『绑定账号』, 或者在用户页点击头像, 均可进入账号绑定页面！也可以点击他人分享的链接, 快速绑定TA的账号! ",
}, {
    'question': "怎么反馈小程序的BUG?",
    'answer': "可以通过用户页的『意见反馈』, 也可以直接发邮件到『feedback@yangrucheng.top』, 非常感谢您对我们的支持! ",
}];

Page({
    data: {
        help: []
    },

    onShow() {
        help.sort((a, b) => Math.random() - 0.5);
        this.setData({
            'help': help,
        })
    },
})