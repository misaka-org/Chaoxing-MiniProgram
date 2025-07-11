<template>
    <div class="table-wrapper">
        <p v-if="title" class="table-title">{{ title }}</p>

        <input v-model="search" type="search" placeholder="支持模糊搜索 AppID / 备注 / 上传结果" class="search-input"
            @focus="focused = true" @blur="focused = false" :class="{ focused }" />

        <div class="table-scroll">
            <div class="table-content">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>操作</th>
                            <th>AppID</th>
                            <th>上传结果</th>
                            <th>备注</th>
                            <th>手机号</th>
                            <th>Secret</th>
                            <th>填写问卷时间</th>
                            <th>修改问卷时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="msg">
                            <td colspan="9" class="no-data">{{ msg }}</td>
                        </tr>
                        <tr v-for="item in filteredList" :key="item.appid" :class="[item['style-class']]">
                            <td>{{ item.index }}</td>
                            <td @click="upgrade(item)" class="can-click">{{ item.button }}</td>
                            <td class="item-appid">{{ item.appid }}</td>
                            <td>{{ item.uploadtime }}</td>
                            <td>{{ item.remark }}</td>
                            <td>{{ item.mobile }}</td>
                            <td>{{ item.secret }}</td>
                            <td>{{ item.createtime }}</td>
                            <td>{{ item.updatetime }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<!-- Script Setup -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const list = ref([]);
const title = ref('');
const msg = ref('正在加载数据，请稍候...');
const search = ref(localStorage.getItem('uploadTableSearch') || '');
const focused = ref(false);
const host = "https://doc.micono.eu.org";

watch(search, (newVal) => {
    if (window && window.localStorage) localStorage.setItem('uploadTableSearch', newVal)
})

const filteredList = computed(() => {
    const keyword = search.value.trim().toLowerCase().substring(-8);
    const _list = [...list.value].map((item, index) => ({
        ...item,
        "updatetime": item.updatetime == item.createtime ? "未曾修改" : item.updatetime,
        "uploadtime": item.uploadtime ? `${item.uploadtime} ${item.result}` : "排队等待上传",
        "secret": item.secret ? "已配置" : "未配置",
        "style-class": item.result.includes('失败') ? 'item-fail' : '',
        "button": item.result.includes("成功") ? '强制更新' : '申请重传',
        "index": index + 1,
    })).reverse();

    if (!keyword)
        return _list;
    else
        return _list.filter(item => item.appid.includes(keyword) || item.remark.includes(keyword) || item.result.includes(keyword) || String(item.index).includes(keyword));
})

onMounted(() => {
    msg.value = '正在刷新数据，请稍候';
    const timer = setInterval(() => {
        if ((msg.value.match(/\./g) || []).length >= 10)
            msg.value = '正在刷新数据，请稍候';
        else
            msg.value += '.';
    }, 1000);

    if (window && window.localStorage) {
        const savedData = localStorage.getItem('uploadTableData');
        if (savedData) list.value = JSON.parse(savedData)
    }

    fetch(`${host}/api/list`, {
        method: 'GET',
        credentials: 'omit',
    })
        .then(resp => resp.json())
        .then(res => {
            clearInterval(timer);
            if (res.status === 0 && Array.isArray(res.data)) {
                list.value = res.data;
                msg.value = list.value.length ? '' : '暂无数据，请稍后再试！';
                title.value = `小程序版本号：${res.tag}，共计 ${list.value.length} 条问卷数据，最近代码更新时间：${res.updatetime}`;
                if (window && window.localStorage) localStorage.setItem('uploadTableData', JSON.stringify(list.value));
            }
        })
        .catch(err => {
            clearInterval(timer);
            console.error('数据加载失败:', err);
            msg.value = '数据加载失败，请稍后重试！';
        })
})

const upgrade = (item) => {
    fetch(`${host}/api/force-upload/${item.appid.slice(-8)}`, {
        method: 'GET',
        credentials: 'omit',
    })
        .then(resp => resp.json())
        .then(res => {
            alert(`${item.appid} ${res.msg}`);
            window.location.reload();
        })
}
</script>

<!-- Style -->
<style scoped>
.table-title {
    font-size: 14px;
    opacity: 0.5;
    font-weight: 600;
    margin: 16px 0;
}

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

.search-input {
    min-width: min(500px, 100%);
    max-width: 100%;
    padding: 12px 16px;
    background: var(--vp-c-grey-soft);
    border: none;
    border-radius: 4px;
    font-size: 16px;
    margin: 12px 0;
}

.can-click {
    cursor: pointer;
    color: var(--vp-c-brand);
    text-decoration: underline;
}

.item-fail {
    color: #b71c1c;
    background: rgba(255, 115, 0, 0.2);
}

.item-appid {
    font-family: 'Roboto Mono', 'Fira Code', 'JetBrains Mono', Consolas, 'Courier New', monospace;
}
</style>
