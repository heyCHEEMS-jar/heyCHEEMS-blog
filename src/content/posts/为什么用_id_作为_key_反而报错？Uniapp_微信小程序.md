---
title: 为什么用 id 作为 key 反而报错？Uniapp 微信小程序
permalink: 为什么用_id_作为_key_反而报错？Uniapp_微信小程序
published: 2026-04-02
tags: [小程序, Debug]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-04-02
---

谁都知道在 Vue 里用 index 做 key 是个坏习惯，我原来也这么觉得。但在小程序里搞虚拟列表时，情况稍微有些不同。

在 Web 环境下写虚拟列表：

```html
<view v-for="item in visibleList" :key="item.id">
  <slot name="item" :data="item" />
</view>
```

逻辑没毛病，每个 item 的 id 都是唯一的。结果在小程序里一跑，控制台疯狂刷屏：

More than one slot named "list-item-0" are found...

明明 id 都是唯一的，为什么提示 slot 重名？

其实微信小程序底层根本不支持 Vue 那种灵活的、动态的作用域插槽。UniApp 为了在编译时硬把这功能撑起来，做了个妥协，它在 .wxml 里提前给你生成好一堆静态的具名插槽，名字就叫 list-item-0、list-item-1、list-item-2……你的 buffer 设多大，它就给你预留多少个坑位。

· 一般来说如果你用 index 作为 key：滚动时 Vue 一看，key（0, 1, 2…）全都没变，就认为 DOM 结构稳得很。那好，我只更新插槽里的数据就行了，节点本身不用动。

· 如果你用 item.id 做 key：滚动时旧的 id 走了，新的 id 来了。Vue 会老老实实地把旧插槽节点干掉了，再给你建个新的。

那为啥干掉旧的再建新的反而报错了呢？这就涉及到小程序的双线程架构了。

微信小程序的逻辑层（JS）和渲染层（WXML）是分开跑、异步通信的。逻辑层极快，一瞬间就把 id 为 1 的插槽删了，通知渲染层创建 id 为 11 的新插槽，用的还是 list-item-0 这个名字。但渲染层那边慢半拍，还没把旧的 list-item-0 清理掉，又来了个新的同名插槽，所以当场就报错了。

在 Web 环境下，用 index 做 key 可能导致组件状态错乱，但在小程序的虚拟列表里，不用 index 迎接你的就是一坨没法消除的警告。权衡之下，我还是老老实实写上 :key="index"。