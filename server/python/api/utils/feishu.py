from fastapi.exceptions import HTTPException
from typing import Any
import httpx
import time
import os


APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")
APP_TOKEN = os.getenv("APP_TOKEN")
TABLE_ID = os.getenv("TABLE_ID")
VIEW_ID = os.getenv("VIEW_ID")

cache_values: dict[str, Any] = {}
cache_expire: dict[str, float] = {}


async def get_access_token(client: httpx.AsyncClient) -> str:
    """获取访问令牌"""
    global cache_values, cache_expire

    if "access_token" in cache_values and time.time() < cache_expire["access_token"]:
        return cache_values["access_token"]

    resp = await client.post(
        url="https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal",
        json={
            "app_id": APP_ID,
            "app_secret": APP_SECRET,
        },
    )
    res: dict = resp.json()

    if res["code"] != 0:
        raise HTTPException(status_code=400, detail=f"获取访问令牌失败: {resp.text}")

    cache_values["access_token"] = res["data"]["app_access_token"]
    cache_expire["access_token"] = time.time() + res["data"]["expire"] - 300
    return cache_values["access_token"]


async def list_records(client: httpx.AsyncClient) -> list[dict]:
    """列出所有问卷填写结果"""
    global cache_values, cache_expire

    if "records" in cache_values and time.time() < cache_expire["records"]:
        return cache_values["records"]

    resp = await client.get(
        url=f"https://open.feishu.cn/open-apis/bitable/v1/apps/{APP_TOKEN}/tables/{TABLE_ID}/fields",
        headers={
            "Authorization": f"Bearer {await get_access_token(client)}",
        },
        params={
            "view_id": VIEW_ID,
            "page_size": 99,
        },
    )
    res: dict = resp.json()

    resp = await client.post(
        url=f"https://open.feishu.cn/open-apis/bitable/v1/apps/{APP_TOKEN}/tables/{TABLE_ID}/records/search",
        headers={
            "Authorization": f"Bearer {await get_access_token(client)}",
        },
        params={
            "user_id_type": "user_id",
            "page_size": 9999,
        },
        json={
            "view_id": VIEW_ID,
            "field_names": [i["field_name"] for i in res["data"]["items"]],
            "sort": [
                {
                    "field_name": "提交时间",
                    "desc": True,
                }
            ],
            "automatic_fields": True,
        },
    )
    res: dict = resp.json()

    cache_values["records"] = res["data"]["items"]
    cache_expire["records"] = time.time() + 60  # 1 minute
    return cache_values["records"]
