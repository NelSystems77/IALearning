# Zero to Hero IA 🤖

Plataforma web inmersiva, mobile-first, para aprender los fundamentos del uso de la Inteligencia Artificial desde cero, sin tecnicismos, hasta ser capaz de crear automatizaciones simples. Pensada para personas de 10 a 50 años, sin conocimientos previos de computación.

## Qué incluye

- **5 mundos progresivos** ("Despertar Digital" → "Hero: Automatiza tu Vida"), con misiones cortas y prácticas.
- **Compañero robot** que saluda, celebra y anima al usuario usando su nombre.
- **Gamificación**: XP, rangos, rachas de días, insignias coleccionables y un certificado final "Hero".
- **Constructor visual de automatizaciones** ("Cuando ___, entonces la IA debe ___") sin necesidad de programar.
- **Proyecto Final (capstone)**: al completar los 5 mundos, el usuario diseña su propio proyecto real (idea propia, herramienta, automatización y una pregunta de pensamiento crítico), que queda reflejado en su certificado.
- **100% en el navegador**: sin backend ni cuentas. El progreso se guarda en el dispositivo (`localStorage`).
- **Instalable como app (PWA)**: funciona sin conexión gracias a un service worker.

## Estructura del proyecto

```
index.html          Estructura de todas las pantallas
css/styles.css       Estilos (tema robot/IA, mobile-first)
js/content.js         Currículo: mundos, misiones, insignias, rangos, frases del robot
js/state.js          Manejo del progreso (localStorage)
js/robot.js          Mascota robot en SVG con expresiones
js/app.js            Lógica de navegación e interacción
manifest.json        Configuración PWA
sw.js                Service worker (modo offline)
assets/icons/        Ícono de la app
```

## Cómo probarlo en local

No requiere instalación ni build. Solo necesitas un servidor estático simple, por ejemplo:

```bash
python3 -m http.server 8000
```

Y abre `http://localhost:8000` en tu navegador (recomendado: usar las herramientas de desarrollador en modo "móvil" para ver la experiencia mobile-first).

## Cómo publicarlo en GitHub Pages

1. Sube este repositorio a GitHub (ya está en la rama `claude/ia-learning-zero-to-hero-v8toj1`; fusiónalo a tu rama principal, por ejemplo `main`, cuando estés conforme).
2. En GitHub: **Settings → Pages**.
3. En "Build and deployment", selecciona **Deploy from a branch**.
4. Elige la rama `main` (o la que prefieras) y la carpeta `/ (root)`.
5. Guarda. GitHub te dará una URL pública (algo como `https://tuusuario.github.io/IALearning/`) en uno o dos minutos.

No se necesita ningún paso de compilación: el sitio funciona tal cual con los archivos del repositorio.

## Ideas para seguir enriqueciendo el proyecto

- Añadir más mundos avanzados (por ejemplo, "IA en el trabajo" o "Crea tu propio asistente").
- Sonidos suaves y vibración (móvil) al ganar una insignia.
- Modo de lectura en voz alta de las lecciones (usando la Web Speech API del navegador) para mayor accesibilidad.
- Selector de tamaño de texto para usuarios que lo necesiten.
- Generar el certificado final como imagen descargable/compartible.
- Panel opcional para que un mentor o familiar vea el progreso de varios perfiles en el mismo dispositivo.
