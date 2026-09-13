// Lógica principal de la aplicación: navegación entre pantallas y renderizado.

let state = loadState();
let currentWorldId = null;
let currentMissionId = null;

function $(id) { return document.getElementById(id); }

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo(0, 0);
}

function setActiveNav(name) {
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.nav === name);
  });
}

function findWorld(worldId) {
  return CONTENT.worlds.find(w => w.id === worldId);
}
function findMission(worldId, missionId) {
  const world = findWorld(worldId);
  return world ? world.missions.find(m => m.id === missionId) : null;
}

// ---------------- ONBOARDING ----------------

function initOnboarding() {
  renderRobot($('onboarding-robot'), 'happy', { size: 100, bounce: true });
  $('btn-start').addEventListener('click', handleStart);
  $('input-name').addEventListener('keydown', e => { if (e.key === 'Enter') handleStart(); });
}

function handleStart() {
  const name = $('input-name').value.trim();
  if (!name) {
    $('input-name').focus();
    return;
  }
  state.name = name.slice(0, 24);
  state.createdAt = state.createdAt || new Date().toISOString();
  unlockAchievement('b_start', false);
  touchStreak(state);
  saveState(state);
  $('bottom-nav').style.display = 'block';
  goToMap();
}

// ---------------- MAPA ----------------

function goToMap() {
  renderMap();
  setActiveNav('map');
  showScreen('screen-map');
}

function renderMap() {
  $('map-greeting').textContent = `¡Hola, ${state.name}!`;
  $('map-streak').textContent = `🔥 ${state.streak} día${state.streak === 1 ? '' : 's'}`;
  $('map-xp-pill').textContent = `⚡ ${state.xp} XP`;
  renderRobot($('map-robot'), 'happy', { size: 46 });
  $('map-robot-tip').textContent = robotSay('idle', state.name);

  const rank = getRank(state.xp);
  const nextRank = getNextRank(state.xp);
  $('map-rank-name').textContent = `${rank.icon} ${rank.name}`;
  if (nextRank) {
    $('map-rank-next').textContent = `${state.xp}/${nextRank.min} XP`;
    const span = nextRank.min - rank.min;
    const progressed = state.xp - rank.min;
    $('map-xp-fill').style.width = Math.min(100, Math.round((progressed / span) * 100)) + '%';
  } else {
    $('map-rank-next').textContent = 'Rango máximo';
    $('map-xp-fill').style.width = '100%';
  }

  const listEl = $('world-list');
  listEl.innerHTML = '';
  CONTENT.worlds.forEach((world, idx) => {
    const unlocked = isWorldUnlocked(state, idx);
    const done = isWorldDone(state, world);
    const completedCount = world.missions.filter(m => isMissionDone(state, m.id)).length;
    const pct = Math.round((completedCount / world.missions.length) * 100);

    const card = document.createElement('div');
    card.className = `world-card ${unlocked ? '' : 'locked'} ${done ? 'done' : ''}`;
    card.innerHTML = `
      <div class="world-icon" style="background:${world.color}22; color:${world.color}">${world.icon}</div>
      <div class="world-info">
        <h3>${world.title}</h3>
        <p class="muted">${world.subtitle}</p>
        <div class="progress-mini-track"><div class="progress-mini-fill" style="width:${pct}%; background:${world.color}"></div></div>
      </div>
      <div>${done ? '<span class="check-icon">✅</span>' : (unlocked ? '' : '<span class="lock-icon">🔒</span>')}</div>
    `;
    if (unlocked) {
      card.addEventListener('click', () => goToWorld(world.id));
    }
    listEl.appendChild(card);
  });

  const certSlot = $('certificate-card-slot');
  certSlot.innerHTML = '';
  if (allWorldsDone(state) && !state.heroProjectDone) {
    const card = document.createElement('div');
    card.className = 'world-card';
    card.style.borderColor = 'var(--amber)';
    card.innerHTML = `
      <div class="world-icon" style="background:#fbbf2422; color:#fbbf24">🚀</div>
      <div class="world-info">
        <h3>Proyecto Final</h3>
        <p class="muted">¡Completaste los 5 mundos! Crea tu propio proyecto para recibir tu certificado.</p>
      </div>`;
    card.addEventListener('click', goToProject);
    certSlot.appendChild(card);
  } else if (state.heroProjectDone) {
    const card = document.createElement('div');
    card.className = 'world-card';
    card.style.borderColor = 'var(--amber)';
    card.innerHTML = `
      <div class="world-icon" style="background:#fbbf2422; color:#fbbf24">🏆</div>
      <div class="world-info">
        <h3>Tu Certificado Hero</h3>
        <p class="muted">¡Ya lo desbloqueaste! Tócalo para verlo.</p>
      </div>`;
    card.addEventListener('click', goToCertificate);
    certSlot.appendChild(card);
  }
}

