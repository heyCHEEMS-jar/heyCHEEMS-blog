---
title: 手搓 uniapp vue3 虚拟列表遇到的坑
permalink: 手搓_uniapp_vue3_虚拟列表遇到的坑
published: 2026-01-02
tags: [小程序, 组件]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-01-02
---

## 虚拟列表的核心思想

虚拟列表的核心其实很简单：**只渲染用户能看到的那部分内容**。当用户滚动时，动态计算哪些元素应该出现在可视区域内，然后只渲染这些元素，在大数据量列表中能显著提升性能。

## 基本实现思路

1.  用一个固定高度的容器包裹整个列表
2.  计算总内容高度（用占位元素撑开）
3.  监听滚动事件，计算当前可视区域的起始索引
4.  只渲染可视区域内的元素，其他用空白填充
5.  通过 `transform` 来定位实际内容

## 遇到的坑

### 1\. 占位符导致的布局问题

最开始实现时，占位符和列表容器都在文档流内，导致列表容器相对占位符定位而偏离了位置，解决办法就是让占位符脱离文档流，设为绝对定位，外层容器保持相对定位。

### 2\. 滚动闪烁问题

在快速滚动时，有时会出现空白闪烁。原因是：

-   预渲染的缓冲元素数量不足
-   元素尺寸测量延迟

通过增加 `buffer`属性和异步测量解决了这个问题：

```typescript
const visibleRange = computed(() => {
  // ... 计算逻辑
  return { start, end: Math.min(end + props.buffer, props.list.length) }
})
```

`buffer`其实就是预加载的缓冲区域，设置为3则代表前后多渲染3个item，这样就可以防止滑动过快导致渲染跟不上而白屏。

### 3\. 元素尺寸测量不准

在 UniApp 中测量元素尺寸需要使用 `uni.createSelectorQuery()`，但这里有几个问题：

-   必须在组件挂载后才能测量
-   异步测量导致初始渲染时使用预估尺寸
-   元素动态变化时尺寸需要重新测量

解决方案：

```typescript
const measureItem = () => {
    const start = visibleRange.value.start
    uni
      .createSelectorQuery()
      .in(instance?.proxy)
      .selectAll(`.list-item`)
      .boundingClientRect((res: any) => {
        const rects = res as any[]
        if (!rects || !rects.length) return
        rects.forEach((res, index) => {
          const itemIndex = start + index
          if (measured.has(itemIndex)) return
          const size = isVertical.value ? res.height : res.width
          if (size > 0 && itemSizes.value[itemIndex] !== size) {
            itemSizes.value[itemIndex] = size
            measured.add(itemIndex)
          }
        })
      })
      .exec()
  }
```

用 `measured`Set 记录已经测量过的元素，避免重复测量。

### 4\. 滚动性能优化

直接在 `@scroll`事件中更新状态在快速滚动时会有性能问题，但 UniApp 的 `scroll-view`本身就有节流，所以没有额外处理。如果需要更精细的控制，可以考虑用防抖或节流包装滚动处理函数。

### 5\. 数据更新处理

当列表数据变化时，需要重置一下旧的item高度缓存数据：

```typescript
// 清空列表高度缓存
const resetCache = () => {
    itemSizes.value = []
    measured.clear()
}

// 监听列表变化，清空旧高度缓存数据
watch(
    () => props.list,
    (newList: any[], oldList: any[]) => {
      // 首次测量无需清空
      if (!oldList || !oldList.length) return
      // 清空列表同时清空缓存
      if (!newList || !newList.length) {
        resetCache()
        return
      }
      const oldFirstKey = oldList?.[0]?.[props.itemKey]
      const newFirstKey = newList?.[0]?.[props.itemKey]
      // 列表首项key值变化(说明列表被替换)或者有删除操作
      // 追加操作前面的旧item高度保持不变，无需清空
      if (oldFirstKey !== newFirstKey || newList.length < oldList.length) {
        resetCache()
      }
    },
    { deep: false }
  )
```

### 6\. 水平滚动的适配

为了让组件同时支持垂直和水平滚动，需要加一点条件判断：

```typescript
const isVertical = computed(() => {
  return props.direction === 'vertical'
})

// 在样式中
transform: isVertical.value
  ? `translateY(${startOffset.value}px)`
  : `translateX(${startOffset.value}px)`
```

## 使用示例

```html
<virtual-list
  :list="data"
  direction="vertical"
  height="200px"
  :buffer="3"
  :estimatedSize="40"
>
  <template #list-item="{ item, index }">
    <view class="list-item">
      <text>{{ index }}. {{ item.name }}</text>
    </view>
  </template>
</virtual-list>
```

## 总结

手搓虚拟列表最大的收获是理解了虚拟滚动的原理。虽然有一些坑，但解决了之后的效果还是很明显的，特别是在移动端处理长列表时，性能提升非常显著。 关键点：

-   正确计算和更新元素位置
-   合理的缓冲机制防止空白
-   准确的尺寸测量
-   处理好数据变化时的状态重置

虚拟列表在移动端开发中是个很实用的优化手段，值得花时间理解和实现。