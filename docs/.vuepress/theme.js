import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme(
    {
        docsDir: "docs",
        logo: "https://avatars.githubusercontent.com/u/163529042?v=4",
        repo: "misaka-org/Chaoxing-MiniProgram",
        hostname: "https://doc.micono.eu.org",

        author: {
            name: "Misaka",
            url: "https://github.com/Misaka-1314",
        },

        pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

        markdown: {
            imgMark: true,      //支持图片标记
            imgLazyload: true,  //支持图片懒加载
            imgSize: true,      //支持图片大小
            tabs: true,         //支持表格
            gfm: true,          //支持完整的 GFM 语法
            tasklist: true,     //支持任务列表
            include: true,      //支持 include 语法
            align: true,        //支持对齐
            mark: true,         //支持标记
            sub: true,          //支持下标
            sup: true,          //支持上标
            demo: true,         //支持 demo
            plantuml: true,     //支持 PlantUML
            codeTabs: true,     //支持代码块分组
        },
        plugins: {
            // 搜索从设置转移到主题
            docsearch: {
                appId: "",
                apiKey: "",
                indexName: "",
            },
            // 目录的自动生成
            catalog: {
                frontmatter: () => ({
                    toc: false,
                }),
            },
            // 图标
            icon: {
                assets: [
                    "//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css",
                    "https://npm.elemecdn.com/font6pro@6.4.0/css/fontawesome.min.css",
                    "https://npm.elemecdn.com/font6pro@6.4.0/css/all.min.css",
                ]
            },
            comment: {
                /**
                 * Using Giscus 评论
                 */
                provider: "Giscus",
                repo: "misaka-org/Chaoxing-MiniProgram",
                repoId: "R_kgDOKWwF6Q",
                category: "Announcements",
                categoryId: "DIC_kwDOKWwF6c4CZj8e",

            },
            // 临时弹窗
            notice: [
                {
                    path: "/",
                    title: '温馨提示',
                    content: '<i class="fa-solid fa-light-emergency-on fa-bounce" style="color: #ff0000;"></i>&nbsp;<span style="color:rgb(255, 0, 0);font-weight:bold;">请勿在群聊发送您的账户密码！</span><br/><br/>本小程序由公众号【御坂网络 Misaka】提供支持',
                    actions: [],
                    showOnce: true,
                }
            ],
        },
        contributors: false,
        changelog: true,
    },
    {
        check: true,
        compact: true,
        custom: true,
        debug: false,
    }
);