# Hello World：这个博客是怎么来的

我想要一个个人博客，用来记录 AI 相关的思考和技术实验。需求很简单：写 Markdown、发布即可，不想维护数据库，不想配置服务器，不想学一个新框架。

最终的方案是：纯静态文件，部署在 GitHub Pages 上。

## 技术选型

```
index.html          文章列表
post.html           文章详情页（通过 ?slug= 参数加载）
about.html          关于页面
posts/*.md          Markdown 内容文件
js/config.js        文章注册表（元数据）
js/app.js           路由 + 渲染逻辑
css/style.css       全部样式
```

整个站点没有构建步骤，没有 npm，没有框架。唯一的外部依赖是 [marked.js](https://marked.js.org/)（通过 CDN 加载），用来在浏览器里把 Markdown 解析成 HTML。

## 新增文章的流程

1. 在 `posts/` 目录下创建 `your-slug.md`，写内容
2. 在 `js/config.js` 的 `POSTS` 数组里添加一条元数据：

```js
{
  slug:        'your-slug',
  title:       '文章标题',
  date:        '2026-11-18',
  tags:        ['标签一', '标签二'],
  summary:     '显示在列表页的摘要文字。',
  readingTime: 4,
}
```

3. 推送到 GitHub，Pages 自动更新。

## 部署到 GitHub Pages

```bash
# 仓库已创建后
git add .
git commit -m "init blog"
git push origin main
```

在仓库 Settings → Pages 里，选 `main` 分支根目录作为发布源，几分钟后就能访问。

## 一些取舍

**为什么不用 Jekyll / Hugo？** 它们很好，但需要本地安装工具链，CI 配置也有一点复杂度。对于一个以写作为核心的博客，这些摩擦累积起来会让发文变慢。

**为什么没有搜索？** 文章少的时候，标签过滤已经够了。如果日后文章多了，可以接 [Pagefind](https://pagefind.app/)——同样是纯静态，零后端。

**Markdown 的限制？** 完全能满足技术写作的需求：代码块、表格、引用、图片都支持。写不了幻灯片，但博客不需要幻灯片。

---

有任何问题或建议，欢迎提 Issue 或发邮件。
