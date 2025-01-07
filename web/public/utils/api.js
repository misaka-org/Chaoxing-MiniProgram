import http from './http.js';
import util from './util.js';

class API {
    constructor(username, password = "") {
        this.updatetime = util.getStorage(`cookies-updatetime-${username}`, 0)
        this.uid = "";
        this.username = username;
        this.password = password;
    }

    /**
     * 检查登录
     */
    checkLogin = async () => {
        if (this.updatetime + 7 * 24 * 3600 * 1000 <= new Date().getTime()) {
            console.debug("自动登录 登录过期")
            await this.login();
        }
    }

    /**
     * 登录
     */
    login = async () => {
        if (!this.username || !this.password)
            return;
        const res = await http.get('/api/login', {
            "username": this.username,
            "password": this.password,
        });
        this.updatetime = new Date().getTime();
        util.setStorage(`cookies-updatetime-${this.username}`, this.updatetime);
        console.info("登录", res);
        await this.getUID();
        return res;
    }

    /**
     * 获取UID
     */
    getUID = () => {
        this.uid = "";
        return this.uid;
    }

    /**
     * 获取课程列表
     */
    getCourses = async () => {
        await this.checkLogin();
        const url = '/api/get_courses';
        const res = await http.get(url)
        let data = res.channelList.filter(item => item.cataName == '课程').map(item => {
            return {
                'courseName': item.content.course ? item.content.course.data[0]?.name : item.content.name,
                'className': item.content.course ? item.content.name : item.content.clazz[0]?.clazzName,
                'teacherName': item.content.course ? item.content.course.data[0]?.teacherfactor : item.content.teacherfactor,
                'courseId': item.content.course ? item.content.course.data[0]?.id : item.content.id,
                'classId': item.content.course ? item.key : item.content.clazz[0]?.clazzId,
                'folder': (res.channelList.find(i => i.catalogId == item.cfid) || {}).content?.folderName || null, // 所在的文件夹
                'isTeach': !item.content.course, // 是否自己教的课
                'img': item.content.course ? item.content.course.data[0].imageurl : item.content.imageurl,
            };
        });
        data.sort((a, b) => b.isShow - a.isShow);
        console.info("获取课程", res, data)
        return data;
    }

    /**
     * 获取小程序链接
     * @param {*} courseId 
     * @param {*} classId 
     */
    getWechatUrl = (courseId, classId) => {
        const query = Object.entries({
            'username': this.username,
            'password': this.password,
            'courseId': courseId,
            'classId': classId,
            'package': 'sign',
            'path': '/activity/activity',
        })
            .map(([key, value]) => `${key}=${value}`)
            .join('&')

        const url = `weixin://dl/business/?appid=wxb42fe32e6e071916&path=pages/share/share&query=${encodeURIComponent(query)}`;
        return url;
    }

    /**
     * 小程序入口
     * @returns 
     */
    getMiniProgram = () => {
        const query = Object.entries({
            'path': '/packages/sign-package/pages/home/home',
            'appid': 'wx0ba7981861be3afc',
        })
            .map(([key, value]) => `${key}=${value}`)
            .join('&')

        const url = `weixin://dl/business/?appid=wxb42fe32e6e071916&path=pages/share/share&query=${encodeURIComponent(query)}`;
        return url;
    }
}

export default API;