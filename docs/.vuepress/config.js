import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

import theme from "./theme.js";

export default defineUserConfig({
    bundler: viteBundler({
        viteOptions: {
            optimizeDeps: {
                include: ['naive-ui']
            },
            ssr: {
                noExternal: ['naive-ui']
            }
        }
    }),
    pagePatterns: ['**/*.md', '!.vuepress', '!node_modules', '!functions'],
    theme: theme,
    shouldPrefetch: false,
    base: "/./",
    head: [
        ['link', { rel: 'icon', href: 'https://github.com/Misaka-1314.png' }],
        ['meta', { name: 'referrer', content: 'never' }],
        ['script', { type: 'text/javascript', src: '/js/analyze.js' }],
    ],
    locales: {
        "/": {
            lang: "zh-CN",
            title: "Misaka 文档",
            description: "御坂学习小程序 文档",
        },
    },
    plugins: [],
})
