// ── i18n translations ──
const i18n = {
  ko: {
    siteTitle: "hacerio",
    navApps: "Apps",
    navRequest: "Request",
    navAbout: "About",
    heroTitle: "hacerio",
    heroDesc: "작고 쓸모있는 앱과 도구를 만듭니다.<br>필요한 앱이 있으면 의뢰해주세요.",
    searchPlaceholder: "앱 검색... (이름, 태그)",
    emptyResults: "검색 결과가 없습니다.",
    footer: "hacerio · hand-made apps",
    version: "버전",
    features: "주요 기능",
    usage: "사용 방법",
    requestCta: "이 앱에 기능 추가가 필요하신가요? 맞춤 수정 의뢰를 받습니다.",
    requestBtn: "✉ 수정 요청하기",
    requestTitle: "의뢰 · 요청",
    requestDesc: "필요한 기능이나 새로운 앱을 요청하세요. 가능한 범위 내에서 맞춤 제작해드립니다.",
    requestModTitle: "🔧 기존 앱 수정 요청",
    requestModDesc: "이미 만든 앱에 기능을 추가하거나 변경이 필요할 때",
    requestModBtn: "수정 요청하기 →",
    requestNewTitle: "💡 신규 앱 개발 의뢰",
    requestNewDesc: "새로운 앱 아이디어가 있을 때",
    requestNewBtn: "개발 의뢰하기 →",
    requestBugTitle: "🐛 버그 신고",
    requestBugDesc: "앱 사용 중 발견한 문제를 알려주세요",
    requestBugBtn: "버그 신고하기 →",
    requestEmailText: "GitHub 계정이 없어도 메일로 연락 가능합니다.",
    requestModBtn: "수정 요청하기 →",
    requestNewBtn: "개발 의뢰하기 →",
    requestBugBtn: "버그 신고하기 →",
    requestEmailBtn: "official.by.acer@gmail.com",
    aboutTitle: "hacerio studio",
    aboutDesc: "hacer는 스페인어로 '만들다'라는 뜻입니다. 필요한 도구는 직접 만들어서 쓰자는 마음으로 시작했고, 그 결과물이 누군가에게도 도움이 되길 바라며 공개합니다.",
    aboutWorkTitle: "🛠 하는 일",
    aboutWorkList: ["앱(프로그램) 개발", "기존 앱 기능 수정/개선", "새로운 아이디어 프로토타이핑"],
    aboutStackTitle: "⚙ 기술 스택",
    aboutStackList: ["Go, Wails, 웹 개발 (HTML/CSS/JS)"],
    aboutContactTitle: "📬 연락",
    aboutContactGitHub: "GitHub Issues:",
    aboutContactEmail: "Email:",
  },
  en: {
    siteTitle: "hacerio",
    navApps: "Apps",
    navRequest: "Request",
    navAbout: "About",
    heroTitle: "hacerio",
    heroDesc: "Small but useful apps and tools, made by hand.<br>Need an app? Send a request.",
    searchPlaceholder: "Search apps... (name, tag)",
    emptyResults: "No results found.",
    footer: "hacerio · hand-made apps",
    version: "Version",
    features: "Features",
    usage: "How to Use",
    requestCta: "Need a feature added? I take custom modification requests.",
    requestBtn: "✉ Request Modification",
    requestTitle: "Requests",
    requestDesc: "Request a feature or a new app. Custom development available.",
    requestModTitle: "🔧 Modify Existing App",
    requestModDesc: "Add features or make changes to existing apps",
    requestModBtn: "Request Modification →",
    requestNewTitle: "💡 New App Request",
    requestNewDesc: "Have an idea for a new app?",
    requestNewBtn: "Request Development →",
    requestBugTitle: "🐛 Report a Bug",
    requestBugDesc: "Found a problem? Let me know",
    requestBugBtn: "Report Bug →",
    requestEmailText: "No GitHub account? Reach out via email.",
    requestModBtn: "Request Modification →",
    requestNewBtn: "Request Development →",
    requestBugBtn: "Report Bug →",
    requestEmailBtn: "official.by.acer@gmail.com",
    aboutTitle: "hacerio studio",
    aboutDesc: "hacer means 'to make' in Spanish. I believe in building tools I need myself, and sharing them in case they help others too.",
    aboutWorkTitle: "🛠 What I Do",
    aboutWorkList: ["App (software) development", "Modifying & improving existing apps", "Prototyping new ideas"],
    aboutStackTitle: "⚙ Tech Stack",
    aboutStackList: ["Go, Wails, Web development (HTML/CSS/JS)"],
    aboutContactTitle: "📬 Contact",
    aboutContactGitHub: "GitHub Issues:",
    aboutContactEmail: "Email:",
  }
};

// ── Detect language ──
function getLang() {
  const stored = localStorage.getItem('lang');
  if (stored) return stored;
  const navLang = (navigator.language || '').toLowerCase();
  return navLang.startsWith('ko') ? 'ko' : 'en';
}

// ── Apply translations (for data-i18n elements) ──
function applyI18n() {
  const lang = getLang();
  const t = i18n[lang] || i18n.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  // Handle lists (data-i18n-list)
  document.querySelectorAll('[data-i18n-list]').forEach(el => {
    const key = el.dataset.i18nList;
    const items = t[key];
    if (items && Array.isArray(items)) {
      el.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }
  });

  // Set lang attribute on html
  document.documentElement.lang = lang;

  // Apply theme
  applyTheme();
}

// ── Theme (moved from inline script) ──
function applyTheme() {
  const t = localStorage.getItem('theme') || 'light';
  const btn = document.getElementById('themeBtn');
  if (t === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (btn) btn.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (btn) btn.textContent = '🌙';
  }
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  applyTheme();
}

// ── Language toggle ──
function toggleLang() {
  const current = getLang();
  const next = current === 'ko' ? 'en' : 'ko';
  localStorage.setItem('lang', next);
  location.reload();
}

// Update lang button text on load
document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = getLang() === 'ko' ? 'EN' : 'KR';
});
