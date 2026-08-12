---
title: Linux 常用命令
permalink: Linux_常用命令
published: 2024-06-22
tags: [Linux]
category: 操作系统
licenseName: "CC BY 4.0"
draft: false
date: 2024-06-22

---

## ls — 列出目录内容

```bash
ls [-al] [目录]
```

<br>

| 选项   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| （无） | 列出当前目录的文件和目录名                                   |
| `-a`   | 显示所有文件，包括以 `.` 开头的隐藏文件（如 `.git`、`.env`） |
| `-l`   | 列表形式显示详细信息：权限、链接数、所有者、大小、修改时间   |
| `-la`  | 合并使用，显示所有文件的详细信息                             |

------

## cd — 切换工作目录

```bash
cd [目录]
```

<br>

| 用法           | 说明               |
| -------------- | ------------------ |
| `cd dir`       | 进入 dir 目录      |
| `cd ..`        | 返回上一级目录     |
| `cd ~` 或 `cd` | 回到用户主目录     |
| `cd -`         | 返回上一个所在目录 |

------

## pwd — 查看当前路径

```bash
pwd
```

<br>

打印当前所在的绝对路径，不知道自己在哪时用。

------

## mkdir — 创建目录

```bash
mkdir [-p] <目录名>
```

<br>

| 选项   | 说明                                       |
| ------ | ------------------------------------------ |
| （无） | 创建单级目录                               |
| `-p`   | 递归创建多级目录，父目录不存在时会自动创建 |

<br>

```bash
mkdir my-project          # 创建单级目录
mkdir -p src/components   # 同时创建 src 和 src/components
```

------

## touch — 创建空文件

```bash
touch <文件名>
```

<br>

创建一个空文件，如果文件已存在则更新其修改时间戳。

<br>

```bash
touch index.js
touch README.md
```

------

## cp — 复制

```bash
cp [-r] <源> <目标>
```

<br>

| 选项   | 说明                     |
| ------ | ------------------------ |
| （无） | 复制文件                 |
| `-r`   | 递归复制整个目录及其内容 |

<br>

```bash
cp app.js app.bak.js          # 复制文件
cp -r dist/ backups/          # 复制整个目录
```

------

## mv — 移动或重命名

```bash
mv <源> <目标>
```

<br>

```bash
mv old.js new.js              # 重命名
mv file.js src/file.js        # 移动到其他目录
```

------

## rm — 删除

```bash
rm [-rf] <文件或目录>
```

<br>

| 选项   | 说明                 |
| ------ | -------------------- |
| （无） | 删除文件             |
| `-r`   | 递归删除目录及其内容 |
| `-f`   | 强制删除，不提示确认 |

<br>

```bash
rm tmp.log              # 删文件
rm -rf node_modules     # 删整个目录（删除 node_modules 时最常用）
```

<br>

`rm -rf` 很危险，没有回收站，删了就没有了。

------

## cat — 查看文件内容

```bash
cat <文件>
```

<br>

将文件内容全部输出到终端，适合看短文件。

<br>

```bash
cat package.json
cat .env
```

------

## less — 分页查看

```bash
less <文件>
```

<br>

长文件一页页看，按 `q` 退出，按 `↑/↓` 或 `PageUp/PageDown` 翻页，按 `/` 搜索。

<br>

```bash
less package-lock.json
less large-log-file.log
```

------

## tail — 查看文件末尾 / 实时跟踪

```bash
tail [-f] [-n N] <文件>
```

<br>

| 选项   | 说明                                               |
| ------ | -------------------------------------------------- |
| `-f`   | 实时跟踪文件新增内容（follow），按 `Ctrl + C` 退出 |
| `-n N` | 显示最后 N 行                                      |

<br>

```bash
tail app.log              # 看最后 10 行
tail -f app.log           # 实时监控日志（看服务日志最常用）
tail -n 100 app.log       # 看最后 100 行
```

<br>

`tail -f` 在开发时常用来看服务日志。

------

## grep — 搜索文件内容

```bash
grep [-rn] <关键词> [路径]
```

<br>

| 选项               | 说明                     |
| ------------------ | ------------------------ |
| （无）             | 在指定文件中搜索关键词   |
| `-r`               | 递归搜索目录下的所有文件 |
| `-n`               | 显示匹配行的行号         |
| `-i`               | 忽略大小写               |
| `--include="*.js"` | 只搜索 .js 文件          |

<br>

```bash
grep "useEffect" App.js                # 在文件中搜索
grep -rn "apiKey" .                    # 在当前目录递归搜索
grep -rn --include="*.ts" "interface" src/  # 限制文件类型
```

