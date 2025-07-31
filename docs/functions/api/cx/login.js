export function onRequestGet({ request, params, env }) {
    const url = new URL(request.url);
    return fetch(`${env.host}/api/login${url.search}`, {
        headers: request.headers,
    })
}
