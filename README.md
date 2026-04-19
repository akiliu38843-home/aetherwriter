# AetherWriter - AI 小说润色与文学创作助手

> 一个基于 AI 的小说润色平台，帮助作者打磨文字、提升文笔，专注于文学与流行文学创作（日本轻小说、推理小说等）

## 📋 目录

- [项目简介](#项目简介)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [核心功能](#核心功能)
- [开发指南](#开发指南)
- [环境变量配置](#环境变量配置)
- [AI 功能说明](#ai-功能说明)
- [更新日志](#更新日志)

## 🎯 项目简介

AetherWriter 是一个 AI 驱动的小说润色与文学创作工具，专注于帮助作者提升文字质量。它整合了：
- 智能富文本编辑器
- 可视化故事大纲管理
- AI 文字润色助手
- 世界观/角色/设定管理系统

**我们的定位**：不是写作助手，而是**文字打磨专家**。无论是日本轻小说的清新风格、推理小说的冷峻氛围，还是纯文学的诗意表达，我们都能帮你找到最适合的表达方式。

## 💻 技术栈

### 前端框架
- **Next.js 14** (App Router)
- **React 18.3**
- **TypeScript 5.4**

### UI 组件库
- **Radix UI** - 无样式、可访问的 UI 组件
- **Tailwind CSS** - 原子化 CSS 框架
- **Lucide React** - 图标库

### 编辑器和画布
- **Tiptap 3.22** - 富文本编辑器（基于 ProseMirror）
- **@xyflow/react 12** - 可视化流程图/画布

### AI 能力
- **Vercel AI SDK 6** - AI 集成框架
- **DeepSeek API** - AI 模型提供商

### 其他依赖
- **clsx** / **tailwind-merge** - 条件类名工具
- **@radix-ui/react-dialog** - 对话框组件
- **@radix-ui/react-scroll-area** - 自定义滚动区域
- **@radix-ui/react-separator** - 分隔线组件
- **@radix-ui/react-tooltip** - 工具提示组件

## 📁 项目结构

```
aetherwriter/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── chat/
│   │       └── route.ts         # AI 对话 API 端点
│   ├── layout.tsx               # 根布局组件
│   └── page.tsx                 # 主页面入口
│
├── components/                   # React 组件
│   ├── ui/                      # 基础 UI 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── sidebar.tsx
│   │   ├── sheet.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── tooltip.tsx
│   │   └── ...
│   │
│   ├── editor/                  # 编辑器相关组件
│   │   └── tiptap-editor.tsx    # Tiptap 富文本编辑器
│   │
│   ├── chat/                    # AI 聊天相关组件
│   │   └── chat-interface.tsx   # AI 写作助手界面
│   │
│   ├── canvas/                  # 画布相关组件
│   │   ├── plot-canvas.tsx     # 故事大纲画布
│   │   └── story-beat-node.tsx # 故事节点组件
│   │
│   └── layout/                  # 布局相关组件
│       ├── app-sidebar-left.tsx     # 左侧导航栏
│       ├── app-sidebar-right.tsx    # 右侧设定面板
│       ├── main-content.tsx         # 主内容区域
│       ├── header-controls.tsx      # 头部控制栏
│       └── view-context.tsx         # 视图状态管理
│
├── lib/                         # 工具函数
│   └── utils.ts                # cn() 等工具函数
│
├── public/                      # 静态资源
│
├── tailwind.config.ts          # Tailwind 配置
├── postcss.config.js           # PostCSS 配置
├── next.config.js              # Next.js 配置
├── package.json
├── tsconfig.json
└── README.md                   # 项目文档（你正在阅读）
```

## 🎨 核心功能

### 1. 编辑器布局 (Editor Layout)

**位置**: `components/editor/editor-layout.tsx`

**功能**:
- ✅ 集成 Tiptap 富文本编辑器和 AI 聊天助手
- ✅ 可折叠的聊天面板设计
- ✅ 节省屏幕空间，同时保持功能完整
- ✅ 优雅的展开/收起动画

**界面布局**:
```
┌─────────────────────────────────────┐
│         Tiptap 富文本编辑器         │
│         (占据主空间)                 │
│                                     │
│         编辑内容区域                 │
│                                     │
├─────────────────────────────────────┤
│  AI 助手                    [收起] ▼│
├─────────────────────────────────────┤
│  AI 写作助手                        │
│  ┌──────────────────────────────┐  │
│  │   欢迎使用 AI 助手             │  │
│  │   输入您的问题...              │  │
│  └──────────────────────────────┘  │
│  [输入框........................] [▶]│
└─────────────────────────────────────┘
```

**相关文件**:
- [editor-layout.tsx](components/editor/editor-layout.tsx) - 编辑器布局主组件
- [tiptap-editor.tsx](components/editor/tiptap-editor.tsx) - Tiptap 编辑器组件
- [chat-interface.tsx](components/chat/chat-interface.tsx) - 聊天界面组件

---

### 2. 富文本编辑器 (Tiptap Editor)

**位置**: `components/editor/tiptap-editor.tsx`

**功能**:
- ✅ 富文本编辑（基于 Tiptap/StarterKit）
- ✅ 占位符文本提示
- ✅ 文本选中后弹出 AI 助手气泡
- ✅ AI 重写/润色功能（流式输出）
- ✅ 接受/拒绝 AI 建议
- ✅ 中断 AI 生成

**交互流程**:
1. 用户在编辑器中选中一段文字
2. 在选中位置上方显示 AI 操作气泡
3. 点击"重写"按钮，调用 `/api/chat` 生成新内容
4. 在选中位置下方显示 AI 生成的内容
5. 用户可选择接受（插入内容）或拒绝（删除草稿）

**相关文件**:
- [tiptap-editor.tsx](components/editor/tiptap-editor.tsx) - 编辑器主组件

---

### 2.1 叙事维度微操 (Narrative Engine)

**位置**: 
- 组件：`components/editor/narrative-menu.tsx`
- 工具函数：`lib/prompts.ts`
- 集成：`components/editor/tiptap-editor.tsx`

**功能**:
- ✅ 基于热内特（Gérard Genette）叙事学框架的专业润色工具
- ✅ 三维叙事维度选择器（叙事距离、叙事聚焦、叙事时间）
- ✅ 动态 Prompt 组装引擎
- ✅ 流式文本生成与视觉区分
- ✅ 采纳/拒绝交互

**叙事维度说明**：

| 维度 | 选项 | 描述 |
|------|------|------|
| **叙事距离** | 极远 (++) | 概述性动词，疏离冷峻 |
| | 较远 (+) | 间接引语，客观中立 |
| | 较近 (-) | 自由间接，深度共情 |
| | 极近 (--) | 直接对话，现场感 |
| **叙事聚焦** | 零聚焦 | 全知视角，自由跨越 |
| | 内聚焦 | 单一视角，深度沉浸 |
| | 外聚焦 | 客观镜头，冷硬白描 |
| **叙事时间** | 审美停顿 | 静态细节，时间停滞 |
| | 心理场景 | 实时呈现，高潮张力 |
| | 叙事跨越 | 快节奏，直接切入 |

**技术实现**：

**1. Prompt 模板字典** (`lib/prompts.ts`):
```typescript
export const DISTANCE_PROMPTS = {
  'extreme-far': '采用叙述化言语。使用概述性动词...',
  'far': '采用间接引语...',
  'near': '采用自由间接引语...',
  'extreme-near': '采用具名引语...',
}

export const FOCALIZATION_PROMPTS = {
  'zero': '赋予叙述者全知视角...',
  'internal': '执行严格的掩码机制（Masking）...',
  'external': '模拟客观的电影镜头...',
}

export const DURATION_PROMPTS = {
  'pause': '将故事时间(ST)设为0...',
  'scene': '保持叙事时间(NT)与故事时间(ST)为1:1...',
  'ellipsis': '将叙事时间(NT)设为0...',
}

export function buildNarrativeSystemPrompt(dimensions) {
  // 动态组装完整系统提示词
}
```

**2. 叙事菜单组件** (`components/editor/narrative-menu.tsx`):
- 使用 shadcn/ui DropdownMenu 组件
- 多级嵌套菜单（叙事距离 → 叙事聚焦 → 叙事时间）
- 实时显示当前选择的维度

**3. 集成到编辑器**:
- 在 Tiptap BubbleMenu 中添加"叙事微操"按钮
- 调用 `handleNarrativeRewrite` 处理叙事润色
- 流式显示结果，右下角面板供采纳/拒绝

**使用流程**:
1. 在编辑器中选中一段文字
2. 点击浮动工具栏的"叙事微操"按钮
3. 选择三个维度的参数（例如：较近 + 内聚焦 + 心理场景）
4. 点击"应用叙事约束"
5. AI 根据热内特叙事学框架重写文本
6. 在右下角显示草稿，可选择采纳或丢弃

**相关文件**:
- [narrative-menu.tsx](components/editor/narrative-menu.tsx) - 叙事维度选择器组件
- [prompts.ts](lib/prompts.ts) - Prompt 模板字典
- [tiptap-editor.tsx](components/editor/tiptap-editor.tsx) - 集成叙事菜单
- [dropdown-menu.tsx](components/ui/dropdown-menu.tsx) - shadcn/ui 下拉菜单

---

### 2. AI 聊天助手 (Chat Interface)

**位置**: `components/chat/chat-interface.tsx`

**功能**:
- ✅ 对话式 AI 交互
- ✅ 流式响应显示
- ✅ 打字机动画效果
- ✅ 错误状态展示
- ✅ DeepSeek 模型标识
- ✅ 紧凑的界面设计，适合集成在编辑器下方
- ✅ 优化的内边距和字体大小

**状态**:
- `idle` - 空闲状态
- `submitted` - 消息已提交，等待响应
- `streaming` - 正在接收流式响应
- `error` - 发生错误

**相关文件**:
- [chat-interface.tsx](components/chat/chat-interface.tsx) - 聊天界面组件
- [route.ts](app/api/chat/route.ts) - AI API 路由

---

### 4. 故事大纲画布 (Plot Canvas)

**位置**: `components/canvas/plot-canvas.tsx`

**功能**:
- ✅ 可视化故事节点展示
- ✅ 添加子节点
- ✅ 删除节点
- ✅ 编辑节点标题和内容
- ✅ 拖拽调整节点位置
- ✅ 连接线动画效果
- ✅ 缩放和导航控制
- ✅ 迷你地图显示

**节点数据结构**:
```typescript
interface StoryBeatNodeData {
  title: string       // 章节/节点标题
  content: string     // 剧情描述
  onAddChild: Function   // 添加子节点回调
  onDelete: Function     // 删除节点回调
  onTitleChange: Function // 标题修改回调
  onContentChange: Function // 内容修改回调
}
```

**相关文件**:
- [plot-canvas.tsx](components/canvas/plot-canvas.tsx) - 画布主组件
- [story-beat-node.tsx](components/canvas/story-beat-node.tsx) - 节点样式组件

---

### 5. Smart Lorebook (设定管理系统)

**位置**: `components/layout/app-sidebar-right.tsx`

**功能**:
- 📋 角色设定管理
- 🌍 世界观设定管理
- 🎒 物品/道具设定管理
- 📖 情节设定管理
- 📍 地点设定管理
- ⏰ 时间线设定管理

- **状态**: 目前为静态展示，CRUD 功能待实现

---

### 6. 视图管理 (View Context)

**位置**: `components/layout/view-context.tsx`

**功能**:
- 管理当前视图状态（editor / canvas / settings）
- 提供跨组件的视图切换能力

---

## 🛠️ 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动。

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

---

## 🔑 环境变量配置

在项目根目录创建 `.env.local` 文件：

```env
# AI API 密钥（必需）
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# 可选：自定义 API 地址（如果使用代理）
# DEEPSEEK_API_BASE=https://api.deepseek.com
```

### 获取 DeepSeek API Key

1. 访问 [DeepSeek Platform](https://platform.deepseek.com/)
2. 注册并登录账号
3. 在 API Keys 页面创建新的 API Key
4. 将 Key 复制到 `.env.local` 文件中

---

## 🤖 AI 功能说明

### API 端点

**POST** `/api/chat`

**请求体**:
```typescript
{
  messages: Array<{
    role: "user" | "assistant" | "system"
    content: string
  }>
}
```

**响应**: SSE (Server-Sent Events) 流式响应

**错误处理**:
- `400` - 请求格式错误
- `500` - 服务器错误或 API Key 未配置

### 提示词工程

AI 助手被配置为专业的小说文字润色顾问，专注于文学和流行文学：

```
你是一位专业的小说文字润色与文学创作顾问，专注于帮助作者打磨文字、提升文笔。

**你的专长领域：**
- 日本轻小说风格的细腻描写与对话节奏
- 推理小说的逻辑严密性与悬念营造
- 纯文学作品的意象营造与语言美学
- 流行文学的叙事节奏与情感共鸣

**你能提供的帮助：**
- 文字润色：优化句式、提升文采、修正语病
- 风格调整：根据作品类型调整语言风格
- 情节建议：完善故事结构，增强戏剧冲突
- 对话优化：让人物对白更生动自然
- 开头结尾：打造引人入胜的开头和令人回味的结尾
```

---

## 📝 更新日志

### [重构] - v0.3.0 (2026-04-19)

**产品定位调整**：
- ✅ **从"网络小说"到"小说润色"** - 重新定位产品为文字润色专家
- ✅ **专注于文学与流行文学** - 日本轻小说、推理小说、纯文学等
- ✅ **更新系统提示词** - AI 助手现在是一位专业的文学创作顾问
- ✅ **更新 README 文档** - 反映新的产品定位和功能特点

**相关文件**：
- [app/api/chat/route.ts](app/api/chat/route.ts) - 更新系统提示词
- [README.md](README.md) - 更新产品描述和定位

**核心变化**：
- 强调"润色"而非"写作"
- 关注文学性和艺术性
- 融入日本轻小说、推理小说等流行文学元素

---

### [新增] - v0.4.0 (2026-04-19)

**重大功能更新**：
- ✅ **叙事维度微操引擎** - 基于热内特（Gérard Genette）叙事学框架的专业润色工具
- ✅ **三维叙事维度选择器** - 叙事距离、叙事聚焦、叙事时间的精确控制
- ✅ **动态 Prompt 组装引擎** - 根据选择的维度自动组装专业提示词
- ✅ **安装 shadcn/ui DropdownMenu** - 实现多级嵌套菜单
- ✅ **集成到 Tiptap BubbleMenu** - 无干扰的写作体验

**技术亮点**：

**1. Prompt 模板系统** (`lib/prompts.ts`):
- ✅ 独立的 Prompt 字典文件，高度模块化
- ✅ 三个维度的专业叙事学提示词
- ✅ `buildNarrativeSystemPrompt()` 动态组装函数
- ✅ 支持 4×3×3=36 种组合

**2. 叙事菜单组件** (`components/editor/narrative-menu.tsx`):
- ✅ 使用 shadcn/ui DropdownMenu 组件
- ✅ 多级嵌套菜单设计
- ✅ 实时显示当前选择
- ✅ 符合 Tiptap 编辑器交互规范

**3. 热内特叙事学框架**:
| 维度 | 选项 | 文学效果 |
|------|------|----------|
| 叙事距离 | 极远→极近 | 从概述到现场感 |
| 叙事聚焦 | 零→内→外 | 从全知到客观 |
| 叙事时间 | 停顿→场景→跨越 | 从细节到节奏 |

**相关文件**：
- [lib/prompts.ts](lib/prompts.ts) - **新建** Prompt 模板字典
- [components/editor/narrative-menu.tsx](components/editor/narrative-menu.tsx) - **新建** 叙事菜单组件
- [components/ui/dropdown-menu.tsx](components/ui/dropdown-menu.tsx) - **新建** shadcn/ui 下拉菜单
- [components/editor/tiptap-editor.tsx](components/editor/tiptap-editor.tsx) - 集成叙事菜单

**使用示例**：

选择：较近 + 内聚焦 + 心理场景

**系统 Prompt**：
```
你是一位精通热内特叙事学理论的顶级文学大师。请严格按照以下三个维度的特定约束，对用户提供的文本进行重写。

【维度一：叙事距离约束】
采用自由间接引语。移除所有对话归因，将角色的内心语气词与叙述者声音融合，以达到深度共情的效果。

【维度二：叙事聚焦约束】
执行严格的掩码机制（Masking）。彻底屏蔽掉非聚焦角色的心理状态，迫使叙述者只能通过单一聚焦者的视线来感知他者与环境。

【维度三：叙事时间约束】
保持叙事时间(NT)与故事时间(ST)为1:1。将对话的交锋与角色心理的流转进行等比例的实时呈现。
```

---

### [修复] - v0.2.2 (2026-04-19)

**Bug 修复**:
- ✅ **SSE 格式转换** - 添加 `createTextStream` 函数，将 DeepSeek API 的 SSE 响应转换为纯文本流
- ✅ **流式响应格式修复** - 使用 `TextStreamChatTransport` 正确处理文本流
- ✅ **最终解决方案** - 通过手动实现流转换解决了 SDK 兼容性问题

**相关文件**:
- [app/api/chat/route.ts](app/api/chat/route.ts) - 添加 SSE 转换逻辑
- [components/chat/chat-interface.tsx](components/chat/chat-interface.tsx) - 使用 TextStreamChatTransport

**问题描述**:
- 错误：`Type validation failed: Value: {...} Error: invalid_union, unrecognized_keys`
- 原因：手动 fetch DeepSeek API 返回的 OpenAI 兼容格式与 Vercel AI SDK 的 `useChat` 期望的格式不匹配

**解决方案**:
- 使用 `@ai-sdk/deepseek` 官方提供的 `deepseek` 提供者和 `streamText`
- 配置正确的系统提示词，指定 AI 角色为专业网络小说写作助手
- 使用 `toTextStreamResponse()` 返回纯文本流

**技术细节**:
```typescript
import { streamText } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'

const result = streamText({
  model: deepseek('deepseek-chat'),
  system: '你是一个专业的网络小说写作助手...',
  messages: [...]
})

return result.toTextStreamResponse()
```

**客户端配置**:
```typescript
import { useChat } from '@ai-sdk/react'

const { messages, sendMessage } = useChat({
  api: "/api/chat",
  streamProtocol: 'text',  // 重要：指定使用 text stream 协议
})
```

---

### [修复] - v0.2.1 (2026-04-19)

**Bug 修复**:
- ✅ **API 路由消息处理优化** - 修复 `route.ts` 中消息格式处理逻辑，支持多种消息内容格式（字符串、数组、对象）
- ✅ **编辑器布局文件修复** - 删除意外添加到文件开头的错误 JSON 文本

**相关文件**:
- [app/api/chat/route.ts](app/api/chat/route.ts) - 修改

**问题描述**:
- 错误：`Cannot read properties of undefined (reading '0')`
- 原因：API 路由在处理消息内容时未正确处理 undefined 或非预期格式的消息

**解决方案**:
- 改进消息内容提取逻辑，先检查内容类型再提取
- 支持字符串、数组和对象三种消息内容格式

---

### [开发中] - v0.2.0 (2026-04-19)

**新增功能**:
- ✅ **编辑器布局组件** - 创建 `editor-layout.tsx` 整合编辑器和聊天助手
- ✅ **聊天助手集成** - 将聊天面板集成到编辑器视图底部
- ✅ **可折叠设计** - 聊天面板支持展开/收起功能
- ✅ **样式优化** - 优化聊天界面样式，更加紧凑美观

**相关文件**:
- [components/editor/editor-layout.tsx](components/editor/editor-layout.tsx) - 新增
- [components/layout/main-content.tsx](components/layout/main-content.tsx) - 修改
- [components/chat/chat-interface.tsx](components/chat/chat-interface.tsx) - 修改

**详细说明**:
- 创建 `EditorLayout` 组件，整合 Tiptap 编辑器和 AI 聊天助手
- 使用可折叠面板设计，节省屏幕空间
- 优化聊天界面样式，减小内边距和字体大小
- 在编辑器视图底部添加聊天面板开关按钮

---

### [初始版本] - v0.1.0 (2026-04-18)

**新增功能**:
- ✅ 基础项目结构搭建
- ✅ Tiptap 富文本编辑器集成
- ✅ AI 重写/润色功能
- ✅ 故事大纲画布
- ✅ AI 聊天助手组件（已实现但未集成）
- ✅ 左侧导航栏
- ✅ 右侧设定面板
- ✅ DeepSeek API 集成

**待实现功能**:
- 🔄 文字润色专用工具栏（风格切换、文采提升、语病检测）
- 🔄 多种文学风格预设（轻小说、推理、纯文学、科幻等）
- 🔄 上下文感知的润色建议
- 🔄 自动保存与版本管理
- 🔄 Lorebook 设定管理系统
- 🔄 画布导出为文档
- 🔄 字数统计与阅读时间估算
- 🔄 键盘快捷键
- 🔄 深色模式切换

---

## 🙏 致谢

- [Vercel](https://vercel.com/) - AI SDK 和部署平台
- [DeepSeek](https://deepseek.com/) - AI 模型提供商
- [Tiptap](https://tiptap.dev/) - 富文本编辑器
- [React Flow](https://reactflow.dev/) - 可视化画布库
- [Radix UI](https://radix-ui.com/) - 无样式 UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 精美图标库

---

## 📄 License

MIT License - 详见项目根目录 LICENSE 文件

---

## 📬 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至项目维护者

---

*最后更新: 2026-04-19*
