---
title: Monorepo 下 Vite 软链接热更新失效的问题
permalink: Monorepo_下_Vite_软链接热更新失效的问题
published: 2026-08-16
tags: [Vite, Debug, 编译, 小程序]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-08-16
---

本地开发的外部依赖库、项目放在 Monorepo 仓库下，通过软链接外部依赖库到项目的 `node_modules` 里，可以正常解析运行。

想着在改动外部依赖库时，项目内能即时更新效果，就在项目的 Vite 配置文件中配置了外部依赖库的热更新，但实际测试改动依赖库组件时没反应。

```javascript
// HMR
server: {
  watch: {
    ignored: ['**/node_modules/**', '!**/node_modules/外部依赖库/**']
  }
},
// 不预构建，直接引入组件源码
optimizeDeps: {
  exclude: ['外部依赖库']
}
```

---

问题在哪？

理论上文件变了，Vite 应该检测到，然后推 HMR。

但 Vite 的文件监听器 chokidar 默认忽略 `node_modules` 下的所有变更。

Vite 启动时建立依赖图，只监听已纳入依赖图的模块路径。若解析路径落在 node_modules 下，chokidar 默认忽略该目录，导致变更事件丢失。

---

怎么解决？

第一种方法，配置 `alias`，让 Vite 在模块解析阶段直接将软链接替换成绝对物理路径，这样 Vite 监听器就能正确追踪变更，触发重新编译。

```javascript
resolve: {
  alias: {
    '外部依赖库': path.resolve(__dirname, '../../packages/外部依赖库')
  }
}
```

第二种方法，开启 `preserveSymlinks`，Vite 将不通过软链接解析文件，而是使用真实路径。

```javascript
resolve: {
  preserveSymlinks: true
}
```

除以上之外，还可以通过 Rollup 监听自动重新构建。

```javascript
build: {
  rollupOptions: {
    plugins: [{
      name: 'watch-workspace-pkgs',
      buildStart() {
        if (this.meta.watchMode) {
          workspaceDirs.forEach(dir => this.addWatchFile(dir)) // 添加监听文件绝对路径
        }
      }
    }]
  }
}
```

---

