"use server";

import { CookieJar } from 'tough-cookie';


const Headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
};

const LoginUrl = "https://passport2-api.chaoxing.com/v11/loginregister";


export async function login(username, password) {
    const resp = await fetch(
        `${LoginUrl}?${new URLSearchParams({
            "cx_xxt_passport": "json",
            "roleSelect": "true",
            "uname": username,
            "code": password,
            "loginType": "1",
        })}`,
        {
            method: "GET",
            headers: Headers,
            credentials: "include",
        }
    );
    const res = await resp.json();
    console.info(res?.mes || "", username, password)

    const jar = new CookieJar();
    resp.headers.get('set-cookie').split(',').forEach(cookie => {
        try {
            jar.setCookieSync(cookie, 'https://mobilelearn.chaoxing.com');
        } catch (e) { }
    });

    return {
        ...res,
        "cookies": jar.toJSON().cookies,
    };
}