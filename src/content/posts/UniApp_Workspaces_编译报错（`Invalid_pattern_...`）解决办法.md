---
title: UniApp Workspaces 编译报错（Invalid pattern ...）解决办法
published: 2026-01-02
tags: [小程序, 编译, Debug]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-01-02
---

## 问题

在 Workspaces 组织 UniApp 项目时，编译为 mp-weixin 时出现报错：`Invalid pattern "../../....../xxx.js" for "output.chunkFileNames", patterns can be neither absolute nor relative paths. If you want your files to be stored in a subdirectory, write its name without a leading slash like this: subdirectory/pattern."`。

## 解决办法

UniApp 编译工具没有正确处理 Workspaces 引入依赖时带有的相对路径 `../`。可以直接修改utils内的对应函数，将相对路径替换成空。

文件位于：

```bash
node_modules/@dcloudio/uni-cli-shared/dist/utils.js
```

找到 **`normalizeNodeModules`** 函数，修改：

**【修改前】**

```javascript
function normalizeNodeModules(str) {
  // ... 原有代码
  return str;
}
```

**【修改后】**

```javascript
function normalizeNodeModules(str) {
  // ... 原有代码

  // 匹配删除路径中的所有相对路径标识符 '../'
  str = str.replace(/\.\.\//g, '')

  return str;
}
```

重启编译即可解决。

---

> **注意：** 这是一个临时补丁。如果运行 `npm install` 等命令，该文件会被覆盖，需要重新修改。