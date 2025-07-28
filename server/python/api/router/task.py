from fastapi import Request, APIRouter
import os

from utils.feishu import list_records
from const import client

ORIGIN_FILE_PATH = os.getenv("ORIGIN_FILE_PATH")
DATABASE_PATH = os.getenv("DATABASE_PATH")

router = APIRouter()


@router.get("/list", description="安全列出所有问卷填写结果")
async def _(
    request: Request,
):
    _list = await list_records(client)
    return []
