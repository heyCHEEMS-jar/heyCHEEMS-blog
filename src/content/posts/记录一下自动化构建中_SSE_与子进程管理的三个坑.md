---
title: 记录一下自动化构建中 SSE 与子进程管理的三个坑
permalink: 记录一下自动化构建中_SSE_与子进程管理的三个坑
published: 2026-05-02
tags: [SSE, Nodejs]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-05-02
---

最近在写一个博客后台管理系统的轻量自动化部署接口，用 SSE 来流传输给前端打印实时构建日志，简单记录一下遇到的最主要的三个坑。

### 坑一：子进程杀不死

在 Node.js 中，我们习惯用 `childProcess.kill()`。但在运行 `pnpm build` 这种命令时，它会衍生出一大堆子进程（如 Vite 或 Webpack）。如果你只杀掉父进程，那些构建进程就会变成“孤儿进程”继续运行。

解决办法是 在 Windows 下要用 `taskkill` 配合 `/T` 参数杀掉整棵进程树，在 Linux 下则要开启 `detached` 模式并用负数 PID 来杀掉整个进程组。

这里涉及到了**进程树与进程组**，操作系统中，程序启动另一个程序即为父子关系。Linux 的 `detached` 模式相当于让子进程自立门户当“组长”，通过组 ID 即可实现“一锅端”。

```javascript
// 后端执行终止子进程
stopProcess() {
    if (this.childProcess && this.childProcess.pid) {
        const pid = this.childProcess.pid;
        if (this.isWindows) {
            // Windows 通过 /T 杀掉子进程树，/F 强制终止
            exec(`taskkill /PID ${pid} /T /F`);
        } else {
            // Linux 或 Mac 通过负数 PID 杀死整个进程组
            process.kill(-pid, 'SIGKILL');
        }
        this.childProcess.removeAllListeners();
        this.childProcess = null;
    }
}
```

### 坑二：SSE 切换页面自动重连

当你开启构建后切换到其他标签页，浏览器为了节能会挂起网络请求。等你切回来时，浏览器发现连接断开并自动尝试重连。由于后端为了防止并发给任务加了锁，重连请求撞上正在运行的任务，后端就返回了错误。

`fetch-event-source` 库提供了一个参数叫 `openWhenHidden`，把它设为 `true`，就能绕过浏览器的节能限制，当浏览器最小化或切换到其它标签页时也保持连接。

```javascript
// 前端请求配置
await fetchEventSource('/sse-api/deploy', {
    method: 'POST',
    openWhenHidden: true, // 切换标签页时不中断连接
    onmessage(ev) {
        const data = JSON.parse(ev.data);
        setLog(prev => prev + data.log);
    },
    onerror(err) {
        if (err.code === 409) {
            message.warning('后台已有任务在运行');
        }
    }
});
```

### 坑三：原生 API 的局限性

很多人觉得原生 `EventSource` 更轻量，但它其实是个黑盒：原生的 `EventSource` 默认不支持在请求中添加自定义请求头（如 `Authorization`）。如果你的博客后台接口需要 Token 验证，原生 API 只能被迫将 Token 挂在 URL 参数里。这会让 Token 暴露在服务器日志中，还显得非常不专业。

原生 SSE 强制要求必须是 GET 请求，但如果我们需要向后端发送一些复杂数据时，把这些东西塞进 URL 参数里既臃肿又不安全。用 Fetch 模拟 SSE，就可以轻松发起 POST 请求，把参数优雅地放在 Request Body 里。

原生 API 一旦断开，会按照浏览器内置的逻辑盲目重连。而 Fetch 模式配合 `AbortController`，可以让我们精准控制，什么时候该彻底断开，什么时候该带着上一次的 `Last-Event-ID` 重新寻找断点。