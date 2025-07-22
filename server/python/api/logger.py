import logging
import sys


def set_log_formatter():
    # 颜色代码
    TIME_COLOR = "\033[32m"
    LEVEL_COLOR = "\033[33m"
    RESET = "\033[0m"

    # 有颜色格式（给终端用）
    color_format = f"{TIME_COLOR}%(asctime)s{RESET} - {LEVEL_COLOR}%(levelname)s{RESET} - %(message)s"
    color_formatter = logging.Formatter(color_format)

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    # 清除默认 handlers
    if logger.hasHandlers():
        logger.handlers.clear()

    # 控制台输出（带颜色）
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(color_formatter)
    logger.addHandler(console_handler)

    # httpx 模块日志调低
    logging.getLogger("httpx").setLevel(logging.WARNING)


set_log_formatter()
