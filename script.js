// Toggle mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
  });
}

// Toggle search bar
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
if (searchToggle) {
  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('show');
  });
}

// Global search redirects to apps.html with query
const globalSearch = document.getElementById('globalSearch');
if (globalSearch) {

// Render app card (grid style)
function appCardHTML(app) {
  return `
    <div class="app-card-icon">
      <div class="icon-box">${app.icon}</div>
      <h3>${app.name}</h3>
      <p class="sub">${app.category}</p>
      <p class="rating">⭐ ${app.rating}</p>
      <a href="${app.link}" target="_blank" class="download-btn">Download</a>
    </div>
  `;
}

// Render app list item (row style)
function appListHTML(app) {
  return `
    <div class="list-item">
      <div class="icon-box small">${app.icon}</div>
      <div class="list-text">
        <h4>${app.name}</h4>
        <p>${app.desc}</p>
      </div>
      <span class="rating">⭐ ${app.rating}</span>
      <a href="${app.link}" target="_blank" class="download-icon">⬇</a>
    </div>
  `;
}

// Populate home page sections if present
if (typeof APPS !== 'undefined') {
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    featuredGrid.innerHTML = APPS.slice(0, 4).map(appCardHTML).join('');
  }

  const latestList = document.getElementById('latestList');
  if (latestList) {
    const sorted = [...APPS].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    latestList.innerHTML = sorted.slice(0, 3).map(appListHTML).join('');
  }

  const categoriesGrid = document.getElementById('categoriesGrid');
  if (categoriesGrid) {
    const cats = {};
    APPS.forEach(a => { cats[a.category] = (cats[a.category] || 0) + 1; });
    const icons = { Media: '▶', Tools: '🔧', AI: '✨', Communication: '💬', Productivity: '🚀' };
    categoriesGrid.innerHTML = Object.keys(cats).map(cat => `
      <a href="category.html?cat=${encodeURIComponent(cat)}" class="cat-card" style="text-decoration:none;color:inherit;">
        <div class="cat-icon">${icons[cat] || '📁'}</div>
        <h4>${cat}</h4>
        <p>${cats[cat]} Apps</p>
      </a>
    `).join('');
  }
}

// Apps page — show all apps
const allAppsGrid = document.getElementById('allAppsGrid');
if (allAppsGrid && typeof APPS !== 'undefined') {
  allAppsGrid.innerHTML = APPS.map(appCardHTML).join('');
}

// Tools page — show only type "tool"
const toolsGrid = document.getElementById('toolsGrid');
if (toolsGrid && typeof APPS !== 'undefined') {
  const tools = APPS.filter(a => a.type === 'tool');
  toolsGrid.innerHTML = tools.map(appCardHTML).join('');
}

// Featured page — show all (or later, a "featured:true" filter)
const featuredAllGrid = document.getElementById('featuredAllGrid');
if (featuredAllGrid && typeof APPS !== 'undefined') {
  featuredAllGrid.innerHTML = APPS.map(appCardHTML).join('');
}

// Latest page — show all sorted by date
const latestAllList = document.getElementById('latestAllList');
if (latestAllList && typeof APPS !== 'undefined') {
  const sorted = [...APPS].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  latestAllList.innerHTML = sorted.map(appListHTML).join('');
}

// More page — all categories
const allCategoriesGrid = document.getElementById('allCategoriesGrid');
if (allCategoriesGrid && typeof APPS !== 'undefined') {
  const cats = {};
  APPS.forEach(a => { cats[a.category] = (cats[a.category] || 0) + 1; });
  const icons = { Media: '▶', Tools: '🔧', AI: '✨', Communication: '💬', Productivity: '🚀' };
  allCategoriesGrid.innerHTML = Object.keys(cats).map(cat => `
    <a href="category.html?cat=${encodeURIComponent(cat)}" class="cat-card" style="text-decoration:none;color:inherit;">
      <div class="cat-icon">${icons[cat] || '📁'}</div>
      <h4>${cat}</h4>
      <p>${cats[cat]} Apps</p>
    </a>
  `).join('');
}

// Category page — filter by URL param
const categoryGrid = document.getElementById('categoryGrid');
if (categoryGrid && typeof APPS !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat') || '';
  document.getElementById('categoryTitle').textContent = cat || 'Category';
  const filtered = APPS.filter(a => a.category === cat);
  categoryGrid.innerHTML = filtered.map(appCardHTML).join('') || '<p class="sub">No apps yet in this category.</p>';
}

// Play Store page
const playstoreGrid = document.getElementById('playstoreGrid');
if (playstoreGrid && typeof APPS !== 'undefined') {
  const filtered = APPS.filter(a => a.store === 'play' || a.store === 'fdroid');
  playstoreGrid.innerHTML = filtered.map(appCardHTML).join('') || '<p class="sub">No apps yet.</p>';
}

// App Store page
const appstoreGrid = document.getElementById('appstoreGrid');
if (appstoreGrid && typeof APPS !== 'undefined') {
  const filtered = APPS.filter(a => a.store === 'appstore');
  appstoreGrid.innerHTML = filtered.map(appCardHTML).join('') || '<p class="sub">No apps yet.</p>';
}

