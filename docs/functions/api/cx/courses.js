export function onRequestGet({ request, params, env }) {
    return fetch(`${env.host}/api/courses`, {
        headers: request.headers,
    })
}