// ---------------- MUNDO ----------------

function goToWorld(worldId) {
  currentWorldId = worldId;
  renderWorld(worldId);
  showScreen('screen-world');
}

function renderWorld(worldId) {
  const world = findWorld(worldId);
  $('world-title').textContent = `${world.icon} ${world.title}`;
  $('world-subtitle').textContent = world.subtitle;

  const completedCount = world.missions.filter(m => isMissionDone(state, m.id)).length;
  const pct = Math.round((completedCount / world.missions.length) * 100);
  $('world-progress-fill').style.width = pct + '%';

  const listEl = $('mission-list');
  listEl.innerHTML = '';
  world.missions.forEach((mission, idx) => {
    const done = isMissionDone(state, mission.id);
    const item = document.createElement('div');
    item.className = `mission-item ${done ? 'done' : ''}`;
    item.innerHTML = `
      <div class="num">${done ? '✓' : idx + 1}</div>
      <div class="title">${mission.title}</div>
      <div class="xp-tag">+${mission.xp} XP</div>
    `;
    item.addEventListener('click', () => goToMission(worldId, mission.id));
    listEl.appendChild(item);
  });
}

$('btn-world-back').addEventListener('click', goToMap);

// ---------------- MISIÓN ----------------

function goToMission(worldId, missionId) {
  currentWorldId = worldId;
  currentMissionId = missionId;
  renderMission(worldId, missionId);
  showScreen('screen-mission');
}

function renderMission(worldId, missionId) {
  const mission = findMission(worldId, missionId);
  $('mission-title').textContent = mission.title;
  renderRobot($('mission-robot'), 'neutral', { size: 46 });

  $('mission-content').innerHTML = mission.content.map(p => `<p>${p}</p>`).join('');

  const interactive = $('mission-interactive');
  interactive.innerHTML = '';

  if (mission.type === 'builder') {
    renderBuilder(interactive, worldId, mission);
  } else {
    renderQuiz(interactive, worldId, mission);
  }
}

$('btn-mission-back').addEventListener('click', () => goToWorld(currentWorldId));

function renderQuiz(container, worldId, mission) {
  const quiz = mission.quiz;
  const box = document.createElement('div');
  box.innerHTML = `<h3 style="margin-top:18px;">${quiz.question}</h3>`;
  const optionsEl = document.createElement('div');
  optionsEl.className = 'quiz-options';

  quiz.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleQuizAnswer(worldId, mission, i, optionsEl));
    optionsEl.appendChild(btn);
  });

  box.appendChild(optionsEl);
  const feedback = document.createElement('div');
  feedback.id = 'quiz-feedback';
  box.appendChild(feedback);
  container.appendChild(box);
}

