/* ═══════════════════════════════════════════════════════════════
   ELENA'S LIFE DASHBOARD — app.js
   Version 1.0  |  Built with Cowork + Claude
═══════════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
const CONFIG = {
  email: 'elenacasian@gmail.com',
  appName: "Elena's Dashboard",
  storageKey: 'elena_dashboard_v1',
  activity: { green: 2, yellow: 7 }   // days
};

// ─────────────────────────────────────────────────────────────
// DEFAULT MEDITERRANEAN RECIPES  (dietary-safe)
// Elena: no alcohol, caffeine, sugar, chocolate, pastries
// Mauro: low saturated fat (hereditary high cholesterol)
// ─────────────────────────────────────────────────────────────
const STARTER_RECIPES = [
  {
    id: 'r1', title: 'Greek Lemon Chicken (Kotopoulo Lemonato)',
    cuisine: 'Greek', time: '50 min', servings: 4,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['1 whole chicken (cut up)', '4 garlic cloves', '2 lemons (juice + zest)', '3 tbsp olive oil', 'Fresh oregano', 'Salt & pepper', '200ml chicken stock'],
    method: 'Marinate chicken in lemon, garlic and oregano for 30 min. Sear in olive oil, add stock and roast at 190°C for 40 min until golden.',
    notes: 'No saturated fats. Use skinless pieces for Mauro.'
  },
  {
    id: 'r2', title: 'Spanish Chickpea & Spinach Stew (Potaje de Garbanzos)',
    cuisine: 'Spanish', time: '40 min', servings: 4,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['400g canned chickpeas', '300g fresh spinach', '1 onion', '3 garlic cloves', '2 tomatoes', '1 tsp paprika', '2 tbsp olive oil', 'Vegetable stock', 'Salt & pepper'],
    method: 'Soften onion and garlic in olive oil. Add tomatoes, paprika and stock. Add chickpeas and spinach. Simmer 20 min.',
    notes: 'High in fibre — excellent for cholesterol. No problematic ingredients for Elena.'
  },
  {
    id: 'r3', title: 'Grilled Sea Bass with Olive Oil & Capers',
    cuisine: 'Mediterranean', time: '25 min', servings: 2,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['2 sea bass fillets', '2 tbsp olive oil', '1 lemon', 'Capers', 'Fresh parsley', 'Garlic', 'Sea salt'],
    method: 'Score the fish, brush with olive oil and garlic. Grill 4-5 min each side. Finish with lemon juice, capers and parsley.',
    notes: 'Omega-3 rich — great for both dietary needs.'
  },
  {
    id: 'r4', title: 'Horiatiki (Traditional Greek Salad)',
    cuisine: 'Greek', time: '10 min', servings: 2,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['3 tomatoes', '1 cucumber', '1 red onion', 'Kalamata olives', '100g feta cheese', 'Olive oil', 'Dried oregano', 'Salt'],
    method: 'Chop vegetables into large pieces. Arrange in bowl. Top with whole feta block, olives, olive oil and oregano. Do not toss.',
    notes: 'Use feta in moderation for Mauro. No restricted ingredients for Elena.'
  },
  {
    id: 'r5', title: 'Revithia (Greek Chickpea Soup)',
    cuisine: 'Greek', time: '1h 20min', servings: 4,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['500g dried chickpeas (soaked overnight)', '2 onions', '4 tbsp olive oil', '1 lemon', 'Fresh rosemary', 'Salt & pepper'],
    method: 'Cook chickpeas with onions in water for 1h. Drain, return to pot with olive oil, lemon juice and rosemary. Simmer 20 min.',
    notes: 'Traditional Sifnos island recipe. Cholesterol-friendly, naturally caffeine-free.'
  },
  {
    id: 'r6', title: 'Baked Cod with Tomatoes & Olives (Bacalao al Horno)',
    cuisine: 'Spanish', time: '35 min', servings: 2,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['2 cod fillets (fresh)', '4 ripe tomatoes', '1 red pepper', 'Kalamata olives', '2 garlic cloves', '3 tbsp olive oil', 'Parsley', 'Salt'],
    method: 'Layer tomatoes and peppers in baking dish. Place cod on top with olives and garlic. Drizzle olive oil. Bake 25 min at 180°C.',
    notes: 'Use fresh cod (not salted) to avoid excess sodium for Mauro.'
  },
  {
    id: 'r7', title: 'Spanakopita (Spinach & Feta Pie)',
    cuisine: 'Greek', time: '1h', servings: 6,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['500g fresh spinach', '200g feta cheese', '2 eggs', '1 onion', 'Phyllo pastry', '3 tbsp olive oil', 'Dill', 'Black pepper'],
    method: 'Wilt spinach, drain well. Mix with crumbled feta, eggs and dill. Layer phyllo sheets brushed with olive oil in tray. Fill and top with more phyllo. Bake 45 min at 180°C.',
    notes: 'Use moderate feta for Mauro (saturated fat). No problematic ingredients for Elena.'
  },
  {
    id: 'r8', title: 'Arroz con Verduras (Spanish Vegetable Rice)',
    cuisine: 'Spanish', time: '35 min', servings: 4,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['300g paella rice', '1 red pepper', '1 green pepper', '1 zucchini', '1 tomato', '1 onion', 'Garlic', 'Saffron', '700ml vegetable stock', '3 tbsp olive oil'],
    method: 'Soften vegetables in olive oil. Add rice and coat. Add saffron and hot stock. Cook on medium-low 18 min without stirring. Rest 5 min covered.',
    notes: 'No sausage or pork. Fully plant-based. Safe for both.'
  },
  {
    id: 'r9', title: 'Fasolada (Greek White Bean Soup)',
    cuisine: 'Greek', time: '1h 10min', servings: 4,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['400g white beans (soaked overnight)', '2 carrots', '2 celery stalks', '1 onion', '2 tomatoes', '4 tbsp olive oil', 'Parsley', 'Salt & pepper'],
    method: 'Cook beans in fresh water 45 min until tender. Add vegetables, tomatoes and olive oil. Simmer 25 min. Finish with parsley.',
    notes: 'Greek national dish. High in fibre and plant protein — perfect for Mauro\'s cholesterol.'
  },
  {
    id: 'r10', title: 'Grilled Octopus with Lemon & Olive Oil',
    cuisine: 'Greek', time: '1h 30min', servings: 2,
    safe_for: ['Elena', 'Mauro'],
    ingredients: ['1 medium octopus (~800g)', 'Olive oil', '2 lemons', 'Dried oregano', 'Red wine vinegar', 'Sea salt'],
    method: 'Boil octopus 45 min until tender. Cool completely. Grill on high heat 3 min per side until charred. Dress with olive oil, lemon, vinegar and oregano.',
    notes: 'No alcohol in the recipe. Low in saturated fat. Classic Aegean dish.'
  }
];

// ─────────────────────────────────────────────────────────────
// DATA MODEL
// ─────────────────────────────────────────────────────────────
function defaultData() {
  return {
    setup: false,
    passwordHash: '',
    journal: [],
    zine: {
      stories: [
        { id: uid(), title: 'The Woman in the Lake', status: 'in-progress', synopsis: '', notes: '', wordCount: 0, lastUpdated: null }
      ],
      indesignLog: [],
      designNotes: [],
      contentIdeas: []
    },
    spanish: {
      sessions: [],
      vocabulary: [],
      translations: [],
      notes: []
    },
    meals: {
      cookingLog: [],
      recipes: STARTER_RECIPES,
      weekMenu: { mon:'', tue:'', wed:'', thu:'', fri:'', sat:'', sun:'' },
      shoppingList: []
    },
    health: {
      crossfit: [],
      appointments: [],
      erikaAppts: []
    },
    calendar: {
      events: [],
      birthdays: []
    }
  };
}

// ─────────────────────────────────────────────────────────────
// STATE & PERSISTENCE
// ─────────────────────────────────────────────────────────────
let DATA = {};

function loadData() {
  try {
    const raw = localStorage.getItem(CONFIG.storageKey);
    DATA = raw ? JSON.parse(raw) : defaultData();
  } catch(e) {
    DATA = defaultData();
  }
}

function saveData() {
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(DATA));
}

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function hashPassword(pw) {
  let h = 0;
  const s = pw + '_elena_2026_salt';
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return h.toString(36);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / 86400000);
}

function activityClass(dateStr) {
  const d = daysSince(dateStr);
  if (d <= CONFIG.activity.green) return 'green';
  if (d <= CONFIG.activity.yellow) return 'yellow';
  return 'red';
}

function activityLabel(dateStr) {
  const d = daysSince(dateStr);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d <= CONFIG.activity.yellow) return `${d} days ago`;
  return 'No recent entries';
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function $(id) { return document.getElementById(id); }

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

// ─────────────────────────────────────────────────────────────
// AUTO-TAGGER
// ─────────────────────────────────────────────────────────────
const TAG_KEYWORDS = {
  zine:    ['zine','fragmentos','indesign','fanzine','diseño','design','fantasy','grimdark','mauro','issue','chapter','capítulo'],
  story:   ['story','historia','relato','woman in the lake','write','wrote','writing','escribi','character','personaje','plot','trama','fantasic'],
  spanish: ['spanish','español','rtve','idioma','translation','traducción','vocabulary','vocabulario','hablar','hablé','speaking','clase','lesson'],
  meals:   ['cook','cooked','cooking','recipe','meal','food','dinner','lunch','breakfast','cocin','receta','comida','cena','almuerzo','ate','lunch','supper'],
  health:  ['crossfit','gym','workout','exercise','training','doctor','appointment','health','fitness','erika','pediatri','medical','cita','médico'],
  family:  ['family','familia','birthday','cumpleaños','erika','mauro','event','celebration','aniversario','anniversary','wedding'],
};

function autoTag(text) {
  const lower = text.toLowerCase();
  const tags = [];
  for (const [tag, words] of Object.entries(TAG_KEYWORDS)) {
    if (words.some(w => lower.includes(w))) tags.push(tag);
  }
  // Deduplicate and return; fallback to 'general'
  const unique = [...new Set(tags)];
  return unique.length ? unique : ['general'];
}

// ─────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────
function initAuth() {
  loadData();
  if (!DATA.setup) {
    $('setup-form').classList.remove('hidden');
  } else {
    $('login-form').classList.remove('hidden');
  }
  $('auth-screen').classList.remove('hidden');
}

function handleSetup() {
  const pw  = $('setup-password').value.trim();
  const pw2 = $('setup-confirm').value.trim();
  const err = $('setup-error');

  if (pw.length < 6) { showAuthError(err, 'Password must be at least 6 characters.'); return; }
  if (pw !== pw2)     { showAuthError(err, 'Passwords do not match.'); return; }

  DATA.setup = true;
  DATA.passwordHash = hashPassword(pw);
  saveData();
  enterApp();
}

function handleLogin() {
  const pw  = $('login-password').value;
  const err = $('login-error');
  if (hashPassword(pw) === DATA.passwordHash) {
    err.classList.add('hidden');
    enterApp();
  } else {
    showAuthError(err, 'Incorrect password. Please try again.');
    $('login-password').value = '';
    $('login-password').focus();
  }
}

function handleForgotPassword() {
  openModal(`
    <h3>Password Recovery</h3>
    <p style="margin-bottom:16px;color:var(--text-muted);font-size:14px;">
      A recovery link would be sent to:<br>
      <strong style="color:var(--gold)">${CONFIG.email}</strong>
    </p>
    <p style="font-size:13px;color:var(--text-dim);">
      (Email recovery requires a hosted server. For now, you can reset your password by clearing app data in Settings → Reset App.)
    </p>
    <button class="btn btn-outline mt-2" onclick="closeModal()">OK</button>
  `);
}

function handleLogout() {
  $('app').classList.add('hidden');
  $('auth-screen').classList.remove('hidden');
  $('login-password').value = '';
  $('login-error').classList.add('hidden');
}

function showAuthError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

function enterApp() {
  $('auth-screen').classList.add('hidden');
  $('app').classList.remove('hidden');
  updateDateDisplay();
  updateAllDots();
  navigateTo('dashboard');
  // Wire up nav clicks
  document.querySelectorAll('.nav-item[data-view]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(el.dataset.view);
    });
  });
}

// ─────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────
const VIEW_TITLES = {
  dashboard:   'Dashboard',
  journal:     'Journal',
  'story-ideas': 'Story Ideas',
  zine:        'Fragments Zine',
  spanish:     'Spanish Language',
  meals:       'Meal Planner',
  health:      'Health & Fitness',
  calendar:    'Family Calendar',
  settings:    'Settings'
};

function navigateTo(view) {
  // Update active nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });
  $('page-title').textContent = VIEW_TITLES[view] || view;
  const container = $('view-container');
  container.innerHTML = '';
  const renders = {
    dashboard:     renderDashboard,
    journal:       renderJournal,
    'story-ideas': renderStoryIdeas,
    zine:          renderZine,
    spanish:       renderSpanish,
    meals:         renderMeals,
    health:        renderHealth,
    calendar:      renderCalendar,
    settings:      renderSettings
  };
  if (renders[view]) renders[view](container);
}

function updateDateDisplay() {
  const d = new Date();
  $('current-date').textContent = d.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

// ─────────────────────────────────────────────────────────────
// ACTIVITY DOTS (sidebar)
// ─────────────────────────────────────────────────────────────
function updateAllDots() {
  const lastEntry = (items) => items.length ? items[items.length-1].date : null;
  const dots = {
    'dot-zine':     lastEntry([...DATA.zine.indesignLog, ...DATA.zine.designNotes, ...DATA.zine.contentIdeas]),
    'dot-spanish':  lastEntry(DATA.spanish.sessions),
    'dot-meals':    lastEntry(DATA.meals.cookingLog),
    'dot-health':   lastEntry(DATA.health.crossfit),
    'dot-calendar': lastEntry(DATA.calendar.events)
  };
  for (const [id, date] of Object.entries(dots)) {
    const el = $(id);
    if (!el) continue;
    el.className = 'nav-dot ' + activityClass(date);
  }
}

function sectionLastDate(section) {
  switch(section) {
    case 'zine':     return [...DATA.zine.indesignLog, ...DATA.zine.designNotes, ...DATA.zine.contentIdeas].map(e=>e.date).sort().pop() || null;
    case 'spanish':  return DATA.spanish.sessions.map(e=>e.date).sort().pop() || null;
    case 'meals':    return DATA.meals.cookingLog.map(e=>e.date).sort().pop() || null;
    case 'health':   return DATA.health.crossfit.map(e=>e.date).sort().pop() || null;
    case 'calendar': return DATA.calendar.events.map(e=>e.date).sort().pop() || null;
    default:         return null;
  }
}

// ─────────────────────────────────────────────────────────────
// VIEW: DASHBOARD
// ─────────────────────────────────────────────────────────────
function renderDashboard(el) {
  const dimensions = [
    { key:'zine',     icon:'📖', title:'Fragments Zine',   preview: previewZine() },
    { key:'spanish',  icon:'🗣', title:'Spanish Language',  preview: previewSpanish() },
    { key:'meals',    icon:'🍽', title:'Meal Planner',      preview: previewMeals() },
    { key:'health',   icon:'💪', title:'Health & Fitness',  preview: previewHealth() },
    { key:'calendar', icon:'📅', title:'Family Calendar',   preview: previewCalendar() },
    { key:'journal',  icon:'✍', title:'Journal & Writing', preview: previewJournal() },
  ];

  const recentEntries = [...DATA.journal].reverse().slice(0, 3);

  el.innerHTML = `
    <div class="dashboard-greeting">
      <h2>${getGreeting()}, Elena ✦</h2>
      <p>${new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' })} — What would you like to log today?</p>
    </div>

    <div class="dimension-grid">
      ${dimensions.map(d => {
        const lastDate = d.key === 'journal'
          ? (DATA.journal.length ? DATA.journal[DATA.journal.length-1].date : null)
          : sectionLastDate(d.key);
        const cls   = activityClass(lastDate);
        const label = activityLabel(lastDate);
        return `
          <div class="dimension-card" onclick="navigateTo('${d.key}')">
            <div class="dim-card-top">
              <span class="dim-card-icon">${d.icon}</span>
              <span class="activity-badge">
                <span class="activity-dot ${cls}"></span>
                ${label}
              </span>
            </div>
            <div class="dim-card-title">${d.title}</div>
            <div class="dim-card-preview">${d.preview}</div>
            <div class="dim-card-footer">
              <span class="dim-card-date">${lastDate ? 'Last: ' + formatDateShort(lastDate) : 'No entries yet'}</span>
              <span style="color:var(--gold);font-size:12px;">Open →</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    ${recentEntries.length ? `
      <div style="margin-top:8px;">
        <div class="section-header">
          <h3>Recent Journal Entries</h3>
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('journal')">View all</button>
        </div>
        <div class="journal-entries">
          ${recentEntries.map(e => renderEntryCard(e)).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

function previewJournal() {
  if (!DATA.journal.length) return 'No entries yet. Start writing in your journal!';
  const last = DATA.journal[DATA.journal.length-1];
  return escHtml(last.text.slice(0, 100)) + (last.text.length > 100 ? '…' : '');
}
function previewZine() {
  const stories = DATA.zine.stories;
  if (!stories.length) return 'No stories tracked yet.';
  return stories.map(s => `${s.title} — <em>${s.status}</em>`).join('<br>');
}
function previewSpanish() {
  if (!DATA.spanish.sessions.length) return 'No sessions logged yet.';
  const last = DATA.spanish.sessions[DATA.spanish.sessions.length-1];
  return escHtml(last.notes?.slice(0, 80) || 'Session logged') + '…';
}
function previewMeals() {
  if (!DATA.meals.cookingLog.length) return 'No meals logged yet.';
  const last = DATA.meals.cookingLog[DATA.meals.cookingLog.length-1];
  return `Last cooked: <strong>${escHtml(last.dish)}</strong>`;
}
function previewHealth() {
  const cf = DATA.health.crossfit;
  if (!cf.length) return 'No Crossfit sessions logged yet.';
  const thisWeek = cf.filter(s => daysSince(s.date) <= 7).length;
  return `${thisWeek} Crossfit session${thisWeek!==1?'s':''} this week.`;
}
function previewCalendar() {
  const upcoming = DATA.calendar.events
    .filter(e => e.date >= today())
    .sort((a,b) => a.date.localeCompare(b.date))
    .slice(0, 2);
  if (!upcoming.length) return 'No upcoming events.';
  return upcoming.map(e => `📌 ${escHtml(e.title)} — ${formatDateShort(e.date)}`).join('<br>');
}

// ─────────────────────────────────────────────────────────────
// VIEW: JOURNAL
// ─────────────────────────────────────────────────────────────
function renderJournal(el) {
  const entries = [...DATA.journal].reverse();

  el.innerHTML = `
    <div class="card journal-compose">
      <h3 style="margin-bottom:14px;">New Entry</h3>
      <textarea id="journal-input" class="form-textarea" style="min-height:160px;"
        placeholder="Write anything — about your zine, a Spanish lesson, what you cooked, a story idea, your workout… The app will automatically sort it to the right section."></textarea>
      <div class="journal-actions" style="margin-top:12px;">
        <span class="journal-hint">✦ Auto-tagged and routed to the right section</span>
        <button class="btn btn-primary" onclick="submitJournal()">Save Entry</button>
      </div>
      <div id="route-notice" class="route-notice hidden"></div>
    </div>

    <div>
      <div class="section-header">
        <h3>All Entries <span style="font-size:14px;color:var(--text-muted);font-family:'Inter',sans-serif;">(${entries.length})</span></h3>
        <div style="display:flex;gap:8px;align-items:center;">
          <select id="journal-filter" class="form-select" style="width:160px;" onchange="filterJournal()">
            <option value="">All tags</option>
            <option value="zine">Zine</option>
            <option value="story">Story</option>
            <option value="spanish">Spanish</option>
            <option value="meals">Meals</option>
            <option value="health">Health</option>
            <option value="family">Family</option>
            <option value="general">General</option>
          </select>
          ${entries.length ? `<button class="btn btn-ghost btn-sm" onclick="exportJournalMd()">↓ Export .md</button>` : ''}
        </div>
      </div>
      <div id="journal-list" class="journal-entries">
        ${entries.length ? entries.map(e => renderEntryCard(e)).join('') : emptyState('✍', 'No journal entries yet. Write your first entry above!')}
      </div>
    </div>
  `;
}

function renderEntryCard(e) {
  return `
    <div class="journal-entry" id="entry-${e.id}">
      <div class="entry-header">
        <span class="entry-date">${formatDate(e.date)} ${e.time || ''}</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="entry-tags">${e.tags.map(t => `<span class="entry-tag tag-${t}">${t}</span>`).join('')}</div>
          <button class="entry-delete" onclick="deleteEntry('${e.id}')" title="Delete">✕</button>
        </div>
      </div>
      <div class="entry-body">${escHtml(e.text)}</div>
    </div>
  `;
}

function submitJournal() {
  const text = $('journal-input').value.trim();
  if (!text) return;

  const tags = autoTag(text);
  const entry = {
    id:   uid(),
    date: today(),
    time: new Date().toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' }),
    text,
    tags
  };

  DATA.journal.push(entry);

  // Auto-route story ideas
  if (tags.includes('story') || tags.includes('zine')) {
    DATA.zine.contentIdeas.push({ id: uid(), date: today(), text, source: 'journal' });
  }

  saveData();
  updateAllDots();

  // Show route notice
  const notice = $('route-notice');
  const tagLabels = { zine:'Fragments Zine', story:'Story Ideas', spanish:'Spanish', meals:'Meal Planner', health:'Health & Fitness', family:'Family Calendar', general:'General' };
  const routed = tags.map(t => tagLabels[t] || t).join(', ');
  notice.innerHTML = `✦ Saved and routed to: <strong>${routed}</strong>`;
  notice.classList.remove('hidden');

  $('journal-input').value = '';
  setTimeout(() => notice.classList.add('hidden'), 4000);

  // Re-render list
  const list = $('journal-list');
  if (list) {
    const entries = [...DATA.journal].reverse();
    list.innerHTML = entries.map(e => renderEntryCard(e)).join('');
  }
}

function filterJournal() {
  const filter = $('journal-filter').value;
  const entries = [...DATA.journal].reverse();
  const filtered = filter ? entries.filter(e => e.tags.includes(filter)) : entries;
  $('journal-list').innerHTML = filtered.length
    ? filtered.map(e => renderEntryCard(e)).join('')
    : emptyState('🔍', 'No entries match this filter.');
}

function deleteEntry(id) {
  DATA.journal = DATA.journal.filter(e => e.id !== id);
  saveData();
  const el = $('entry-' + id);
  if (el) el.remove();
}

// ─────────────────────────────────────────────────────────────
// VIEW: STORY IDEAS
// ─────────────────────────────────────────────────────────────
function renderStoryIdeas(el) {
  // Gather story-tagged journal entries + dedicated ideas
  const journalStories = DATA.journal.filter(e => e.tags.includes('story') || e.tags.includes('zine'));
  const ideas = DATA.zine.contentIdeas;

  el.innerHTML = `
    <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:28px;">
      <div class="card" style="flex:1;min-width:220px;">
        <div style="font-size:28px;margin-bottom:8px;">📖</div>
        <div style="font-size:22px;font-family:'Playfair Display',serif;">${DATA.zine.stories.length}</div>
        <div style="font-size:13px;color:var(--text-muted);">Stories Tracked</div>
      </div>
      <div class="card" style="flex:1;min-width:220px;">
        <div style="font-size:28px;margin-bottom:8px;">💡</div>
        <div style="font-size:22px;font-family:'Playfair Display',serif;">${journalStories.length}</div>
        <div style="font-size:13px;color:var(--text-muted);">Journal Entries with Story Ideas</div>
      </div>
    </div>

    <!-- Stories in progress -->
    <div style="margin-bottom:32px;">
      <div class="section-header">
        <h3>Stories in Progress</h3>
        <button class="btn btn-outline btn-sm" onclick="openAddStory()">+ Add Story</button>
      </div>
      ${DATA.zine.stories.map(s => `
        <div class="story-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <h4>${escHtml(s.title)}</h4>
            <span class="story-status status-${s.status.replace(' ','-')}">${s.status}</span>
          </div>
          ${s.synopsis ? `<p style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">${escHtml(s.synopsis)}</p>` : ''}
          <div class="story-meta">
            <span>📝 ${s.wordCount || 0} words</span>
            ${s.lastUpdated ? `<span>Updated: ${formatDateShort(s.lastUpdated)}</span>` : ''}
          </div>
          ${s.notes ? `<div style="font-size:13px;color:var(--text-muted);padding-top:8px;border-top:1px solid var(--border);">${escHtml(s.notes)}</div>` : ''}
          <div style="margin-top:12px;display:flex;gap:8px;">
            <button class="btn btn-ghost btn-sm" onclick="openEditStory('${s.id}')">Edit</button>
            <button class="btn btn-ghost btn-sm" onclick="exportStoryMd('${s.id}')">↓ .md</button>
          </div>
        </div>
      `).join('') || emptyState('📖', 'No stories tracked yet.')}
    </div>

    <!-- Journal entries with story tags -->
    ${journalStories.length ? `
      <div>
        <div class="section-header">
          <h3>Story Ideas from Journal</h3>
          <button class="btn btn-ghost btn-sm" onclick="exportStoryIdeasMd()">↓ Export .md</button>
        </div>
        <div class="journal-entries">
          ${[...journalStories].reverse().map(e => renderEntryCard(e)).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

function openAddStory() {
  openModal(`
    <h3>New Story</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="form-input" id="s-title" placeholder="Story title" />
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="s-status">
          <option value="planning">Planning</option>
          <option value="in-progress">In Progress</option>
          <option value="draft">Draft</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Synopsis</label>
        <textarea class="form-textarea" id="s-synopsis" style="min-height:80px;" placeholder="Brief synopsis…"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Word Count</label>
        <input class="form-input" type="number" id="s-words" placeholder="0" min="0" />
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <textarea class="form-textarea" id="s-notes" style="min-height:70px;" placeholder="Notes, ideas, reminders…"></textarea>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveStory(null)">Save Story</button>
      </div>
    </div>
  `);
}

function openEditStory(id) {
  const s = DATA.zine.stories.find(x => x.id === id);
  if (!s) return;
  openModal(`
    <h3>Edit Story</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="form-input" id="s-title" value="${escHtml(s.title)}" />
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="s-status">
          ${['planning','in-progress','draft','complete'].map(v => `<option value="${v}" ${s.status===v?'selected':''}>${v}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Synopsis</label>
        <textarea class="form-textarea" id="s-synopsis" style="min-height:80px;">${escHtml(s.synopsis||'')}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Word Count</label>
        <input class="form-input" type="number" id="s-words" value="${s.wordCount||0}" min="0" />
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <textarea class="form-textarea" id="s-notes" style="min-height:70px;">${escHtml(s.notes||'')}</textarea>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-danger btn-sm" onclick="deleteStory('${id}')">Delete</button>
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveStory('${id}')">Update</button>
      </div>
    </div>
  `);
}

function saveStory(id) {
  const title = $('s-title').value.trim();
  if (!title) return;
  if (id) {
    const s = DATA.zine.stories.find(x => x.id === id);
    if (s) {
      s.title = title;
      s.status = $('s-status').value;
      s.synopsis = $('s-synopsis').value.trim();
      s.wordCount = parseInt($('s-words').value) || 0;
      s.notes = $('s-notes').value.trim();
      s.lastUpdated = today();
    }
  } else {
    DATA.zine.stories.push({
      id: uid(), title,
      status: $('s-status').value,
      synopsis: $('s-synopsis').value.trim(),
      wordCount: parseInt($('s-words').value) || 0,
      notes: $('s-notes').value.trim(),
      lastUpdated: today()
    });
  }
  saveData();
  closeModal();
  navigateTo('story-ideas');
}

function deleteStory(id) {
  DATA.zine.stories = DATA.zine.stories.filter(s => s.id !== id);
  saveData();
  closeModal();
  navigateTo('story-ideas');
}

// ─────────────────────────────────────────────────────────────
// VIEW: FRAGMENTS ZINE
// ─────────────────────────────────────────────────────────────
function renderZine(el) {
  el.innerHTML = `
    <div class="zine-tabs">
      <button class="zine-tab active" onclick="switchZineTab(this,'tab-indesign')">InDesign Log</button>
      <button class="zine-tab" onclick="switchZineTab(this,'tab-design')">Design Notes</button>
      <button class="zine-tab" onclick="switchZineTab(this,'tab-ideas')">Content Ideas</button>
      <button class="zine-tab" onclick="switchZineTab(this,'tab-export')">Export</button>
    </div>

    <!-- InDesign Learning Log -->
    <div class="zine-panel active" id="tab-indesign">
      <div class="section-header">
        <h3>InDesign Learning Log</h3>
        <button class="btn btn-outline btn-sm" onclick="openAddZineLog('indesign')">+ Add Session</button>
      </div>
      <div class="coaching-panel" style="margin-bottom:20px;">
        <h4>💡 InDesign Learning Tips</h4>
        <div class="coaching-tips">
          <div class="coaching-tip">Start with master pages — they define the repeating layout (header, page numbers, margins) across all issues.</div>
          <div class="coaching-tip">Use paragraph styles for all text: body text, headings, captions. Never format text manually — it breaks consistency.</div>
          <div class="coaching-tip">Set up a 2-column or 3-column grid for A5. Recommended margins for Fragmentos: 12mm inside, 10mm outside, 15mm top, 12mm bottom.</div>
          <div class="coaching-tip">Watch YouTube: "InDesign for Beginners" by Dansky, and "How to Make a Magazine in InDesign" by Yes I'm a Designer.</div>
        </div>
      </div>
      <div id="indesign-list">
        ${renderZineEntries(DATA.zine.indesignLog, 'No InDesign sessions logged yet. Start tracking your learning!')}
      </div>
    </div>

    <!-- Design Notes -->
    <div class="zine-panel" id="tab-design">
      <div class="section-header">
        <h3>Design Notes</h3>
        <button class="btn btn-outline btn-sm" onclick="openAddZineLog('design')">+ Add Note</button>
      </div>
      <div id="design-list">
        ${renderZineEntries(DATA.zine.designNotes, 'No design notes yet.')}
      </div>
    </div>

    <!-- Content Ideas -->
    <div class="zine-panel" id="tab-ideas">
      <div class="section-header">
        <h3>Content Ideas</h3>
        <button class="btn btn-outline btn-sm" onclick="openAddZineLog('ideas')">+ Add Idea</button>
      </div>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Ideas automatically collected from journal entries tagged with 'zine' or 'story' also appear here.</p>
      <div id="ideas-list">
        ${renderZineEntries(DATA.zine.contentIdeas, 'No content ideas yet.')}
      </div>
    </div>

    <!-- Export -->
    <div class="zine-panel" id="tab-export">
      <h3 style="margin-bottom:20px;">Export Zine Content</h3>
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px;">
        <div class="card card-sm" style="display:flex;justify-content:space-between;align-items:center;">
          <div><strong>InDesign Learning Log</strong><br><span class="text-sm text-muted">${DATA.zine.indesignLog.length} entries</span></div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-ghost btn-sm" onclick="exportZineSectionMd('indesignLog','InDesign Log')">↓ .md</button>
            <button class="btn btn-ghost btn-sm" onclick="exportZineSectionDoc('indesignLog','InDesign Log')">↓ .doc</button>
          </div>
        </div>
        <div class="card card-sm" style="display:flex;justify-content:space-between;align-items:center;">
          <div><strong>Design Notes</strong><br><span class="text-sm text-muted">${DATA.zine.designNotes.length} entries</span></div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-ghost btn-sm" onclick="exportZineSectionMd('designNotes','Design Notes')">↓ .md</button>
            <button class="btn btn-ghost btn-sm" onclick="exportZineSectionDoc('designNotes','Design Notes')">↓ .doc</button>
          </div>
        </div>
        <div class="card card-sm" style="display:flex;justify-content:space-between;align-items:center;">
          <div><strong>All Stories</strong><br><span class="text-sm text-muted">${DATA.zine.stories.length} stories</span></div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-ghost btn-sm" onclick="exportAllStoriesMd()">↓ .md</button>
            <button class="btn btn-ghost btn-sm" onclick="exportAllStoriesDoc()">↓ .doc</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderZineEntries(arr, emptyMsg) {
  if (!arr.length) return emptyState('📖', emptyMsg);
  return [...arr].reverse().map(e => `
    <div class="journal-entry" id="zine-entry-${e.id}">
      <div class="entry-header">
        <span class="entry-date">${formatDate(e.date)}</span>
        <button class="entry-delete" onclick="deleteZineEntry('${e.id}')">✕</button>
      </div>
      <div class="entry-body">${escHtml(e.text)}</div>
    </div>
  `).join('');
}

function switchZineTab(btn, panelId) {
  document.querySelectorAll('.zine-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.zine-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = $(panelId);
  if (panel) panel.classList.add('active');
}

function openAddZineLog(type) {
  const labels = { indesign: 'InDesign Session', design: 'Design Note', ideas: 'Content Idea' };
  openModal(`
    <h3>Add ${labels[type]}</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" type="date" id="zl-date" value="${today()}" />
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <textarea class="form-textarea" id="zl-text" style="min-height:120px;" placeholder="What did you learn / note / idea…"></textarea>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveZineLog('${type}')">Save</button>
      </div>
    </div>
  `);
}

function saveZineLog(type) {
  const text = $('zl-text').value.trim();
  if (!text) return;
  const entry = { id: uid(), date: $('zl-date').value, text };
  const map = { indesign: 'indesignLog', design: 'designNotes', ideas: 'contentIdeas' };
  DATA.zine[map[type]].push(entry);
  saveData();
  updateAllDots();
  closeModal();
  navigateTo('zine');
}

function deleteZineEntry(id) {
  ['indesignLog','designNotes','contentIdeas'].forEach(k => {
    DATA.zine[k] = DATA.zine[k].filter(e => e.id !== id);
  });
  saveData();
  const el = $('zine-entry-' + id);
  if (el) el.remove();
}

// ─────────────────────────────────────────────────────────────
// VIEW: SPANISH
// ─────────────────────────────────────────────────────────────
function renderSpanish(el) {
  const sessionsThisWeek = DATA.spanish.sessions.filter(s => daysSince(s.date) <= 7).length;

  el.innerHTML = `
    <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:28px;">
      <div class="card" style="flex:1;min-width:160px;">
        <div style="font-size:24px;margin-bottom:6px;">🗣</div>
        <div style="font-size:24px;font-family:'Playfair Display',serif;">${DATA.spanish.sessions.length}</div>
        <div class="text-sm text-muted">Total Sessions</div>
      </div>
      <div class="card" style="flex:1;min-width:160px;">
        <div style="font-size:24px;margin-bottom:6px;">📅</div>
        <div style="font-size:24px;font-family:'Playfair Display',serif;">${sessionsThisWeek}</div>
        <div class="text-sm text-muted">Sessions This Week</div>
      </div>
      <div class="card" style="flex:1;min-width:160px;">
        <div style="font-size:24px;margin-bottom:6px;">📝</div>
        <div style="font-size:24px;font-family:'Playfair Display',serif;">${DATA.spanish.vocabulary.length}</div>
        <div class="text-sm text-muted">Vocabulary Items</div>
      </div>
    </div>

    <div class="coaching-panel" style="margin-bottom:28px;">
      <h4>🎯 Spanish Coaching Tips</h4>
      <div class="coaching-tips">
        <div class="coaching-tip"><strong>RTVE practice:</strong> Watch the news for 15 min daily. Focus on listening — don't worry about understanding every word at first.</div>
        <div class="coaching-tip"><strong>With Mauro:</strong> Pick one topic per day to discuss only in Spanish — meals, plans, the zine. Immersion at home is the most powerful tool.</div>
        <div class="coaching-tip"><strong>Translation practice:</strong> Take any English sentence and write it in Spanish first without help, then check. Focus on verb tenses (present, past, future).</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;flex-wrap:wrap;">
      <div>
        <div class="section-header">
          <h3>Sessions</h3>
          <button class="btn btn-outline btn-sm" onclick="openAddSpanishSession()">+ Log Session</button>
        </div>
        <div id="spanish-sessions">
          ${DATA.spanish.sessions.length
            ? [...DATA.spanish.sessions].reverse().map(s => `
              <div class="journal-entry" id="sp-${s.id}">
                <div class="entry-header">
                  <span class="entry-date">${formatDate(s.date)}</span>
                  <div style="display:flex;gap:8px;align-items:center;">
                    <span class="entry-tag tag-spanish">${s.type || 'session'}</span>
                    <button class="entry-delete" onclick="deleteSpanishSession('${s.id}')">✕</button>
                  </div>
                </div>
                <div class="entry-body">${escHtml(s.notes || '')}</div>
              </div>
            `).join('')
            : emptyState('🗣', 'No sessions logged yet.')}
        </div>
      </div>

      <div>
        <div class="section-header">
          <h3>Vocabulary</h3>
          <button class="btn btn-outline btn-sm" onclick="openAddVocab()">+ Add Word</button>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:12px;">
          <button class="btn btn-ghost btn-sm" onclick="exportSpanishMd()">↓ .md</button>
          <button class="btn btn-ghost btn-sm" onclick="exportSpanishDoc()">↓ .doc</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;" id="vocab-list">
          ${DATA.spanish.vocabulary.length
            ? DATA.spanish.vocabulary.map(v => `
              <div class="journal-entry card-sm" id="vocab-${v.id}" style="padding:10px 14px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div>
                    <strong>${escHtml(v.spanish)}</strong>
                    <span style="color:var(--text-muted);margin:0 8px;">→</span>
                    ${escHtml(v.english)}
                    ${v.notes ? `<span style="font-size:12px;color:var(--text-dim);margin-left:8px;">(${escHtml(v.notes)})</span>` : ''}
                  </div>
                  <button class="entry-delete" onclick="deleteVocab('${v.id}')">✕</button>
                </div>
              </div>
            `).join('')
            : emptyState('📝', 'No vocabulary added yet.')}
        </div>
      </div>
    </div>
  `;
}

function openAddSpanishSession() {
  openModal(`
    <h3>Log Spanish Session</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" type="date" id="sp-date" value="${today()}" />
      </div>
      <div class="form-group">
        <label class="form-label">Type</label>
        <select class="form-select" id="sp-type">
          <option value="rtve">RTVE watching</option>
          <option value="conversation">Conversation with Mauro</option>
          <option value="translation">Translation practice</option>
          <option value="study">Study / Reading</option>
          <option value="writing">Writing in Spanish</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <textarea class="form-textarea" id="sp-notes" style="min-height:100px;" placeholder="What did you learn, practice, or notice today?"></textarea>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveSpanishSession()">Save Session</button>
      </div>
    </div>
  `);
}

function saveSpanishSession() {
  const notes = $('sp-notes').value.trim();
  DATA.spanish.sessions.push({ id: uid(), date: $('sp-date').value, type: $('sp-type').value, notes });
  saveData();
  updateAllDots();
  closeModal();
  navigateTo('spanish');
}

function deleteSpanishSession(id) {
  DATA.spanish.sessions = DATA.spanish.sessions.filter(s => s.id !== id);
  saveData();
  const el = $('sp-' + id);
  if (el) el.remove();
}

function openAddVocab() {
  openModal(`
    <h3>Add Vocabulary</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Spanish Word / Phrase</label>
        <input class="form-input" id="v-es" placeholder="e.g. al amanecer" />
      </div>
      <div class="form-group">
        <label class="form-label">English Translation</label>
        <input class="form-input" id="v-en" placeholder="e.g. at dawn" />
      </div>
      <div class="form-group">
        <label class="form-label">Notes (optional)</label>
        <input class="form-input" id="v-notes" placeholder="context, example sentence…" />
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveVocab()">Add Word</button>
      </div>
    </div>
  `);
}

function saveVocab() {
  const spanish = $('v-es').value.trim();
  const english = $('v-en').value.trim();
  if (!spanish || !english) return;
  DATA.spanish.vocabulary.push({ id: uid(), spanish, english, notes: $('v-notes').value.trim(), date: today() });
  saveData();
  closeModal();
  navigateTo('spanish');
}

function deleteVocab(id) {
  DATA.spanish.vocabulary = DATA.spanish.vocabulary.filter(v => v.id !== id);
  saveData();
  const el = $('vocab-' + id);
  if (el) el.remove();
}

// ─────────────────────────────────────────────────────────────
// VIEW: MEAL PLANNER
// ─────────────────────────────────────────────────────────────
const DAYS = ['mon','tue','wed','thu','fri','sat','sun'];
const DAY_NAMES = { mon:'Mon', tue:'Tue', wed:'Wed', thu:'Thu', fri:'Fri', sat:'Sat', sun:'Sun' };

function renderMeals(el) {
  el.innerHTML = `
    <div class="dietary-warn">
      ⚕️ <strong>Dietary reminders:</strong>
      Elena — avoid alcohol, caffeine, sugar, chocolate, pastries (fibroadenomas).
      Mauro — low saturated fat (hereditary high cholesterol).
    </div>

    <!-- Weekly Menu -->
    <div class="section-header">
      <h3>This Week's Menu</h3>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost btn-sm" onclick="generateShoppingList()">🛒 Shopping List</button>
        <button class="btn btn-ghost btn-sm" onclick="exportMealsMd()">↓ .md</button>
        <button class="btn btn-ghost btn-sm" onclick="exportMealsDoc()">↓ .doc</button>
      </div>
    </div>
    <div class="week-grid">
      ${DAYS.map(d => `
        <div class="week-day-card">
          <div class="week-day-name">${DAY_NAMES[d]}</div>
          <div class="week-meal-slot">
            <input class="form-input" style="font-size:12px;padding:5px 8px;"
              id="menu-${d}" placeholder="Meal…"
              value="${escHtml(DATA.meals.weekMenu[d] || '')}"
              onchange="updateWeekMenu('${d}', this.value)" />
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Cooking Log -->
    <div style="margin-bottom:28px;">
      <div class="section-header">
        <h3>Cooking Log</h3>
        <button class="btn btn-outline btn-sm" onclick="openAddMeal()">+ Log a Meal</button>
      </div>
      <div id="cooking-log">
        ${DATA.meals.cookingLog.length
          ? [...DATA.meals.cookingLog].reverse().map(m => `
            <div class="journal-entry" id="meal-${m.id}">
              <div class="entry-header">
                <span class="entry-date">${formatDate(m.date)}</span>
                <button class="entry-delete" onclick="deleteMeal('${m.id}')">✕</button>
              </div>
              <div class="entry-body">
                <strong>${escHtml(m.dish)}</strong>
                ${m.notes ? `<br><span style="color:var(--text-muted);font-size:13px;">${escHtml(m.notes)}</span>` : ''}
              </div>
            </div>
          `).join('')
          : emptyState('🍽', 'No meals logged yet.')}
      </div>
    </div>

    <!-- Recipe Collection -->
    <div>
      <div class="section-header">
        <h3>Recipe Collection</h3>
        <button class="btn btn-outline btn-sm" onclick="openAddRecipe()">+ Add Recipe</button>
      </div>
      <div class="recipe-grid">
        ${DATA.meals.recipes.map(r => `
          <div class="recipe-card" onclick="openRecipe('${r.id}')">
            <h4>${escHtml(r.title)}</h4>
            <p class="text-sm text-muted">${r.cuisine} · ${r.time} · ${r.servings} servings</p>
            <div class="recipe-tags">
              ${r.safe_for.map(p => `<span class="recipe-tag">✓ ${escHtml(p)}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function updateWeekMenu(day, val) {
  DATA.meals.weekMenu[day] = val;
  saveData();
}

function openAddMeal() {
  openModal(`
    <h3>Log a Meal</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" type="date" id="ml-date" value="${today()}" />
      </div>
      <div class="form-group">
        <label class="form-label">Dish Name</label>
        <input class="form-input" id="ml-dish" placeholder="What did you cook?" />
      </div>
      <div class="form-group">
        <label class="form-label">Notes (optional)</label>
        <textarea class="form-textarea" id="ml-notes" style="min-height:80px;" placeholder="How it went, modifications, rating…"></textarea>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveMeal()">Save</button>
      </div>
    </div>
  `);
}

function saveMeal() {
  const dish = $('ml-dish').value.trim();
  if (!dish) return;
  DATA.meals.cookingLog.push({ id: uid(), date: $('ml-date').value, dish, notes: $('ml-notes').value.trim() });
  saveData();
  updateAllDots();
  closeModal();
  navigateTo('meals');
}

function deleteMeal(id) {
  DATA.meals.cookingLog = DATA.meals.cookingLog.filter(m => m.id !== id);
  saveData();
  const el = $('meal-' + id);
  if (el) el.remove();
}

function openRecipe(id) {
  const r = DATA.meals.recipes.find(x => x.id === id);
  if (!r) return;
  openModal(`
    <h3 style="margin-bottom:6px;">${escHtml(r.title)}</h3>
    <p class="text-muted text-sm" style="margin-bottom:20px;">${r.cuisine} · ${r.time} · Serves ${r.servings}</p>
    <div style="margin-bottom:16px;">
      <div class="form-label">Ingredients</div>
      <ul style="margin-top:8px;padding-left:0;">
        ${r.ingredients.map(i => `<li style="padding:4px 0;border-bottom:1px solid var(--border);font-size:14px;">• ${escHtml(i)}</li>`).join('')}
      </ul>
    </div>
    <div style="margin-bottom:16px;">
      <div class="form-label">Method</div>
      <p style="font-size:14px;line-height:1.7;margin-top:8px;">${escHtml(r.method)}</p>
    </div>
    ${r.notes ? `<div class="dietary-warn" style="margin-top:12px;">⚕️ ${escHtml(r.notes)}</div>` : ''}
    <div style="display:flex;gap:8px;margin-top:16px;">
      <button class="btn btn-ghost btn-sm" onclick="addRecipeToLog('${r.id}')">+ Log as cooked today</button>
      <button class="btn btn-ghost btn-sm" onclick="exportSingleRecipeMd('${r.id}')">↓ .md</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Close</button>
    </div>
  `);
}

function addRecipeToLog(id) {
  const r = DATA.meals.recipes.find(x => x.id === id);
  if (!r) return;
  DATA.meals.cookingLog.push({ id: uid(), date: today(), dish: r.title, notes: '' });
  saveData();
  closeModal();
  navigateTo('meals');
}

function openAddRecipe() {
  openModal(`
    <h3>Add Recipe</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="form-input" id="rc-title" placeholder="Recipe name" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Cuisine</label>
          <input class="form-input" id="rc-cuisine" placeholder="Greek, Spanish…" />
        </div>
        <div class="form-group">
          <label class="form-label">Time</label>
          <input class="form-input" id="rc-time" placeholder="30 min" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Ingredients (one per line)</label>
        <textarea class="form-textarea" id="rc-ing" style="min-height:100px;" placeholder="200g chickpeas&#10;1 onion&#10;…"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Method</label>
        <textarea class="form-textarea" id="rc-method" style="min-height:80px;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Dietary Notes</label>
        <input class="form-input" id="rc-notes" placeholder="e.g. No caffeine, low saturated fat…" />
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveRecipe()">Save Recipe</button>
      </div>
    </div>
  `);
}

function saveRecipe() {
  const title = $('rc-title').value.trim();
  if (!title) return;
  DATA.meals.recipes.push({
    id: uid(), title,
    cuisine: $('rc-cuisine').value.trim() || 'Mediterranean',
    time: $('rc-time').value.trim() || '—',
    servings: 4,
    safe_for: [],
    ingredients: $('rc-ing').value.trim().split('\n').filter(Boolean),
    method: $('rc-method').value.trim(),
    notes: $('rc-notes').value.trim()
  });
  saveData();
  closeModal();
  navigateTo('meals');
}

function generateShoppingList() {
  const menuRecipes = Object.values(DATA.meals.weekMenu)
    .filter(Boolean)
    .map(name => DATA.meals.recipes.find(r => r.title.toLowerCase().includes(name.toLowerCase())))
    .filter(Boolean);

  const ingredients = [...new Set(menuRecipes.flatMap(r => r.ingredients))];

  if (!ingredients.length) {
    openModal(`
      <h3>🛒 Shopping List</h3>
      <p class="text-muted" style="margin-top:8px;">Fill in the weekly menu first with recipe names to auto-generate a list.</p>
      <button class="btn btn-ghost btn-sm mt-2" onclick="closeModal()">Close</button>
    `);
    return;
  }

  openModal(`
    <h3>🛒 Shopping List</h3>
    <p class="text-muted text-sm" style="margin-bottom:16px;">Generated from this week's menu</p>
    <ul class="shop-list" id="shop-list">
      ${ingredients.map((ing, i) => `
        <li class="shop-item" id="si-${i}">
          <input type="checkbox" class="shop-check" onchange="toggleShopItem(${i})" />
          <span>${escHtml(ing)}</span>
        </li>
      `).join('')}
    </ul>
    <div style="display:flex;gap:8px;margin-top:16px;">
      <button class="btn btn-ghost btn-sm" onclick="exportShoppingListMd(${JSON.stringify(ingredients).replace(/"/g,'&quot;')})">↓ Export .md</button>
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
    </div>
  `);
}

function toggleShopItem(i) {
  const li = $('si-' + i);
  if (li) li.classList.toggle('checked');
}

// ─────────────────────────────────────────────────────────────
// VIEW: HEALTH & FITNESS
// ─────────────────────────────────────────────────────────────
function renderHealth(el) {
  const thisMonth = new Date();
  const daysInMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth()+1, 0).getDate();
  const todayD = parseInt(today().split('-')[2]);
  const cfDates = new Set(DATA.health.crossfit.map(s => s.date));
  const cfThisMonth = DATA.health.crossfit.filter(s => s.date.startsWith(today().slice(0,7))).length;
  const allAppts = [...DATA.health.appointments, ...DATA.health.erikaAppts]
    .filter(a => a.date >= today())
    .sort((a,b) => a.date.localeCompare(b.date));

  el.innerHTML = `
    <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:28px;">
      <div class="card" style="flex:1;min-width:150px;">
        <div style="font-size:24px;margin-bottom:6px;">💪</div>
        <div style="font-size:24px;font-family:'Playfair Display',serif;">${cfThisMonth}</div>
        <div class="text-sm text-muted">Crossfit This Month</div>
      </div>
      <div class="card" style="flex:1;min-width:150px;">
        <div style="font-size:24px;margin-bottom:6px;">🎯</div>
        <div style="font-size:24px;font-family:'Playfair Display',serif;">2–3x</div>
        <div class="text-sm text-muted">Weekly Goal</div>
      </div>
      <div class="card" style="flex:1;min-width:150px;">
        <div style="font-size:24px;margin-bottom:6px;">📅</div>
        <div style="font-size:24px;font-family:'Playfair Display',serif;">${allAppts.length}</div>
        <div class="text-sm text-muted">Upcoming Appointments</div>
      </div>
    </div>

    <!-- Crossfit tracker (this month) -->
    <div style="margin-bottom:28px;">
      <div class="section-header">
        <h3>Crossfit — ${thisMonth.toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</h3>
        <button class="btn btn-outline btn-sm" onclick="logCrossfit()">+ Log Session</button>
      </div>
      <div class="crossfit-tracker" style="grid-template-columns:repeat(7,1fr);gap:6px;">
        ${Array.from({length:daysInMonth},(_,i)=>{
          const d = String(i+1).padStart(2,'0');
          const dateStr = today().slice(0,7) + '-' + d;
          const done = cfDates.has(dateStr);
          const isToday = i+1 === todayD;
          return `<div class="cf-day ${done?'done':''}" title="${dateStr}" onclick="toggleCrossfit('${dateStr}')">
            <span style="${isToday?'color:var(--gold);font-weight:700;':''}">${i+1}</span>
          </div>`;
        }).join('')}
      </div>
      <p class="text-sm text-muted" style="margin-top:8px;">Click a day to mark Crossfit session. Green = done.</p>
    </div>

    <!-- Appointments -->
    <div>
      <div class="section-header">
        <h3>Appointments</h3>
        <button class="btn btn-outline btn-sm" onclick="openAddAppt()">+ Add Appointment</button>
      </div>
      <div class="appt-list">
        ${allAppts.length ? allAppts.map(a => {
          const d = new Date(a.date);
          return `
            <div class="appt-item" id="appt-${a.id}">
              <div class="appt-date-block">
                <div class="appt-day">${d.getDate()}</div>
                <div class="appt-month">${d.toLocaleDateString('en-GB',{month:'short'})}</div>
              </div>
              <div class="appt-info" style="flex:1;">
                <h4>${escHtml(a.title)}</h4>
                <p>${a.person ? escHtml(a.person) + ' · ' : ''}${escHtml(a.location || '')}${a.time ? ' · ' + a.time : ''}</p>
              </div>
              <button class="entry-delete" onclick="deleteAppt('${a.id}')">✕</button>
            </div>
          `;
        }).join('') : emptyState('📅', 'No upcoming appointments.')}
      </div>
    </div>

    <div style="margin-top:24px;display:flex;gap:8px;">
      <button class="btn btn-ghost btn-sm" onclick="exportHealthMd()">↓ Export Health Log .md</button>
      <button class="btn btn-ghost btn-sm" onclick="exportHealthDoc()">↓ Export .doc</button>
    </div>
  `;
}

function toggleCrossfit(dateStr) {
  const exists = DATA.health.crossfit.find(s => s.date === dateStr);
  if (exists) {
    DATA.health.crossfit = DATA.health.crossfit.filter(s => s.date !== dateStr);
  } else {
    DATA.health.crossfit.push({ id: uid(), date: dateStr, notes: '' });
  }
  saveData();
  updateAllDots();
  navigateTo('health');
}

function logCrossfit() {
  openModal(`
    <h3>Log Crossfit Session</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Date</label>
        <input class="form-input" type="date" id="cf-date" value="${today()}" />
      </div>
      <div class="form-group">
        <label class="form-label">Notes (optional)</label>
        <textarea class="form-textarea" id="cf-notes" style="min-height:80px;" placeholder="What did you work on? How did it go?"></textarea>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveCrossfit()">Save</button>
      </div>
    </div>
  `);
}

function saveCrossfit() {
  const date = $('cf-date').value;
  if (!DATA.health.crossfit.find(s => s.date === date)) {
    DATA.health.crossfit.push({ id: uid(), date, notes: $('cf-notes').value.trim() });
    saveData();
    updateAllDots();
  }
  closeModal();
  navigateTo('health');
}

function openAddAppt() {
  openModal(`
    <h3>Add Appointment</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Title</label>
        <input class="form-input" id="ap-title" placeholder="e.g. Gynaecologist, Erika's check-up…" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Date</label>
          <input class="form-input" type="date" id="ap-date" value="${today()}" />
        </div>
        <div class="form-group">
          <label class="form-label">Time</label>
          <input class="form-input" type="time" id="ap-time" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Person</label>
          <select class="form-select" id="ap-person">
            <option value="Elena">Elena</option>
            <option value="Erika">Erika</option>
            <option value="Mauro">Mauro</option>
            <option value="Family">Family</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Location</label>
          <input class="form-input" id="ap-loc" placeholder="Clinic, hospital…" />
        </div>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveAppt()">Save</button>
      </div>
    </div>
  `);
}

function saveAppt() {
  const title = $('ap-title').value.trim();
  if (!title) return;
  const appt = {
    id: uid(), title,
    date: $('ap-date').value,
    time: $('ap-time').value,
    person: $('ap-person').value,
    location: $('ap-loc').value.trim()
  };
  const person = appt.person;
  if (person === 'Erika') {
    DATA.health.erikaAppts.push(appt);
  } else {
    DATA.health.appointments.push(appt);
  }
  saveData();
  closeModal();
  navigateTo('health');
}

function deleteAppt(id) {
  DATA.health.appointments = DATA.health.appointments.filter(a => a.id !== id);
  DATA.health.erikaAppts = DATA.health.erikaAppts.filter(a => a.id !== id);
  saveData();
  const el = $('appt-' + id);
  if (el) el.remove();
}

// ─────────────────────────────────────────────────────────────
// VIEW: FAMILY CALENDAR
// ─────────────────────────────────────────────────────────────
function renderCalendar(el) {
  const now = new Date();
  let calYear = now.getFullYear();
  let calMonth = now.getMonth();

  // Store on element for nav
  el._calYear = calYear;
  el._calMonth = calMonth;

  renderCalendarMonth(el, calYear, calMonth);
}

function renderCalendarMonth(el, year, month) {
  const monthName = new Date(year, month).toLocaleDateString('en-GB', { month:'long', year:'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const startOffset = (firstDay + 6) % 7; // Mon start
  const todayStr = today();

  const upcoming = [...DATA.calendar.events, ...DATA.calendar.birthdays.map(b => ({
    ...b,
    date: `${year}-${b.month}-${b.day}`,
    isBirthday: true
  }))]
    .filter(e => e.date >= todayStr)
    .sort((a,b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  const eventMap = {};
  DATA.calendar.events.forEach(e => {
    if (!eventMap[e.date]) eventMap[e.date] = [];
    eventMap[e.date].push(e);
  });
  DATA.calendar.birthdays.forEach(b => {
    const dateKey = `${year}-${b.month}-${b.day}`;
    if (!eventMap[dateKey]) eventMap[dateKey] = [];
    eventMap[dateKey].push({ ...b, isBirthday: true });
  });

  el.innerHTML = `
    <div class="cal-header">
      <h3>${monthName}</h3>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost btn-sm" onclick="changeCalMonth(-1)">◀</button>
        <button class="btn btn-ghost btn-sm" onclick="changeCalMonth(1)">▶</button>
        <button class="btn btn-outline btn-sm" onclick="openAddEvent()">+ Add Event</button>
        <button class="btn btn-outline btn-sm" onclick="openAddBirthday()">🎂 Birthday</button>
        <button class="btn btn-ghost btn-sm" onclick="openImportIcs()" title="Import Google Calendar">📅 Import .ics</button>
      </div>
    </div>

    <div class="cal-grid">
      ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => `<div class="cal-weekday">${d}</div>`).join('')}
      ${Array(startOffset).fill('<div class="cal-cell other-month"></div>').join('')}
      ${Array.from({length:daysInMonth},(_,i) => {
        const d = String(i+1).padStart(2,'0');
        const m = String(month+1).padStart(2,'0');
        const dateStr = `${year}-${m}-${d}`;
        const isToday = dateStr === todayStr;
        const evs = eventMap[dateStr] || [];
        return `<div class="cal-cell ${isToday?'today':''}">
          <div class="cal-day-num">${i+1}</div>
          ${evs.slice(0,3).map(e => `<span class="cal-event-dot" style="${e.isBirthday?'background:var(--text-muted);':''}"></span><span style="font-size:10px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-muted);">${escHtml(e.title||e.name)}</span>`).join('')}
        </div>`;
      }).join('')}
    </div>

    ${upcoming.length ? `
      <div class="upcoming-list">
        <h3 style="margin-bottom:12px;">Upcoming</h3>
        ${upcoming.map(e => `
          <div class="upcoming-item ${e.isBirthday?'birthday':''}" id="ev-${e.id}">
            <span class="upcoming-label">${e.isBirthday?'🎂 ':'📌 '} ${escHtml(e.title||e.name)}</span>
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="upcoming-date">${formatDateShort(e.date)}</span>
              ${!e.isBirthday ? `<button class="entry-delete" onclick="deleteEvent('${e.id}')">✕</button>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}
    <div style="margin-top:16px;display:flex;gap:8px;">
      <button class="btn btn-ghost btn-sm" onclick="exportCalendarMd()">↓ Export .md</button>
    </div>
  `;

  // Store refs for month navigation
  el._calYear = year;
  el._calMonth = month;
}

function changeCalMonth(dir) {
  const el = $('view-container');
  let y = el._calYear;
  let m = el._calMonth + dir;
  if (m < 0) { m = 11; y--; }
  if (m > 11) { m = 0; y++; }
  renderCalendarMonth(el, y, m);
}

function openAddEvent() {
  openModal(`
    <h3>Add Event</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Event Title</label>
        <input class="form-input" id="ev-title" placeholder="e.g. Family dinner, Mauro's work trip…" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Date</label>
          <input class="form-input" type="date" id="ev-date" value="${today()}" />
        </div>
        <div class="form-group">
          <label class="form-label">Time (optional)</label>
          <input class="form-input" type="time" id="ev-time" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <input class="form-input" id="ev-notes" placeholder="Details…" />
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveEvent()">Save Event</button>
      </div>
    </div>
  `);
}

function saveEvent() {
  const title = $('ev-title').value.trim();
  if (!title) return;
  DATA.calendar.events.push({
    id: uid(), title,
    date: $('ev-date').value,
    time: $('ev-time').value,
    notes: $('ev-notes').value.trim()
  });
  saveData();
  closeModal();
  navigateTo('calendar');
}

function deleteEvent(id) {
  DATA.calendar.events = DATA.calendar.events.filter(e => e.id !== id);
  saveData();
  const el = $('ev-' + id);
  if (el) el.remove();
}

function openImportIcs() {
  openModal(`
    <h3>📅 Import Google Calendar</h3>
    <p style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">
      Export your calendar from Google Calendar as an .ics file, then import it here.
      <br><br>
      <strong style="color:var(--gold);">How to export from Google Calendar:</strong><br>
      1. Open Google Calendar on your computer<br>
      2. Click the ⚙ Settings gear → Settings<br>
      3. Click <em>Import &amp; Export</em> → <em>Export</em><br>
      4. A .zip file downloads — open it and find the .ics file inside<br>
      5. Select that file below
    </p>
    <div class="form-group">
      <label class="form-label">Select .ics file</label>
      <input type="file" accept=".ics" class="form-input" id="ics-file" style="padding:8px;" />
    </div>
    <div id="ics-preview" style="margin-top:12px;display:none;">
      <p style="font-size:13px;color:var(--gold);" id="ics-count"></p>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="importIcsFile()">Import Events</button>
    </div>
  `);

  // Preview event count as soon as file is chosen
  setTimeout(() => {
    const input = $('ics-file');
    if (input) {
      input.addEventListener('change', () => {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
          const events = parseIcs(e.target.result);
          const preview = $('ics-preview');
          const count   = $('ics-count');
          if (preview && count) {
            count.textContent = `✓ Found ${events.length} event${events.length !== 1 ? 's' : ''} in this calendar file.`;
            preview.style.display = 'block';
          }
        };
        reader.readAsText(file);
      });
    }
  }, 100);
}

function parseIcs(text) {
  const events = [];
  const blocks  = text.split('BEGIN:VEVENT');
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const get = (key) => {
      // handles multi-line folded values and VALUE=DATE format
      const regex = new RegExp(`${key}(?:;[^:]*)?:([^\\r\\n]+)`, 'i');
      const m = block.match(regex);
      return m ? m[1].trim() : '';
    };

    const rawStart = get('DTSTART');
    if (!rawStart) continue;

    // Parse date — handles both YYYYMMDD and YYYYMMDDTHHmmssZ
    let dateStr = '';
    try {
      const clean = rawStart.replace(/[TZ]/g, '');
      const y = clean.slice(0, 4);
      const mo = clean.slice(4, 6);
      const d  = clean.slice(6, 8);
      dateStr = `${y}-${mo}-${d}`;
      // Validate
      if (isNaN(new Date(dateStr).getTime())) continue;
    } catch(e) { continue; }

    const title = get('SUMMARY')
      .replace(/\\n/g, ' ')
      .replace(/\\,/g, ',')
      .replace(/\\;/g, ';')
      .trim();

    if (!title || title.toLowerCase().includes('reminder')) continue;

    const location = get('LOCATION').replace(/\\,/g, ',').trim();
    const notes    = get('DESCRIPTION').replace(/\\n/g, ' ').replace(/\\,/g,',').slice(0, 200).trim();

    events.push({ id: uid(), title, date: dateStr, location, notes, time: '', fromGoogle: true });
  }
  // Remove duplicates (same title + date)
  const seen = new Set();
  return events.filter(e => {
    const key = e.title + e.date;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function importIcsFile() {
  const input = $('ics-file');
  if (!input || !input.files[0]) {
    openModal(`<h3>No file selected</h3><p class="text-muted mt-1">Please select an .ics file first.</p><button class="btn btn-ghost mt-2" onclick="closeModal()">OK</button>`);
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    const events  = parseIcs(e.target.result);
    if (!events.length) {
      openModal(`<h3 style="color:var(--red);">No events found</h3><p class="text-muted mt-1">The file didn't contain any readable calendar events. Make sure you're using a Google Calendar .ics export file.</p><button class="btn btn-ghost mt-2" onclick="closeModal()">OK</button>`);
      return;
    }
    // Avoid re-importing duplicates already in the calendar
    const existing = new Set(DATA.calendar.events.map(ev => ev.title + ev.date));
    const newEvents = events.filter(ev => !existing.has(ev.title + ev.date));
    DATA.calendar.events.push(...newEvents);
    saveData();
    closeModal();
    navigateTo('calendar');
    setTimeout(() => {
      openModal(`
        <h3 style="color:var(--green);">✓ Calendar Imported</h3>
        <p style="margin:12px 0;color:var(--text-muted);">
          <strong style="color:var(--text);">${newEvents.length}</strong> new events added from Google Calendar.<br>
          ${events.length - newEvents.length > 0 ? `<span style="font-size:13px;">(${events.length - newEvents.length} duplicate${events.length - newEvents.length !== 1 ? 's' : ''} skipped)</span>` : ''}
        </p>
        <button class="btn btn-primary" onclick="closeModal()">Great!</button>
      `);
    }, 150);
  };
  reader.readAsText(input.files[0]);
}

function openAddBirthday() {
  openModal(`
    <h3>🎂 Add Birthday</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Person's Name</label>
        <input class="form-input" id="bd-name" placeholder="e.g. Grandma Maria" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Month</label>
          <select class="form-select" id="bd-month">
            ${['01','02','03','04','05','06','07','08','09','10','11','12'].map((m,i) =>
              `<option value="${m}">${new Date(2000,i).toLocaleDateString('en-GB',{month:'long'})}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Day</label>
          <input class="form-input" type="number" id="bd-day" min="1" max="31" placeholder="15" />
        </div>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveBirthday()">Save Birthday</button>
      </div>
    </div>
  `);
}

function saveBirthday() {
  const name = $('bd-name').value.trim();
  const day  = String(parseInt($('bd-day').value)).padStart(2,'0');
  const month = $('bd-month').value;
  if (!name || !day) return;
  DATA.calendar.birthdays.push({ id: uid(), name, day, month });
  saveData();
  closeModal();
  navigateTo('calendar');
}

// ─────────────────────────────────────────────────────────────
// VIEW: SETTINGS
// ─────────────────────────────────────────────────────────────
function renderSettings(el) {
  el.innerHTML = `
    <div style="max-width:600px;">
      <div class="settings-section">
        <h3>Account</h3>
        <div class="setting-row">
          <div class="setting-info">
            <h4>Recovery Email</h4>
            <p>${CONFIG.email}</p>
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <h4>Change Password</h4>
            <p>Update your login password</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="openChangePassword()">Change</button>
        </div>
      </div>

      <div class="settings-section">
        <h3>Data & Export</h3>
        <div class="setting-row">
          <div class="setting-info">
            <h4>Export All Data (Markdown)</h4>
            <p>Download all sections as a single .md file</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="exportAllMd()">↓ Export All</button>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <h4>Export All Data (Word-compatible)</h4>
            <p>Download all sections as a .doc file</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="exportAllDoc()">↓ Export .doc</button>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <h4>Import Data</h4>
            <p>Restore from a previous JSON backup</p>
          </div>
          <label class="btn btn-ghost btn-sm" style="cursor:pointer;">
            ↑ Import
            <input type="file" accept=".json" style="display:none;" onchange="importData(event)" />
          </label>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <h4>Backup to JSON</h4>
            <p>Download a full data backup file</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="exportJson()">↓ Backup</button>
        </div>
      </div>

      <div class="settings-section">
        <h3>Danger Zone</h3>
        <div class="setting-row">
          <div class="setting-info">
            <h4>Reset App</h4>
            <p>Delete all data and start fresh. This cannot be undone.</p>
          </div>
          <button class="btn btn-danger btn-sm" onclick="confirmReset()">Reset</button>
        </div>
      </div>

      <div class="card card-sm" style="margin-top:24px;text-align:center;">
        <p class="text-sm text-muted">Elena's Life Dashboard · Version 1.0</p>
        <p class="text-sm text-muted" style="margin-top:4px;">Built with Claude + Cowork · ${new Date().getFullYear()}</p>
      </div>
    </div>
  `;
}

function openChangePassword() {
  openModal(`
    <h3>Change Password</h3>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="form-group">
        <label class="form-label">Current Password</label>
        <input type="password" class="form-input" id="cp-current" />
      </div>
      <div class="form-group">
        <label class="form-label">New Password</label>
        <input type="password" class="form-input" id="cp-new" />
      </div>
      <div class="form-group">
        <label class="form-label">Confirm New Password</label>
        <input type="password" class="form-input" id="cp-confirm" />
      </div>
      <div id="cp-error" class="auth-error hidden"></div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="changePassword()">Update Password</button>
      </div>
    </div>
  `);
}

function changePassword() {
  const current = $('cp-current').value;
  const newPw   = $('cp-new').value;
  const confirm = $('cp-confirm').value;
  const err     = $('cp-error');

  if (hashPassword(current) !== DATA.passwordHash) { showAuthError(err, 'Current password is incorrect.'); return; }
  if (newPw.length < 6)  { showAuthError(err, 'New password must be at least 6 characters.'); return; }
  if (newPw !== confirm) { showAuthError(err, 'New passwords do not match.'); return; }

  DATA.passwordHash = hashPassword(newPw);
  saveData();
  closeModal();
  openModal(`<h3 style="color:var(--green);">✓ Password updated</h3><p class="text-muted mt-1">Your password has been changed successfully.</p><button class="btn btn-ghost mt-2" onclick="closeModal()">OK</button>`);
}

function confirmReset() {
  openModal(`
    <h3 style="color:var(--red);">⚠ Reset App?</h3>
    <p class="text-muted" style="margin:12px 0;">This will permanently delete ALL your data — journal entries, recipes, stories, sessions, calendar events. This cannot be undone.</p>
    <p style="font-size:13px;margin-bottom:16px;">Consider exporting a backup first.</p>
    <div style="display:flex;gap:10px;">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="resetApp()">Yes, delete everything</button>
    </div>
  `);
}

function resetApp() {
  localStorage.removeItem(CONFIG.storageKey);
  location.reload();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.setup !== undefined) {
        DATA = imported;
        saveData();
        closeModal();
        navigateTo('dashboard');
        openModal(`<h3 style="color:var(--green);">✓ Data imported</h3><p class="text-muted mt-1">Your data has been restored successfully.</p><button class="btn btn-ghost mt-2" onclick="closeModal()">OK</button>`);
      } else {
        openModal(`<h3 style="color:var(--red);">Invalid file</h3><p class="text-muted mt-1">This doesn't look like a valid Elena Dashboard backup.</p><button class="btn btn-ghost mt-2" onclick="closeModal()">OK</button>`);
      }
    } catch(err) {
      openModal(`<h3 style="color:var(--red);">Import failed</h3><p class="text-muted mt-1">Could not read the file. Make sure it's a valid JSON backup.</p><button class="btn btn-ghost mt-2" onclick="closeModal()">OK</button>`);
    }
  };
  reader.readAsText(file);
}

// ─────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────
function openModal(html) {
  $('modal-body').innerHTML = html;
  $('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  $('modal-overlay').classList.add('hidden');
  $('modal-body').innerHTML = '';
}

// ─────────────────────────────────────────────────────────────
// EMPTY STATE HELPER
// ─────────────────────────────────────────────────────────────
function emptyState(icon, msg) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><p>${msg}</p></div>`;
}

// ─────────────────────────────────────────────────────────────
// EXPORT — MARKDOWN (Option A)
// ─────────────────────────────────────────────────────────────
function downloadFile(filename, content, mime='text/plain') {
  const blob = new Blob([content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function exportJournalMd() {
  const lines = [`# Elena's Journal\n_Exported: ${new Date().toLocaleDateString('en-GB')}_\n`];
  [...DATA.journal].reverse().forEach(e => {
    lines.push(`## ${formatDate(e.date)} ${e.time || ''}`);
    lines.push(`**Tags:** ${e.tags.join(', ')}\n`);
    lines.push(e.text + '\n\n---\n');
  });
  downloadFile(`journal_${today()}.md`, lines.join('\n'));
}

function exportStoryIdeasMd() {
  const lines = [`# Story Ideas from Journal\n_Exported: ${new Date().toLocaleDateString('en-GB')}_\n`];
  const entries = DATA.journal.filter(e => e.tags.includes('story') || e.tags.includes('zine'));
  entries.forEach(e => {
    lines.push(`## ${formatDate(e.date)}\n${e.text}\n\n---\n`);
  });
  downloadFile(`story_ideas_${today()}.md`, lines.join('\n'));
}

function exportStoryMd(id) {
  const s = DATA.zine.stories.find(x => x.id === id);
  if (!s) return;
  const content = [
    `# ${s.title}`,
    `\n**Status:** ${s.status}`,
    `**Word Count:** ${s.wordCount || 0}`,
    s.synopsis ? `\n## Synopsis\n${s.synopsis}` : '',
    s.notes ? `\n## Notes\n${s.notes}` : ''
  ].join('\n');
  downloadFile(`${s.title.replace(/\s+/g,'_')}.md`, content);
}

function exportAllStoriesMd() {
  const lines = [`# Fragments Zine — Stories\n_Exported: ${new Date().toLocaleDateString('en-GB')}_\n`];
  DATA.zine.stories.forEach(s => {
    lines.push(`## ${s.title}`);
    lines.push(`**Status:** ${s.status} | **Words:** ${s.wordCount||0}\n`);
    if (s.synopsis) lines.push(`**Synopsis:** ${s.synopsis}\n`);
    if (s.notes) lines.push(`**Notes:** ${s.notes}\n`);
    lines.push('---\n');
  });
  downloadFile(`fragmentos_stories_${today()}.md`, lines.join('\n'));
}

function exportZineSectionMd(key, label) {
  const lines = [`# Fragments Zine — ${label}\n_Exported: ${new Date().toLocaleDateString('en-GB')}_\n`];
  DATA.zine[key].forEach(e => { lines.push(`## ${formatDate(e.date)}\n${e.text}\n\n---\n`); });
  downloadFile(`zine_${key}_${today()}.md`, lines.join('\n'));
}

function exportSpanishMd() {
  const lines = [`# Spanish Language Log\n_Exported: ${new Date().toLocaleDateString('en-GB')}_\n`];
  lines.push(`## Sessions (${DATA.spanish.sessions.length})\n`);
  [...DATA.spanish.sessions].reverse().forEach(s => {
    lines.push(`### ${formatDate(s.date)} — ${s.type}`);
    lines.push((s.notes || '') + '\n');
  });
  lines.push(`\n## Vocabulary (${DATA.spanish.vocabulary.length})\n`);
  DATA.spanish.vocabulary.forEach(v => {
    lines.push(`- **${v.spanish}** → ${v.english}${v.notes ? ` _(${v.notes})_` : ''}`);
  });
  downloadFile(`spanish_log_${today()}.md`, lines.join('\n'));
}

function exportMealsMd() {
  const lines = [`# Meal Planner Log\n_Exported: ${new Date().toLocaleDateString('en-GB')}_\n`];
  lines.push(`## Cooking Log\n`);
  [...DATA.meals.cookingLog].reverse().forEach(m => {
    lines.push(`- **${formatDate(m.date)}** — ${m.dish}${m.notes ? ` (${m.notes})` : ''}`);
  });
  lines.push(`\n## Recipe Collection (${DATA.meals.recipes.length} recipes)\n`);
  DATA.meals.recipes.forEach(r => {
    lines.push(`### ${r.title}`);
    lines.push(`${r.cuisine} · ${r.time} · Serves ${r.servings}\n`);
    lines.push(`**Ingredients:**`);
    r.ingredients.forEach(i => lines.push(`- ${i}`));
    lines.push(`\n**Method:** ${r.method}\n`);
    if (r.notes) lines.push(`_${r.notes}_\n`);
    lines.push('---\n');
  });
  downloadFile(`meal_log_${today()}.md`, lines.join('\n'));
}

function exportSingleRecipeMd(id) {
  const r = DATA.meals.recipes.find(x => x.id === id);
  if (!r) return;
  const lines = [
    `# ${r.title}`,
    `${r.cuisine} · ${r.time} · Serves ${r.servings}\n`,
    `## Ingredients`,
    ...r.ingredients.map(i => `- ${i}`),
    `\n## Method\n${r.method}`,
    r.notes ? `\n_${r.notes}_` : ''
  ];
  downloadFile(`${r.title.replace(/\s+/g,'_')}.md`, lines.join('\n'));
}

function exportShoppingListMd(ingredients) {
  const lines = [`# Shopping List\n_${new Date().toLocaleDateString('en-GB')}_\n`];
  ingredients.forEach(i => lines.push(`- [ ] ${i}`));
  downloadFile(`shopping_list_${today()}.md`, lines.join('\n'));
}

function exportHealthMd() {
  const lines = [`# Health & Fitness Log\n_Exported: ${new Date().toLocaleDateString('en-GB')}_\n`];
  lines.push(`## Crossfit Sessions (${DATA.health.crossfit.length} total)\n`);
  [...DATA.health.crossfit].sort((a,b)=>b.date.localeCompare(a.date)).forEach(s => {
    lines.push(`- ${formatDate(s.date)}${s.notes ? ': ' + s.notes : ''}`);
  });
  lines.push(`\n## Appointments\n`);
  [...DATA.health.appointments, ...DATA.health.erikaAppts]
    .sort((a,b)=>a.date.localeCompare(b.date))
    .forEach(a => lines.push(`- **${formatDate(a.date)}** ${a.time||''} — ${a.title} (${a.person})`));
  downloadFile(`health_log_${today()}.md`, lines.join('\n'));
}

function exportCalendarMd() {
  const lines = [`# Family Calendar\n_Exported: ${new Date().toLocaleDateString('en-GB')}_\n`];
  lines.push(`## Events\n`);
  [...DATA.calendar.events].sort((a,b)=>a.date.localeCompare(b.date))
    .forEach(e => lines.push(`- **${formatDate(e.date)}** — ${e.title}${e.notes ? ': ' + e.notes : ''}`));
  lines.push(`\n## Birthdays\n`);
  DATA.calendar.birthdays.forEach(b => lines.push(`- ${b.name} — ${b.day}/${b.month}`));
  downloadFile(`calendar_${today()}.md`, lines.join('\n'));
}

function exportAllMd() {
  const parts = [
    `# Elena's Life Dashboard — Full Export\n_${new Date().toLocaleDateString('en-GB')}_\n\n---\n`,
    buildJournalMd(), buildZineMd(), buildSpanishMd(),
    buildMealsMd(), buildHealthMd(), buildCalendarMd()
  ];
  downloadFile(`elena_dashboard_full_${today()}.md`, parts.join('\n\n---\n\n'));
}

function buildJournalMd() {
  const lines = ['# Journal'];
  [...DATA.journal].reverse().forEach(e => {
    lines.push(`\n## ${formatDate(e.date)} — Tags: ${e.tags.join(', ')}\n${e.text}`);
  });
  return lines.join('\n');
}
function buildZineMd() {
  const lines = ['# Fragments Zine'];
  DATA.zine.stories.forEach(s => lines.push(`\n## ${s.title}\nStatus: ${s.status}\n${s.synopsis||''}`));
  return lines.join('\n');
}
function buildSpanishMd() {
  const lines = ['# Spanish Language'];
  lines.push(`\nSessions: ${DATA.spanish.sessions.length}`);
  DATA.spanish.vocabulary.forEach(v => lines.push(`- ${v.spanish} → ${v.english}`));
  return lines.join('\n');
}
function buildMealsMd() {
  const lines = ['# Meal Planner'];
  DATA.meals.cookingLog.forEach(m => lines.push(`- ${formatDate(m.date)}: ${m.dish}`));
  return lines.join('\n');
}
function buildHealthMd() {
  const lines = ['# Health & Fitness'];
  lines.push(`Crossfit sessions: ${DATA.health.crossfit.length}`);
  return lines.join('\n');
}
function buildCalendarMd() {
  const lines = ['# Family Calendar'];
  DATA.calendar.events.forEach(e => lines.push(`- ${formatDate(e.date)}: ${e.title}`));
  DATA.calendar.birthdays.forEach(b => lines.push(`- Birthday: ${b.name} — ${b.day}/${b.month}`));
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────
// EXPORT — WORD-COMPATIBLE .doc (Option C)
// HTML-based .doc that Word opens natively
// ─────────────────────────────────────────────────────────────
function wrapDoc(title, bodyHtml) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    body { font-family: Calibri, sans-serif; font-size: 12pt; line-height: 1.6; margin: 2cm; color: #222; }
    h1 { font-size: 20pt; color: #1A2332; border-bottom: 2pt solid #D4A853; padding-bottom: 6pt; }
    h2 { font-size: 15pt; color: #243447; margin-top: 18pt; }
    h3 { font-size: 13pt; color: #2D4060; }
    .tag { background: #f0ede8; padding: 1pt 6pt; border-radius: 3pt; font-size: 10pt; margin-right: 4pt; }
    hr { border: none; border-top: 1pt solid #ccc; margin: 12pt 0; }
    .meta { font-size: 10pt; color: #666; }
  </style>
  </head><body><h1>${title}</h1>${bodyHtml}</body></html>`;
}

function exportZineSectionDoc(key, label) {
  let html = `<p class="meta">Exported: ${new Date().toLocaleDateString('en-GB')}</p>`;
  DATA.zine[key].forEach(e => {
    html += `<h2>${formatDate(e.date)}</h2><p>${e.text.replace(/\n/g,'<br>')}</p><hr>`;
  });
  downloadFile(`zine_${key}_${today()}.doc`, wrapDoc(`Fragments Zine — ${label}`, html), 'application/msword');
}

function exportAllStoriesDoc() {
  let html = `<p class="meta">Exported: ${new Date().toLocaleDateString('en-GB')}</p>`;
  DATA.zine.stories.forEach(s => {
    html += `<h2>${s.title}</h2>
      <p><strong>Status:</strong> ${s.status} | <strong>Words:</strong> ${s.wordCount||0}</p>
      ${s.synopsis ? `<p><strong>Synopsis:</strong> ${s.synopsis}</p>` : ''}
      ${s.notes ? `<p><strong>Notes:</strong> ${s.notes}</p>` : ''}
      <hr>`;
  });
  downloadFile(`fragmentos_stories_${today()}.doc`, wrapDoc('Fragments Zine — Stories', html), 'application/msword');
}

function exportSpanishDoc() {
  let html = `<p class="meta">Exported: ${new Date().toLocaleDateString('en-GB')}</p>
    <h2>Sessions</h2>`;
  [...DATA.spanish.sessions].reverse().forEach(s => {
    html += `<h3>${formatDate(s.date)} — ${s.type}</h3><p>${(s.notes||'').replace(/\n/g,'<br>')}</p>`;
  });
  html += `<h2>Vocabulary</h2><table border="1" cellpadding="4" style="border-collapse:collapse;width:100%;">
    <tr><th>Spanish</th><th>English</th><th>Notes</th></tr>
    ${DATA.spanish.vocabulary.map(v => `<tr><td>${v.spanish}</td><td>${v.english}</td><td>${v.notes||''}</td></tr>`).join('')}
  </table>`;
  downloadFile(`spanish_log_${today()}.doc`, wrapDoc('Spanish Language Log', html), 'application/msword');
}

function exportMealsDoc() {
  let html = `<p class="meta">Exported: ${new Date().toLocaleDateString('en-GB')}</p><h2>Cooking Log</h2>`;
  [...DATA.meals.cookingLog].reverse().forEach(m => {
    html += `<p><strong>${formatDate(m.date)}</strong> — ${m.dish}${m.notes ? ': ' + m.notes : ''}</p>`;
  });
  html += `<h2>Recipe Collection</h2>`;
  DATA.meals.recipes.forEach(r => {
    html += `<h3>${r.title}</h3>
      <p class="meta">${r.cuisine} · ${r.time} · Serves ${r.servings}</p>
      <p><strong>Ingredients:</strong> ${r.ingredients.join(', ')}</p>
      <p><strong>Method:</strong> ${r.method}</p>
      ${r.notes ? `<p><em>${r.notes}</em></p>` : ''}
      <hr>`;
  });
  downloadFile(`meal_planner_${today()}.doc`, wrapDoc('Meal Planner', html), 'application/msword');
}

function exportHealthDoc() {
  let html = `<p class="meta">Exported: ${new Date().toLocaleDateString('en-GB')}</p>
    <h2>Crossfit (${DATA.health.crossfit.length} sessions)</h2>
    <p>${DATA.health.crossfit.map(s => formatDate(s.date)).join(', ') || 'None yet.'}</p>
    <h2>Appointments</h2>`;
  [...DATA.health.appointments, ...DATA.health.erikaAppts]
    .sort((a,b)=>a.date.localeCompare(b.date))
    .forEach(a => {
      html += `<p><strong>${formatDate(a.date)}${a.time ? ' ' + a.time : ''}</strong> — ${a.title} (${a.person})${a.location ? ', ' + a.location : ''}</p>`;
    });
  downloadFile(`health_log_${today()}.doc`, wrapDoc('Health & Fitness', html), 'application/msword');
}

function exportJson() {
  downloadFile(`elena_backup_${today()}.json`, JSON.stringify(DATA, null, 2), 'application/json');
}

function exportAllDoc() {
  let html = `<p class="meta">Full export — ${new Date().toLocaleDateString('en-GB')}</p>`;
  html += `<h2>Journal (${DATA.journal.length} entries)</h2>`;
  [...DATA.journal].reverse().forEach(e => {
    html += `<h3>${formatDate(e.date)} — ${e.tags.join(', ')}</h3><p>${e.text.replace(/\n/g,'<br>')}</p><hr>`;
  });
  html += `<h2>Fragments Zine — Stories</h2>`;
  DATA.zine.stories.forEach(s => {
    html += `<h3>${s.title}</h3><p>Status: ${s.status} | Words: ${s.wordCount||0}</p>${s.synopsis?`<p>${s.synopsis}</p>`:''}`;
  });
  html += `<h2>Spanish Sessions</h2>`;
  [...DATA.spanish.sessions].reverse().forEach(s => {
    html += `<p><strong>${formatDate(s.date)} — ${s.type}:</strong> ${(s.notes||'').replace(/\n/g,' ')}</p>`;
  });
  html += `<h2>Meal Cooking Log</h2>`;
  [...DATA.meals.cookingLog].reverse().forEach(m => {
    html += `<p><strong>${formatDate(m.date)}</strong> — ${m.dish}</p>`;
  });
  downloadFile(`elena_dashboard_full_${today()}.doc`, wrapDoc("Elena's Dashboard — Full Export", html), 'application/msword');
}

// ─────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initAuth);
