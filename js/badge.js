// Genera una insignia descargable (PNG) tipo medalla, usando <canvas>.
// Integra el robot mascota y, de forma sutil, el logo de NelSystems.

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function svgToImage(svgString) {
  const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  return loadImage(dataUrl);
}

function fitTextToWidth(ctx, text, maxWidth, startSize, fontWeight, fontFamily) {
  let size = startSize;
  ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  while (ctx.measureText(text).width > maxWidth && size > 24) {
    size -= 2;
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  }
  return size;
}

function formatBadgeDate(isoString) {
  const date = isoString ? new Date(isoString) : new Date();
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

async function generateBadgeDataUrl(state) {
  const SIZE = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  const cx = SIZE / 2;
  const FONT = "'Segoe UI', system-ui, -apple-system, Roboto, sans-serif";

  // Fondo base
  ctx.fillStyle = '#0b0f1a';
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Resplandores de color (tema robot/IA)
  ctx.globalCompositeOperation = 'lighter';
  let glow = ctx.createRadialGradient(SIZE * 0.18, SIZE * 0.1, 0, SIZE * 0.18, SIZE * 0.1, SIZE * 0.6);
  glow.addColorStop(0, 'rgba(34, 211, 238, 0.18)');
  glow.addColorStop(1, 'rgba(34, 211, 238, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);

  glow = ctx.createRadialGradient(SIZE * 0.85, SIZE * 0.12, 0, SIZE * 0.85, SIZE * 0.12, SIZE * 0.55);
  glow.addColorStop(0, 'rgba(167, 139, 250, 0.16)');
  glow.addColorStop(1, 'rgba(167, 139, 250, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.globalCompositeOperation = 'source-over';

  // Patrón sutil tipo circuito
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= SIZE; x += 54) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, SIZE); ctx.stroke();
  }
  for (let y = 0; y <= SIZE; y += 54) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(SIZE, y); ctx.stroke();
  }

  // Marco exterior elegante
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
  ctx.lineWidth = 3;
  roundRectPath(ctx, 34, 34, SIZE - 68, SIZE - 68, 36);
  ctx.stroke();

  // Medallón
  const medalCx = cx;
  const medalCy = 380;
  const medalR = 250;

  const medalFill = ctx.createRadialGradient(medalCx, medalCy - 60, 20, medalCx, medalCy, medalR);
  medalFill.addColorStop(0, '#1c2740');
  medalFill.addColorStop(1, '#0e1524');
  ctx.beginPath();
  ctx.arc(medalCx, medalCy, medalR, 0, Math.PI * 2);
  ctx.fillStyle = medalFill;
  ctx.fill();

  ctx.lineWidth = 14;
  ctx.strokeStyle = '#fbbf24';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(medalCx, medalCy, medalR - 22, 0, Math.PI * 2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.7)';
  ctx.stroke();

  // Robot mascota dentro del medallón
  const robotImg = await svgToImage(robotSVG('celebrate', { size: 300, color: '#22d3ee' }));
  const robotSize = 340;
  ctx.drawImage(robotImg, medalCx - robotSize / 2, medalCy - robotSize / 2, robotSize, robotSize);

  // Línea divisoria decorativa
  const dividerY = medalCy + medalR + 56;
  const dividerGrad = ctx.createLinearGradient(cx - 120, 0, cx + 120, 0);
  dividerGrad.addColorStop(0, 'rgba(34,211,238,0)');
  dividerGrad.addColorStop(0.5, 'rgba(251,191,36,0.8)');
  dividerGrad.addColorStop(1, 'rgba(167,139,250,0)');
  ctx.strokeStyle = dividerGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 120, dividerY);
  ctx.lineTo(cx + 120, dividerY);
  ctx.stroke();

  // Textos
  ctx.textAlign = 'center';

  ctx.fillStyle = '#fbbf24';
  ctx.font = `700 34px ${FONT}`;
  ctx.textTransform = 'uppercase';
  ctx.save();
  ctx.letterSpacing = '4px';
  ctx.fillText('HERO DE LA IA', cx, dividerY + 62);
  ctx.restore();

  const name = (state.name || 'Explorador').toUpperCase();
  const nameSize = fitTextToWidth(ctx, name, SIZE - 160, 66, 800, FONT);
  ctx.font = `800 ${nameSize}px ${FONT}`;
  ctx.fillStyle = '#eaf2ff';
  ctx.fillText(name, cx, dividerY + 138);

  ctx.font = `600 27px ${FONT}`;
  ctx.fillStyle = '#22d3ee';
  ctx.fillText('Zero to Hero IA · Certificado de Participación', cx, dividerY + 188);

  ctx.font = `400 22px ${FONT}`;
  ctx.fillStyle = '#93a2c2';
  ctx.fillText(`Completado el ${formatBadgeDate(state.heroCompletedAt)}`, cx, dividerY + 226);

  // Firma discreta: logo de NelSystems
  try {
    const logo = await loadImage('assets/icons/logo-nelsystems.png');
    const logoSize = 60;
    const footerY = SIZE - 84;
    ctx.globalAlpha = 0.92;
    ctx.drawImage(logo, cx - 92, footerY - logoSize / 2, logoSize, logoSize);
    ctx.globalAlpha = 1;
    ctx.font = `700 22px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#93a2c2';
    ctx.fillText('By NelSystems', cx - 20, footerY + 8);
  } catch (e) {
    // Si el logo no carga, la insignia se genera igual sin la firma.
  }

  return canvas.toDataURL('image/png');
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function slugify(text) {
  return (text || 'hero')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'hero';
}

async function downloadBadge(state) {
  const dataUrl = await generateBadgeDataUrl(state);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `zero-to-hero-ia-${slugify(state.name)}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
