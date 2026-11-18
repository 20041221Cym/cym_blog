/* ── Utilities ─────────────────────────────────────────────────────────── */
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('zh-CN', { year:'numeric', month:'long', day:'numeric' });
}
function tagPill(t) { return `<span class="tag">${t}</span>`; }
function setPageTitle(t) { document.title = t ? `${t} | ${SITE.title}` : SITE.title; }
function initFooter() {
  const el = document.getElementById('footerText');
  if (el) el.innerHTML = `© ${new Date().getFullYear()} ${SITE.author}&nbsp;·&nbsp;Powered by Markdown`;
}

/* ── Home ──────────────────────────────────────────────────────────────── */
function renderHome() {
  setPageTitle('');
  initFooter();

  const allTags = [...new Set(POSTS.flatMap(p => p.tags))];
  let active = null;

  const filter = document.getElementById('tagFilter');
  const grid   = document.getElementById('postGrid');

  function draw(tag) {
    const list = tag ? POSTS.filter(p => p.tags.includes(tag)) : POSTS;
    grid.innerHTML = list.map(p => `
      <a class="post-card" href="post.html?slug=${p.slug}">
        <div class="post-card-meta">
          <div class="post-tags">${p.tags.map(tagPill).join('')}</div>
          <span class="post-meta-right">
            <time datetime="${p.date}">${fmtDate(p.date)}</time>
            <span class="dot">·</span>
            <span>${p.readingTime} 分钟</span>
          </span>
        </div>
        <h2 class="post-card-title">${p.title}</h2>
        <p class="post-card-summary">${p.summary}</p>
        <span class="post-card-cta">阅读全文 →</span>
      </a>`).join('');
  }

  filter.innerHTML =
    `<button class="tag-btn active" data-tag="">全部</button>` +
    allTags.map(t => `<button class="tag-btn" data-tag="${t}">${t}</button>`).join('');

  filter.addEventListener('click', e => {
    const btn = e.target.closest('.tag-btn');
    if (!btn) return;
    filter.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    active = btn.dataset.tag || null;
    draw(active);
  });

  draw(null);
}

/* ── Post ──────────────────────────────────────────────────────────────── */
function renderPost() {
  initFooter();
  const slug = new URLSearchParams(location.search).get('slug');
  const meta = POSTS.find(p => p.slug === slug);
  const el   = document.getElementById('postContent');

  if (!meta) { el.innerHTML = '<p class="error">文章未找到。</p>'; return; }
  setPageTitle(meta.title);

  fetch(`posts/${slug}.md`)
    .then(r => { if (!r.ok) throw r.status; return r.text(); })
    .then(md => {
      el.innerHTML = `
        <header class="post-header">
          <div class="post-header-meta">
            <div class="post-tags">${meta.tags.map(tagPill).join('')}</div>
            <span class="post-meta-right">
              <time datetime="${meta.date}">${fmtDate(meta.date)}</time>
              <span class="dot">·</span>
              <span>${meta.readingTime} 分钟阅读</span>
            </span>
          </div>
          <h1>${meta.title}</h1>
          <a href="index.html" class="back-link">← 返回文章列表</a>
        </header>
        <div class="prose">${marked.parse(md)}</div>`;
    })
    .catch(() => { el.innerHTML = '<p class="error">加载文章失败，请稍后重试。</p>'; });
}

/* ── About ─────────────────────────────────────────────────────────────── */
function renderAbout() {
  setPageTitle('关于');
  initFooter();
  const el = document.getElementById('aboutContent');
  fetch('posts/about.md')
    .then(r => { if (!r.ok) throw r.status; return r.text(); })
    .then(md => { el.innerHTML = `<div class="prose">${marked.parse(md)}</div>`; })
    .catch(() => { el.innerHTML = '<p class="error">加载页面失败。</p>'; });
}