------

## sort | uniq — 排序与去重

```bash
sort [文件] | uniq [-c]
```

<br>

| 选项 | 说明                   |
| ---- | ---------------------- |
| `-c` | 统计每个条目出现的次数 |

<br>

```bash
sort access.log | uniq -c          # 统计每行出现的次数
cat names.txt | sort | uniq        # 排序并去重
```

------

## find — 查找文件

```bash
find <路径> -name "<模式>"
```

<br>

| 写法           | 说明                |
| -------------- | ------------------- |
| `-name "*.js"` | 按文件名匹配        |
| `-type f`      | 只找文件            |
| `-type d`      | 只找目录            |
| `-size +100M`  | 找大于 100MB 的文件 |

<br>

```bash
find . -name "*.log"               # 找所有 .log 文件
find . -type f -name "*.ts"        # 找所有 TypeScript 文件
find / -size +500M 2>/dev/null     # 找大于 500MB 的大文件
```

------

## tar — 打包压缩 / 解压

```bash
tar -czvf <目标.tar.gz> <源>       # 压缩
tar -xzvf <文件.tar.gz>            # 解压
```

<br>

| 选项含义 | 说明                 |
| -------- | -------------------- |
| `c`      | 创建归档（compress） |
| `x`      | 解压（extract）      |
| `z`      | 使用 gzip 压缩       |
| `v`      | 显示处理的文件列表   |
| `f`      | 指定归档文件名       |

<br>

```bash
tar -czvf project.tar.gz src/      # 压缩 src 目录
tar -xzvf project.tar.gz           # 解压到当前目录
tar -xzvf project.tar.gz -C /tmp   # 解压到指定目录
```

------

## zip / unzip

```bash
zip [-r] <目标.zip> <源>
unzip <文件.zip> [-d 目录]
```

<br>

| 选项 | 说明           |
| ---- | -------------- |
| `-r` | 递归压缩目录   |
| `-d` | 解压到指定目录 |

<br>

```bash
zip -r archive.zip dist/
unzip archive.zip
unzip archive.zip -d ./output
```

------

## ps — 查看进程

```bash
ps aux | grep <关键词>
```

<br>

| 部分 | 说明                         |
| ---- | ---------------------------- |
| `a`  | 显示所有用户的进程           |
| `u`  | 显示用户、CPU/内存占用等信息 |
| `x`  | 显示无终端的进程             |

<br>

```bash
ps aux | grep node                  # 找所有 node 进程
ps aux | grep nginx                 # 检查 nginx 是否运行
```

------

## kill — 终止进程

```bash
kill [-9] <PID>
```

<br>

| 选项   | 说明                                 |
| ------ | ------------------------------------ |
| （无） | 正常终止进程（发 SIGTERM）           |
| `-9`   | 强制杀死（发 SIGKILL），进程无法拒绝 |

<br>

```bash
kill 1234              # 正常终止 PID 为 1234 的进程
kill -9 1234           # 强制杀死
killall node           # 杀死所有 node 进程
```

------

## lsof — 查看端口占用

```bash
lsof -i :<端口号>
```

<br>

```bash
lsof -i :3000          # 查看 3000 端口被谁占用
lsof -i :80
```

------

## curl — 发送 HTTP 请求

```bash
curl [选项] <URL>
```

<br>

| 选项              | 说明                      |
| ----------------- | ------------------------- |
| （无）            | 发送 GET 请求，输出响应体 |
| `-I` 或 `--head`  | 只查看响应头              |
| `-X POST`         | 发 POST 请求              |
| `-H "Key: Value"` | 设置请求头                |
| `-d "数据"`       | 发送请求体数据            |

<br>

```bash
curl https://api.example.com/users              # GET 请求
curl -I https://google.com                       # 只看响应头
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"test"}' https://api.example.com/users  # POST JSON
curl localhost:3000/api/health                   # 测本地接口
```

------

## ssh — 远程登录

```bash
ssh <用户>@<主机> [-p <端口>]
```

<br>

```bash
ssh root@192.168.1.100                # 默认 22 端口
ssh -p 2222 user@example.com          # 指定端口
ssh -i ~/.ssh/id_rsa user@host        # 指定密钥文件
```

------

## scp — 远程传文件

```bash
scp <本地路径> <用户>@<主机>:<远程路径>     # 本地上传
scp <用户>@<主机>:<远程路径> <本地路径>     # 远程下载
```

<br>

