/* ─── APP DATA ──────────────────────────────────────────────────────────────── */
const APPS = [
  {
    id: 1,
    name: "NewPipe",
    emoji: "▶️",
    color: "#deeeff",
    colorDark: "#001428",
    description: "Free YouTube client with background play and downloading.",
    longDescription: "NewPipe is a free, lightweight YouTube client for Android that works without the Google framework or a YouTube account. It supports background playback, audio-only mode, video downloading, and a completely ad-free experience — all without any trackers.",
    category: "Media",
    tags: ["YouTube", "Privacy", "Android"],
    status: "live",
    author: "Team NewPipe",
    url: "https://newpipe.net/",
    featured: true,
    date: "2026-01-01",
  },
  {
    id: 2,
    name: "Seal",
    emoji: "🦭",
    color: "#cce8ff",
    colorDark: "#001e3c",
    description: "Beautiful video/audio downloader powered by yt-dlp.",
    longDescription: "Seal is a sleek, Material You video and audio downloader for Android, powered by yt-dlp. It supports hundreds of platforms, offers fine-grained format selection, custom templates, and a beautifully designed interface that feels right at home on modern Android.",
    category: "Media",
    tags: ["Downloader", "yt-dlp", "Android"],
    status: "live",
    author: "JunkFood02",
    url: "https://github.com/JunkFood02/Seal",
    featured: true,
    date: "2026-01-01",
  },
];

/* ─── STATE ─────────────────────────────────────────────────────────────────── */
let state = {
  search: "",
  category: "All",
  sort: "featured",
  openAppId: null,
};

/* ─── DOM REFS ──────────────────────────────────────────────────────────────── */
const appGrid      = document.getElementById("appGrid");
const emptyState   = document.getElementById("emptyState");
const statsCount   = document.getElementById("statsCount");
const filterTabs   = document.getElementById("filterTabs");
const searchInput  = document.getElementById("searchInput");
const searchClear  = document.getElementById("searchClear");
const sortSelect   = document.getElementById("sortSelect");
const modalBackdrop = document.getElementById("modalBackdrop");
const modal         = document.getElementById("modal");
const modalBody     = document.getElementById("modalBody");
const modalClose    = document.getElementById("modalClose");
const themeToggle   = document.getElementById("themeToggle");
const emptyReset    = document.getElementById("emptyReset");

/* ─── THEME ─────────────────────────────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}
themeToggle.addEventListener("click", toggleTheme);

/* ─── CATEGORIES ────────────────────────────────────────────────────────────── */
function getCategories() {
  const cats = ["All", ...new Set(APPS.map(a => a.category))].sort((a, b) =>
    a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
  );
  return cats;
}

function renderFilterTabs() {
  const categories = getCategories();
  filterTabs.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-tab";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", cat === state.category ? "true" : "false");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      state.category = cat;
      renderFilterTabs();
      renderGrid();
    });
    filterTabs.appendChild(btn);
  });
}

/* ─── FILTERING & SORTING ───────────────────────────────────────────────────── */
function getFiltered() {
  let apps = [...APPS];

  if (state.category !== "All") {
    apps = apps.filter(a => a.category === state.category);
  }

  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    apps = apps.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
    );
  }

  if (state.sort === "featured") {
    apps.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } else if (state.sort === "newest") {
    apps.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (state.sort === "name") {
    apps.sort((a, b) => a.name.localeCompare(b.name));
  }

  return apps;
}

/* ─── CARD RENDERING ────────────────────────────────────────────────────────── */
function getThumbBg(app) {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  return isDark ? app.colorDark : app.color;
}

function statusLabel(status) {
  const labels = { live: "Live", beta: "Beta", wip: "In Progress" };
  return labels[status] || status;
}

function createCard(app) {
  const card = document.createElement("article");
  card.className = "app-card";
  card.setAttribute("role", "listitem");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `${app.name} — ${app.description}`);

  card.innerHTML = `
    <div class="card-thumb" style="background:${getThumbBg(app)}">
      <span class="card-thumb-emoji">${app.emoji}</span>
    </div>
    <div class="card-body">
      <div class="card-top">
        <span class="card-name">${escHtml(app.name)}</span>
        <span class="card-status card-status--${app.status}">${statusLabel(app.status)}</span>
      </div>
      <p class="card-desc">${escHtml(app.description)}</p>
      <div class="card-tags">
        ${app.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join("")}
      </div>
    </div>
  `;

  card.addEventListener("click", () => openModal(app));
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(app); }
  });

  return card;
}

/* ─── GRID ──────────────────────────────────────────────────────────────────── */
function renderGrid() {
  const apps = getFiltered();

  statsCount.textContent = apps.length === 1 ? "1 app" : `${apps.length} apps`;
  appGrid.innerHTML = "";

  if (apps.length === 0) {
    appGrid.hidden = true;
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    appGrid.hidden = false;

    apps.forEach((app, i) => {
      const card = createCard(app);
      card.style.animationDelay = `${Math.min(i * 40, 320)}ms`;
      appGrid.appendChild(card);
    });
  }
}

/* ─── MODAL ─────────────────────────────────────────────────────────────────── */
function openModal(app) {
  state.openAppId = app.id;
  modalBody.innerHTML = `
    <div class="modal-thumb" style="background:${getThumbBg(app)}">${app.emoji}</div>
    <div class="modal-header">
      <h2 class="modal-name" id="modalTitle">${escHtml(app.name)}</h2>
      <div class="modal-meta">
        <span class="card-status card-status--${app.status}">${statusLabel(app.status)}</span>
        <span class="modal-author">by ${escHtml(app.author)}</span>
      </div>
    </div>
    <p class="modal-desc">${escHtml(app.longDescription)}</p>
    <div class="modal-tags">
      ${app.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join("")}
    </div>
    <div class="modal-actions">
      <a href="${escHtml(app.url)}" class="btn btn--primary" target="_blank" rel="noopener">View App ↗</a>
      <button class="btn btn--secondary" onclick="closeModal()">Close</button>
    </div>
  `;

  modalBackdrop.hidden = false;
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  state.openAppId = null;
}

/* ─── SEARCH ────────────────────────────────────────────────────────────────── */
let searchDebounce;
searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  searchClear.hidden = !state.search;
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(renderGrid, 160);
});
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  state.search = "";
  searchClear.hidden = true;
  searchInput.focus();
  renderGrid();
});

/* ─── SORT ──────────────────────────────────────────────────────────────────── */
sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  renderGrid();
});

/* ─── MODAL EVENTS ──────────────────────────────────────────────────────────── */
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", e => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modalBackdrop.hidden) closeModal();
});

/* ─── EMPTY RESET ───────────────────────────────────────────────────────────── */
emptyReset.addEventListener("click", () => {
  state.search = ""; state.category = "All"; state.sort = "featured";
  searchInput.value = ""; sortSelect.value = "featured"; searchClear.hidden = true;
  renderFilterTabs();
  renderGrid();
});

/* ─── THEME CHANGE: re-render card thumbs ───────────────────────────────────── */
const observer = new MutationObserver(() => renderGrid());
observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

/* ─── UTIL ──────────────────────────────────────────────────────────────────── */
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// expose closeModal globally for inline onclick
window.closeModal = closeModal;

/* ─── INIT ──────────────────────────────────────────────────────────────────── */
initTheme();
renderFilterTabs();
renderGrid();
