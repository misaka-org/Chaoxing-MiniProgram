import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

import theme from "./theme.js";

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  theme: theme,
  base: "/./",
  head: [
    ['link', { rel: 'icon', href: 'https://avatars.githubusercontent.com/u/163529042?v=4' }],
    ['meta', { name: 'algolia-site-verification', content: 'BEC25E1BD9B17162' }],
    ['meta', { name: 'referrer', content: 'never' }],
  ],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Misaka 文档",
      description: "御坂学习小程序 文档",
    },
  },
})