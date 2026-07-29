// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle) menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('show'));

// Search bar toggle
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
if (searchToggle) searchToggle.addEventListener('click', () => searchBar.classList.toggle('show'));

// Global search (home page)
const globalSearch = document.getElementById('globalSearch');
const globalSearchBtn = document.getElementById('globalSearchBtn');
function doGlobalSearch() {
  window.location.href = 'apps.html?q=' + encodeURIComponent(globalSearch.value);
}
if (globalSearch) globalSearch.addEventListener('keydown', e => { if (e.key === 'Enter') doGlobalSearch(); });
if (globalSearchBtn) globalSearchBtn.addEventListener('click', doGlobalSearch);

// Page search (listing pages)
const pageSearch = document.getElementById('pageSearch');
const pageSearchBtn = document.getElementById('pageSearchBtn');
function filterVisible() {
  const query = pageSearch.value.toLowerCase();
  document.querySelectorAll('.app-card-icon, .list-item').forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}
if (pageSearch) {
  pageSearch.addEventListener('input', filterVisible);
  pageSearch.addEventListener('keydown', e => { if (e.key === 'Enter') filterVisible(); });
}
if (pageSearchBtn) pageSearchBtn.addEventListener('click', filterVisible);

// Card renderers
function appCardHTML(app) {
  return `<div class="app-card-icon">
    <div class="icon-box">${app.icon}</div>
    <h3>${app.name}</h3>
    <p class="sub">${app.category}</p>
    <p class="rating">⭐ ${app.rating}</p>
    <a href="${app.link}" target="_blank" class="download-btn">Download</a>
  </div>`;
}
function appListHTML(app) {
  return `<div class="list-item">
    <div class="icon-box small">${app.icon}</div>
    <div class="list-text"><h4>${app.name}</h4><p>${app.desc}</p></div>
    <span class="rating">⭐ ${app.rating}</span>
    <a href="${app.link}" target="_blank" class="download-icon">↓</a>
  </div>`;
}

if (typeof APPS !== 'undefined') {
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) featuredGrid.innerHTML = APPS.slice(0,4).map(appCardHTML).join('');

  const latestList = document.getElementById('latestList');
  if (latestList) {
    const sorted = [...APPS].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    latestList.innerHTML = sorted.slice(0,3).map(appListHTML).join('');
  }

  const icons = { Media:'▶', Tools:'🔧', AI:'✨', Communication:'💬', Productivity:'🚀' };
  function catCardsHTML() {
    const cats = {};
    APPS.forEach(a => { cats[a.category] = (cats[a.category]||0)+1; });
    return Object.keys(cats).map(cat => `
      <a href="category.html?cat=${encodeURIComponent(cat)}" class="cat-card">
        <div class="cat-icon">${icons[cat]||'📁'}</div><h4>${cat}</h4><p>${cats[cat]} Apps</p>
      </a>`).join('');
  }
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (categoriesGrid) categoriesGrid.innerHTML = catCardsHTML();
  const allCategoriesGrid = document.getElementById('allCategoriesGrid');
  if (allCategoriesGrid) allCategoriesGrid.innerHTML = catCardsHTML();

  const allAppsGrid = document.getElementById('allAppsGrid');
  if (allAppsGrid) allAppsGrid.innerHTML = APPS.map(appCardHTML).join('');

  const toolsGrid = document.getElementById('toolsGrid');
  if (toolsGrid) toolsGrid.innerHTML = APPS.filter(a => a.type==='tool' && a.category!=='AI').map(appCardHTML).join('') || '<p class="sub">No tools yet.</p>';

  const aiGrid = document.getElementById('aiGrid');
  if (aiGrid) aiGrid.innerHTML = APPS.filter(a => a.category==='AI').map(appCardHTML).join('') || '<p class="sub">No AI tools yet.</p>';

  const featuredAllGrid = document.getElementById('featuredAllGrid');
  if (featuredAllGrid) featuredAllGrid.innerHTML = APPS.map(appCardHTML).join('');

  const latestAllList = document.getElementById('latestAllList');
  if (latestAllList) {
    const sorted = [...APPS].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    latestAllList.innerHTML = sorted.map(appListHTML).join('');
  }

  const categoryGrid = document.getElementById('categoryGrid');
  if (categoryGrid) {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat') || '';
    const titleEl = document.getElementById('categoryTitle');
    if (titleEl) titleEl.textContent = cat || 'Category';
    categoryGrid.innerHTML = APPS.filter(a => a.category===cat).map(appCardHTML).join('') || '<p class="sub">No apps yet in this category.</p>';
  }

  const playstoreGrid = document.getElementById('playstoreGrid');
  if (playstoreGrid) playstoreGrid.innerHTML = APPS.filter(a => a.store==='play' || a.store==='fdroid').map(appCardHTML).join('') || '<p class="sub">No apps yet.</p>';

  const appstoreGrid = document.getElementById('appstoreGrid');
  if (appstoreGrid) appstoreGrid.innerHTML = APPS.filter(a => a.store==='appstore').map(appCardHTML).join('') || '<p class="sub">No apps yet.</p>';

  function getSaved(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
  const favoritesGrid = document.getElementById('favoritesGrid');
  if (favoritesGrid) favoritesGrid.innerHTML = APPS.filter(a => getSaved('favorites').includes(a.name)).map(appCardHTML).join('') || '<p class="sub">No favorites yet.</p>';
  const bookmarksGrid = document.getElementById('bookmarksGrid');
  if (bookmarksGrid) bookmarksGrid.innerHTML = APPS.filter(a => getSaved('bookmarks').includes(a.name)).map(appCardHTML).join('') || '<p class="sub">No bookmarks yet.</p>';
}