function handleQuizAnswer(worldId, mission, chosenIndex, optionsEl) {
  const quiz = mission.quiz;
  const buttons = optionsEl.querySelectorAll('.quiz-option');
  const isCorrect = chosenIndex === quiz.correctIndex;

  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === quiz.correctIndex) b.classList.add('correct');
    else if (i === chosenIndex) b.classList.add('incorrect');
  });

  const already = isMissionDone(state, mission.id);
  const feedback = $('quiz-feedback');

  if (isCorrect) {
    renderRobot($('mission-robot'), 'celebrate', { size: 46 });
    feedback.innerHTML = `
      <div class="feedback-box correct">
        <p style="margin:0 0 6px;"><b>${robotSay('correct', state.name)}</b></p>
        <p class="muted" style="margin:0;">${quiz.explanation}</p>
      </div>
      <button class="btn" id="btn-continue" style="margin-top:14px;">Continuar</button>
    `;
    if (!already) {
      awardXP(mission);
    }
    $('btn-continue').addEventListener('click', () => finishMissionFlow(worldId, mission.id));
  } else {
    if (!state.everMissed) state.everMissed = [];
    if (!state.everMissed.includes(mission.id)) state.everMissed.push(mission.id);
    saveState(state);
    renderRobot($('mission-robot'), 'oops', { size: 46 });
    feedback.innerHTML = `
      <div class="feedback-box incorrect">
        <p style="margin:0;"><b>${robotSay('incorrect', state.name)}</b></p>
      </div>
      <button class="btn secondary" id="btn-retry" style="margin-top:14px;">Intentar de nuevo</button>
    `;
    $('btn-retry').addEventListener('click', () => renderMission(worldId, mission.id));
  }
}

function renderBuilder(container, worldId, mission) {
  const b = mission.builder;
  const box = document.createElement('div');
  box.className = 'builder-box';
  box.innerHTML = `
    <label class="muted" style="font-size:13px;">${b.triggerLabel}</label>
    <select id="builder-trigger">${b.triggers.map(t => `<option>${t}</option>`).join('')}</select>
    <label class="muted" style="font-size:13px;">${b.actionLabel}</label>
    <select id="builder-action">${b.actions.map(a => `<option>${a}</option>`).join('')}</select>
    <div class="builder-sentence" id="builder-sentence"></div>
    <button class="btn" id="btn-builder-confirm" style="margin-top:14px;">Guardar mi automatización ⚡</button>
  `;
  container.appendChild(box);

  const triggerSel = $('builder-trigger');
  const actionSel = $('builder-action');
  const sentenceEl = $('builder-sentence');

  function updateSentence() {
    sentenceEl.innerHTML = `${b.triggerLabel} <b>${triggerSel.value}</b>, ${b.actionLabel} <b>${actionSel.value}</b>.`;
  }
  triggerSel.addEventListener('change', updateSentence);
  actionSel.addEventListener('change', updateSentence);
  updateSentence();

  $('btn-builder-confirm').addEventListener('click', () => {
    const already = isMissionDone(state, mission.id);
    renderRobot($('mission-robot'), 'celebrate', { size: 46 });
    const feedback = document.createElement('div');
    feedback.innerHTML = `
      <div class="feedback-box correct">
        <p style="margin:0;"><b>${robotSay('correct', state.name)}</b> Tu automatización quedó lista.</p>
      </div>
      <button class="btn" id="btn-continue" style="margin-top:14px;">Continuar</button>
    `;
    container.appendChild(feedback);
    $('btn-builder-confirm').disabled = true;
    if (!already) awardXP(mission);
    $('btn-continue').addEventListener('click', () => finishMissionFlow(worldId, mission.id));
  });
}

function awardXP(mission) {
  state.xp += mission.xp;
  state.completedMissions.push(mission.id);
  saveState(state);
}

function finishMissionFlow(worldId, missionId) {
  const world = findWorld(worldId);

  if (isWorldDone(state, world)) {
    const badgeNewlyUnlocked = unlockAchievement(world.badge.id, false);
    const perfect = world.missions.every(m => !(state.everMissed || []).includes(m.id));
    let perfectNewly = false;
    if (perfect) perfectNewly = unlockAchievement('b_perfect', false);
    saveState(state);

    if (allWorldsDone(state)) {
      saveState(state);
      goToWorld(worldId);
      showToast('🚀', '¡Completaste los 5 mundos!', `${state.name}, ahora te espera tu Proyecto Final. Búscalo en la pantalla de inicio.`);
      return;
    }

    if (badgeNewlyUnlocked) {
      goToWorld(worldId);
      showToast(world.badge.icon, `¡Insignia desbloqueada: ${world.badge.name}!`, robotSay('celebrateWorld', state.name));
      return;
    }
    if (perfectNewly) {
      goToWorld(worldId);
      showToast('🎯', '¡Mente Perfecta!', 'Respondiste todo bien a la primera en este mundo.');
      return;
    }
  }

  goToWorld(worldId);
}

