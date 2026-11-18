# AI Blog

个人博客：探索 AI 与技术的前沿思考。

纯静态站点，无框架，无构建步骤，使用 Markdown 管理内容，可部署到 GitHub Pages 或 EdgeOne Pages。

## 目录结构

```
ai_blog/
├── index.html          # 文章列表页
├── post.html           # 文章详情页（?slug= 参数）
├── about.html          # 关于页面
├── css/
│   └── style.css       # 全部样式（暗色主题）
├── js/
│   ├── config.js       # 站点配置 + 文章注册表
│   └── app.js          # 路由与渲染逻辑
└── posts/
    ├── about.md        # 关于页内容
    ├── hello-world.md  # 示例文章
    └── getting-started-ai.md
```

## 新增文章

1. 在 `posts/` 下创建 `your-slug.md`
2. 在 `js/config.js` 的 `POSTS` 数组顶部插入元数据对象：
   - `slug` 对应文件名（不含 `.md`）
   - `date` 格式 `YYYY-MM-DD`
   - `tags`、`summary`、`readingTime` 用于列表展示
3. 推送即更新，无需构建

## 本地预览

由于使用 `fetch` 加载 Markdown，需要通过 HTTP 服务访问，不能直接双击 HTML 文件。

```bash
# Python 3
python -m http.server 8080
# 或 Node.js
npx serve .
```

访问 http://localhost:8080

## 部署到 GitHub Pages

```bash
git add .
git commit -m "init blog"
git remote add origin https://github.com/你的用户名/ai_blog.git
git push -u origin main
```

仓库 Settings → Pages → Source 选 `main` 分支根目录，保存后几分钟可访问。
