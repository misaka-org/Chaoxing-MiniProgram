<!-- Script Setup -->
<script setup lang="js">
import { onMounted, ref, watch } from 'vue'
import { NButton } from 'naive-ui'

const username = ref('');
const password = ref('');
const loading = ref(true);
const courses = ref([]);
const actives = ref([]);


watch(username, (newVal) => {
    localStorage.setItem('sign-username', newVal)
})
watch(password, (newVal) => {
    localStorage.setItem('sign-password', newVal)
})
onMounted(() => {
    username.value = localStorage.getItem('sign-username') || "";
    password.value = localStorage.getItem('sign-password') || "";
    const script = document.createElement('script');
    script.src = 'https://im.chaoxing.com/res/plugin/HuanXinIm/sdk/websdk3.1.4.js';
    script.onload = () => loading.value = false;
    document.body.appendChild(script);
})

const login = () => {
    if (!username.value || !password.value) {
        alert("请正确输入账号密码")
        return;
    }
    loading.value = true;

    Promise.all([
        fetch(`https://xxtonqd.bfmzdx.cn/xxtnewid?username=${username.value}&password=${password.value}&tt=24`, {
            method: 'GET',
            credentials: 'omit',
        }),
        fetch(`https://xxtonqd.bfmzdx.cn/xxtusers?username=${username.value}&password=${password.value}`, {
            method: 'GET',
            credentials: 'omit',
        }),
    ])
        .then(resp => Promise.all(resp.map(resp => resp.text())))
        .then(async ([text1, text2]) => {
            if (["账号密码错误", "NoActivity"].some(i => text1.includes(i)))
                throw new Error(text1);

            const res1 = JSON.parse(text1);
            const res2 = JSON.parse(text2);

            console.info("最近签到获取成功", res1);
            actives.value = res1.List.map(item => ({
                ...item,
                "type": ["普通签到", "拍照签到", "二维码签到", "手势签到", "位置签到", "签到码签到"][item.otherId || item.ifphoto],
                'link': getSignLink(item.activeId),
            }));

            connectIM(res2.im?.username, res2.im?.password);
        })
        .catch(err => {
            alert(String(err.message || err));
        })
        .finally(() => loading.value = false);
}

const getSignLink = activeId => {
    const query = Object.entries({
        'username': username.value,
        'password': password.value,
        'activeId': activeId,
        'package': 'sign',
        'path': '/signin/signin',
    })
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    return `weixin://dl/business/?appid=wxb42fe32e6e071916&path=pages/share/share&query=${encodeURIComponent(query)}`
}

const getGroupSignLink = activeId => {
    const query = Object.entries({
        'username': username.value,
        'password': password.value,
        'activeId': activeId,
        'package': 'sign',
        'path': '/group/group',
    })
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    return `weixin://dl/business/?appid=wxb42fe32e6e071916&path=pages/share/share&query=${encodeURIComponent(query)}`
}

const to = item => window.open(item.link)

const toMiniprogram = () => {
    const query = Object.entries({
        'username': username.value,
        'password': password.value,
        'package': 'sign',
        'path': '/login/login',
    })
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    window.open(`weixin://dl/business/?appid=wxb42fe32e6e071916&path=pages/share/share&query=${encodeURIComponent(query)}`)
}

