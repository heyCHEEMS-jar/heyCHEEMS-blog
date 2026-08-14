---
title: 一个 React 缓存节流导致页面刷新的 bug
permalink: 一个_React_缓存节流导致页面刷新的_bug
published: 2026-05-10
tags: [React, Debug]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-05-10
---

写了个登录页面，需求很简单，防止用户快速重复点击提交按钮。

很自然的想到了用 throttle 节流，配合 React 的 useMemo 缓存一下。代码写完测试了一下，第一次点正常，第二次点页面直接刷新了。

排查了一下，发现是 useMemo 和 throttle 共同作用的结果。

## 错误代码

```jsx
import { useCallback, useMemo } from 'react'
import { throttle } from 'lodash'

export default function Login() {
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    // 登录请求...
    await login()
    setLoading(false)
  }, [])
  
  // 缓存节流函数
  const throttledSubmit = useMemo(
    () => throttle(handleSubmit, 2000, { leading: true }),
    [handleSubmit]
  )
  
  return (
    <form onSubmit={throttledSubmit}>
      <button type="submit">登录</button>
    </form>
  )
}
```

看起来没问题，但实际第一次点击正常发起请求，2秒内第二次点击页面直接刷新了。

## 原因分析

### throttle 工作原理

throttle 内部维护了一个 timer 变量，记录当前是否处于冷却期：

```javascript
function throttle(fn, delay) {
  let timer = null
  return function(...args) {
    if (timer) return  // 冷却期内直接返回
    timer = setTimeout(() => {
      timer = null
    }, delay)
    fn.apply(this, args)
  }
}
```

冷却期内被拦截的调用会直接 return，不会执行原函数。

### useMemo 导致实例唯一

```jsx
const throttledSubmit = useMemo(
  () => throttle(handleSubmit, 2000),
  [handleSubmit]
)
```

useMemo 保证 throttledSubmit 在整个组件生命周期中只有一个实例，timer 变量只初始化一次，节流状态在整个组件中共享，不会因为组件重渲染而重置。

### 两次点击的执行流程

第一次点击：

```jsx
用户点击 → 表单 onSubmit → throttledSubmit(e) 执行
→ timer === null，通过检查
→ 执行 handleSubmit(e)
→ e.preventDefault() 执行
→ 设置 timer，开始 2 秒冷却
→ 页面不刷新
```

第二次点击（2秒内）：

```jsx
用户点击 → 表单 onSubmit → throttledSubmit(e) 执行
→ timer !== null，直接 return
→ handleSubmit 根本没进去
→ e.preventDefault() 没有执行
→ 浏览器执行表单默认行为
→ 页面刷新
```

throttle 不仅拦截了业务逻辑，也拦截了 `e.preventDefault()`。被拦截的调用中，没有任何代码能够阻止表单的默认提交行为。

## 解决方案

在 throttle 外部调用 preventDefault：

```jsx
<form onSubmit={e => {
  e.preventDefault()
  throttledSubmit(e)
}}>
```

这样无论 throttle 是否拦截，preventDefault 都会先执行。

或者不用 throttle，用状态锁：

```jsx
const [loading, setLoading] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  if (loading) return
  setLoading(true)
  try {
    await login()
  } finally {
    setLoading(false)
  }
}
```