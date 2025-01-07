import sys

def set_log_formatter():
    import logging
    " ANSI 转义码设置颜色 "
    TIME_COLOR = "\033[32m"
    LEVEL_COLOR = "\033[33m"
    RESET = "\033[0m"
    LOG_FORMATE = \
        f"{TIME_COLOR}%(asctime)s{RESET} - {LEVEL_COLOR}%(levelname)s{RESET} - %(message)s"

    logging.basicConfig(
        level=logging.INFO, format=LOG_FORMATE, stream=sys.stdout)

    # uvicorn 日志
    # logger = logging.getLogger("uvicorn")
    # logger.handlers = []
    # console_handler = logging.StreamHandler()
    # console_handler.setFormatter(logging.Formatter(LOG_FORMATE))
    # logger.addHandler(console_handler)

    # access_logger = logging.getLogger("uvicorn.access")
    # access_logger.handlers = []
    # access_handler = logging.StreamHandler()
    # access_handler.setFormatter(logging.Formatter(LOG_FORMATE))
    # access_logger.addHandler(access_handler)

    # httpx 日志
    logger = logging.getLogger("httpx")
    logger.setLevel(logging.WARNING)

set_log_formatter()