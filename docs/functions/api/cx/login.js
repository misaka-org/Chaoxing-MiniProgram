const host = "http://111.119.235.199:24123"

export function onRequestGet({ request, params, env }) {
    const url = new URL(request.url);
    return fetch(`${host}/api/login${url.search}`, {
        headers: request.headers,
    })
}