const connectIM = (username, password) => {
    if (!username || !password) return;

    const WebIMConfig = {
        xmppURL: 'https://im-api-vip6-v2.easecdn.com/ws',
        apiURL: 'https://a1-vip6.easecdn.com',
        appkey: 'cx-dev#cxstudy',
        Host: 'easemob.com',
        https: true,
        isHttpDNS: false,
        isMultiLoginSessions: true,
        isAutoLogin: true,
        isWindowSDK: false,
        isSandBox: false,
        isDebug: false,
        autoReconnectNumMax: 2,
        autoReconnectInterval: 2,
        isWebRTC: false,
        heartBeatWait: 4500,
        delivery: false,
    };
    const conn = new WebIM.connection({
        isMultiLoginSessions: WebIMConfig.isMultiLoginSessions,
        https: WebIMConfig.https,
        url: WebIMConfig.xmppURL,
        apiUrl: WebIMConfig.apiURL,
        isAutoLogin: WebIMConfig.isAutoLogin,
        heartBeatWait: WebIMConfig.heartBeatWait,
        autoReconnectNumMax: WebIMConfig.autoReconnectNumMax,
        autoReconnectInterval: WebIMConfig.autoReconnectInterval,
        appKey: WebIMConfig.appkey,
        isHttpDNS: WebIMConfig.isHttpDNS,
    });

    console.info("执行监控", username, password);

    conn.open({
        apiUrl: WebIMConfig.apiURL,
        appKey: WebIMConfig.appkey,
        user: username,
        pwd: password,
    });

    conn.listen({
        onError: msg => console.log('[发生异常]', msg),

        onTextMessage: async message => {
            console.info('[收到 SDK 消息]', message);

            const attachment = message?.ext?.attachment || {};
            if (attachment?.attachmentType != 15)
                return;
            if (attachment?.att_chat_course?.type != 1)
                return;
            if (attachment?.att_chat_course?.aid == 0)
                return;

            let res = null

            if (attachment.att_chat_course.url.includes("mobilelearn.chaoxing.com/newsign/preSign")) { // 课程签到 or 班级签到
                const title = attachment.att_chat_course.title;
                const courseName = attachment.att_chat_course.courseInfo.coursename;
                const activeId = attachment.att_chat_course.aid;
                res = {
                    "activeId": activeId,
                    "type": "",
                    "name": title,
                    "courseName": courseName,
                    "endtime": "",
                    "status": "",
                    "link": getSignLink(activeId),
                };
            } else if (attachment.att_chat_course.url.includes("mobilelearn.chaoxing.com/sign/preSign")) { // 群聊签到
                const title = attachment.att_chat_course.title;
                const activeId = attachment.att_chat_course.aid;
                res = {
                    "activeId": activeId,
                    "type": "群聊签到",
                    "name": title,
                    "courseName": "",
                    "endtime": "",
                    "status": "",
                    "link": getGroupSignLink(activeId),
                };
            }

            if (res && !actives.value.some(item => item.activeId === res.activeId))
                actives.value.unshift(res);
        },
    });
}
</script>

<!-- HTML -->
<template>
    <div class="main-container">
        <input v-model="username" placeholder="账号（手机号）" :disabled="loading" class="input" />
        <input v-model="password" placeholder="密码" type="password" :disabled="loading" class="input" />


        <div class="button-container">
            <NButton type="primary" :disabled="loading" :loading="loading" @click="login" class="button">
                查询最近签到
            </NButton>

            <NButton v-if="actives.length" type="info" @click="toMiniprogram" class="button">
                打开小程序
            </NButton>
        </div>

        <div class="table-scroll" v-if="actives.length">
            <div class="table-content">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>签到 ID</th>
                            <th>操作</th>
                            <th>类型</th>
                            <th>名称</th>
                            <th>课程</th>
                            <th>截止时间</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loading">
                            <td colspan="7" class="no-data">加载中...</td>
                        </tr>
                        <tr v-for="item in actives" :key="item.activeId">
                            <td>{{ item.activeId }}</td>
                            <td>
                                <NButton @click="to(item)" strong secondary type="primary">前往签到</NButton>
                            </td>
                            <td>{{ item.type || '' }}</td>
                            <td>{{ item.nameOne || item.name }}</td>
                            <td>{{ item.title1 || item.courseName }}</td>
                            <td>{{ item.nameFour || item.endtime }}</td>
                            <td>{{ item.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<!-- Style -->
<style scoped>
.table-scroll {
    width: 100%;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 60vh;
    overflow-y: auto;
}

.data-table {
    min-width: max-content;
    table-layout: fixed;
    border-collapse: collapse;
}

.table-content {
    direction: ltr;
}

th,
td {
    padding: 12px 20px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid var(--tip-c-soft);
    font-size: 14px;
}

.no-data {
    text-align: left;
}

.main-container {
    min-width: min(500px, 100%);
    max-width: 100%;
}

.input {
    width: calc(100% - 32px);
    padding: 12px 16px;
    background: var(--vp-c-grey-soft);
    border: none;
    border-radius: 6px;
    font-size: 16px;
    margin: 12px 0;
}

.button-container {
    display: flex;
    gap: 16px;
}

.button {
    display: flex;
    height: 45px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    margin: 12px 0;
    flex: 1;
}
</style>
