// ── Site configuration ─────────────────────────────────────────────────────
const SITE = {
  title:       'AI Blog',
  description: '探索人工智能与技术的前沿思考',
  author:      'cym',
  github:      'https://github.com/cym',
  email:       'your@email.com',
};

// ── Posts registry ──────────────────────────────────────────────────────────
// Add a new object here for each post. The slug must match the filename in posts/.
const POSTS = [
  {
    slug:        'getting-started-ai',
    title:       '走进 AI 时代：写在博客开篇',
    date:        '2026-11-18',
    tags:        ['AI', '随笔'],
    summary:     '人工智能正在重塑我们工作与创造的方式。这篇文章分享了我对 AI 时代个人成长与学习的思考，以及我用来应对快速变化的框架。',
    readingTime: 5,
  },
  {
    slug:        'hello-world',
    title:       'Hello World：这个博客是怎么来的',
    date:        '2026-11-18',
    tags:        ['技术', '随笔'],
    summary:     '用纯 HTML、CSS 和 JavaScript 搭建一个支持 Markdown 的个人博客，零框架，零构建工具，部署在 GitHub Pages 上。',
    readingTime: 3,
  },
];
