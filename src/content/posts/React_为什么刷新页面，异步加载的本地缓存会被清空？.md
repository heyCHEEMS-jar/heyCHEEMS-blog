---
title: React 为什么刷新页面，异步加载的本地缓存会被清空？
permalink: React_为什么刷新页面，异步加载的本地缓存会被清空？
published: 2026-05-03
tags: [React, Debug]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-05-03
---

最近在做一个部署日志功能，需要把日志实时存入 IndexedDB，在开发中遇到了一个 Bug：明明数据已经存进了数据库，但只要一刷新页面，缓存数据就莫名其妙被抹除了。

#### 1\. 现象描述

逻辑很简单：

1.  `useState` 初始化一个 `log` 字符串。
2.  一个 `useEffect` 监听 `log` 变化，只要有更新就 `save` 到本地数据库。
3.  另一个 `useEffect` 在组件挂载时，从数据库 `get` 出数据并 `setLog`。

Bug：刷新页面，控制台数据库里曾有过数据，但瞬间变成了空字符串。

---

#### 2\. 为什么数据被抹除了？

问题出在 React 组件的生命周期和异步操作的时间差上：

1.  **第一步（初始化）：** 组件挂载，`log` 的初始状态是 `''`（空字符串）。
2.  **第二步（执行监听逻辑）：** 监听 `log` 的 `useEffect` 发现 `log` 发生了变化（初始化）。此时，从数据库读取旧数据的异步操作还没完成，这个 Effect 就拿着初始值 `''` 去执行了保存，把数据库里的旧数据覆盖了。
3.  **第三步（读取结束）：** 异步读取终于拿到了结果，但此时数据库里已经是刚才被覆盖掉的空字符串了。

---

#### 3\. 解决方法：给保存逻辑加状态锁

我们需要确保**在数据从数据库恢复到 State 之前，严禁往数据库写回任何数据。**

这里适合用 `useRef` 来做一个“初始化锁”。

修正后的逻辑：

```typescript
const [log, setLog] = useState('');
const inited = useRef(false); // 初始化锁

// 挂载时异步读取
useEffect(() => {
    db.getCache().then(res => {
        setLog(res || '');
        // 读取完成并赋值后，取消锁 (标记为已初始化)
        inited.current = true;
    });
}, []);

// 监听变化并保存
useEffect(() => {
    // 如果锁没取消 (还在初始化)，直接跳过保存
    if (!inited.current) return;
    saveToDB(log);
}, [log]);
```

---

#### 4\. 为什么用 useRef 而不是 useState？

1.  `ref.current` 的修改是立即生效的，而 `useState` 的更新是异步的。在处理生命周期边缘的逻辑时，同步的标记位更安全。
2.  修改 `ref` 不会触发组件重新渲染。