// ---------------- LOGROS ----------------

function renderAchievements() {
  const grid = $('badge-grid');
  grid.innerHTML = '';
  const worldBadges = CONTENT.worlds.map(w => w.badge);
  const all = [...SPECIAL_ACHIEVEMENTS.filter(a => a.id !== 'b_hero'), ...worldBadges, SPECIAL_ACHIEVEMENTS.find(a => a.id === 'b_hero')];

  all.forEach(badge => {
    const unlocked = state.unlockedAchievements.includes(badge.id);
    const el = document.createElement('div');
    el.className = `badge ${unlocked ? '' : 'locked'}`;
    el.innerHTML = `<span class="icon">${badge.icon}</span><span class="name">${badge.name}</span>`;
    el.title = badge.description;
    grid.appendChild(el);
  });
}

function unlockAchievement(id, silent) {
  if (state.unlockedAchievements.includes(id)) return false;
  state.unlockedAchievements.push(id);
  saveState(state);
  return true;
}

// ---------------- PERFIL ----------------

function renderProfile() {
  const rank = getRank(state.xp);
  renderRobot($('profile-robot'), 'neutral', { size: 46 });
  $('profile-rank-line').textContent = `${state.name}, actualmente eres ${rank.icon} ${rank.name}.`;
  $('profile-xp').textContent = state.xp;
  $('profile-missions').textContent = state.completedMissions.length;
  $('profile-streak').textContent = state.streak;
  $('input-name-edit').value = state.name;
}

$('btn-save-name').addEventListener('click', () => {
  const newName = $('input-name-edit').value.trim();
  if (!newName) return;
  state.name = newName.slice(0, 24);
  saveState(state);
  renderProfile();
  showToast('✅', 'Nombre actualizado', `Ahora te llamaré ${state.name}.`);
});

$('btn-reset').addEventListener('click', () => {
  const ok = confirm('¿Seguro que quieres borrar todo tu progreso? Esta acción no se puede deshacer.');
  if (!ok) return;
  resetState();
  state = loadState();
  $('bottom-nav').style.display = 'none';
  showScreen('screen-onboarding');
});

// ---------------- PROYECTO FINAL ----------------

function goToProject() {
  renderProject();
  showScreen('screen-project');
}
$('btn-project-back').addEventListener('click', goToMap);

