---
title: 如何用 Recast 实现静态配置文件源码级读写
published: 2026-05-10
tags: [Recast, Nodejs]
category: 前端
licenseName: "CC BY 4.0"
draft: false
date: 2026-05-10
---

当你使用 Node.js 修改代码时，用正则直接操作字符串极其危险且难以维护。通过 AST 就可以像操作 JSON 一样精确地增删改查代码。

-   **Babel (@babel/parser)**：负责执行将代码拆成 Token、将 Token 组装成树，把字符串拆解成一个个节点，如变量名、数值、函数。但是在修改并回写代码时，会丢失原有的缩进、空格和注释，导致代码格式全乱。
-   **Recast**：在解析时会记录每个节点的原始位置和格式，在回写阶段会进行自动对比，只更新你修改过的部分。

## Recast 基础用法

1.  **`recast.parse`**：把代码字符串解析成一颗 AST 树。
2.  **`recast.visit`**：在树上找节点，比如找到名为 `config` 的变量。
3.  **`recast.types.builders`** (简称 `b` ) ：假如你想把数字 `1` 改成 `2`，你需要用 builder 造出一个“数字 2”的节点来替换。

使用 `recast.visit` 时，可以从 `path.node` 拿到需要的数据。

#### path.node 常用属性

**`type`**：节点的类型（如 `Identifier`, `Literal`），这是判断“它是什么”的第一步。

**`loc`**：包含 `start` 和 `end` 的行号列号，Recast 靠它实现精准的局部替换。

**`comments`**：存放该节点的注释信息，可以通过 `b.commentLine` 往里推入新注释。

##### 变量声明 (VariableDeclarator)

**`id`**：左手边的变量名节点，通常 `node.id.name` 就能拿到变量名。

**`init`**：右手边的初始值节点，它是你要读取或替换的核心。

##### 对象属性 (ObjectProperty)

**`key`**：键名，注意：如果是 `{ 'a-b': 1 }`，key 是 `StringLiteral`；如果是 `{ a: 1 }`，key 是 `Identifier`。

**`value`**：键值，可以是任何表达式（数字、函数、另一个对象）。

**`computed`**：布尔值，如果为 `true`，说明是 `{ [prop]: 1 }` 这种计算属性。

##### 成员表达式 (MemberExpression)

**`object`**：点号左边的部分，如 `process.env.PORT` 中的 `process.env`。

**`property`**：点号右边的部分，如 `PORT`。

##### 函数调用 (CallExpression)

**`arguments`**：一个数组，存放所有传入的参数节点，修改它就能增删函数参数。

##### 字面量 (Literal 系列)

**`value`**：存放在 JS 里的实际值（如数字 `8080`，字符串 `"localhost"`）。

**`raw`**：原始文本，比如源码写的是 `0x10`，`value` 是 `16`，而 `raw` 就是 `"0x10"`。

#### 1\. 定义解析规则

```javascript
const recast = require('recast');
const parser = require('@babel/parser');
const b = recast.types.builders; // 用来创建新的代码节点

const options = {
  // 解析器配置
  parser: {
    parse: source => parser.parse(source, {
      sourceType: 'module', // es模块化
      plugins: ['typescript'] // 开启 TS 插件
    })
  }
};
```

#### 2\. 从源码提取数据

比如把 `const port = 8080` 变成 JS 对象 `{ port: 8080 }`。

```javascript
function getConfig(code) {
  const ast = recast.parse(code, options); // 先解析为 AST
  const result = {};

  recast.visit(ast, {
    // 遍历所有的变量定义
    visitVariableDeclarator(path) {
      const node = path.node;
      // node.id.name 是变量名，node.init.value 是变量的值
      result[node.id.name] = node.init.value; 
      return false; // 找到后停止向下搜寻
    }
  });
  return result;
}
```

#### 3\. 回写源码内容

假设把源码里的 `port` 改为 `9090`，并加上注释。

