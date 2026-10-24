const projects = window.NNL_PROJECTS || [];
const parks = window.NNL_PARKS || [];
const list = document.querySelector('#project-list');
const parkDirectory = document.querySelector('#park-directory');
const panel = document.querySelector('#project-panel');
const filters = document.querySelector('.filters');
let activeFilter = 'All';

document.querySelector('#project-count').textContent = projects.length;
const types = [...new Set(projects.map(p => p.type))].sort();
types.forEach(type => {
  const button = document.createElement('button');
  button.className = 'filter'; button.dataset.filter = type; button.textContent = type;
  filters.append(button);
});

function safe(value) { const span = document.createElement('span'); span.textContent = value; return span.innerHTML; }
function osmLink(lat, lng, zoom = 16) { return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`; }

parks.forEach(park => {
  const link = document.createElement('a');
  link.href = osmLink(park.lat, park.lng); link.target = '_blank'; link.rel = 'noopener';
  link.innerHTML = `<span>●</span><strong>${safe(park.name)}</strong><small>${safe(park.kind)} · ${safe(park.borough)}</small>`;
  parkDirectory.append(link);
});

function selectProject(id) {
  const p = projects.find(item => item.id === id); if (!p) return;
  document.querySelectorAll('[data-project]').forEach(el => el.classList.toggle('selected', el.dataset.project === id));
  panel.innerHTML = `<div class="panel-top"><span>${safe(p.status)}</span><button aria-label="Close project details">×</button></div><p class="panel-corridor">${safe(p.corridor)}</p><h3>${safe(p.name)}</h3><p class="panel-summary">${safe(p.summary)}</p><div class="tags">${p.activities.map(a => `<span>${safe(a)}</span>`).join('')}</div><dl><div><dt>Borough</dt><dd>${safe(p.borough)}</dd></div><div><dt>Project type</dt><dd>${safe(p.type)}</dd></div></dl><a class="map-location-link" href="${osmLink(p.lat, p.lng)}" target="_blank" rel="noopener">View this location on OpenStreetMap ↗</a><a class="button primary panel-link" href="${safe(p.link)}" target="_blank" rel="noopener">Visit project website <span>↗</span></a>`;
  panel.querySelector('button').addEventListener('click', () => {
    panel.innerHTML = '<div class="panel-empty"><span class="panel-icon">⌖</span><h3>Choose a project</h3><p>Select a project below to see its story.</p></div>';
    document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
  });
  if (window.innerWidth < 850) panel.scrollIntoView({behavior:'smooth', block:'nearest'});
}

function render() {
  const shown = projects.filter(p => activeFilter === 'All' || p.type === activeFilter);
  list.innerHTML = '';
  shown.forEach((p, i) => {
    const card = document.createElement('button');
    card.className = 'project-card'; card.dataset.project = p.id;
    card.innerHTML = `<span class="card-number">${String(i+1).padStart(2,'0')}</span><span><small>${safe(p.borough)} · ${safe(p.type)}</small><strong>${safe(p.name)}</strong><em>${safe(p.corridor)}</em></span><i>↗</i>`;
    card.addEventListener('click', () => selectProject(p.id)); list.append(card);
  });
}

filters.addEventListener('click', e => {
  if (!e.target.matches('.filter')) return;
  activeFilter = e.target.dataset.filter;
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === e.target)); render();
});
const menuButton = document.querySelector('.menu-button'); const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('open', !open); });
nav.addEventListener('click', () => { menuButton.setAttribute('aria-expanded','false'); nav.classList.remove('open'); });
render();