function renderProject() {
  renderRobot($('project-robot'), state.heroProjectDone ? 'celebrate' : 'thinking', { size: 46 });
  $('project-intro').textContent = state.heroProjectDone
    ? `${state.name}, este es el proyecto que diseñaste. ¡Excelente trabajo!`
    : `Cuéntame, ${state.name}: si pudieras pedirle ayuda a una IA para algo de tu vida real, ¿qué sería?`;

  const container = $('project-form');
  container.innerHTML = '';

  if (state.heroProjectDone && state.heroProject) {
    const p = state.heroProject;
    container.innerHTML = `
      <div class="builder-box">
        <p class="muted" style="font-size:12px; margin-bottom:2px;">TU IDEA</p>
        <p>${escapeHtml(p.idea)}</p>
        <p class="muted" style="font-size:12px; margin-bottom:2px;">HERRAMIENTA ELEGIDA</p>
        <p>${escapeHtml(p.tool)}</p>
        <div class="builder-sentence">Cuando... <b>${escapeHtml(p.trigger)}</b>, entonces la IA debe... <b>${escapeHtml(p.action)}</b>.</div>
      </div>
      <button class="btn" id="btn-project-to-cert" style="margin-top:14px;">Ver mi certificado 🏆</button>
    `;
    $('btn-project-to-cert').addEventListener('click', goToCertificate);
    return;
  }

  const fp = FINAL_PROJECT;
  container.innerHTML = `
    <div class="builder-box">
      <label class="muted" style="font-size:13px;">Tu idea (escribe libremente):</label>
      <textarea id="project-idea" placeholder="${escapeHtml(fp.ideaPlaceholder)}"></textarea>

      <label class="muted" style="font-size:13px;">¿Qué tipo de herramienta de IA usarías?</label>
      <select id="project-tool">${fp.toolOptions.map(o => `<option>${o}</option>`).join('')}</select>

      <label class="muted" style="font-size:13px;">Cuando...</label>
      <select id="project-trigger">${fp.triggers.map(t => `<option>${t}</option>`).join('')}</select>
      <label class="muted" style="font-size:13px;">entonces la IA debe...</label>
      <select id="project-action">${fp.actions.map(a => `<option>${a}</option>`).join('')}</select>

      <div class="builder-sentence" id="project-sentence"></div>
      <button class="btn" id="btn-project-continue" style="margin-top:14px;">Continuar a la reflexión final</button>
    </div>
    <div id="project-reflection"></div>
  `;

  const triggerSel = $('project-trigger');
  const actionSel = $('project-action');
  const sentenceEl = $('project-sentence');
  function updateSentence() {
    sentenceEl.innerHTML = `Cuando... <b>${triggerSel.value}</b>, entonces la IA debe... <b>${actionSel.value}</b>.`;
  }
  triggerSel.addEventListener('change', updateSentence);
  actionSel.addEventListener('change', updateSentence);
  updateSentence();

  $('btn-project-continue').addEventListener('click', () => {
    const idea = $('project-idea').value.trim();
    if (idea.length < 5) {
      $('project-idea').focus();
      renderRobot($('project-robot'), 'oops', { size: 46 });
      $('project-intro').textContent = `${state.name}, cuéntame con un poco más de detalle tu idea antes de seguir.`;
      return;
    }
    $('btn-project-continue').disabled = true;
    renderProjectReflection();
  });
}

function renderProjectReflection() {
  const r = FINAL_PROJECT.reflection;
  const box = $('project-reflection');
  box.innerHTML = `
    <div class="speech-bubble" style="margin-top:16px;">
      <h3 style="margin-top:0;">${r.question}</h3>
      <div class="quiz-options" id="project-reflection-options"></div>
      <div id="project-reflection-feedback"></div>
    </div>
  `;
  const optionsEl = $('project-reflection-options');
  r.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleProjectReflectionAnswer(i, optionsEl));
    optionsEl.appendChild(btn);
  });
  box.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function handleProjectReflectionAnswer(chosenIndex, optionsEl) {
  const r = FINAL_PROJECT.reflection;
  const isCorrect = chosenIndex === r.correctIndex;
  const buttons = optionsEl.querySelectorAll('.quiz-option');
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === r.correctIndex) b.classList.add('correct');
    else if (i === chosenIndex) b.classList.add('incorrect');
  });
  const feedback = $('project-reflection-feedback');
  if (isCorrect) {
    renderRobot($('project-robot'), 'celebrate', { size: 46 });
    feedback.innerHTML = `
      <p style="margin:10px 0 0;"><b>${robotSay('correct', state.name)}</b> Ese es justo el pensamiento crítico de un buen Hero de la IA.</p>
      <button class="btn" id="btn-project-finish" style="margin-top:14px;">Finalizar mi Proyecto Final 🚀</button>
    `;
    $('btn-project-finish').addEventListener('click', finishProject);
  } else {
    renderRobot($('project-robot'), 'oops', { size: 46 });
    feedback.innerHTML = `
      <p style="margin:10px 0 0;"><b>${robotSay('incorrect', state.name)}</b></p>
      <button class="btn secondary" id="btn-reflection-retry" style="margin-top:14px;">Intentar de nuevo</button>
    `;
    $('btn-reflection-retry').addEventListener('click', renderProjectReflection);
  }
}

