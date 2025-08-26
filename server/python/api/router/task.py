from fastapi.exceptions import HTTPException
from fastapi import APIRouter, Request, Body
from Crypto.PublicKey import RSA
from pydantic import BaseModel
import datetime
import asyncio
import time
import os

from utils.storage import (
    list_records,
    update_status,
    update_all_status,
    update_record,
    insert_record,
)
from utils.logger import logging
from const import client

UPLOAD_SERVER = os.getenv("UPLOAD_SERVER")
CALLBACK_SERVER = os.getenv("CALLBACK_SERVER")

router = APIRouter()


@router.get("/state", description="获取当前状态")
async def _(
    request: Request,
):
    return {
        "status": 0,
        "data": {
            "ip": request.client.host,
            "time": int(time.time()),
        },
    }


@router.get("/list", description="安全列出所有问卷填写结果")
async def _(
    request: Request,
):
    _list = list_records(client)
    return {
        "status": 0,
        "data": [
            {
                "id": item["id"],
                "appid": item["appid"][:4] + "******" + item["appid"][-8:],
                "name": item["name"],
                "secret": len(item["secret"]) == 30,
                "mobile": item["mobile"][:3] + "******" + item["mobile"][-2:],
                "create_at": item["create_at"],
                "upload_at": item["upload_at"],
                "status": item["status"],
            }
            for item in _list
        ],
    }


@router.get("/force", description="强制重置任务状态")
async def _(
    request: Request,
    id: int,
):
    update_status(id=id, status="")
    return {
        "status": 0,
        "msg": "已强制重置任务状态",
    }


@router.get("/force/all", description="强制重置任务状态")
async def _(
    request: Request,
):
    # curl http://127.0.0.1:8000/api/task/force/all
    if request.client.host != "127.0.0.1":
        raise HTTPException(status_code=403, detail="暂不支持")

    update_all_status(status="")
    return {
        "status": 0,
        "msg": "已强制重置任务状态",
    }


class SubmitBody(BaseModel):
    appid: str
    secret: str
    key: str
    mobile: str
    name: str


@router.post("/submit", description="提交小程序")
async def _(
    request: Request,
    body: SubmitBody = Body(...),
):
    if not await _auth_check(dict(body)):
        raise HTTPException(status_code=400, detail="AppID 或 Secret 错误")

    insert_record(
        appid=body.appid,
        secret=body.secret,
        key=body.key,
        mobile=body.mobile,
        name=body.name,
    )
    return {
        "status": 0,
        "msg": "操作成功",
    }


async def _auth_check(item: dict) -> bool:
    """检查密钥可用性"""
    if len(item["appid"]) != 18 or len(item["secret"]) != 30:
        return
    resp = await client.post(
        url="https://api.weixin.qq.com/cgi-bin/stable_token",
        json={
            "appid": item["appid"],
            "secret": item["secret"],
            "grant_type": "client_credential",
        },
    )
    res: dict = resp.json()
    logging.info(f"获取 AccessToken {item['appid']} {res}")
    if res.get("access_token"):
        await client.post(
            url=CALLBACK_SERVER,
            params={
                "appid": item["appid"],
            },
            json=item,
        )
        return True
    else:
        update_record(id=item["id"], secret="")
        return False


def _handle_key(item: dict) -> str:
    """预处理代码上传密钥"""
    key: str = item["key"]

    try:
        RSA.import_key(key)
    except ValueError:
        key = key.replace("\n", "").replace("\r", "")
        header = "-----BEGIN RSA PRIVATE KEY-----"
        footer = "-----END RSA PRIVATE KEY-----"
        key = key.replace(header, "").replace(footer, "").strip()
        formatted_key = "\n".join([key[i : i + 64] for i in range(0, len(key), 64)])
        result = f"{header}\n{formatted_key}\n{footer}"

        try:
            RSA.import_key(result)
        except ValueError:
            update_status(id=item["id"], status="")
            return ""
        else:
            return result
    else:
        return key


