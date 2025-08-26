<!-- Script Setup -->
<script setup lang="js">
import { ref, computed } from 'vue';
import { useDarkMode } from "vuepress-theme-hope/client";
import { NForm, NFormItem, NInput, NButton, NConfigProvider, darkTheme } from 'naive-ui';

const { isDarkMode } = useDarkMode();
const naiveTheme = computed(() => (isDarkMode.value ? darkTheme : null));

const host = "https://cx.micono.eu.org";
const form = ref({})

const rules = {
    appid: {
        required: true,
        validator(rule, value) {
            console.info(rule, value, "debug")
            value = (value || "").trim();
            if (!value)
                return new Error("需要填写 AppID");
            else if (!value.startsWith("wx") || value.length != 18)
                return new Error("AppID 格式不正确");
            return true;
        },
        trigger: ["input", "blur"],
    },
    secret: {
        required: true,
        validator: (rule, value) => {
            return new Promise((resolve, reject) => {
                value = (value || "").trim();
                if (!form.value.appid)
                    reject("请先填写上方的 AppID");
                else if (!value)
                    reject("需要填写 AppSecret");
                else if (value.length != 32)
                    reject("AppSecret 格式不正确");
                else
                    fetch(`https://proxy.yangrucheng.top/api.weixin.qq.com/cgi-bin/stable_token`, {
                        "method": "POST",
                        "body": JSON.stringify({
                            "grant_type": "client_credential",
                            "appid": form.value.appid,
                            "secret": value,
                            "force_refresh": false,
                        })
                    })
                        .then(resp => resp.json())
                        .then(res => {
                            if (res.access_token)
                                resolve();
                            else
                                reject(`验证失败：${res.errmsg}`);
                        })
            });
        },
        trigger: ["input"],
    },
    key: {
        required: true,
    },
    mobile: [{
        required: true,
        validator: (rule, value) => {
            value = (value || "").trim();
            if (!value)
                return new Error("需要填写手机号");
            else if (value.length != 11)
                return new Error("手机号格式不正确");
            return true;
        },
        trigger: ["input", "blur"],
    }, {
        level: 'warning',
        validator: (rule, value) => {
            value = (value || "").trim();
            if (!value.startsWith("1"))
                return new Error("填错手机号将无法进入小程序自定义信息修改页");
            return true;
        },
        trigger: ["input", "blur"],

    }]
};


const readKeyFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.key';
    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = event =>
                form.value.key = event.target.result;
            reader.onerror = () =>
                console.error('文件读取失败:', reader.error);
            reader.readAsText(file);
        }
    };
    fileInput.click();
}

const submit = e => {
    e.preventDefault();
    form.value?.validate((errors, { warnings }) => {
        if (errors) {
            alert("请检查输入内容！")
            return;
        }
        fetch(`${host}/api/task/submit`, {
            "method": "POST",
            "body": JSON.stringify({
                "appid": form.value.appid.trim(),
                "secret": form.value.secret.trim(),
                "key": form.value.key.trim(),
                "mobile": form.value.mobile.trim(),
                "name": form.value.name.trim(),
            })
        })
            .then(resp => resp.json())
            .then(res => {
                console.info("提交小程序", res);
                alert(res.msg)
            })
    });
};

</script>

<!-- HTML -->
<template>
    <NConfigProvider :theme="naiveTheme">
        <div class="container">
            <NForm :model="form" ref="form" label-placement="top" :rules="rules">
                <NFormItem label="appid" path="appid">
                    <template #label>
                        <span class="label-title">AppID</span>
                    </template>
                    <NInput v-model:value="form.appid" placeholder="请输入 AppID" />
                </NFormItem>
                <NFormItem label="secret" path="secret">
                    <template #label>
                        <span class="label-title">AppSecret</span>
                    </template>
                    <NInput v-model:value="form.secret" placeholder="请输入 AppSecret" />
                </NFormItem>
                <NFormItem label="key" path="key">
                    <template #label>
                        <span class="label-title">小程序代码上传密钥</span>
                        <NButton class="label-description" @click="readKeyFile">从文件中读取</NButton>
                    </template>
                    <NInput v-model:value="form.key" class="width-font" type="textarea" disabled
                        placeholder="点击上方按钮从文件读取" style="margin-top: 8px" />
                </NFormItem>
                <NFormItem label="mobile" path="mobile">
                    <template #label>
                        <span class="label-title">手机号</span>
                        <span class="label-description">你的学习通手机号，用于管理此小程序</span>
                    </template>
                    <NInput v-model:value="form.mobile" placeholder="请输入手机号" />
                </NFormItem>
                <NFormItem label="name" path="name">
                    <template #label>
                        <span class="label-title">小程序名称</span>
                        <span class="label-description">（选填）</span>
                    </template>
                    <NInput v-model:value="form.name" placeholder="请输入小程序名称" />
                </NFormItem>
                <NButton type="primary" size="large" block @click="submit">提交</NButton>
            </NForm>
        </div>
    </NConfigProvider>
</template>

<!-- Style -->
<style scoped>
.container {
    padding: 24px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
}

.label-title {
    margin: 8px 0;
    font-size: 16px;
    font-weight: 600;
}

.label-description {
    margin: 8px 0;
    margin-left: 8px;
    font-size: 12px;
    font-weight: 600;
    opacity: 0.6;
}

.width-font {
    font-family: "Courier New", Consolas, monospace;
}
</style>
