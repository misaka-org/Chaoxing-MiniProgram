from Crypto.PublicKey import RSA
from fastapi import APIRouter, Query
import datetime
import asyncio
import os

from utils.feishu import list_records, update_record
from utils.logger import logging
from const import client

UPLOAD_SERVER = os.getenv("UPLOAD_SERVER")
CALLBACK_SERVER = os.getenv("CALLBACK_SERVER")

router = APIRouter()
worker_flag = True


@router.get("/state", description="获取当前任务状态")
async def _():
    return {
        "status": 0,
        "data": {
            "flag": worker_flag,
        },
    }


@router.get("/list", description="安全列出所有问卷填写结果")
async def _():
    _list = await list_records(client)
    return {
        "status": 0,
        "data": [
            {
                "id": item["id"],
                "appid": item["appid"][:4] + "******" + item["appid"][-8:],
                "name": item["name"],
                "secret": len(item["secret"]) == 30,
                "mobile": item["mobile"][:3] + "******" + item["mobile"][-2:],
                "created_at": item["created_at"],
                "status": item["status"],
            }
            for item in _list
        ],
    }


@router.get("/force", description="强制重置任务状态")
async def _(
    appid: str = Query(min_length=8, max_length=8),
):
    await update_record(
        client=client,
        id=appid,
        状态="",
    )
    return {
        "status": 0,
        "msg": "已强制重置任务状态",
    }


async def _auth_check(item: dict) -> None:
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


async def _handle_key(item: dict) -> str:
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
            return ""
        else:
            await update_record(
                client=client,
                id=item["id"],
                小程序代码上传密钥=result,
                状态="",
            )
            return result
    else:
        return key


async def _upload(item: dict):
    """向代码上传服务器提交任务"""
    logging.info(f"开始上传 {item['id']:>4} {item['appid']}")
    while True:
        await asyncio.sleep(1.5)
        begin = datetime.datetime.now()
        await update_record(client=client, id=item["id"], 状态="")
        try:
            body = {
                "appid": item["appid"],
                "key": item["key"],
                "mobile": item["mobile"],
                "disable": False,
                "callback": CALLBACK_SERVER,
            }
            resp = await client.post(UPLOAD_SERVER, data=body)
            res: dict = resp.json()
        except Exception:
            continue
        else:
            now = datetime.datetime.now()
            if res["result"] in ["done"]:  # done
                await update_record(
                    client=client,
                    id=item["id"],
                    状态="上传成功",
                )

            elif res["result"] in ["fail", "warn"]:  # fail / warn
                await update_record(
                    client=client,
                    id=item["id"],
                    状态="上传失败，" + res["result"],
                )

            elif res["result"] in ["doing"]:  # doing / other
                if (now - begin).seconds > 5 * 60:  # 超时
                    await update_record(
                        client=client,
                        id=item["id"],
                        状态="上传失败，代码上传密钥疑似错误",
                    )
                else:
                    continue

            else:  # fail
                if (
                    "invalid ip" in res["result"]
                    or "checkIpInWhiteList" in res["result"]
                ):
                    await update_record(
                        client=client,
                        id=item["id"],
                        状态="上传失败，未关闭IP白名单",
                    )
                elif "game.json" in res["result"]:
                    await update_record(
                        client=client,
                        id=item["id"],
                        状态="上传失败，请勿选择小游戏类目",
                    )
                elif "ticket fail" in res["result"]:
                    await update_record(
                        client=client,
                        id=item["id"],
                        状态="上传失败，代码上传密钥损坏",
                    )
                elif "limit 500KB" in res["result"]:
                    await update_record(
                        client=client,
                        id=item["id"],
                        状态="上传失败，微信服务器抽风",
                    )
                elif "socket hang up" in res["result"]:
                    continue
                else:
                    await update_record(
                        client=client,
                        id=item["id"],
                        状态="上传失败，" + res["result"],
                    )

            logging.info(f"上传结束 {item['id']:>4} {item['appid']} {res['result']}")
            if res["appid"] == item["appid"]:
                break
            else:
                continue


async def worker():
    global worker_flag

    while worker_flag:
        _list = await list_records(client)
        _list = [item for item in _list if "成功" not in item.get("status", "排队中")]
        logging.info(f"当前任务状态: {len(_list)} 条待处理记录")

        for item in _list:
            await asyncio.sleep(0.1)
            if len(item["appid"]) != 18:
                await update_record(
                    client=client,
                    id=item["id"],
                    状态="校验失败，AppID不是18位",
                )
                continue
            if len(item["mobile"]) != 11:
                await update_record(
                    client=client,
                    id=item["id"],
                    状态="校验失败，手机号不是11位",
                )
                continue
            if len(item["key"]) < 1000:
                await update_record(
                    client=client,
                    id=item["id"],
                    状态="校验失败，明显错误的代码上传密钥",
                )
                continue
            item["key"] = await _handle_key(item)
            if not item["key"]:
                await update_record(
                    client=client,
                    id=item["id"],
                    状态="校验失败，无效的代码上传密钥",
                )
                continue

            await _auth_check(item)
            await _upload(item)

        logging.info("任务处理完成")
        await asyncio.sleep(3600)
