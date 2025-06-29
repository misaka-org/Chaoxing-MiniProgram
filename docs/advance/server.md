---
title: 服务端
icon: iconfont icon-study
category:
  - Advance
tag:
  - Advance
order: 15
---

# 反向代理服务端部署教程

> 微信小程序配置服务器域名 要求域名已备案
>
> 自用无需备案，体验版开启调试模式即可  
>
> 有问题可以在 QQ频道 交流

## 使用 CDN 或边缘函数反代

### 使用 Cloudflare Worker 反代

> 感谢赛博菩萨！

把下面的反向代理脚本粘贴到 Workers 编辑器中。

> 注意：Worker默认的域名已被墙，请自备域名；已知部分沿海城市阻断了CF的IP。

```js
export default {
    async fetch(request, env, ctx) {
        let url = new URL(request.url)
        if (url.pathname.startsWith('/proxy/')) {
            url.pathname = url.pathname.replace('/proxy', '')           
            url.hostname = 'mobilelearn.chaoxing.com'
            let newRequest = new Request(url, {
                method: request.method,
                headers: request.headers,
                body: request.body,
                redirect: 'follow'
            })
            newRequest.headers.set('Host', 'mobilelearn.chaoxing.com')
            newRequest.headers.set('Referer', 'https://mobilelearn.chaoxing.com')
            newRequest.headers.set('Origin', 'https://mobilelearn.chaoxing.com')
            newRequest.headers.set('User-Agent', 'Mozilla/5.0 (iPhone Mac OS X) github.com/misaka-1314')
            return fetch(newRequest)
        } else {
            return new Response('Powered by Misaka! github.com/misaka-1314')
        }
    }
}
```

### 使用腾讯云 EdgeOne 边缘函数

[![使用 EdgeOne 边缘函数部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https%3a%2f%2fgithub.com%2fMisaka-1314%2fChaoxing-MiniProgram%2ftree%2fmain%2fserver%2fedgeone&project-name=cx-proxy&repository-name=cx-proxy)

### 使用腾讯云 EdgeOne CDN

教程暂未完成

## 自建反代服务器

### Caddy 配置文件示例

```Caddyfile
example.com {
    handle_path /proxy/* {
        reverse_proxy "https://mobilelearn.chaoxing.com" {
            header_up Host "mobilelearn.chaoxing.com"
            header_up Referer "https://mobilelearn.chaoxing.com"
            header_up Origin "https://mobilelearn.chaoxing.com"
            header_up User-Agent "Mozilla/5.0 (iPhone Mac OS X) github.com/misaka-1314"
        }
    }
 reverse_proxy http://127.0.0.1:8080
}
```

```Caddyfile
http://192.168.x.x:8080 {
    handle_path /proxy/* {
        reverse_proxy "https://mobilelearn.chaoxing.com" {
            header_up Host "mobilelearn.chaoxing.com"
            header_up Referer "https://mobilelearn.chaoxing.com"
            header_up Origin "https://mobilelearn.chaoxing.com"
            header_up User-Agent "Mozilla/5.0 (iPhone Mac OS X) github.com/misaka-1314"
        }
    }
 reverse_proxy http://127.0.0.1:8080
}
```

### Nginx 配置文件示例

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    location /proxy/ {
        rewrite ^/proxy/(.*)$ /$1 break;

        proxy_pass https://mobilelearn.chaoxing.com;
        proxy_set_header Host "mobilelearn.chaoxing.com";
        proxy_set_header Referer "https://mobilelearn.chaoxing.com";
        proxy_set_header Origin "https://mobilelearn.chaoxing.com";
        proxy_set_header User-Agent "Mozilla/5.0 (iPhone Mac OS X) github.com/misaka-1314";
    }

    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

```nginx
server {
    listen 8080;
    server_name 192.168.x.x;

    location /proxy/ {
        rewrite ^/proxy/(.*)$ /$1 break;
        
        proxy_pass https://mobilelearn.chaoxing.com;
        proxy_set_header Host "mobilelearn.chaoxing.com";
        proxy_set_header Referer "https://mobilelearn.chaoxing.com";
        proxy_set_header Origin "https://mobilelearn.chaoxing.com";
        proxy_set_header User-Agent "Mozilla/5.0 (iPhone Mac OS X) github.com/misaka-1314";
    }

    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

### 使用 Python 反代

```python
from fastapi import FastAPI, Request, Response
from urllib.parse import urljoin

app = FastAPI(redoc_url=None, docs_url=None)

ORIGIN_URL = "https://mobilelearn.chaoxing.com"

@app.get("/{path:path}")
async def proxy(
    request: Request,
):
    path = request.url.path.replace("/proxy", "")
    # 这里应该加入校验 path 和 cookies，防止恶意请求
    async with httpx.AsyncClient(http2=True, timeout=10) as client:
        resp = await client.get(
            url=urljoin(ORIGIN_URL, path),
            params=request.query_params,
            cookies=dict(request.cookies),
        )
    return Response(
        content=resp.content,
        status_code=resp.status_code,
    )
```