function finishProject() {
  const idea = $('project-idea').value.trim();
  const tool = $('project-tool').value;
  const trigger = $('project-trigger').value;
  const action = $('project-action').value;

  state.heroProject = { idea, tool, trigger, action };
  state.heroProjectDone = true;
  state.heroCompletedAt = state.heroCompletedAt || new Date().toISOString();
  state.xp += FINAL_PROJECT.xp;
  unlockAchievement('b_project', false);
  unlockAchievement('b_hero', false);
  saveState(state);

  showToast('🚀', '¡Proyecto Final completado!', robotSay('celebrateProject', state.name));
  renderProject();
}

// ---------------- CERTIFICADO ----------------

function goToCertificate() {
  $('cert-name').textContent = state.name;
  const box = $('cert-project-box');
  if (state.heroProject) {
    const p = state.heroProject;
    box.innerHTML = `
      <div class="builder-box" style="text-align:left; margin-top:16px;">
        <p class="muted" style="font-size:12px; margin-bottom:4px;">SU PROYECTO FINAL</p>
        <p style="margin:0 0 8px;">${escapeHtml(p.idea)}</p>
        <div class="builder-sentence">Cuando... <b>${escapeHtml(p.trigger)}</b>, entonces la IA debe... <b>${escapeHtml(p.action)}</b>.</div>
      </div>`;
  } else {
    box.innerHTML = '';
  }
  showScreen('screen-certificate');
}
$('btn-cert-back').addEventListener('click', goToMap);

$('btn-cert-share').addEventListener('click', async () => {
  const text = `¡Completé Zero to Hero IA y ahora soy un Hero de la Inteligencia Artificial! 🏆🤖`;
  if (navigator.share) {
    try { await navigator.share({ text }); } catch (e) { /* usuario canceló */ }
  } else {
    try {
      await navigator.clipboard.writeText(text);
      showToast('📋', 'Copiado', 'El mensaje se copió, ¡pégalo donde quieras compartirlo!');
    } catch (e) {
      showToast('🎉', 'Compártelo', text);
    }
  }
});

$('btn-copy-sinpe').addEventListener('click', async () => {
  const sinpeNumber = '87409343';
  const btn = $('btn-copy-sinpe');
  const originalLabel = btn.textContent;
  try {
    await navigator.clipboard.writeText(sinpeNumber);
    btn.textContent = '¡Copiado! ✅';
  } catch (e) {
    btn.textContent = sinpeNumber;
  }
  setTimeout(() => { btn.textContent = originalLabel; }, 2000);
});

$('btn-download-badge').addEventListener('click', async () => {
  const btn = $('btn-download-badge');
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Generando insignia...';
  try {
    await downloadBadge(state);
  } catch (e) {
    showToast('😕', 'No se pudo generar la insignia', 'Intenta de nuevo en unos segundos.');
  }
  btn.disabled = false;
  btn.textContent = originalLabel;
});

// ---------------- TOAST ----------------

function showToast(icon, title, message) {
  $('toast-icon').textContent = icon;
  $('toast-title').textContent = title;
  $('toast-message').textContent = message;
  $('toast-overlay').classList.add('active');
}
$('toast-close').addEventListener('click', () => $('toast-overlay').classList.remove('active'));

// ---------------- NAV INFERIOR ----------------

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.nav;
    setActiveNav(view);
    if (view === 'map') { renderMap(); showScreen('screen-map'); }
    if (view === 'achievements') { renderAchievements(); showScreen('screen-achievements'); }
    if (view === 'profile') { renderProfile(); showScreen('screen-profile'); }
  });
});

// ---------------- ARRANQUE ----------------

function boot() {
  initOnboarding();
  if (state.name) {
    touchStreak(state);
    saveState(state);
    $('bottom-nav').style.display = 'block';
    goToMap();
  } else {
    showScreen('screen-onboarding');
  }
}

boot();
