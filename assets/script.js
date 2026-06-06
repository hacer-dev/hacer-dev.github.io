let apps = [];
let currentApp = null;

// ── Load apps ──
async function loadApps() {
  try {
    const res = await fetch('assets/apps.json');
    apps = await res.json();
    route();
  } catch (e) {
    document.getElementById('appGrid').innerHTML =
      '<div class="empty-state"><div class="icon">⚠</div><p>Failed to load apps.</p></div>';
  }
}

// ── Routing ──
function route() {
  const hash = location.hash.slice(1); // #/app-id
  if (hash) {
    const app = apps.find(a => a.id === hash);
    if (app) showDetail(app);
    else goHome();
  } else {
    goHome();
  }
}

window.addEventListener('hashchange', route);

// ── Home: app grid ──
function goHome() {
  currentApp = null;
  document.getElementById('appGrid').style.display = 'grid';
  document.getElementById('detailView').style.display = 'none';
  document.getElementById('searchWrap').style.display = 'block';
  renderApps(apps);
}

function renderApps(list) {
  const grid = document.getElementById('appGrid');
  const empty = document.getElementById('emptyState');
  if (list.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block'; return;
  }
  empty.style.display = 'none';
  grid.innerHTML = list.map(app => {
    const tags = (app.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    const plat = (app.platforms || []).map(p => p === 'windows' ? '🪟' : '🐧').join(' ');
    return `<a class="app-card" href="#/${app.id}">
      <div class="app-card-header">
        <div class="app-card-icon">${app.icon || '📦'}</div>
        <div class="app-card-info">
          <div class="app-card-title">${esc(app.name)}</div>
          <div class="app-card-desc">${esc(app.desc)}</div>
        </div>
      </div>
      <div class="app-card-tags">${tags}</div>
      <div class="app-card-footer">
        <span>v${app.version}</span>
        <span>${plat}</span>
      </div>
    </a>`;
  }).join('');
}

// ── Detail view ──
function showDetail(app) {
  currentApp = app;
  document.getElementById('appGrid').style.display = 'none';
  document.getElementById('detailView').style.display = 'block';
  document.getElementById('searchWrap').style.display = 'none';

  const t = (ko, en) => {
    const lang = (localStorage.getItem('lang') || (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en');
    return lang === 'ko' ? ko : en;
  };
  const lang = (localStorage.getItem('lang') || (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en');

  const features = (app.features || []).map(f => `<li>${esc(f)}</li>`).join('');
  const usage = (app.usage || []).map(u => `<li>${esc(u)}</li>`).join('');
  const tech = (app.tech || []).join(', ');
  const dlBtns = Object.entries(app.downloads || {}).map(([plat, url]) => {
    const label = plat === 'windows' ? `⬇ Windows` : `⬇ Linux`;
    return `<a href="${esc(url)}" class="btn-download">${label}</a>`;
  }).join('');

  const backLink = `<a href="#" onclick="goHome();return false;" style="display:inline-flex;align-items:center;gap:0.3rem;color:var(--text-muted);text-decoration:none;font-size:0.85rem;margin-bottom:1rem">← ${t('뒤로', 'Back')}</a>`;

  document.getElementById('detailView').innerHTML = `
    ${backLink}
    <div class="detail-header">
      <div class="detail-icon">${esc(app.icon || '📦')}</div>
      <div>
        <h1 class="detail-title">${esc(app.name)}</h1>
        <p class="detail-subtitle">${esc(app.desc)}</p>
      </div>
    </div>
    <div class="detail-downloads">${dlBtns}</div>
    <dl class="detail-meta">
      <div><dt>${t('버전', 'Version')}</dt><dd>${esc(app.version)}</dd></div>
      <div><dt>${t('업데이트', 'Updated')}</dt><dd>${esc(app.updated)}</dd></div>
      <div><dt>${t('기술', 'Tech')}</dt><dd>${esc(tech)}</dd></div>
    </dl>
    <section class="detail-section">
      <h2>${t('주요 기능', 'Features')}</h2>
      <ul>${features}</ul>
    </section>
    ${usage ? `<section class="detail-section">
      <h2>${t('사용 방법', 'How to Use')}</h2>
      <ul>${usage}</ul>
    </section>` : ''}
    <div class="detail-cta">
      <p>${t('이 앱에 기능 추가가 필요하신가요? 맞춤 수정 의뢰를 받습니다.', 'Need a feature added? I take custom modification requests.')}</p>
      <a href="https://github.com/hacerio/hacerio.github.io/issues/new" class="btn-outline" target="_blank">✉ ${t('수정 요청하기', 'Request Modification')}</a>
    </div>
  `;
}

function esc(s) { return String(s).replace(/[&<>"']/g, ''); }

// ── Search ──
document.getElementById('searchInput')?.addEventListener('input', (e) => {
  if (currentApp) return;
  const q = e.target.value.toLowerCase().trim();
  if (!q) { renderApps(apps); return; }
  renderApps(apps.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.desc.toLowerCase().includes(q) ||
    (a.tags || []).some(t => t.toLowerCase().includes(q))
  ));
});

loadApps();
