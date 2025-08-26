def origin_regex(domains: list[str]) -> str:
    """
    根据多个根域名生成 allow_origin_regex
    """
    escaped = [d.replace(".", r"\.") for d in domains]
    joined = "|".join(escaped)
    return rf"https?://([a-z0-9-]+\.)?({joined})"