```bash
scp ./app.zip root@192.168.1.100:/root/         # 上传
scp -r ./dist/ user@host:/var/www/              # 上传整个目录
scp root@host:/var/log/nginx/access.log ./      # 下载远程日志
```

------

## df — 磁盘空间

```bash
df -h
```

<br>

`-h` 以 GB/MB 形式显示（human-readable）。

<br>

```bash
df -h                          # 查看各分区使用情况
df -h .                        # 只看当前目录所在分区
```

------

## du — 目录大小

```bash
du [-sh] [目录]
```

<br>

| 选项            | 说明                         |
| --------------- | ---------------------------- |
| `-s`            | 只显示总计，不列出子目录明细 |
| `-h`            | 以 GB/MB 形式显示            |
| `--max-depth=N` | 显示到第 N 级子目录          |

<br>

```bash
du -sh node_modules            # 看 node_modules 有多大
du -h --max-depth=1 .          # 看当前目录下每个子目录的大小
```

------

## free — 内存

```bash
free -h
```

<br>

`-h` 以 GB/MB 形式显示。

<br>

```bash
free -h                        # 看内存总量、已用、可用
```

------

## systemctl — 服务管理

```bash
systemctl <动作> <服务名>
```

<br>

| 动作      | 说明         |
| --------- | ------------ |
| `start`   | 启动服务     |
| `stop`    | 停止服务     |
| `restart` | 重启服务     |
| `status`  | 查看服务状态 |
| `enable`  | 设为开机自启 |

<br>

```bash
systemctl status nginx            # nginx 运行状态
systemctl restart docker          # 重启 docker 服务
systemctl enable --now myservice  # 启用并立即启动
```

------

## journalctl — 查看系统日志

```bash
journalctl [-u <服务名>] [-f]
```

<br>

| 选项                   | 说明                       |
| ---------------------- | -------------------------- |
| `-u <服务名>`          | 只看指定服务的日志         |
| `-f`                   | 实时跟踪（类似 `tail -f`） |
| `--since "1 hour ago"` | 只看最近 1 小时            |
| `-n N`                 | 只看最后 N 行              |

<br>

```bash
journalctl -u nginx -f           # 跟踪 nginx 日志
journalctl -u mysql --since "30 min ago"
```

------

## apt — 包管理 (Ubuntu/Debian)

```bash
sudo apt <动作> <包名>
```

<br>

| 动作              | 说明               |
| ----------------- | ------------------ |
| `update`          | 更新包列表         |
| `upgrade -y`      | 升级所有可升级的包 |
| `install <包名>`  | 安装               |
| `remove <包名>`   | 卸载（保留配置）   |
| `purge <包名>`    | 卸载并删除配置     |
| `search <关键词>` | 搜索               |

<br>

```bash
sudo apt update && sudo apt upgrade -y       # 全量更新
sudo apt install nginx                       # 安装
sudo apt remove nginx                        # 卸载
```

------

## brew — 包管理 (macOS)

```bash
brew <动作> <包名>
```

<br>

| 动作                  | 说明               |
| --------------------- | ------------------ |
| `install`             | 安装               |
| `uninstall`           | 卸载               |
| `update`              | 更新 Homebrew 自身 |
| `upgrade`             | 升级已安装的包     |
| `services start/stop` | 管理后台服务       |

<br>

```bash
brew install node                # 装 node
brew install nginx
brew services start nginx        # 启动 nginx 作为后台服务
```

------

## 实用技巧

### 管道 | — 前一个命令的输出给后一个命令

```bash
ps aux | grep node               # 找 node 进程
cat log.txt | grep "error" | head -20  # 找 error 行，只看前 20 条
```

### 输出重定向 > / >>

```bash
echo "hello" > file.txt          # 写入（覆盖）
echo "world" >> file.txt         # 追加
npm run build 2>&1 | tee build.log  # 输出保存到文件同时显示在屏幕
```

### 常用快捷键

| 按键       | 说明                   |
| ---------- | ---------------------- |
| `Ctrl + C` | 终止当前命令           |
| `Ctrl + D` | 退出当前终端或结束输入 |
| `Ctrl + R` | 搜索历史命令           |
| `Ctrl + A` | 光标移到行首           |
| `Ctrl + E` | 光标移到行尾           |
| `Ctrl + L` | 清屏（相当于 `clear`） |
| `↑ / ↓`    | 翻历史命令             |
| `!!`       | 执行上一条命令         |

### history — 查看历史命令

```bash
history                          # 列出所有历史命令
history | grep docker            # 搜索用过的 docker 命令
!123                             # 执行历史中的第 123 条命令
```