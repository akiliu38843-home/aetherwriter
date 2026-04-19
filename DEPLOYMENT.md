# AetherWriter Vercel 部署指南

本指南将帮助你将 AetherWriter 部署到 Vercel，让你可以分享链接给其他人使用。

## 📋 部署前准备

### 1. 创建 GitHub 仓库

如果你还没有 GitHub 账号，请先 [注册 GitHub](https://github.com/)

然后在你的项目目录中初始化 Git 仓库：

```bash
cd aetherwriter

# 初始化 Git 仓库
git init

# 添加所有文件（除了 .gitignore 中排除的文件）
git add .

# 提交代码
git commit -m "Initial commit: AetherWriter v0.1.0"

# 在 GitHub 上创建新仓库（不要勾选 Initialize repository）
# 然后推送代码
git remote add origin https://github.com/你的用户名/aetherwriter.git
git branch -M main
git push -u origin main
```

### 2. 获取 DeepSeek API Key

如果还没有 DeepSeek API Key，请：
1. 访问 [DeepSeek 开放平台](https://platform.deepseek.com/)
2. 注册/登录账号
3. 在 API Keys 页面创建新的 API Key
4. **重要**：复制并保存好这个 Key，它只会显示一次

## 🚀 部署到 Vercel

### 步骤 1: 登录 Vercel

1. 访问 [vercel.com](https://vercel.com/)
2. 使用 GitHub 账号登录（推荐）或邮箱登录
3. 授权 Vercel 访问你的 GitHub 仓库

### 步骤 2: 导入项目

1. 点击 "New Project" 按钮
2. 在 "Import Git Repository" 页面找到你的 `aetherwriter` 仓库
3. 点击 "Import" 按钮

### 步骤 3: 配置环境变量

在 "Environment Variables" 部分，添加以下变量：

| Name | Value |
|------|-------|
| `DEEPSEEK_API_KEY` | `sk-4a56f9829d6c4a069a2c6af84a000f5c` |

⚠️ **重要**：这里使用你的真实 DeepSeek API Key。

### 步骤 4: 配置框架

Vercel 会自动检测 Next.js 项目，确认以下配置：

- **Framework Preset**: Next.js
- **Root Directory**: `./` (或保持默认)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 步骤 5: 部署

1. 点击 "Deploy" 按钮
2. 等待部署完成（约 2-3 分钟）
3. 部署成功后，你会看到你的项目 URL：`https://your-project.vercel.app`

## 🔒 安全说明

### .gitignore 已配置

我们已配置 `.gitignore` 文件，确保以下文件不会被提交到 GitHub：
- `.env.local` (包含真实 API Key)
- `node_modules/`
- `.next/`
- `build/`
- 其他敏感文件

### 生产环境 API Key

生产环境的 API Key 应该只在 Vercel 控制台配置，不要提交到代码仓库。

## 🌐 访问你的应用

部署成功后，你可以通过以下方式访问：

1. **Vercel 提供的链接**：`https://your-project.vercel.app`
2. **自定义域名**（可选）：在 Vercel 控制台的 Settings → Domains 中配置

## 🔄 更新代码

每次推送到 GitHub 的 `main` 分支，Vercel 都会自动重新部署。

```bash
# 修改代码后
git add .
git commit -m "Your update message"
git push
```

## 🐛 常见问题

### 1. 部署失败

检查以下几点：
- ✅ GitHub 仓库是否公开
- ✅ API Key 是否正确配置
- ✅ 是否有编译错误

查看 Vercel 控制台的部署日志获取详细信息。

### 2. API 调用失败

确保：
- ✅ DeepSeek API Key 有效且未过期
- ✅ API Key 已正确配置在 Vercel 环境变量中
- ✅ API Key 有足够的余额

### 3. 页面样式异常

可能是 CSS 未正确加载。检查：
- ✅ `globals.css` 是否正确引入
- ✅ Tailwind CSS 配置是否正确

## 📞 获取帮助

如果遇到问题，可以：
1. 查看 Vercel 官方文档：https://vercel.com/docs
2. 查看 Next.js 部署文档：https://nextjs.org/docs/deployment
3. 提交 GitHub Issue

## ✨ 后续优化建议

部署成功后，你可以考虑：

1. **配置自定义域名** - 让链接更专业
2. **设置密码保护** - 使用 Vercel Pro 的密码保护功能
3. **添加监控** - 集成 Vercel Analytics
4. **配置 CI/CD** - 设置自动测试和部署流程

---

**祝你部署成功！** 🎉
