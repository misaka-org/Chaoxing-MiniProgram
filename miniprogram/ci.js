const ci = require('miniprogram-ci');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(express.urlencoded({
    extended: true
}));

const task = {
    "appid": null,
    "result": null,
};

/**
 * 上传小程序
 */
app.post('/ci/upload', (req, res) => {
    const {
        appid,
        key,
        mobile,
        callback
    } = req.body;

    if (task.appid) {
        res.json(task)
        if (task.result != 'doing')
            process.exit(0);
    } else {
        task.appid = appid;
        task.result = "doing";
        res.json(task)

        console.info(` ------ ✨ 开始执行编译上传 ${appid} ${new Date().toLocaleString()} ------ `);
        upload(appid, key, mobile)
            .then(res => {
                task.appid = res.appid;
                task.result = res.result;
                task.mobile = mobile || null;
                task.key = res.key || null;
                console.info(` ------ 🎉 小程序上传完成 ${res.appid} ${res} ------ `);
                if (res.result == "done" && callback)
                    axios.post(callback, task, {
                        params: {
                            "appid": appid,
                        }
                    })
                        .then(resp => { })
                        .catch(e => { });
            })
    }
});

/**
 * 获取任务状态
 */
app.get("/ci/status", (req, res) => {
    res.json({
        "status": 0,
        "msg": `服务正常，当前任务 ${task.appid || "无"} ${task.result || ""}`,
    })
})

/**
 * 停止服务
 */
app.post('/ci/stop', (req, res) => {
    task.result = "fail";
    res.json(task);
    process.exit(0);
})

const server = app.listen(port, () => {
    console.info(` ------ ✨ CI服务已启动，端口 ${port}，正在等待任务 ------ `);
});
server.setTimeout(3 * 60 * 1000);
process.on('SIGTERM', () => {
    server.close(() => { })
})

/**
 * 上传小程序
 * @param {*} appid 
 * @param {*} privateKey 
 * @param {*} username 
 * @returns 
 */
const upload = (appid, privateKey, username) => {
    const formate = (key) => {
        key = key.replace(/\n/g, '').replace(/\r/g, '');
        const header = "-----BEGIN RSA PRIVATE KEY-----";
        const footer = "-----END RSA PRIVATE KEY-----";
        key = key.replace(header, '').replace(footer, '').trim();
        let formattedKey = '';
        for (let i = 0; i < key.length; i += 64)
            formattedKey += key.substr(i, 64) + '\n';
        return header + '\n' + formattedKey + footer;
    }
    return new Promise(async resolve => {
        const privateKeyPath = `/tmp/miniprogram-${appid}.private.key`;
        privateKey = formate(privateKey);
        fs.writeFileSync(privateKeyPath, privateKey);
        fs.writeFileSync("./utils/ci.config.js", `module.exports = {username: '${username}'}`)
        try {
            const now = new Date();
            await ci.upload({
                project: new ci.Project({
                    appid: appid,
                    type: 'miniProgram',
                    projectPath: './',
                    privateKeyPath: privateKeyPath,
                    ignores: [],
                }),
                version: `开源版 v0.${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`,
                robot: 5,
                desc: "御坂网络 Misaka",
                setting: {
                    es6: true,
                    es7: true,
                    minify: true,
                    codeProtect: true,
                    ignoreUploadUnusedFiles: true,
                },
                onProgressUpdate: res => {
                    if (res._status != "doing") {
                        fs.unlink(privateKeyPath, () => { });
                        console.info(` ------ ✨ 编译上传结果 ${res} ------ `);
                        resolve(Object.assign(res, {
                            "appid": appid,
                            "result": res._status,
                            "key": privateKey,
                        }))
                    }
                }
            })
        } catch (err) {
            resolve({
                'appid': appid,
                "result": String(err),
            })
        }

    })
}