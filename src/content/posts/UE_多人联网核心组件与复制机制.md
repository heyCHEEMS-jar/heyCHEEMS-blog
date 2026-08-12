---
title: UE 多人联网核心组件与复制机制
permalink: UE_多人联网核心组件与复制机制
published: 2024-03-02
tags: [UE4]
category: UE4
licenseName: "CC BY 4.0"
draft: false
date: 2024-03-02
---

## 核心组件（谁能看到谁）

| **组件** | **服务器** | **拥有者客户端** | **其他客户端** | **核心职责** |
| --- | --- | --- | --- | --- |
| **GameInstance** | Y | Y | Y | 跨关卡存数据，不联网，各存各的 |
| **GameMode** | Y | N | N | 游戏规则、胜负判定、玩家出生点 |
| **GameState** | Y | Y | Y | 单局全局状态（得分、进度） |
| **PlayerController** | Y | Y | N | 玩家私人专线：输入、私人 UI |
| **PlayerState** | Y | Y | Y | 玩家公共数据（名字、装备、血量）。 |

---

## 最容易搞混的两个

### GameMode

它只活在服务器上，负责决定谁能加入、玩家从哪出生、游戏什么时候结束。

别在里面写客户端逻辑，客户端 Get GameMode 永远返回 Null。

### GameInstance

从进程启动到关闭它一直都在，切关卡数据也不会丢，所以设置参数、没保存的角色信息放这儿很合适，网络报错提示也常在这处理。

但它不参与网络复制，服务器一个，每个客户端各一个。

在当前客户端的 GameInstance 里改了变量，服务器和其他客户端不会同步更新。

---

## 玩家加入时发生了什么

1. 服务器上的 GameMode 收到请求，检查进入权限。
2. 服务器给他生成 PlayerController 和 PlayerState。
3. 服务器先跑这俩的 BeginPlay。
4. 客户端加载地图，生成本地镜像。
5. 客户端再跑它们的 BeginPlay。
6. 开始同步：服务器把 GameState、PlayerState 的当前数据快照发给新玩家。

---

## Replicated 和 RepNotify

### Replicated（静默同步）

服务器值一变，引擎自动序列化发给所有客户端，客户端接收到后直接覆盖本地变量。

缺点是被动接收，不知道它什么时候变的。

适合等级、称号这类非瞬时数据。

如果设计的 UI 本来就是每隔 0.1 秒轮询读一次值，用它就够，别过度设计。

### RepNotify（带回调的同步）

除了更新值，引擎还会生成一个 OnRep_变量名 函数，客户端收到数据时自动触发。

适合即时反馈，比如血量变了除了改数字，还要红屏、播扣血特效；背包数组变了，UI 列表要重画。

这里有个坑：

- 服务器自己改了变量不会执行 OnRep 函数，如果你是服务器玩家还得多一步处理，逻辑跑完得自己手动调一次回调函数或者用分发器。
- OnRep 函数触发时，本地变量已经被覆盖成最新值了。

---

## 几个注意点

### BeginPlay 反复执行

每来一个新玩家，服务器就给他生成新的 Controller 再跑一遍 BeginPlay。

注意服务器本身也是玩家的话，它自己也会跟着跑一次新玩家的 BeginPlay。

所以初始化 UI 一定要加 Is Locally Controlled 过滤，不然主机屏幕上可能会叠一层别人的 UI。

### RPC

- Run on Server：客户端 ➔ 服务器。申请改钱、扣血这类权限操作。
- Run on Owning Client：服务器 ➔ 拥有者客户端。发私信、震本地手柄。
- Multicast：服务器 ➔ 所有客户端。播特效、放声音、全服通告。

### Multicast 必须由服务器发起

物理上客户端之间没有通路，A 没法直接指挥 B 的屏幕。

服务器相当于唯一的裁判，流程是先 Run on Server 申请，服务器认可后再由它广播。

---

## UI 初始化

- 壳子放 PlayerController，判断 Is Locally Controlled，保证只有本地创建。
- 数据放 PlayerState，开启 RepNotify。
- 变量更新时用事件分发器通知 UI 刷新。
- 全局数据从 GameState 拿。

---
