from starlette.types import Scope, Receive, Send, ASGIApp
from fastapi import Request
import httpx

client = httpx.AsyncClient(http2=True, timeout=5.0)


def RealIPMiddleware(app: ASGIApp) -> ASGIApp:
    """设置真实 IP 中间件"""

    async def middleware(scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] == "http":
            request = Request(scope, receive=receive)
            if ip := request.headers.get("X-Real-IP"):
                scope["client"] = (ip, scope["client"][1])
            elif ips := request.headers.get("X-Forwarded-For"):
                scope["client"] = (ips.split(",")[0], scope["client"][1])

        await app(scope, receive, send)

    return middleware
