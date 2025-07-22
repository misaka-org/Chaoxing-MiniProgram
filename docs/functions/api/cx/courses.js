const host = "http://111.119.235.199:24123"

export function onRequestGet({ request, params, env }) {
    return fetch(`${host}/api/courses`, {
        headers: request.headers,
    })
}