// AI nav active state fix
if (window.location.hash === '#ai') {
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === 'tools.html#ai') link.classList.add('active');
    else if (link.getAttribute('href') === 'tools.html') link.classList.remove('active');
  });
}

// Theme switcher
const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme !== 'default') document.body.classList.add('theme-' + savedTheme);
document.querySelectorAll('.theme-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.className = document.body.className.replace(/theme-\S+/g, '');
    const theme = btn.dataset.theme;
    localStorage.setItem('theme', theme);
    if (theme !== 'default') document.body.classList.add('theme-' + theme);
  });
});

/* ============================== */
/* THEME SWITCHER SYSTEM          */
/* ============================== */

// Set theme function
function setTheme(themeName) {
  // Remove all theme classes
  document.body.classList.remove('theme-black', 'theme-light');
  
  // Add selected theme
  if (themeName === 'black') {
    document.body.classList.add('theme-black');
  } else if (themeName === 'light') {
    document.body.classList.add('theme-light');
  }
  
  // Save to localStorage
  localStorage.setItem('frimiox-theme', themeName);
  
  // Update active button
  updateActiveThemeButton(themeName);
}

// Update active button highlight
function updateActiveThemeButton(activeTheme) {
  const buttons = document.querySelectorAll('.theme-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase().includes(activeTheme)) {
      btn.classList.add('active');
    }
  });
}

// Load saved theme on page load
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('frimiox-theme') || 'default';
  setTheme(savedTheme);
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSavedTheme);
} else {
  loadSavedTheme();
}

/* ============================== */
/* THEME SWITCHER SYSTEM          */
/* ============================== */

// Set theme function
function setTheme(themeName) {
  // Remove all theme classes
  document.body.classList.remove('theme-black', 'theme-light');
  
  // Add selected theme
  if (themeName === 'black') {
    document.body.classList.add('theme-black');
  } else if (themeName === 'light') {
    document.body.classList.add('theme-light');
  }
  
  // Save to localStorage
  localStorage.setItem('frimiox-theme', themeName);
  
  // Update active button
  updateActiveThemeButton(themeName);
}

// Update active button highlight
function updateActiveThemeButton(activeTheme) {
  const buttons = document.querySelectorAll('.theme-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase().includes(activeTheme)) {
      btn.classList.add('active');
    }
  });
}

// Load saved theme on page load
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('frimiox-theme') || 'default';
  setTheme(savedTheme);
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSavedTheme);
} else {
  loadSavedTheme();
}
