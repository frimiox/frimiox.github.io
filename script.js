const searchInput = document.getElementById('searchInput');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.app-card');
let activeFilter = 'all';

function updateVisibility() {
  const query = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = card.textContent.toLowerCase().includes(query);
    card.style.display = (matchesFilter && matchesSearch) ? 'block' : 'none';
  });
}

searchInput.addEventListener('input', updateVisibility);

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    updateVisibility();
  });
});
