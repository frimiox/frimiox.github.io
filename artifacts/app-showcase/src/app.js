/* ─── APP DATA ──────────────────────────────────────────────────────────────── */
const APPS = [
  {
    id: 1,
    name: "FocusFlow",
    emoji: "⏱",
    color: "#e8f4fe",
    colorDark: "#0c1e30",
    description: "A minimalist Pomodoro timer with session tracking, streaks, and a gentle focus-mode that hides distractions while you work.",
    longDescription: "FocusFlow helps you do your best work by breaking it into focused sessions. Built around the Pomodoro technique, it tracks your daily streaks, visualizes productivity trends over time, and enters a distraction-free overlay mode when a session starts. Works offline, no account needed.",
    category: "Productivity",
    tags: ["Productivity", "Focus", "Timer"],
    status: "live",
    author: "Maya Chen",
    url: "#",
    featured: true,
    date: "2026-06-10",
  },
  {
    id: 2,
    name: "PaletteForge",
    emoji: "🎨",
    color: "#fdf2fb",
    colorDark: "#2a0b28",
    description: "Generate beautiful, accessible color palettes from any seed color. Export as CSS variables, Tailwind config, or Figma tokens.",
    longDescription: "PaletteForge takes a single color and builds a complete, WCAG-compliant design system palette around it — shades, tints, semantic roles, and complementary accents. Export directly to CSS custom properties, Tailwind 3 config, JSON, or copy individual hex values. Real-time contrast checker included.",
    category: "Design",
    tags: ["Design", "Color", "Accessibility"],
    status: "live",
    author: "Theo Rivera",
    url: "#",
    featured: true,
    date: "2026-05-22",
  },
  {
    id: 3,
    name: "MarkdownLive",
    emoji: "📝",
    color: "#f0fdf4",
    colorDark: "#0b1f12",
    description: "A fast, split-pane markdown editor with live preview, syntax highlighting, and one-click export to HTML or PDF.",
    longDescription: "MarkdownLive is the editor you'll actually enjoy writing in. Instant preview updates as you type, full GFM support, code block syntax highlighting in 30+ languages, and smart shortcuts for tables, links, and code fences. Export your document to clean HTML or styled PDF with a single click.",
    category: "Productivity",
    tags: ["Markdown", "Editor", "Writing"],
    status: "live",
    author: "Sam Okafor",
    url: "#",
    featured: false,
    date: "2026-04-14",
  },
  {
    id: 4,
    name: "WeatherCanvas",
    emoji: "🌤",
    color: "#fefce8",
    colorDark: "#1c1500",
    description: "Beautiful animated weather visualizations for any city. Watch storms roll in, sunrises bloom, and auroras dance — all in real-time.",
    longDescription: "WeatherCanvas turns live weather data into stunning canvas animations. Each condition — thunderstorm, snow, fog, northern lights — gets its own hand-crafted particle system. Search any city worldwide, save favorites, and use it as a living screensaver. No ads, no sign-up.",
    category: "Utilities",
    tags: ["Weather", "Animation", "Visual"],
    status: "live",
    author: "Leila Park",
    url: "#",
    featured: true,
    date: "2026-03-30",
  },
  {
    id: 5,
    name: "CodeSnap",
    emoji: "📸",
    color: "#f5f3ff",
    colorDark: "#120e2a",
    description: "Turn your code snippets into gorgeous shareable images. Choose from 20+ themes, custom fonts, window styles, and backgrounds.",
    longDescription: "CodeSnap makes your code look as good as it runs. Paste any snippet, pick a syntax theme, choose your window chrome style (macOS, Windows, minimal), set a gradient or solid background, and export a crisp PNG or SVG ready to share anywhere. Supports 150+ languages.",
    category: "Developer",
    tags: ["Developer", "Design", "Sharing"],
    status: "live",
    author: "Jin Park",
    url: "#",
    featured: false,
    date: "2026-06-01",
  },
  {
    id: 6,
    name: "HabitStack",
    emoji: "📊",
    color: "#fff7ed",
    colorDark: "#1a0b00",
    description: "A no-nonsense habit tracker that visualizes your consistency with GitHub-style contribution grids and weekly streaks.",
    longDescription: "HabitStack strips away the fluff and focuses on one thing: showing up every day. Add habits, mark completions, and watch your contribution grid fill up. Weekly email summaries, export to CSV, and a privacy-first design (your data never leaves your device).",
    category: "Productivity",
    tags: ["Habits", "Tracker", "Wellness"],
    status: "beta",
    author: "Aiko Tanaka",
    url: "#",
    featured: false,
    date: "2026-05-05",
  },
  {
    id: 7,
    name: "SVGCraft",
    emoji: "✏️",
    color: "#f0f9ff",
    colorDark: "#051420",
    description: "A lightweight browser-based SVG editor with a node editor, pen tool, and direct code view — no install required.",
    longDescription: "SVGCraft is the SVG editor that respects your time. Open it, draw shapes with the pen or node tools, adjust fills and strokes, then flip to the code view to tweak the raw XML. Works entirely in the browser — import existing SVGs, export clean code. Built for icon designers and UI developers.",
    category: "Design",
    tags: ["SVG", "Vector", "Developer"],
    status: "beta",
    author: "Carlos Diaz",
    url: "#",
    featured: false,
    date: "2026-04-28",
  },
  {
    id: 8,
    name: "PixelQuest",
    emoji: "🎮",
    color: "#fdf4ff",
    colorDark: "#1a0520",
    description: "A tiny dungeon crawler built entirely in vanilla JS + Canvas. Navigate procedurally generated dungeons and collect relics.",
    longDescription: "PixelQuest is a love letter to classic roguelikes, built from scratch with zero dependencies. Each run generates a unique dungeon using BSP partitioning. Choose from three character classes, find gear, fight monsters with turn-based combat, and try to reach the final relic. All in ~2,000 lines of vanilla JS.",
    category: "Games",
    tags: ["Game", "Canvas", "Roguelike"],
    status: "live",
    author: "Dev Patel",
    url: "#",
    featured: true,
    date: "2026-06-15",
  },
  {
    id: 9,
    name: "BudgetLens",
    emoji: "💰",
    color: "#f0fdf4",
    colorDark: "#051209",
    description: "Import your bank CSV, auto-categorize transactions with smart rules, and see your spending broken down in beautiful charts.",
    longDescription: "BudgetLens makes personal finance less painful. Drag in a CSV export from any bank, let the rule engine auto-tag transactions by merchant pattern, and explore your spending in interactive Sankey flows and category breakdowns. All processing is local — your data never reaches a server.",
    category: "Finance",
    tags: ["Finance", "Charts", "Privacy"],
    status: "wip",
    author: "Priya Nair",
    url: "#",
    featured: false,
    date: "2026-06-18",
  },
  {
    id: 10,
    name: "SoundBoard",
    emoji: "🎵",
    color: "#fff1f2",
    colorDark: "#200008",
    description: "Build and share ambient soundscapes by layering rain, café noise, white noise, forest sounds, and more.",
    longDescription: "SoundBoard is your personal sound mixer. Layer up to 8 ambient tracks simultaneously, set individual volumes, and create the perfect sonic backdrop for focus, sleep, or relaxation. Save custom scenes by URL and share them with anyone. No login, no ads, just sound.",
    category: "Utilities",
    tags: ["Audio", "Ambient", "Focus"],
    status: "live",
    author: "Nadia Osei",
    url: "#",
    featured: false,
    date: "2026-05-18",
  },
  {
    id: 11,
    name: "TypeRace",
    emoji: "⌨️",
    color: "#f8f7f4",
    colorDark: "#111110",
    description: "A multiplayer typing speed game with custom text, live WPM tracking, and a leaderboard for your personal bests.",
    longDescription: "TypeRace turns typing practice into friendly competition. Race against the clock or friends in real-time multiplayer (WebSocket-powered), paste any text as a custom race, and track your WPM and accuracy over time. Your personal bests are saved locally with full history.",
    category: "Games",
    tags: ["Game", "Typing", "Multiplayer"],
    status: "beta",
    author: "Elias Müller",
    url: "#",
    featured: false,
    date: "2026-05-30",
  },
  {
    id: 12,
    name: "RegexLab",
    emoji: "🔬",
    color: "#f0f9ff",
    colorDark: "#020d14",
    description: "An interactive regex tester and visualizer. Build patterns visually, test against live input, and get plain-English explanations.",
    longDescription: "RegexLab makes regular expressions feel approachable. Write or build a pattern in the visual block editor, see matches highlighted live in your test string, and read the auto-generated plain-English explanation of what each part does. Supports JS, Python, and PCRE flavors.",
    category: "Developer",
    tags: ["Developer", "Tools", "Regex"],
    status: "live",
    author: "Yuki Tanaka",
    url: "#",
    featured: false,
    date: "2026-04-02",
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
