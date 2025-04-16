# ---- 构建阶段 ----
FROM node:22-alpine AS build

# 设置工作目录
WORKDIR /app

# 将 package.json 复制到工作目录
COPY package.json ./

# 安装项目依赖
RUN npm install --frozen-lockfile

# 将项目源代码复制到容器中
COPY . .

# 构建 Next.js 项目
RUN npm run build

# ---- 生产环境阶段 ----
FROM node:22-alpine

# 设置时区
ENV TZ=Asia/Shanghai

# 设置工作目录
WORKDIR /app

# 只复制构建阶段的输出和必要的文件
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

# 暴露容器的 3000 端口
EXPOSE 3000

# 启动 Next.js 项目
CMD ["npm", "start"]
