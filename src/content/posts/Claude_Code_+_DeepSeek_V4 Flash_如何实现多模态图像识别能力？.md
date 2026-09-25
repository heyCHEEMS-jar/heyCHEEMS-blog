---
title: Claude Code + DeepSeek V4 Flash 如何实现多模态图像识别能力？
permalink: Claude_Code_+_DeepSeek_V4 Flash_如何实现多模态图像识别能力？
published: 2026-08-17
tags: [LLM]
category: AI
licenseName: "CC BY 4.0"
draft: false
date: 2026-08-17
---

ps：本文发布后，2026.8.21 多模态视觉理解模型 DeepSeek-V4-Flash-Vision-Exp 已上线 DeepSeek API 平台，可以通过设置 model='deepseek-v4-flash-vision-exp' 访问该模型。

---

由于 DeepSeek V4 Flash 是纯文本模型，不支持多模态，日常使用 Claude Code 遇到需要图片识别的场景比较麻烦。

通过 `MCP-Vision-Bridge` 插件 + `Ollama` 本地部署 `Qwen3-VL` 模型，可以零成本给 Claude Code 拥有视觉能力。

```
用户粘贴图片 → Claude Code 调用 analyze_image → MCP-Vision-Bridge 转发给 Ollama 本地模型 → 返回文字描述
```

---

### 1. 本地部署 Ollama 多模态模型

进入 Ollama 官网，下载对应系统的安装包，安装以后打开 Ollama。

根据电脑显存条件安装合适的多模态模型，这里我装的是 Qwen3-vl:4B 模型，RTX 4060 8G 可以轻松带动。

安装好后随便拖一张图片到 Ollama 聊天窗口内，验证模型是否能够识别。

### 2. 安装 MCP-Vision-Bridge

在 Claude Code 内运行以下命令，安装视觉桥接插件。

```bash
claude plugin marketplace add KuaaMU/agent-plugins
claude plugin install mcp-vision-bridge
```

### 3. 填写配置

安装好插件后提示填入大模型的运行本地环境地址、端口，API Key 随便填，Model 模型填对应的模型名称。

| 配置 | 填写 |
|------|------|
| Endpoint | `http://localhost:11434/v1` |
| API Key | `ollama`（随便填） |
| Model | `qwen3-vl:4b` |

### 4. 验证

以上操作以后，随便拖一张图片到 Claude Code 中，插件将自动调用多模态模型进行识别。

---


