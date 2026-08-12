---
title: JS 常见手写题
permalink: JS_常见手写题
published: 2026-03-25
tags: [JavaScript]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-03-25
---

更新于 2026.8.7

## 柯里化

```javascript
const curry = (func, ...args) => {
  return args.length >= func.length ? func(...args) : (...rest) => curry(func, ...args, ...rest)
}
```

## 防抖 (Debounce)

```javascript
const debounce = (func, t, options = { immediate: false }) => {
  const { immediate } = options
  let timer = null

  const debounced = function (...args) {
    if (timer !== null) clearTimeout(timer)
    if (immediate) {
      if (timer === null) {
        func.apply(this, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, t)
    } else {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, t)
    }
  }

  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  return debounced
}
```

## 节流 (Throttle)

```javascript
const throttle = (func, t, options = { immediate: false }) => {
  const { immediate } = options
  let timer = null

  const throttled = function (...args) {
    if (timer !== null) return
    if (immediate) {
      func.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, t)
    } else {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, t)
    }
  }

  throttled.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  return throttled
}
```

## 深拷贝 (Deep Clone)

```javascript
const deepClone = (target, weakMap = new WeakMap()) => {
  if (typeof target !== 'object' || target === null) return target
  if (weakMap.has(target)) return weakMap.get(target)
  const res = Array.isArray(target) ? [] : {}
  weakMap.set(target, res)
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      res[key] = deepClone(target[key], weakMap)
    }
  }
  return res
}
```

## Promise.all

```javascript
const PromiseAll = (promises) => {
  let count = 0
  const res = []
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p).then((result) => {
        res[i] = result
        count++
        if (count === promises.length) resolve(res)
      }, reject)
    })
  })
}
```

## Promise.race

```javascript
const PromiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve, reject)
    })
  })
}
```

## apply

```javascript
Function.prototype.myApply = function (ctx, args) {
  ctx = ctx || globalThis
  const key = Symbol()
  ctx[key] = this
  const res = ctx[key](...(args || []))
  delete ctx[key]
  return res
}
```

## call

```javascript
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || globalThis
  const key = Symbol()
  ctx[key] = this
  const res = ctx[key](...(args || []))
  delete ctx[key]
  return res
}
```

## bind

```javascript
Function.prototype.myBind = function (ctx, ...args) {
  ctx = ctx || globalThis
  return (...callArgs) => this.myCall(ctx, ...args, ...callArgs)
}
```

## 数组扁平化 (递归)

```javascript
const flatten_recur = (arr) => {
  let res = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(flatten_recur(item))
    } else {
      res.push(item)
    }
  }
  return res
}
```

## 数组扁平化 (栈)

```javascript
const flatten_stack = (arr) => {
  const stack = [...arr]
  const res = []
  while (stack.length) {
    const item = stack.pop()
    if (Array.isArray(item)) {
      stack.push(...item)
    } else {
      res.push(item)
    }
  }
  return res.reverse()
}
```

## 数组扁平化 (reduce)

```javascript
const flatten_reduce = (arr) => {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatten_reduce(cur) : cur)
  }, [])
}
```

## 数组去重 (filter + indexOf)

```javascript
arr.filter((item, index) => arr.indexOf(item) === index)
```

## new

```javascript
const myNew = (Constructor, ...args) => {
  if (typeof Constructor !== 'function') {
    throw new TypeError('构造器必须为函数')
  }
  const obj = Object.create(Constructor.prototype)
  const res = Constructor.apply(obj, args)
  // ECMA规定如果构造函数返回对象则new也返回这个对象，如果返回基本类型则忽略
  return typeof res === 'object' && res !== null ? res : obj
}
```

## 版本号比较

```javascript
const compareVersions = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const maxLen = Math.max(v1.length, v2.length)
  for (let i = 0; i < maxLen; i++) {
    const num1 = parseInt(v1[i] || '0', 10)
    const num2 = parseInt(v2[i] || '0', 10)
    if (num1 > num2) return 1
    if (num1 < num2) return -1
  }
  return 0
}
```

## EventBus

```javascript
class EventBus {
  constructor() {
    this.event = {}
  }
  on(key, func) {
    if (!this.event[key]) this.event[key] = []
    this.event[key].push(func)
    return this
  }
  emit(key, ...args) {
    if (!this.event[key]) return
    this.event[key].forEach((func) => func(...args))
    return this
  }
  off(key, func) {
    if (!this.event[key]) return
    this.event[key] = this.event[key].filter((f) => f !== func)
    return this
  }
  once(key, func) {
    const wrapper = (...args) => {
      func(...args)
      this.off(key, wrapper)
    }
    this.on(key, wrapper)
    return this
  }
  clear(key) {
    key ? delete this.event[key] : (this.event = {})
    return this
  }
}
```

## undo-redo

```javascript
class UndoRedo {
  constructor(maxSize = 50) {
    this.undoStack = []
    this.redoStack = []
    this.maxSize = maxSize
    this.cur = null
  }
  execute(x) {
    if (this.undoStack.length >= this.maxSize) {
      this.undoStack.shift() // 超出容量弹出最早的
    }
    if (this.cur !== null) this.undoStack.push(this.cur)
    this.cur = x
    this.redoStack = [] // 新操作要清空redo
  }
  undo() {
    if (!this.undoStack.length) return
    this.redoStack.push(this.cur)
    this.cur = this.undoStack.pop()
  }
  redo() {
    if (!this.redoStack.length) return
    this.undoStack.push(this.cur)
    this.cur = this.redoStack.pop()
  }
}
```

## LRU Cache

普通 Map 实现：

```javascript
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize
    this.map = new Map()
  }
  get(key) {
    if (!this.map.has(key)) return -1
    const value = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, value)
    return value
  }
  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key)
    }
    if (this.map.size >= this.maxSize) {
      const firstKey = this.map.keys().next().value
      this.map.delete(firstKey)
    }
    this.map.set(key, value)
  }
}
```

双向链表实现：

```javascript
class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize
    this.map = new Map()
    this.head = new Node(null, null) // 虚拟头节点，方便操作
    this.tail = new Node(null, null) // 虚拟尾节点，方便操作
    this.head.next = this.tail
    this.tail.prev = this.head
  }
  _delete(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }
  _insertToHead(node) {
    node.next = this.head.next
    node.prev = this.head
    this.head.next.prev = node
    this.head.next = node
  }
  get(key) {
    if (!this.map.has(key)) return -1
    const node = this.map.get(key)
    this._delete(node)
    this._insertToHead(node)
    return node.value
  }
  set(key, value) {
    if (this.map.has(key)) {
      this._delete(this.map.get(key))
      this.map.delete(key)
    }
    if (this.map.size >= this.maxSize) {
      const tailNode = this.tail.prev // 最旧的尾部节点
      this._delete(tailNode)
      this.map.delete(tailNode.key)
    }
    const node = new Node(key, value)
    this._insertToHead(node)
    this.map.set(key, node)
  }
}
```

持续收集中...
