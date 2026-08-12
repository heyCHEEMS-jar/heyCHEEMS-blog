---
title: Docker 常用命令
permalink: Docker_常用命令
published: 2024-06-16
tags: [Docker]
category: 部署
licenseName: "CC BY 4.0"
draft: false
date: 2024-06-16
---

## 镜像操作

```bash
# 搜索镜像
docker search <镜像名>

# 拉取镜像
docker pull <镜像名>           # 拉取最新版
docker pull <镜像名>:<标签>    # 拉取指定标签

# 列出本地镜像
docker images
docker image ls

# 删除镜像
docker rmi <镜像ID或名称>      # 删除指定镜像
docker rmi -f <镜像ID>         # 强制删除

# 查看镜像详情
docker inspect <镜像ID或名称>

# 查看镜像构建历史
docker history <镜像ID或名称>
```

## 容器操作

```bash
# 创建并启动容器
docker run <镜像名>

# 列出容器
docker ps                      # 运行中的容器
docker ps -a                   # 所有容器（含已停止的）
docker ps -aq                  # 只显示容器ID

# 启动/停止/重启容器
docker start <容器ID或名称>
docker stop <容器ID或名称>
docker restart <容器ID或名称>

# 删除容器
docker rm <容器ID或名称>       # 删除已停止的容器
docker rm -f <容器ID或名称>    # 强制删除运行中的容器

# 进入容器内部
docker exec -it <容器ID或名称> /bin/bash     # bash shell

# 查看容器日志
docker logs <容器ID或名称>
docker logs -f <容器ID或名称>  # 持续跟踪日志输出
docker logs --tail 100 <容器ID> # 只看最后100行

# 查看容器进程
docker top <容器ID或名称>

# 查看容器详情
docker inspect <容器ID或名称>
```

## run 命令

```bash
# 基本用法
docker run <镜像名>

# 常用选项
docker run -d <镜像名>                  # 后台运行
docker run -it <镜像名>                 # 交互式终端
docker run --rm <镜像名>                # 退出后自动删除容器
docker run --name <名称> <镜像名>       # 指定容器名称

# 端口映射  -p 宿主机端口:容器端口
docker run -p 8080:80 <镜像名>
docker run -p 3000:3000 <镜像名>

# 环境变量  -e
docker run -e ENV=production <镜像名>

# 示例
docker run -d --name myapp -p 8080:80 -e APP_ENV=prod --rm nginx
```

## 保存镜像

```bash
# 将容器保存为新镜像
docker commit <容器ID> <新镜像名:标签>

# 将镜像导出为 tar 文件
docker save -o <文件名.tar> <镜像名:标签>

# 从 tar 文件导入镜像
docker load -i <文件名.tar>

# 从 tar 文件导入为镜像
docker import <文件名.tar> <新镜像名:标签>

# 导出容器为 tar 文件
docker export -o <文件名.tar> <容器ID>
```

## 分享镜像

```bash
# 登录镜像仓库
docker login                           # 登录 Docker Hub
docker login <仓库地址>                 # 登录私有仓库

# 登出
docker logout

# 给镜像打标签
docker tag <原镜像名:标签> <仓库地址/用户名/镜像名:标签>

# 推送镜像到仓库
docker push <仓库地址/用户名/镜像名:标签>

# 从仓库拉取镜像
docker pull <仓库地址/用户名/镜像名:标签>
```

## 目录挂载

```bash
# 把宿主机目录挂载到容器 -v 宿主机目录:容器目录
docker run -v /宿主机路径:/容器路径 <镜像名>

# 可以同时挂载多个目录
docker run -v /conf:/etc/nginx/conf.d -v /logs:/var/log/nginx nginx
```

## 卷映射

```bash
# 创建数据卷
docker volume create <卷名>

# 删除数据卷
docker volume rm <卷名>

# 查看数据卷列表
docker volume ls

# 查看数据卷详情
docker volume inspect <卷名>

# 使用数据卷 -v 卷名:容器路径
docker run -v <卷名>:/容器路径 <镜像名>

# 匿名卷（不指定卷名，Docker 自动生成）
docker run -v /容器路径 <镜像名>

# 数据卷共享（多个容器用同一个卷）
docker run -v shared-data:/app/data --name app1 <镜像1>
docker run -v shared-data:/app/data --name app2 <镜像2>
```

## 自定义网络

```bash
# 查看网络列表
docker network ls

# 创建自定义网络
docker network create <网络名>

# 容器连接到网络
docker network connect <网络名> <容器名>

# 容器断开网络
docker network disconnect <网络名> <容器名>

# 运行容器时指定网络
docker run --network <网络名> <镜像名>

# 查看网络详情
docker network inspect <网络名>

# 移除网络
docker network rm <网络名>
```

## Docker Compose

```bash
docker compose up -d                          # 后台启动所有服务
docker compose down                           # 停止并删除容器/网络
docker compose down -v                        # 同时删除数据卷
docker compose ps                             # 查看服务状态
docker compose logs -f <服务名>               # 查看日志
docker compose exec <服务名> /bin/bash        # 进入容器
docker compose build                          # 构建镜像
docker compose restart                        # 重启服务
docker compose config -q                      # 验证配置文件
docker compose -f compose.yaml up -d          # 指定配置文件
docker compose -p myproject up -d             # 指定项目名称
docker compose --profile dev up               # 按配置启动
```

[compose-file 文档](https://docs.docker.com/reference/compose-file/)