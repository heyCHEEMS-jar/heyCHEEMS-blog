---
title: 如何在 Windows 上安装体验 Linux 子系统？WSL
permalink: "如何在_Windows_上安装体验_Linux_子系统_WSL"
published: 2024-04-23
pinned: false
tags: [Linux]
category: 操作系统
licenseName: "CC BY 4.0"
author: heyCHEEMS
draft: false
date: 2024-04-23
---

系统环境：Windows 11 专业版 25H2

### 1. 安装

管理员身份打开 PowerShell 或 CMD，直接执行：

```
wsl --install
```

这条命令会自动开启 WSL（Windows Subsystem for Linux）功能，并安装默认的 Ubuntu 分发版本。

装完后重启电脑。

---

### 2. 更新

重启后，如果遇到问题，可以更新一下 WSL 内核：

```
wsl --update
```

---

### 3. 启动 Ubuntu

```
wsl -d Ubuntu
```

首次启动会提示设置用户名和密码，设置完就进入 Ubuntu 命令行环境了。

---

### 4. 在 Windows 里管理 Linux 文件

打开文件资源管理器，左侧边栏可以看到 Linux 图标，点开就能看到 Ubuntu 的文件系统。

---

### 5. 在 WSL 命令行里切换到根目录

进入 Ubuntu 终端后：

```
cd /
```

就切换到 Linux 的根目录了，可以看到 /bin、/home、/etc 等 Linux 目录结构。

---

### WSL 常用命令

| 命令 | 作用 |
|------|------|
| `wsl --install` | 安装 WSL 和默认 Ubuntu 发行版 |
| `wsl --update` | 更新 WSL 内核 |
| `wsl --list --verbose` 或 `wsl -l -v` | 查看已安装的发行版及运行状态 |
| `wsl -d <发行版名>` | 启动指定发行版 |
| `wsl --shutdown` | 停止所有运行中的 WSL 发行版 |
| `wsl -t <发行版名>` | 停止指定的发行版 |
| `wsl --export <发行版名> <路径\文件名.tar>` | 导出发行版为 tar 备份文件 |
| `wsl --import <发行版名> <安装目录> <tar文件路径>` | 导入备份的发行版 |
| `wsl --unregister <发行版名>` | 卸载指定的发行版 |
| `wsl --set-default-version <版本号>` | 设置默认 WSL 版本（1 或 2） |
| `wsl --set-version <发行版名> <版本号>` | 切换发行版的 WSL 版本 |
| `wsl --status` | 查看 WSL 当前状态 |
| `wsl --help` | 查看所有命令帮助 |
