"use server";

const Headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
};

const PanTokenUrl = "https://pan-yz.chaoxing.com/api/token/uservalid";


export async function getPanToken(cookies) {
    const puid = cookies.find(cookie => cookie.key === "UID").value;

    const resp = await fetch(
        PanTokenUrl,
        {
            method: "GET",
            headers: {
                ...Headers,
                "Cookie": cookies.map(cookie => `${cookie.key}=${cookie.value}`).join("; "),
            },
            credentials: "include",
        }
    );
    const res = await resp.json();

    return Object.assign(res, {
        puid: puid,
    });
}