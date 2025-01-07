
from fastapi.responses import JSONResponse, RedirectResponse, Response
from fastapi import FastAPI, Body, APIRouter, Request
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import datetime
import uvicorn
import socket
import httpx


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(lifespan=lifespan, redoc_url=None, docs_url=None)


@app.get("/api/login")
async def login(request: Request, username: str, password: str):
    """ 登录 """
    async with httpx.AsyncClient() as client:
        resp = await client.get("https://passport2-api.chaoxing.com/v11/loginregister", params={
            "cx_xxt_passport": "json",
            "roleSelect": "true",
            "uname": username,
            "code": password,
            "loginType": "1",
        })
    resp2 = JSONResponse(resp.json())
    for key, value in resp.cookies.items():
        resp2.set_cookie(key, value, max_age=3600*24*7)
    return resp2


@app.get("/api/get_courses")
async def get_courses(request: Request):
    """ 获取课程列表 """
    async with httpx.AsyncClient(cookies=dict(request.cookies)) as client:
        resp = await client.get("https://mooc1-api.chaoxing.com/mycourse/backclazzdata", params={
            'view': 'json',
            'rss': '1',
        })
    return JSONResponse(resp.json())


app.mount("/", StaticFiles(directory="public"), name="public")


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    if exc.status_code == 404:
        return RedirectResponse("/index.html", status_code=302)
    else:
        return JSONResponse({
            "status": -1,
            "msg": exc.detail,
            "data": None,
            "time": int(datetime.datetime.now().timestamp()),
        }, status_code=exc.status_code)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse({
        "status": -1,
        "msg": "参数错误, 请检查参数",
        "data": {
            "body": exc.body,
            "query": {
                "raw": str(request.query_params),
                "parsed": dict(request.query_params),
            },
            "error": exc.errors(),
        },
        "time": int(datetime.datetime.now().timestamp()),
    }, status_code=422)


@app.exception_handler(Exception)
async def exception_handler(request: Request, exc: Exception):
    return JSONResponse({
        "status": -1,
        "msg": "服务器内部错误, 请联系管理员! 邮箱: admin@misaka-network.top",
        "time": int(datetime.datetime.now().timestamp()),
    }, status_code=500)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    starttime = datetime.datetime.now()
    response: Response = await call_next(request)
    endtime = datetime.datetime.now()
    response.headers["X-Process-Time"] = str((endtime - starttime).total_seconds())
    response.headers["X-Client-Host"] = request.client.host
    return response


def get_localhost():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception as e:
        return None
    else:
        return ip
    finally:
        s.close()


if __name__ == "__main__":
    starttime = datetime.datetime.now().strftime(r"%Y-%m-%d %H:%M:%S")
    from utils.logger import set_log_formatter
    set_log_formatter()
    import logging as lg
    logging = lg.getLogger("uvicorn")
    try:
        uvicorn.run(
            app="app:app",
            host="0.0.0.0",
            port=8080,
            reload=False,
            forwarded_allow_ips="*",
            log_config=None,
            workers=1,
            headers=[
                ("Server", "Misaka Network Distributed Server"),
                ("X-Powered-By", "Misaka Network Studio"),
                ("X-Statement", "This service is provided by Misaka Network Studio. For complaints/cooperation, please email admin@misaka-network.top"),
                ("X-Copyright", "© 2024 Misaka Network Studio. All rights reserved."),
                ("X-Server-Start-Time", starttime),
            ],
        )
    except KeyboardInterrupt:
        logging.info("Ctrl+C 终止服务")
