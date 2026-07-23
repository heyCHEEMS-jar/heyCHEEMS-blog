---
title: 解决 css-loader v7 下 import styles 为 undefined 的问题
permalink: 解决_css-loader_v7_下_import_styles_为_undefined_的问题
published: 2026-05-10
tags: [CSS, Debug]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-05-10
---

升级 `css-loader` 到 v7 后，原本正常运行的代码突然报错：

```javascript
import styles from './index.css'
console.log(styles) // undefined
```

## 问题原因

`css-loader` v7 严格遵循 ES 模块规范，改变了默认导出行为。旧版默认导出 CSS 类名对象，v7 不再提供默认导出。

## 解决方案

### 方法一：修改导入语法

将默认导入改为命名空间导入：

```javascript
// ❌ v7 不再支持
import styles from './index.css'

// ✅ 正确写法
import * as styles from './index.css'
```

### 方法二：配置恢复旧版行为

修改 `webpack.config.js`：

```javascript
{
  loader: 'css-loader',
  options: {
    modules: {
      namedExport: false   // 关闭命名导出，恢复默认导出
    }
  }
}
```

配置后即可继续使用 `import styles from './index.css'`。

### 注意一下 `exportLocalsConvention` 这个参数

如果 CSS 类名使用短横线（如 `my-class`），代码中驼峰引用（如 `styles.myClass`），需要额外配置：

```javascript
modules: {
  namedExport: false,
  exportLocalsConvention: 'camelCase'  // my-class -> myClass
}
```

如果不配置这个，`styles.myClass` 就是 `undefined`。