async def _upload(item: dict, task_length: int):
    """向代码上传服务器提交任务"""
    logging.info(f"{item['task-index']:>4}/{task_length} 开始上传 {item['appid']}")
    begin = datetime.datetime.now()
    while True:
        await asyncio.sleep(1.5)
        update_record(client=client, id=item["id"], status="上传中")
        try:
            body = {
                "appid": item["appid"],
                "key": item["key"],
                "mobile": item["mobile"],
                "disable": False,
                "callback": CALLBACK_SERVER,
            }
            resp = await client.post(url=UPLOAD_SERVER, timeout=10.0, data=body)
            res: dict = resp.json()
        except Exception:
            continue
        else:
            if res["appid"] != item["appid"]:
                continue

            now = datetime.datetime.now()
            if res["result"] in ["done"]:  # done
                update_status(
                    id=item["id"], status="上传成功", upload_at=int(time.time())
                )
                break

            elif res["result"] in ["fail", "warn"]:  # fail / warn
                update_status(
                    id=item["id"],
                    status="上传失败，{reason}".format(reason=res["result"]),
                )
                break

            elif res["result"] in ["doing"]:  # doing / other
                if (now - begin).seconds > 5 * 60:  # 超时
                    update_status(
                        id=item["id"], status="上传失败，代码上传密钥疑似错误"
                    )
                    break
                else:  # 未超时
                    continue

            else:  # fail
                if (
                    "invalid ip" in res["result"]
                    or "checkIpInWhiteList" in res["result"]
                ):
                    update_status(id=item["id"], status="上传失败，未关闭IP白名单")
                    break

                elif "game.json" in res["result"]:
                    update_status(id=item["id"], status="上传失败，请勿选择小游戏类目")
                    break
                elif "ticket fail" in res["result"]:
                    update_status(id=item["id"], status="上传失败，代码上传密钥损坏")
                    break
                elif "limit 500KB" in res["result"]:
                    update_status(id=item["id"], status="上传失败，微信服务器抽风")
                elif "socket hang up" in res["result"]:
                    continue
                else:
                    update_status(
                        id=item["id"],
                        status="上传失败，{reason}".format(reason=res["result"]),
                    )

    logging.info(
        f"{item['task-index']:>4}/{task_length} 上传结束 {item['appid']} {res['result']}"
    )


async def worker():
    async def _task():
        _list: list[dict] = list_records(client)
        _list = [item for item in _list if "成功" not in item.get("status", "排队中")]
        _list.sort(key=lambda x: "失败" in x.get("status", "排队中"))
        logging.info(f"当前任务状态: {len(_list)} 条待处理记录")

        for index, item in enumerate(_list):
            item["task-index"] = index + 1
            await asyncio.sleep(0.1)

            if len(item["appid"]) != 18:
                update_status(id=item["id"], status="校验失败，AppID不是18位")
                continue
            if len(item["mobile"]) != 11:
                update_status(id=item["id"], status="校验失败，手机号不是11位")
                continue
            if len(item["key"]) < 1000:
                update_status(id=item["id"], status="校验失败，代码上传密钥明细错误")
                continue
            item["key"] = _handle_key(item)
            if not item["key"]:
                update_status(id=item["id"], status="校验失败，无效的代码上传密钥")
                continue

            await _auth_check(item)

            try:
                await asyncio.wait_for(_upload(item, len(_list)), timeout=5 * 60)
            except asyncio.TimeoutError:
                continue

        logging.info("任务处理完成")

    while True:
        try:
            await asyncio.wait_for(_task(), timeout=3600)
        except asyncio.TimeoutError:
            logging.info("任务处理超时")
        except Exception as e:
            logging.warning(f"任务处理异常 {e} {e.__class__.__name__}", exc_info=True)
        else:
            await asyncio.sleep(3600)
        finally:
            await asyncio.sleep(30)
