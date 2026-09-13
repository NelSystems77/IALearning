// Manejo del progreso del usuario usando localStorage (sin cuentas ni backend).

const STORAGE_KEY = 'ialearning_progress_v1';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function defaultState() {
  return {
    name: '',
    xp: 0,
    completedMissions: [],   // ids de misiones completadas
    unlockedAchievements: [], // ids de insignias desbloqueadas
    perfectWorlds: [],        // ids de mundos completados sin fallar ninguna respuesta
    streak: 0,
    lastActiveDate: null,
    createdAt: null,
    heroProject: null,        // { idea, tool, trigger, action } del Proyecto Final
    heroProjectDone: false,
    heroCompletedAt: null     // fecha ISO en que se completó el Proyecto Final (para la insignia descargable)
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
}

// Actualiza la racha de días activos. Devuelve true si la racha avanzó hoy por primera vez.
function touchStreak(state) {
  const today = todayStr();
  if (state.lastActiveDate === today) return false;

  if (state.lastActiveDate) {
    const prev = new Date(state.lastActiveDate);
    const diffDays = Math.round((new Date(today) - prev) / (1000 * 60 * 60 * 24));
    state.streak = diffDays === 1 ? state.streak + 1 : 1;
  } else {
    state.streak = 1;
  }
  state.lastActiveDate = today;
  return true;
}

function getRank(xp) {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.min) current = rank;
  }
  return current;
}

function getNextRank(xp) {
  return RANKS.find(rank => rank.min > xp) || null;
}

function isMissionDone(state, missionId) {
  return state.completedMissions.includes(missionId);
}

function isWorldDone(state, world) {
  return world.missions.every(m => isMissionDone(state, m.id));
}

function isWorldUnlocked(state, worldIndex) {
  if (worldIndex === 0) return true;
  const prevWorld = CONTENT.worlds[worldIndex - 1];
  return isWorldDone(state, prevWorld);
}

function allWorldsDone(state) {
  return CONTENT.worlds.every(w => isWorldDone(state, w));
}
