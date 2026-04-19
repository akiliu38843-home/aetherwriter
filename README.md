# ✨ AetherWriter

> 基于热内特叙事学的专业 AI 小说润色工具

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🎯 项目简介

AetherWriter 是一个 AI 驱动的小说润色工具，专注于帮助作者提升文字质量。

**核心特色**：基于法国文学理论家**热内特（Gérard Genette）**的叙事学框架，提供专业级的文字润色体验。

### 三大核心功能

| 功能 | 说明 |
|------|------|
| 📝 **智能编辑器** | Tiptap 富文本编辑，选中文字即可 AI 润色 |
| 🗺️ **大纲画布** | 可视化故事节点管理，AI 辅助生成剧情分支 |
| 🎭 **叙事维度** | 精确控制叙事距离、聚焦、时间三大维度 |

---

## 🚀 在线体验

部署完成后可访问：**https://your-project.vercel.app**

### 功能演示

**编辑器 + AI 润色**
1. 在编辑器中输入或粘贴小说内容
2. 选中想要润色的文字
3. 选择右侧面板的叙事维度
4. 点击"重写"，AI 即时生成润色结果
5. 满意则"采纳"，不满意则"拒绝"

**大纲画布**
1. 切换到"大纲画布"视图
2. 添加故事节点，构建故事框架
3. 使用 AI 生成剧情分支
4. 一键检查逻辑漏洞

---

## 💻 技术栈

### 核心框架
- **Next.js 14** - React 全栈框架 (App Router)
- **React 18.3** - UI 库
- **TypeScript 5.4** - 类型安全

### AI 能力
- **Vercel AI SDK 6** - AI 集成框架
- **DeepSeek API** - AI 模型提供商（deepseek-chat）

### 编辑器 & 可视化
- **Tiptap 3.22** - 富文本编辑器（基于 ProseMirror）
- **@xyflow/react 12** - 可视化流程图/画布

### UI 组件
- **Radix UI** - 无障碍 UI 组件库
- **Tailwind CSS 3.4** - 原子化 CSS
- **Lucide React** - 图标库

---

## 📦 快速开始

### 环境要求
- Node.js 18+
- npm / yarn / pnpm
- DeepSeek API Key

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/akiliu38843-home/aetherwriter.git
cd aetherwriter

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local，填入你的 DeepSeek API Key
DEEPSEEK_API_KEY=sk-your-api-key-here

# 4. 启动开发服务器
npm run dev
```

访问 **http://localhost:3000** 开始使用！

---

## ⚙️ 环境变量配置

在 `.env.local` 文件中配置：

```env
# DeepSeek API Key（必需）
# 获取地址：https://platform.deepseek.com/
DEEPSEEK_API_KEY=sk-your-api-key-here
```

**⚠️ 注意**：不要将 `.env.local` 提交到 GitHub！

---

## 🎨 功能详解

### 1. 叙事距离（Narrative Distance）

控制叙述者与故事之间的距离：

| 级别 | 风格 | 示例 |
|------|------|------|
| 极远 ++ | 概述性动词，疏离冷峻 | *他拒绝了。她拒绝了。* |
| 较远 + | 间接引语，客观中立 | *他说他会去。* |
| 较近 - | 自由间接，深度共情 | *算了，不去就不去吧。* |
| 极近 -- | 直接对话，现场感 | *"我真的不想去。"她叹了口气。* |

### 2. 叙事聚焦（Focalization）

决定叙述视角：

- **零聚焦** - 全知视角，可揭示任意角色心理
- **内聚焦** - 单一角色视角，严格掩码机制
- **外聚焦** - 客观镜头，仅记录外在行为

### 3. 叙事时间（Duration）

控制故事时间与叙事时间的比例：

- **审美停顿** - 静态场景，大量感官细节
- **心理场景** - 1:1 实时呈现，对话交锋
- **叙事跨越** - 快节奏，直接切入核心动作

---

## 📂 项目结构

```
aetherwriter/
├── app/                          # Next.js App Router
│   ├── api/                       # API 路由
│   │   ├── chat/                 # AI 对话 API
│   │   └── canvas/               # 画布 AI API
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首页
│
├── components/                    # React 组件
│   ├── ui/                       # 基础 UI 组件
│   ├── editor/                    # 编辑器组件
│   │   ├── tiptap-editor.tsx    # 富文本编辑器
│   │   └── editor-layout.tsx     # 编辑器布局
│   ├── canvas/                   # 画布组件
│   │   ├── plot-canvas.tsx      # 故事大纲画布
│   │   └── story-beat-node.tsx  # 故事节点
│   ├── chat/                     # 聊天组件
│   └── layout/                   # 布局组件
│
├── lib/                          # 工具函数
│   ├── types.ts                  # TypeScript 类型定义
│   ├── prompts.ts                # AI 提示词工程
│   └── utils.ts                  # 通用工具函数
│
├── vercel.json                   # Vercel 配置
└── .env.local.example            # 环境变量示例
```

---

## 🚢 部署到 Vercel

### 方式一：GitHub 导入（推荐）

1. 将项目推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 使用 GitHub 账号登录
4. 导入 `aetherwriter` 仓库
5. 添加环境变量：
   - `DEEPSEEK_API_KEY` = 你的 API Key
6. 点击 Deploy

### 方式二：Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd aetherwriter
vercel

# 生产环境部署
vercel --prod
```

---

## 🛠️ 开发指南

### 可用脚本

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 代码检查
```

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 React Hooks 规范
- 组件使用函数式写法
- 样式使用 Tailwind CSS

---

## 📖 文档

- [使用指南](./components/wiki/wiki-page.tsx) - 详细功能说明
- [部署文档](./DEPLOYMENT.md) - Vercel 部署教程
- [快速部署](./QUICK_DEPLOY.md) - 简化部署步骤

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tiptap](https://tiptap.dev/) - 富文本编辑器
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI 集成框架
- [DeepSeek](https://platform.deepseek.com/) - AI 模型提供商
- [Radix UI](https://www.radix-ui.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

---

**Built with ❤️ for writers who care about words.**