// Tools page split: Tools vs AI
const toolsGridEl = document.getElementById('toolsGrid');
const aiGridEl = document.getElementById('aiGrid');
if (typeof APPS !== 'undefined') {
  if (toolsGridEl) {
    const tools = APPS.filter(a => a.type === 'tool' && a.category !== 'AI');
    toolsGridEl.innerHTML = tools.map(appCardHTML).join('') || '<p class="sub">No tools yet.</p>';
  }
  if (aiGridEl) {
    const aiApps = APPS.filter(a => a.category === 'AI');
    aiGridEl.innerHTML = aiApps.map(appCardHTML).join('') || '<p class="sub">No AI tools yet.</p>';
  }
}

// Live search on any listing page (filters visible cards by name/tag)
const pageSearch = document.getElementById('pageSearch');
if (pageSearch) {
  pageSearch.addEventListener('input', () => {
    const query = pageSearch.value.toLowerCase();
    document.querySelectorAll('.app-card-icon, .list-item').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// --- Bookmarks & Favorites using localStorage ---
function getSaved(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function toggleSaved(key, name) {
  let list = getSaved(key);
  if (list.includes(name)) {
    list = list.filter(n => n !== name);
  } else {
    list.push(name);
  }
  localStorage.setItem(key, JSON.stringify(list));
  return list.includes(name);
}

// Render bookmarks/favorites page
const favoritesGrid = document.getElementById('favoritesGrid');
const bookmarksGrid = document.getElementById('bookmarksGrid');
if (typeof APPS !== 'undefined') {
  if (favoritesGrid) {
    const favs = getSaved('favorites');
    const favApps = APPS.filter(a => favs.includes(a.name));
    favoritesGrid.innerHTML = favApps.map(appCardHTML).join('') || '<p class="sub">No favorites yet.</p>';
  }
  if (bookmarksGrid) {
    const marks = getSaved('bookmarks');
    const markApps = APPS.filter(a => marks.includes(a.name));
    bookmarksGrid.innerHTML = markApps.map(appCardHTML).join('') || '<p class="sub">No bookmarks yet.</p>';
  }
}

// Force scroll to #ai section on page load (fixes AI link not scrolling)
window.addEventListener('load', () => {
  if (window.location.hash === '#ai') {
    setTimeout(() => {
      const el = document.getElementById('ai');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
});

// Global search: button click + Enter key
const globalSearchBtn = document.getElementById('globalSearchBtn');
if (globalSearchBtn && globalSearch) {
  globalSearchBtn.addEventListener('click', () => {
    window.location.href = 'apps.html?q=' + encodeURIComponent(globalSearch.value);
  });
}

// Page search: button click triggers same filter as typing
const pageSearchBtn = document.getElementById('pageSearchBtn');
if (pageSearchBtn && pageSearch) {
  pageSearchBtn.addEventListener('click', () => {
    pageSearch.dispatchEvent(new Event('input'));
  });
  pageSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') pageSearch.dispatchEvent(new Event('input'));
  });
}

// Set AI nav link active when hash is #ai
if (window.location.hash === '#ai') {
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === 'tools.html#ai' || link.getAttribute('href') === '#ai') {
      link.classList.add('active');
    } else if (link.textContent.includes('Tools') && !link.getAttribute('href').includes('#ai')) {
      link.classList.remove('active');
    }
  });
}

// Global search: Enter key works on home page too
if (globalSearch) {
  globalSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      window.location.href = 'apps.html?q=' + encodeURIComponent(globalSearch.value);
    }
  });
}
if (pageSearch) {
  pageSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') pageSearch.dispatchEvent(new Event('input'));
  });
}

// Theme switcher
const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme !== 'default') {
  document.body.classList.add('theme-' + savedTheme);
}
if (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches) {
  document.body.classList.add('theme-white');
}

document.querySelectorAll('.theme-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.className = document.body.className.replace(/theme-\S+/g, '');
    const theme = btn.dataset.theme;
    localStorage.setItem('theme', theme);
    if (theme !== 'default') document.body.classList.add('theme-' + theme);
  });
});

// Tools page split: Tools vs AI
const toolsGridEl = document.getElementById('toolsGrid');
const aiGridEl = document.getElementById('aiGrid');
if (typeof APPS !== 'undefined') {
  if (toolsGridEl) {
    const tools = APPS.filter(a => a.type === 'tool' && a.category !== 'AI');
    toolsGridEl.innerHTML = tools.map(appCardHTML).join('') || '<p class="sub">No tools yet.</p>';
  }
  if (aiGridEl) {
    const aiApps = APPS.filter(a => a.category === 'AI');
    aiGridEl.innerHTML = aiApps.map(appCardHTML).join('') || '<p class="sub">No AI tools yet.</p>';
  }
}

// Live search on any listing page (filters visible cards by name/tag)
const pageSearch = document.getElementById('pageSearch');
if (pageSearch) {
  pageSearch.addEventListener('input', () => {
    const query = pageSearch.value.toLowerCase();
    document.querySelectorAll('.app-card-icon, .list-item').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}
