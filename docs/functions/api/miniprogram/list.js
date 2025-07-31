export function onRequestGet({ request, params, env }) {
    return fetch(`${env.host}/api/task/list`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    })
}
