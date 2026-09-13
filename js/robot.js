// Generador del robot mascota en SVG con distintas expresiones.
// Usamos solo formas simples (rect/circle/path) para que sea liviano y fácil de mantener.

function robotSVG(expression = 'neutral', options = {}) {
  const size = options.size || 84;
  const color = options.color || '#22d3ee';
  const bounce = options.bounce ? 'robot-bounce' : '';

  let mouth = '<rect x="34" y="62" width="16" height="4" rx="2" fill="#0b0f1a"/>'; // neutral
  let eyeShapeLeft = '<circle class="robot-eye" cx="32" cy="46" r="5" fill="#0b0f1a"/>';
  let eyeShapeRight = '<circle class="robot-eye" cx="52" cy="46" r="5" fill="#0b0f1a"/>';
  let cheeks = '';

  if (expression === 'happy' || expression === 'celebrate') {
    mouth = '<path d="M32 60 Q42 72 52 60" stroke="#0b0f1a" stroke-width="4" fill="none" stroke-linecap="round"/>';
    cheeks = '<circle cx="24" cy="56" r="4" fill="#f472b6" opacity="0.6"/><circle cx="60" cy="56" r="4" fill="#f472b6" opacity="0.6"/>';
  }
  if (expression === 'celebrate') {
    eyeShapeLeft = '<path d="M27 46 Q32 40 37 46" stroke="#0b0f1a" stroke-width="4" fill="none" stroke-linecap="round"/>';
    eyeShapeRight = '<path d="M47 46 Q52 40 57 46" stroke="#0b0f1a" stroke-width="4" fill="none" stroke-linecap="round"/>';
  }
  if (expression === 'thinking') {
    mouth = '<circle cx="42" cy="63" r="3" fill="#0b0f1a"/>';
    eyeShapeRight = '<rect x="48" y="44" width="10" height="4" rx="2" fill="#0b0f1a"/>';
  }
  if (expression === 'oops') {
    mouth = '<path d="M32 66 Q42 56 52 66" stroke="#0b0f1a" stroke-width="4" fill="none" stroke-linecap="round"/>';
    eyeShapeLeft = '<rect x="27" y="44" width="10" height="4" rx="2" fill="#0b0f1a"/>';
    eyeShapeRight = '<rect x="47" y="44" width="10" height="4" rx="2" fill="#0b0f1a"/>';
  }

  return `
  <svg class="robot ${bounce}" width="${size}" height="${size}" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Robot compañero">
    <line x1="42" y1="8" x2="42" y2="18" stroke="${color}" stroke-width="3"/>
    <circle class="robot-antenna-tip" cx="42" cy="6" r="4" fill="${color}"/>
    <rect x="10" y="18" width="64" height="52" rx="18" fill="#161e2e" stroke="${color}" stroke-width="3"/>
    <rect x="18" y="28" width="48" height="34" rx="12" fill="#0e1524"/>
    ${eyeShapeLeft}
    ${eyeShapeRight}
    ${cheeks}
    ${mouth}
    <rect x="2" y="38" width="8" height="14" rx="4" fill="${color}" opacity="0.85"/>
    <rect x="74" y="38" width="8" height="14" rx="4" fill="${color}" opacity="0.85"/>
  </svg>`;
}

function renderRobot(containerEl, expression, options) {
  if (containerEl) containerEl.innerHTML = robotSVG(expression, options);
}
