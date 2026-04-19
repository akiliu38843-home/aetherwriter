# 🚀 AetherWriter 快速部署指南

## ✅ 已完成（无需你操作）

- ✅ Git 仓库已初始化
- ✅ 所有代码已提交
- ✅ `.gitignore` 已配置（API Key 不会泄露）
- ✅ `vercel.json` 已配置

---

## 📋 你需要做的（只需 3 步）

### 第 1 步：创建 GitHub 仓库

1. 打开浏览器访问：**https://github.com/new**
2. 填写信息：
   - **Repository name**: `aetherwriter`
   - **Description**: `AI 小说润色与文学创作助手`
   - **不要勾选** "Initialize this repository with a README"（重要！）
3. 点击 **"Create repository"**

---

### 第 2 步：推送代码到 GitHub

在终端中运行以下命令（我已经准备好了）：

```bash
cd /Users/a26976/Desktop/aetherwriter

# 添加远程仓库（把 "你的用户名" 替换为你的 GitHub 用户名）
git remote add origin https://github.com/你的用户名/aetherwriter.git

# 推送代码
git branch -M main
git push -u origin main
```

---

### 第 3 步：在 Vercel 部署

1. 打开浏览器访问：**https://vercel.com**
2. 点击 **"Sign Up"**，使用 **GitHub 账号登录**
3. 点击 **"New Project"**
4. 在列表中找到 **`aetherwriter`** 仓库，点击 **"Import"**
5. 在 **"Environment Variables"** 部分添加：
   - **Name**: `DEEPSEEK_API_KEY`
   - **Value**: `sk-4a56f9829d6c4a069a2c6af84a000f5c`
6. 点击 **"Deploy"**
7. 等待 2-3 分钟...完成！🎉

---

## 🌐 获取你的链接

部署成功后，你会看到：
```
https://aetherwriter-xxxx.vercel.app
```

这就是你的公开链接，可以分享给任何人！

---

## 🔄 更新代码

以后修改代码后，只需运行：

```bash
cd /Users/a26976/Desktop/aetherwriter
git add .
git commit -m "更新说明"
git push
```

Vercel 会自动重新部署。

---

## 🆘 遇到问题？

### 错误 1: Git 用户名未设置
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 错误 2: GitHub 认证失败
确保你已经在 GitHub 设置了 Personal Access Token，或者使用 SSH 方式连接。

### 错误 3: Vercel 找不到仓库
确保 GitHub 仓库是 **Public**（公开的），或者在 Vercel 中授权了私有仓库访问。

---

## 📞 成功标准

看到这些就说明部署成功：
- ✅ Vercel 显示绿色的 ✓ Ready
- ✅ 有一个 `.vercel.app` 链接
- ✅ 点击链接能看到 AetherWriter 界面

---

**祝部署顺利！有任何问题随时问我。** 🚀
