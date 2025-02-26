"use server";

const Headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
};

const CourseUrl = "https://mooc1-api.chaoxing.com/mycourse/backclazzdata";


export async function getCourseList(cookies) {
    const resp = await fetch(
        `${CourseUrl}?${new URLSearchParams({
            'view': 'json',
            'rss': '1',
        })}`,
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
    return res;
}