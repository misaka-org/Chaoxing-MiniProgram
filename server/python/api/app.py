from fastapi.responses import RedirectResponse, JSONResponse, Response
from fastapi.exceptions import HTTPException
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
import datetime
import logging
import uvicorn
import asyncio
import time

from middleware import RealIPMiddleware
from router.task import worker
from const import client

from router.base import router as base_router
from router.task import router as task_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(worker())
    yield
    task.cancel()
    await client.aclose()


app = FastAPI(lifespan=lifespan, redoc_url=None, docs_url=None)
app.add_middleware(RealIPMiddleware)


app.include_router(base_router, prefix="/api", tags=["API"])
app.include_router(task_router, prefix="/api/task", tags=["Task"])


@app.get("/")
@app.get("/image")
@app.get("/login")
async def root() -> RedirectResponse:
    return RedirectResponse("https://doc.micono.eu.org/tools/web.html", status_code=301)


@app.get("/favicon.ico")
async def favicon() -> RedirectResponse:
    return RedirectResponse("https://cdn.micono.eu.org/icon/logo.png", status_code=301)


@app.exception_handler(HTTPException)
async def _(request: Request, exc: HTTPException):
    if exc.status_code == 204:
        return Response(status_code=204)
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


@app.exception_handler(Exception)
async def _(request: Request, exc: Exception):
    return JSONResponse(
        {
            "status": -1,
            "msg": "网络拥挤, 请稍后再试!",
            "time": int(time.time()),
        },
        status_code=500,
    )


if __name__ == "__main__":
    from utils.logger import set_log_formatter

    now = datetime.datetime.now()
    set_log_formatter()
    logging.info(f"服务启动时间: {now.strftime(r'%Y-%m-%d %H:%M:%S')}")

    try:
        uvicorn.run(
            app="app:app",
            host="0.0.0.0",
            port=8000,
            reload=False,
            log_config=None,
            workers=1,
            headers=[
                ("X-Server-Start-Time", now.strftime(r"%Y-%m-%d %H:%M:%S")),
                ("Access-Control-Allow-Credentials", "true"),
                ("Access-Control-Allow-Methods", "GET, POST"),
            ],
        )
    except KeyboardInterrupt:
        logging.info("Ctrl+C 终止服务")