```javascript
function updateConfig(oldCode, newValues) {
  const ast = recast.parse(oldCode, options); // 先解析为 AST

  recast.visit(ast, {
    visitVariableDeclarator(path) {
      const varName = path.node.id.name;
      if (newValues[varName]) {
        // 用 builder 创建一个新的 number 节点
        const newValueNode = b.numericLiteral(newValues[varName]);
        
        // 替换旧的初始值
        path.get('init').replace(newValueNode);

        // 添加一行注释
        path.parentPath.node.comments = [b.commentLine(' 自动生成的配置')];
      }
      return false;
    }
  });

  // 输出转换结果
  return recast.print(ast, { quote: 'single' }).code;
}
```

---

常用的遍历节点类型：

**visitVariableDeclarator**：匹配变量定义，如 `const a = 1` 中的 `a = 1` 部分。

**visitObjectProperty**：匹配对象属性，用于读写 `{ key: value }` 中的键值对。

**visitArrayExpression**：匹配数组配置，常用于增删 `[item1, item2]` 中的元素。

**visitImportDeclaration**：匹配导入语句，用于分析或修改 `import` 的路径与成员。

**visitExportNamedDeclaration**：匹配导出语句，用于处理 `export const config = {}`。

**visitCallExpression**：匹配函数调用，用于修改 `init({ port: 80 })` 等执行语句的参数。

**visitAssignmentExpression**：匹配赋值操作，如修改 `module.exports = {}` 或变量重赋值。

**visitMemberExpression**：匹配成员访问，用于处理 `process.env.NODE_ENV` 这种点语法。

**visitIdentifier**：匹配所有标识符，即代码中出现的变量名、函数名或属性名。

**visitStringLiteral / NumericLiteral**：匹配字符串或数字字面量，用于直接改写基础值。

**visitExpressionStatement**：匹配独立的表达式语句，常用于在文件顶层插入新代码行。

**visitIfStatement**：匹配条件判断，用于自动化修改 `if (isDev)` 等逻辑分支。

**visitArrowFunctionExpression**：匹配箭头函数，用于重构或分析回调函数内容。

**visitClassDeclaration**：匹配类定义，用于提取类名、继承关系或修改装饰器。

---

#### 4\. 引用变量的提取与回写

处理节点时，引用变量是一个比较麻烦的地方。比如代码中不仅仅只是简单的 `port: 8080`，而是 `port: DEFAULT_PORT` 或 `path: process.env.URL`。直接读取 `node.init.value` 会得到 `undefined`，因为这些值不是字面量（Literal） ，而是标识符（Identifier）或成员表达式（MemberExpression） 。

##### 提取逻辑示例

遇到如 `Identifier` 或 `MemberExpression` 等非字面量节点时，递归提取其完整路径，并用特殊标记（如 `__isRef: true`）包装，防止丢失引用关系。

```javascript
// 递归提取引用路径
_getMemberPath(node) {
    if (node.type === 'Identifier') return node.name;
    if (node.type === 'MemberExpression') {
        // 递归向上拼接
        return `${this._getMemberPath(node.object)}.${node.property.name}`;
    }
    return '';
}

// 如果是引用则返回包装对象
if (node.type === 'Identifier' || node.type === 'MemberExpression') {
    return { __isRef: true, __refName: this._getMemberPath(node) };
}
```

---

##### 回写逻辑示例

回写时识别标记，通过 `split('.')` 将路径切开，利用 `reduce` 配合 `b.memberExpression` 进行还原。

```javascript
// 将字符串还原为 AST 
if (val && val.__isRef) {
    const parts = val.__refName.split('.');
    return parts.reduce((sum, cur) => {
        if (!sum) return b.identifier(cur); // 第一个基础标识符
        return b.memberExpression(sum, b.identifier(cur)); // 向下递归拼接
    }, null);
}
```

---

## Recast 是如何进行自动对比的？

在执行 `recast.parse` 时，Recast 会为 AST 的每个节点打上一个隐藏的标签，记录该节点在原始字符串中的起始位置 `loc.start` 和结束位置 `loc.end` ，以及它周围的所有空格、换行、分号。

当你使用 `replace` 修改了某个节点或者它的属性时，Recast 会将该节点标记为脏节点 。

在执行 `recast.print` 时，Recast 的渲染器会遍历整棵树：

-   如果是**干净节点**，则直接从原始字符串中，根据记录的 `loc` 坐标切出那一段文本。
-   如果是**脏节点**，则递归调用生成器，根据 Babel 规则重新生成这一小段代码，并尝试参考父节点的缩进风格进行对齐。

---