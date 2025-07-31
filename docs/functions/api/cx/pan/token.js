export function onRequestGet({ request, params, env }) {
    return fetch(`${env.host}/api/pan/token`, {
        headers: request.headers,
    })
}
