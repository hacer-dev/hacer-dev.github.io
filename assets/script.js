let apps = [];

async function loadApps() {
  try {
    const res = await fetch('assets/apps.json');
    apps = await res.json();
    renderApps(apps);
  } catch (e) {
    document.getElementById('appGrid').innerHTML =
      '<div class="empty-state"><div class="icon">⚠</div><p>앱 목록을 불러올 수 없습니다.</p></div>';
  }
}

function renderApps(list) {
  const grid = document.getElementById('appGrid');
  const empty = document.getElementById('emptyState');

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  grid.innerHTML = list.map(app => {
    const tags = (app.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    const plat = (app.platforms || []).map(p => p === 'windows' ? '🪟' : '🐧').join(' ');
    return `
      <a class="app-card" href="app/${app.id}/">
        <div class="app-card-header">
          <div class="app-card-icon">${app.icon || '📦'}</div>
          <div class="app-card-info">
            <div class="app-card-title">${app.name}</div>
            <div class="app-card-desc">${app.desc}</div>
          </div>
        </div>
        <div class="app-card-tags">${tags}</div>
        <div class="app-card-footer">
          <span>v${app.version}</span>
          <span>${plat}</span>
        </div>
      </a>
    `;
  }).join('');
}

// Search
document.getElementById('searchInput')?.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) { renderApps(apps); return; }
  const filtered = apps.filter(app =>
    app.name.toLowerCase().includes(q) ||
    app.desc.toLowerCase().includes(q) ||
    (app.tags || []).some(t => t.toLowerCase().includes(q))
  );
  renderApps(filtered);
});

loadApps();
