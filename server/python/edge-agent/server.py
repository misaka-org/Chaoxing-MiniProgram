from fastapi import FastAPI, WebSocket, Request, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from typing import List
import logging
import asyncio
import uvicorn
import random

app = FastAPI()


class AgentResponse(BaseModel):
    body: str
    status_code: int
    headers: dict


class AgentManager:
    def __init__(self):
        self._agents: List[WebSocket] = []
        self._futures: dict[str, asyncio.Future] = {}
        self._tasks: set[asyncio.Task] = set()

    def add_agent(self, agent: WebSocket):
        """新增代理连接"""
        self._agents.append(agent)
        task = asyncio.create_task(self._handle_agent(agent))
        task.add_done_callback(self._tasks.discard)
        self._tasks.add(task)

    def remove_agent(self, agent: WebSocket):
        """移除代理连接"""
        self._agents.remove(agent)

    def _get_agent(self) -> WebSocket:
        """随机选择一个可用的代理连接"""
        if not len(self._agents):
            raise HTTPException(status_code=400, detail="没有可用的代理连接")
        return random.choice(self._agents)

    async def _handle_agent(self, agent: WebSocket):
        """处理代理连接的消息接收"""
        try:
            while True:
                resp: dict = await agent.receive_json()
                request_id = resp.get("request_id")
                response = AgentResponse.model_validate_json(resp["payload"])
                self._futures[request_id].set_result(
                    Response(
                        content=response.body.encode("utf-8"),
                        status_code=response.status_code,
                        headers=response.headers,
                    )
                )
        except Exception as e:
            if agent in self._agents:
                logging.error(msg=f"代理连接异常，移除连接 {e}")
                self.remove_agent(agent)

    async def request(
        self,
        request: Request,
        path: str,
        timeout: float = 60,
    ) -> Response:
        """请求代理处理"""
        target = self._get_agent()
        request_id = request.headers.get(
            "X-Request-ID", str(random.randint(100000, 999999))
        )

        path = path or request.url.path
        payload = {
            "method": request.method,
            "url": f"https://mobilelearn.chaoxing.com/{path}",
            "headers": dict(request.headers),
            "body": (await request.body()).decode("utf-8"),
        }

        await target.send_json(
            data={
                "payload": payload,
                "request_id": request_id,
            }
        )

        future = asyncio.get_event_loop().create_future()
        self._futures[request_id] = future
        try:
            return await asyncio.wait_for(future, timeout)
        finally:
            try:
                del self._futures[request_id]
            except KeyError:
                pass


managers = AgentManager()


@app.websocket("/agent/ws")
async def agent_connection(websocket: WebSocket):
    await websocket.accept()
    managers.add_agent(websocket)


@app.api_route(
    "/edge-proxy/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"]
)
async def _(
    request: Request,
    path: str,
):
    """处理代理请求"""
    return await managers.request(request, path=path, timeout=60)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
