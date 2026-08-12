---
title: 为什么小程序 v-if 删不掉 DOM 节点
permalink: 为什么小程序_v-if_删不掉_DOM_节点
published: 2025-01-07
tags: [小程序, 编译, Debug]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2025-01-07
---

在开发自定义 Swiper 或长列表组件时，为了优化性能，我们通常会给每一项加上懒加载逻辑：

```html
<view class="item">
  <template v-if="shouldRender">
    <slot :name="'slot-' + index" />
  </template>
</view>
```

但是哪怕 `shouldRender` 是 `false`，打开小程序调试器一看，WXML 树里依然排满了 `view slot="slot-0"`、`view slot="slot-1"`... 里面甚至还塞满了图片节点。

其实 v-if 只是隐藏了视觉，内存压力没减。

---

为什么 `v-if` 失效了？因为在微信小程序底层，**具名插槽** 的实现逻辑是**静态枚举**。

小程序原生不支持动态插槽名，小程序编译器为了兼容 Vue，在 WXML 里预先写死所有的占位符（如 `slot="d-0"`, `slot="d-1"`）。

在具名插槽模式下，父组件会先把所有内容节点生成好，然后再分发给子组件。

子组件里的 `v-if` 只能决定子组件自己是否显示，但改不了父组件已经产生的物理节点。

这就好比虽然你把家门关了，但邻居已经把货卸在了你门口。

---

要实现真正的懒加载，必须重构为作用域插槽。

1\. 不给插槽起动态名字，统一使用带作用域的默认插槽或具名插槽。

```html
<view v-for="(item, index) in list" :key="index">
  <template v-if="shouldRender(index)">
    <slot name="content" :item="item" />
  </template>
</view>
```

2\. 父组件不负责循环产生节点，只提供渲染模板。

```html
<Swiper :list="dataList">
  <template v-slot:content="{ item }">
    <image :src="item.url" />
  </template>
</Swiper>
```

---

如果子组件循环 20 次调用同一个 <slot name="content">，那编译器生成的 WXML 里会不会有 20 个相同的插槽名，导致冲突报错？

不会。

使用具名插槽时，编译器不知道 `index` 到底有多少个，所以它会在 WXML 里预先写死一批占位符。

使用作用域插槽时，它在 WXML 里只有一个模板定义，循环时通过 `template is="xxx"` 去动态调用这个模板。

---