---
title: 网页入口
icon: iconfont icon-study
category:
  - Tools
order: 1
---

:::tip
网页入口用于小程序被举报封号时备用，部分功能不可用！由小北云提供部分接口！
:::

:::warning
由于未对密码进行 `decodeURIComponent`，若密码中存在特殊符号，可能导致未知问题！[去官方网页版修改密码](https://i.chaoxing.com)
:::

:::warning
请在手机端点击去签到按钮，电脑点击无法使用！
:::

:::warning
仅显示最近24小时发布的签到，更多签到可前往 [小程序版](../guide/README.md) 使用！
:::

<ClientOnly>
    <SignList />
</ClientOnly>