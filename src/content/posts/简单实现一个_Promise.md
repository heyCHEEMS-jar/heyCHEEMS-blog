---
title: 简单实现一个 Promise
permalink: 简单实现一个_Promise
published: 2026-03-05
tags: [JavaScript]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-07-05
---

## Promise

先附上手写代码：

```javascript
const FULFILLED = 'fulfilled'
const PENDING = 'pending'
const REJECTED = 'rejected'

class myPromise {
  #status = PENDING
  #value = undefined
  #reason = undefined
  #callbacks = []

  constructor(executor) {
    const resolve = (value) => {
      if (this.#status === PENDING) {
        this.#status = FULFILLED
        this.#value = value
        this.#callbacks.forEach((cb) => cb.onFulfilled(value))
      }
    }
    const reject = (reason) => {
      if (this.#status === PENDING) {
        this.#status = REJECTED
        this.#reason = reason
        this.#callbacks.forEach((cb) => cb.onRejected(reason))
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // 透传值，确保多个传入非函数类型回调的then能够接连传递前面的有效值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    return new myPromise((resolve, reject) => {
      const handle = (callback, value) => {
        try {
          const result = callback(value)
          // 结果是promise则继续执行then，否则直接resolve
          result instanceof myPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      if (this.#status === FULFILLED) {
        queueMicrotask(() => handle(onFulfilled, this.#value))
      } else if (this.#status === REJECTED) {
        queueMicrotask(() => handle(onRejected, this.#reason))
      } else {
        this.#callbacks.push({
          onFulfilled: (value) => handle(onFulfilled, value),
          onRejected: (reason) => handle(onRejected, reason)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally()
        return value
      },
      (reason) => {
        onFinally()
        throw reason
      }
    )
  }
}
```

刚开始比较难理解的地方主要是为什么要维护 `callbacks` 数组，还有 `then` 中状态结束执行回调时为什么要包裹上 `queueMicrotask`。



在 `then` 注册回调时，此时 `Promise` 还是 `pending` 的状态，不能立即调用 `onFulfilled`，所以我们先把回调存起来，存到这个 `callbacks` 数组内，等未来执行 `resolve` 时再遍历执行所有注册的回调。那为什么要用数组而不是单个变量？因为 `then` 可以多次注册回调，例如：

```javascript
p.then((v) => console.log('a:', v))
p.then((v) => console.log('b:', v))
p.then((v) => console.log('c:', v))
```

`then` 多次注册回调，全存进 `callbacks` 数组，等 `resolve` 时一次性全执行，如果是单变量就只能记住最后一个。



状态结束时执行回调包裹 `queueMicrotask` 确保是异步执行的，例如执行一个直接 `resolve` 的 `Promise`，原生的 `Promise` 行为应该确保回调在下一轮微任务执行，而非立即同步执行。

------

## Promise.resolve

```javascript
static resolve(value) {
  if (value instanceof myPromise) {
    return value
  }
  return new myPromise((resolve) => resolve(value))
}
```

------

## Promise.reject

```javascript
static reject(reason) {
  return new myPromise((_, reject) => reject(reason))
}
```

------

## Promise.all

维护结果数组，在遇到失败回调时直接返回错误，其他结果将被忽略；成功则返回对应的结果数组。

```javascript
static all(promises) {
    return new myPromise((resolve, reject) => {
        const res = []
        let count = 0
        promises.forEach((p, i) => {
            myPromise.resolve(p).then((val) => {
                res[i] = val
                count++
                if (count === promises.length) resolve(res)
            }, reject)
        })
    })
}
```

------

## Promise.allSettled

维护成功与失败所有的结果数组，所有任务结束后返回结果数组。

```javascript
static allSettled(promises) {
    return new myPromise((resolve, reject) => {
        const res = []
        let count = 0
        promises.forEach((p, i) => {
            myPromise.resolve(p).then(
                (val) => {
                    res[i] = { status: FULFILLED, value: val }
                    count++
                    if (count === promises.length) resolve(res)
                },
                (reason) => {
                    res[i] = { status: REJECTED, reason }
                    count++
                    if (count === promises.length) resolve(res)
                }
            )
        })
    })
}
```

------

## Promise.race

返回第一个结果/错误。

```javascript
static race(promises) {
    return new myPromise((resolve, reject) => {
        promises.forEach((p) => {
            myPromise.resolve(p).then(resolve, reject)
        })
    })
}
```

------

## Promise.any

与 `Promise.all` 相反，直接返回第一个成功结果，否则返回所有错误结果数组。

```javascript
static any(promises) {
    return new myPromise((resolve, reject) => {
        const reasons = []
        let rejectedCount = 0
        promises.forEach((p, i) => {
            myPromise.resolve(p).then(resolve, (reason) => {
                reasons[i] = reason
                rejectedCount++
                if (rejectedCount === promises.length) reject(new AggregateError(reasons, 'All promises were rejected'))
            })
        })
    })
}
```

------

