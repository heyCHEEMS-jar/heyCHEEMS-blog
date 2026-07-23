---
title: 贴个发布-订阅模式 EventBus 实现代码
permalink: 发布-订阅模式_EventBus_实现代码
published: 2026-07-06
tags: [JavaScript]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-07-06
---



直接上代码：

```javascript
class EventBus {
  constructor() {
    this.event = {}
  }
  on(key, func) {
    if (!this.event[key]) this.event[key] = []
    this.event[key].push(func) // 订阅事件，推入事件队列
  }
  emit(key, ...args) {
    if (!this.event[key]) return
    this.event[key].forEach((func) => func(...args)) // 发布事件，执行事件队列
  }
  off(key, func) {
    if (!this.event[key]) return
    this.event[key] = this.event[key].filter((f) => f !== func) // 取消订阅事件，移除事件队列中的对应函数
  }
  once(key, func) {
    const wrapper = (...args) => {
      func(...args)
      this.off(key, wrapper) // 一次性订阅，执行完立即取消订阅
    }
    this.on(key, wrapper)
  }
  clear(key) {
    key ? (this.event[key] = []) : (this.event = {}) // 未指定key则清空全部
  }
}
```
执行取消订阅时，通过订阅时传入的回调函数的内存地址，从 `key` 对应的事件队列中移除相同内存地址的对应函数。