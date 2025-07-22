from fastapi.responses import Response, JSONResponse, RedirectResponse
from fastapi import FastAPI, HTTPException, Request, APIRouter
from typing import Dict
import uvicorn
import httpx
import time

app = FastAPI()
api = APIRouter()
client = httpx.AsyncClient(
    http2=True,
    timeout=15.0,
    headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    },
)
cookies: Dict[int, httpx.Cookies] = {}


@api.get("/state")
async def _(
    request: Request,
) -> Response:
    return {
        "status": 0,
        "msg": "ok",
        "data": {
            "ip": request.client.host,
        },
    }


@api.get("/login")
async def _(
    request: Request,
    username: int,
    password: str,
):
    global cookies

    resp = await client.get(
        url="https://passport2-api.chaoxing.com/v11/loginregister",
        params={
            "cx_xxt_passport": "json",
            "roleSelect": "true",
            "uname": username,
            "code": password,
            "loginType": "1",
        },
    )
    res: dict = resp.json()
    cookies[username] = resp.cookies

    response = JSONResponse(
        content=res,
        headers={
            "Access-Control-Allow-Origin": request.headers.get("Origin", "*"),
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST",
        },
    )
    for cookie in resp.cookies:
        response.set_cookie(
            key=cookie,
            value=resp.cookies[cookie],
            httponly=True,
            secure=False,
            samesite="lax",
            expires=int(time.time() + 3600 * 24),
        )
    return response


@api.get("/courses")
async def _(
    request: Request,
):
    resp = await client.get(
        url="https://mooc1-api.chaoxing.com/mycourse/backclazzdata",
        params={
            "view": "json",
            "rss": "1",
        },
        cookies=dict(request.cookies),
    )
    return resp.json()


@api.get("/pan/token")
async def _(
    request: Request,
):
    resp = await client.get(
        url="https://pan-yz.chaoxing.com/api/token/uservalid",
        cookies=dict(request.cookies),
    )
    res: dict = resp.json()
    return JSONResponse(
        content=res
        | {
            "puid": request.cookies.get("UID"),
        },
        headers={
            "Access-Control-Allow-Origin": request.headers.get("Origin", "*"),
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST",
        },
    )


app.include_router(api, prefix="/api", tags=["API"])


@app.exception_handler(HTTPException)
async def _(request: Request, exc: HTTPException):
    if exc.status_code == 404:
        return RedirectResponse(
            url="https://doc.micono.eu.org/tools/web.html",
            status_code=302,
        )
    else:
        return JSONResponse(
            {
                "status": -1,
                "msg": exc.detail,
                "data": None,
                "time": int(time.time()),
            },
            status_code=exc.status_code,
        )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
