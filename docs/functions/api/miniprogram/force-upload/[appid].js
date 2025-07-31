const resp = msg => new Response(JSON.stringify({
    status: -1,
    msg,
}), {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    status: 400,
});

export function onRequestGet({ request, params, env }) {
    if (!params.appid)
        return resp("AppID 不能为空");
    else if (params.appid.length > 8)
        return resp("AppID 必须不大于 8 位");
    else
        return fetch(`${env.host}/api/task/force?appid=${params.appid}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
}
