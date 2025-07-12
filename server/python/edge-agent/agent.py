from typing import Dict, Any
import websockets
import logging
import asyncio
import httpx
import json
import os

SERVER_WS_URL = os.getenv("SERVER_WS_URL", "ws://localhost:8000/ws")
HTTP_TIMEOUT = int(os.getenv("HTTP_TIMEOUT", 30))

logging.basicConfig(level=logging.INFO)


class EdgeAgent:
    def __init__(self):
        self._websocket = None
        self._client = httpx.AsyncClient(http2=True, timeout=HTTP_TIMEOUT)
        self._tasks: set[asyncio.Task] = set()

    async def connect(self):
        """连接到服务端WebSocket"""
        logging.info("Connecting to WebSocket server...")
        while True:
            try:
                self._websocket = await websockets.connect(
                    SERVER_WS_URL,
                    ping_interval=5,
                    ping_timeout=10,
                )
                await self.receive_loop()
            except websockets.ConnectionClosed:
                logging.error("WebSocket connection closed, retrying...")
                await asyncio.sleep(5)
            except Exception as e:
                logging.error(f"WebSocket connection error: {str(e)}")
                await asyncio.sleep(5)

    async def receive_loop(self):
        """持续接收服务端的代理请求"""
        while self._websocket:
            try:
                message = await self._websocket.recv()
                data: dict = json.loads(message)

                task = asyncio.create_task(self.handle_proxy_request(**data))
                self._tasks.add(task)
                task.add_done_callback(self._tasks.discard)
            except json.JSONDecodeError:
                logging.error("接收到无效的JSON数据")
            except KeyError as e:
                logging.error(f"请求数据缺少必要字段: {str(e)}")

    async def handle_proxy_request(
        self,
        request_id: str,
        payload: Dict[str, Any],
    ) -> Dict[str, Any]:
        """处理具体的代理请求"""
        try:
            response = await self._client.request(
                method=payload["method"],
                url=payload["url"],
                headers=payload["headers"],
                content=payload["body"].encode("utf-8"),
                timeout=HTTP_TIMEOUT,
            )

            await self._websocket.send(
                json.dumps(
                    {
                        "request_id": request_id,
                        "payload": {
                            "status_code": response.status_code,
                            "headers": dict(response.headers),
                            "body": response.text,
                        },
                    }
                )
            )

        except httpx.HTTPError as e:
            await self._websocket.send(
                json.dumps(
                    {
                        "request_id": request_id,
                        "payload": {
                            "status_code": 502,
                            "headers": {},
                            "body": f"HTTP请求失败: {str(e)}",
                        },
                    }
                )
            )


if __name__ == "__main__":
    agent = EdgeAgent()
    asyncio.run(agent.connect())
