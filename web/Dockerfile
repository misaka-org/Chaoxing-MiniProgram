FROM python:3.12-alpine

RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone && apk add ca-certificates

RUN apk add --update --no-cache python3 py3-pip nginx \
    && mkdir -p /run/nginx \
    && rm -rf /var/cache/apk/*

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple \
    && pip config set global.trusted-host mirrors.cloud.tencent.com \
    && pip install --upgrade pip --break-system-packages \
    && pip install --user -r requirements.txt --break-system-packages

COPY nginx.conf /etc/nginx/nginx.conf

COPY . /app

EXPOSE 80

CMD ["sh", "-c", "python3 app.py & nginx -g 'daemon off;'"]