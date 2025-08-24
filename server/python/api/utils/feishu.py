from fastapi.exceptions import HTTPException
from typing import Any
import datetime
import asyncio
import logging
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

    cache_values["access_token"] = res["app_access_token"]
    cache_expire["access_token"] = time.time() + res["expire"] - 300
    logging.info(f"获取访问令牌成功: {cache_values['access_token']}")
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
    resp.raise_for_status()
    res1: dict = resp.json()
    if res1["code"] != 0:
        logging.error(f"获取字段失败 {resp.text}")
        return []

    _list = []
    page_token = ""
    while True:
        resp = await client.post(
            url=f"https://open.feishu.cn/open-apis/bitable/v1/apps/{APP_TOKEN}/tables/{TABLE_ID}/records/search",
            headers={
                "Authorization": f"Bearer {await get_access_token(client)}",
            },
            params={
                "user_id_type": "user_id",
                "page_size": 500,
                "page_token": page_token,
            },
            json={
                "view_id": VIEW_ID,
                "field_names": [i["field_name"] for i in res1["data"]["items"]],
                "sort": [
                    {
                        "field_name": "提交时间",
                        "desc": True,
                    }
                ],
                "automatic_fields": False,
            },
        )
        res: list = resp.json()
        _list += [
            {
                **item["fields"],
                "record_id": item["record_id"],
            }
            for item in res["data"]["items"]
        ]

        if res["data"]["has_more"]:
            page_token = res["data"]["page_token"]
        else:
            break

    _list = [
        {
            "id": int(item["序号(ID)"]),
            "appid": "".join(
                j.get("text", "") for j in item.get("AppID(小程序ID)", [])
            ),
            "key": "".join(
                j.get("text", "") for j in item.get("小程序代码上传密钥", [])
            ),
            "secret": "".join(
                j.get("text", "") for j in item.get("AppSecret(小程序密钥)", [])
            ),
            "name": "".join(j.get("text", "") for j in item.get("小程序名称", [])),
            "mobile": "".join(
                j.get("text", "") for j in item.get("手机号（学习通的）", [])
            ),
            "created_at": datetime.datetime.fromtimestamp(
                item["提交时间"] / 1000
            ).strftime(r"%Y-%m-%d %H:%M:%S"),
            "status": "".join(j.get("text", "") for j in item.get("状态", [])),
            "record_id": item["record_id"],
        }
        for item in _list
    ]
    _list = [
        item
        | {
            "appid": item["appid"].strip(),
            "key": item["key"].strip(),
            "secret": item["secret"].strip(),
            "name": item["name"].strip(),
            "mobile": item["mobile"].strip(),
            "status": item["status"].strip() or "排队中，请耐心等待",
        }
        for item in _list
    ]

    cache_values["records"] = _list
    cache_expire["records"] = time.time() + 60
    return cache_values["records"]


async def update_record(client: httpx.AsyncClient, id: int, **body: dict) -> bool:
    _list = await list_records(client)
    record = next((item for item in _list if item["id"] == id), None)
    if not record:
        raise HTTPException(status_code=400, detail="记录未找到")

    logging.debug(f"更新记录 {record['record_id']} {' '.join(body.keys())}")

    await asyncio.sleep(0.5)
    resp = await client.put(
        url=f"https://open.feishu.cn/open-apis/bitable/v1/apps/{APP_TOKEN}/tables/{TABLE_ID}/records/{record['record_id']}",
        headers={
            "Authorization": f"Bearer {await get_access_token(client)}",
        },
        json={
            "fields": body,
        },
    )
    res: dict = resp.json()
    if res["code"] != 0:
        logging.warning(f"修改未成功 {body} {res}")
    return res["code"] == 0


async def update_all_records(client: httpx.AsyncClient, **body: dict) -> bool:
    def chunked(iterable: list, size: int):
        for i in range(0, len(iterable), size):
            yield iterable[i : i + size]

    _list = await list_records(client)
    logging.debug(f"更新所有记录 {len(_list)} 条，字段：{' '.join(body.keys())}")

    for batch in chunked(_list, 500):
        await asyncio.sleep(0.5)
        resp = await client.post(
            url=f"https://open.feishu.cn/open-apis/bitable/v1/apps/{APP_TOKEN}/tables/{TABLE_ID}/records/batch_update",
            params={"ignore_consistency_check": True},
            headers={"Authorization": f"Bearer {await get_access_token(client)}"},
            json={
                "records": [
                    {"record_id": item["record_id"], "fields": body} for item in batch
                ]
            },
        )
        resp.raise_for_status()
        res: dict = resp.json()
        if res["code"] != 0:
            return False

    return True
