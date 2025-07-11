const host = "http://113.45.185.136:24800";

export function onRequestGet({ request, params, env }) {
    return fetch(`${host}/api/list`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    })
}
