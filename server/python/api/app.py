from fastapi.responses import RedirectResponse
from contextlib import asynccontextmanager
from fastapi import FastAPI
import datetime
import logging
import uvicorn

from middleware import RealIPMiddleware
from const import client

from router.base import router as base_router
from router.task import router as task_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
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
