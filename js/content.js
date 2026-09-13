// Contenido del curso: mundos, misiones, insignias, rangos y frases del robot.
// Todo en un solo objeto para que sea fácil de leer y ampliar.

const CONTENT = {
  worlds: [
    {
      id: 'w1',
      order: 1,
      title: 'Despertar Digital',
      subtitle: 'Tus primeros pasos con la IA',
      icon: '🤖',
      color: '#22d3ee',
      badge: { id: 'b_w1', name: 'Primer Contacto', icon: '🥇', description: 'Diste tus primeros pasos en el mundo de la IA.' },
      missions: [
        {
          id: 'w1m1',
          title: '¿Qué es la Inteligencia Artificial?',
          xp: 10,
          content: [
            'Imagina un ayudante que ha leído muchísimos libros, artículos y conversaciones, y que aprendió a reconocer patrones en todo eso.',
            'Cuando le preguntas algo, no "piensa" como una persona: predice, palabra por palabra, cuál es la mejor forma de responderte según todo lo que aprendió.',
            'Eso es, en pocas palabras, la Inteligencia Artificial (IA): un programa entrenado con muchísima información para ayudarte a escribir, resolver dudas, crear imágenes y mucho más.'
          ],
          quiz: {
            question: 'En palabras simples, ¿qué hace una IA cuando le escribes algo?',
            options: [
              'Piensa exactamente igual que un humano',
              'Predice la mejor respuesta según todo lo que aprendió antes',
              'Busca la respuesta en internet en ese instante, siempre',
              'Adivina al azar sin ningún criterio'
            ],
            correctIndex: 1,
            explanation: 'Exacto: la IA no "piensa" como nosotros, sino que predice la respuesta más probable y útil según lo que aprendió.'
          }
        },
        {
          id: 'w1m2',
          title: '¿Ya usas IA sin darte cuenta?',
          xp: 10,
          content: [
            'La IA lleva años en tu bolsillo, aunque no la veas: cuando el teléfono te corrige una palabra mal escrita, cuando una app te recomienda un video o una canción, o cuando el mapa te sugiere la ruta más rápida.',
            'La diferencia con los asistentes de IA modernos (como los chats de IA) es que ahora puedes hablarles directamente, con tus propias palabras, y pedirles casi cualquier cosa.'
          ],
          quiz: {
            question: '¿Cuál de estos es un ejemplo de IA que probablemente ya usas?',
            options: [
              'El corrector ortográfico de tu teléfono',
              'Un reloj de pared común',
              'Una calculadora de bolsillo básica',
              'Un libro de papel'
            ],
            correctIndex: 0,
            explanation: '¡Así es! El corrector, las recomendaciones y los mapas ya usan IA para ayudarte todos los días.'
          }
        },
        {
          id: 'w1m3',
          title: 'Tu primera instrucción (prompt)',
          xp: 15,
          content: [
            'Cuando le escribes algo a una IA, a ese mensaje se le llama "instrucción" o "prompt". Es simplemente pedirle algo, como se lo pedirías a una persona muy dispuesta a ayudar.',
            'El secreto para obtener buenas respuestas es ser claro y específico. No es lo mismo decir "escríbeme algo" que "escríbeme un mensaje corto para felicitar a mi amigo por su cumpleaños".',
            'Mientras más detalles útiles le des, mejor será la respuesta que recibas.'
          ],
          quiz: {
            question: '¿Cuál de estas instrucciones le dará mejores resultados a una IA?',
            options: [
              '"Ayúdame"',
              '"Escríbeme un mensaje corto y alegre para felicitar a mi mamá por su cumpleaños"',
              '"Cosas"',
              '"Haz algo bonito"'
            ],
            correctIndex: 1,
            explanation: 'Correcto: entre más clara y específica sea tu instrucción, mejor entenderá la IA lo que necesitas.'
          }
        },
        {
          id: 'w1m4',
          title: 'Práctica: tu primer mensaje',
          xp: 15,
          content: [
            'Antes de seguir, hagamos un ejercicio mental. Piensa en algo pequeño que te gustaría pedirle a una IA: una idea para un regalo, una explicación sencilla de un tema, o una lista de tareas para tu día.',
            'Ahora imagina cómo lo escribirías siendo claro y específico, como aprendiste en la misión anterior.'
          ],
          quiz: {
            question: 'Quieres pedirle ideas de regalo a una IA. ¿Qué instrucción es la más específica?',
            options: [
              '"Dame ideas"',
              '"Regalo"',
              '"Dame 3 ideas de regalo económico para mi hermana de 12 años a la que le gusta dibujar"',
              '"Necesito ayuda con algo"'
            ],
            correctIndex: 2,
            explanation: '¡Perfecto! Contarle a quién es el regalo, su edad, sus gustos y tu presupuesto ayuda muchísimo a la IA.'
          }
        }
      ]
    },
    {
      id: 'w2',
      order: 2,
      title: 'Ayudante Cotidiano',
      subtitle: 'La IA en tu vida diaria',
      icon: '🧰',
      color: '#38bdf8',
      badge: { id: 'b_w2', name: 'Asistente de Bolsillo', icon: '🎒', description: 'Aprendiste a usar la IA en tu día a día.' },
      missions: [
        {
          id: 'w2m1',
          title: 'Pide ayuda para escribir',
          xp: 10,
          content: [
            'Una de las cosas que mejor hace la IA es ayudarte a escribir: mensajes, cartas, correos, publicaciones o hasta un discurso.',
            'Puedes pedirle que te ayude desde cero, o darle algo que ya escribiste para que lo mejore o lo haga más corto, más formal o más divertido.'
          ],
          quiz: {
            question: 'Ya escribiste un mensaje pero suena muy serio. ¿Qué le pedirías a la IA?',
            options: [
              'Que borre el mensaje sin decir nada',
              'Que lo reescriba con un tono más relajado y amigable',
              'Que lo traduzca a otro idioma sin razón',
              'Nada, dejarlo igual aunque no te guste'
            ],
            correctIndex: 1,
            explanation: '¡Así es! Puedes pedirle a la IA que ajuste el tono de un texto que ya tienes.'
          }
        },
        {
          id: 'w2m2',
          title: 'Aprende cualquier tema, a tu manera',
          xp: 10,
          content: [
            'Si algo no lo entiendes, puedes pedirle a la IA que te lo explique más fácil, con ejemplos, o "como si tuvieras 10 años".',
            'Esto es muy útil para aprender temas nuevos sin sentirte perdido, a tu propio ritmo.'
          ],
          quiz: {
            question: 'No entiendes un tema de tu trabajo o estudio. ¿Qué puedes pedirle a la IA?',
            options: [
              'Que lo explique con palabras aún más difíciles',
              'Nada, es mejor rendirse',
              'Que te lo explique de forma simple, con un ejemplo de la vida real',
              'Que invente información sin verificarla'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! Pedir ejemplos sencillos es una gran forma de aprender con IA.'
          }
        },
        {
          id: 'w2m3',
          title: 'Organiza tu día con ayuda de la IA',
          xp: 10,
          content: [
            'Puedes contarle a la IA las tareas que tienes pendientes y pedirle que te ayude a ordenarlas por importancia, o a armar un plan sencillo para tu semana.',
            'No tomará las decisiones por ti, pero te da un buen punto de partida para organizarte.'
          ],
          quiz: {
            question: '¿Para qué te puede servir contarle tus pendientes a una IA?',
            options: [
              'Para que te ayude a ordenarlos y armar un plan',
              'Para que los memorice y luego los olvide',
              'No sirve para nada',
              'Solo para tareas de matemáticas'
            ],
            correctIndex: 0,
            explanation: '¡Correcto! Es un gran apoyo para organizar tareas y prioridades.'
          }
        },
        {
          id: 'w2m4',
          title: 'El arte de dar contexto',
          xp: 15,
          content: [
            '"Contexto" es toda la información extra que le das a la IA para que entienda mejor tu situación: quién eres, para qué lo necesitas, o qué estilo prefieres.',
            'Por ejemplo, no es lo mismo pedir "escribe un correo" que "escribe un correo formal para pedir un día libre en mi trabajo, explicando que tengo una cita médica".'
          ],
          quiz: {
            question: '¿Qué es dar "contexto" a una IA?',
            options: [
              'Escribir instrucciones muy cortas siempre',
              'Darle información extra útil sobre tu situación',
              'Repetir la misma pregunta muchas veces',
              'Hablarle en otro idioma'
            ],
            correctIndex: 1,
            explanation: '¡Muy bien! Dar contexto ayuda a que la IA entienda exactamente lo que necesitas.'
          }
        }
      ]
    },
    {
      id: 'w3',
      order: 3,
      title: 'Piensa Antes de Creer',
      subtitle: 'Usa la IA con criterio',
      icon: '🕵️',
      color: '#a78bfa',
      badge: { id: 'b_w3', name: 'Detective Digital', icon: '🔍', description: 'Aprendiste a usar la IA con pensamiento crítico.' },
      missions: [
        {
          id: 'w3m1',
          title: 'La IA también se equivoca',
          xp: 10,
          content: [
            'A veces la IA responde con mucha seguridad... pero se equivoca. A esto se le llama "alucinación": cuando inventa datos, nombres o hechos que suenan reales pero no lo son.',
            'Por eso, para temas importantes (salud, dinero, leyes), siempre conviene verificar la información con otra fuente confiable.'
          ],
          quiz: {
            question: '¿Qué deberías hacer si la IA te da un dato importante que no puedes verificar?',
            options: [
              'Creerlo sin dudar porque lo dijo una IA',
              'Verificarlo con otra fuente confiable antes de actuar',
              'Ignorarlo siempre, sin importar el tema',
              'Compartirlo de inmediato con todos'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! Verificar información importante es un hábito clave al usar IA.'
          }
        },
        {
          id: 'w3m2',
          title: 'Cuida tus datos privados',
          xp: 10,
          content: [
            'Evita compartir con una IA información muy sensible: contraseñas, números de tarjeta, direcciones exactas o documentos de identidad.',
            'Piensa en la IA como en una persona desconocida y útil: le puedes pedir ayuda, pero no le compartes tus secretos más delicados.'
          ],
          quiz: {
            question: '¿Cuál de estos datos NO deberías compartir con una IA?',
            options: [
              'El nombre de una película que te gusta',
              'Tu número de tarjeta o contraseñas',
              'Un tema que quieres aprender',
              'Una idea para tu próximo viaje'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! La información sensible como contraseñas o datos bancarios nunca debe compartirse.'
          }
        },
        {
          id: 'w3m3',
          title: 'La IA repite lo que ha visto',
          xp: 10,
          content: [
            'La IA aprendió de textos escritos por personas, así que puede repetir ideas incompletas o parciales sobre algunos temas (a esto se le llama "sesgo").',
            'Por eso es bueno comparar respuestas, hacer preguntas desde distintos ángulos y no quedarte solo con una única opinión.'
          ],
          quiz: {
            question: '¿Por qué la IA puede tener sesgos en algunas respuestas?',
            options: [
              'Porque tiene sentimientos personales',
              'Porque aprendió de textos escritos por personas, que a veces son parciales',
              'Porque odia ciertos temas',
              'No es cierto, la IA nunca se equivoca'
            ],
            correctIndex: 1,
            explanation: '¡Muy bien! Como aprendió de contenido humano, puede reflejar ideas incompletas o parciales.'
          }
        },
        {
          id: 'w3m4',
          title: 'Cómo verificar una respuesta',
          xp: 15,
          content: [
            'Una forma sencilla de revisar una respuesta es preguntarle a la misma IA: "¿estás seguro? ¿de dónde sale ese dato?".',
            'Otra forma es buscar el mismo tema en una segunda fuente confiable (una página oficial, una noticia seria, un experto).'
          ],
          quiz: {
            question: '¿Cuál es una buena forma de verificar una respuesta importante de la IA?',
            options: [
              'Compartirla de inmediato sin revisar',
              'Buscar el mismo dato en otra fuente confiable',
              'Asumir que siempre tiene razón',
              'Preguntarle solo una vez y no volver a pensarlo'
            ],
            correctIndex: 1,
            explanation: '¡Perfecto! Contrastar con otra fuente es el hábito de un buen "detective digital".'
          }
        }
      ]
    },
    {
      id: 'w4',
      order: 4,
      title: 'Caja de Herramientas',
      subtitle: 'Descubre todo lo que la IA puede hacer',
      icon: '🧪',
      color: '#f472b6',
      badge: { id: 'b_w4', name: 'Explorador de Herramientas', icon: '🧭', description: 'Descubriste distintos tipos de IA.' },
      missions: [
        {
          id: 'w4m1',
          title: 'No toda la IA es igual',
          xp: 10,
          content: [
            'Existen distintos tipos de IA según lo que hacen: unas escriben texto, otras crean imágenes, otras entienden y generan voz, y otras incluso hacen videos.',
            'Elegir la herramienta correcta para cada tarea te ahorra tiempo y te da mejores resultados.'
          ],
          quiz: {
            question: 'Si quieres crear una imagen para una tarjeta de cumpleaños, ¿qué tipo de IA usarías?',
            options: [
              'Una IA de generación de imágenes',
              'Una calculadora',
              'Un reproductor de música',
              'Un reloj despertador'
            ],
            correctIndex: 0,
            explanation: '¡Correcto! Para imágenes, se usan herramientas de IA especializadas en generar imágenes.'
          }
        },
        {
          id: 'w4m2',
          title: 'Crear imágenes con IA',
          xp: 10,
          content: [
            'Para pedir una imagen, describe con detalle lo que imaginas: el tema, los colores, el estilo (realista, caricatura, acuarela) y el ambiente.',
            'Por ejemplo: "un gato astronauta flotando en el espacio, estilo caricatura, colores pastel".'
          ],
          quiz: {
            question: '¿Qué hace que una instrucción para crear una imagen sea buena?',
            options: [
              'Ser muy corta y vaga',
              'Describir tema, estilo y colores con detalle',
              'No mencionar ningún detalle',
              'Usar solo números'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Entre más detalles visuales des, más se parecerá el resultado a lo que imaginas.'
          }
        },
        {
          id: 'w4m3',
          title: 'Hablar con la IA por voz',
          xp: 10,
          content: [
            'Muchos asistentes de IA te permiten hablarles en vez de escribir, lo cual es muy útil si vas caminando, cocinando o simplemente prefieres hablar.',
            'Las mismas reglas aplican: sé claro, específico y da contexto, ya sea que escribas o hables.'
          ],
          quiz: {
            question: '¿Qué ventaja tiene hablarle a un asistente de IA por voz?',
            options: [
              'Ninguna, es igual siempre escribir',
              'Puede ser más cómodo cuando tienes las manos ocupadas',
              'La IA entiende mejor si gritas',
              'Solo funciona para pedir chistes'
            ],
            correctIndex: 1,
            explanation: '¡Muy bien! La voz es cómoda en situaciones donde no puedes escribir fácilmente.'
          }
        },
        {
          id: 'w4m4',
          title: 'Elige la herramienta correcta',
          xp: 15,
          content: [
            'Antes de empezar una tarea, pregúntate: ¿necesito texto, una imagen, un resumen, un plan? Eso te ayuda a elegir qué tipo de IA usar y cómo pedirlo.',
            'Con práctica, elegir la herramienta correcta se vuelve algo natural.'
          ],
          quiz: {
            question: 'Necesitas un resumen corto de un texto largo. ¿Qué le pedirías a la IA?',
            options: [
              'Que dibuje una imagen del texto',
              'Que resuma el texto en pocas líneas, destacando lo más importante',
              'Que traduzca el texto sin razón',
              'Que borre el texto'
            ],
            correctIndex: 1,
            explanation: '¡Perfecto! Pedir un resumen claro es justo la tarea para la que la IA de texto es ideal.'
          }
        }
      ]
    },
    {
      id: 'w5',
      order: 5,
      title: 'Hero: Automatiza tu Vida',
      subtitle: 'Convierte tareas repetitivas en magia',
      icon: '⚡',
      color: '#fbbf24',
      badge: { id: 'b_w5', name: 'Hero de la Automatización', icon: '🏆', description: '¡Completaste todo el viaje Zero to Hero!' },
      missions: [
        {
          id: 'w5m1',
          title: '¿Qué es automatizar?',
          xp: 15,
          content: [
            'Automatizar significa hacer que algo pase solo, sin que tengas que repetirlo manualmente cada vez.',
            'La idea clave es siempre esta: "Cuando pase ESTO, entonces haz ESTO OTRO". A esa primera parte se le llama disparador (o "trigger"), y a la segunda, acción.'
          ],
          quiz: {
            question: '¿Cuál es la idea central de una automatización?',
            options: [
              'Hacer todo manualmente cada vez',
              '"Cuando pase esto, entonces haz esto otro", sin que tengas que repetirlo tú',
              'Que la IA decida todo sin avisarte nunca',
              'Nada, es solo un término técnico sin uso real'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Toda automatización se basa en un disparador y una acción que ocurre sola.'
          }
        },
        {
          id: 'w5m2',
          title: 'Descompón una tarea repetitiva',
          xp: 15,
          content: [
            'Piensa en algo que haces seguido: revisar tus correos, resumir tus notas, o recordar tomar agua.',
            'El primer paso para automatizar es dividir esa tarea en pasos simples y claros, como si le explicaras a alguien exactamente qué hacer.'
          ],
          quiz: {
            question: 'Quieres automatizar "recordarme tomar agua cada 2 horas". ¿Cuál sería el disparador?',
            options: [
              'Que pasen 2 horas',
              'Que tengas sed en ese momento exacto',
              'Que sea de noche',
              'Que abras una imagen'
            ],
            correctIndex: 0,
            explanation: '¡Correcto! El disparador es la condición de tiempo: cada 2 horas.'
          }
        },
        {
          id: 'w5m3',
          title: 'Construye tu primera automatización',
          xp: 20,
          type: 'builder',
          content: [
            'Ahora tú vas a diseñar tu propia automatización usando la fórmula "Cuando ___, entonces la IA debe ___".',
            'Elige un disparador y una acción con los menús de abajo, y arma tu primera receta.'
          ],
          builder: {
            triggerLabel: 'Cuando...',
            triggers: [
              'reciba un correo nuevo',
              'sean las 7:00 a.m.',
              'termine mi jornada de trabajo',
              'guarde una nota nueva',
              'sea domingo por la noche'
            ],
            actionLabel: 'entonces la IA debe...',
            actions: [
              'resumir el correo en 2 líneas',
              'darme un resumen de mis tareas del día',
              'organizar mis pendientes de mañana',
              'convertir la nota en una lista de tareas',
              'prepararme un resumen de la semana'
            ]
          }
        },
        {
          id: 'w5m4',
          title: 'Combina IA + automatización',
          xp: 15,
          content: [
            'La verdadera magia ocurre cuando combinas varios pasos: por ejemplo, "cada mañana, la IA revisa mis notas, hace un resumen, y me lo envía como lista de tareas".',
            'No necesitas saber programar: muchas herramientas actuales te permiten armar estas cadenas con menús simples, muy parecido a lo que hiciste en la misión anterior.'
          ],
          quiz: {
            question: '¿Necesitas saber programar para crear automatizaciones sencillas hoy en día?',
            options: [
              'Sí, es obligatorio saber programar',
              'No necesariamente, muchas herramientas usan menús simples',
              'Solo si tienes más de 40 años',
              'Solo funciona con automatizaciones complejas'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Hoy existen muchas herramientas visuales que no requieren programar.'
          }
        },
        {
          id: 'w5m5',
          title: 'Proyecto final: tu automatización Hero',
          xp: 25,
          type: 'builder',
          content: [
            '¡Última misión! Ahora vas a diseñar la automatización que más te gustaría tener en tu vida real.',
            'Piensa en algo que realmente te ahorraría tiempo, y arma tu receta final.'
          ],
          builder: {
            triggerLabel: 'Cuando...',
            triggers: [
              'empiece mi día',
              'reciba muchos mensajes',
              'tenga una reunión importante',
              'termine de estudiar',
              'sea fin de mes'
            ],
            actionLabel: 'entonces la IA debe...',
            actions: [
              'darme un resumen de lo más importante',
              'ayudarme a responder lo urgente primero',
              'prepararme un resumen de los puntos clave',
              'hacerme un cuestionario para repasar',
              'ayudarme a organizar mis gastos'
            ]
          }
        }
      ]
    }
  ]
};

// Insignias especiales que no dependen de completar un mundo específico
const SPECIAL_ACHIEVEMENTS = [
  { id: 'b_start', name: 'Primeros Pasos', icon: '🌱', description: 'Comenzaste tu aventura Zero to Hero.' },
  { id: 'b_streak3', name: 'Racha de 3 días', icon: '🔥', description: 'Volviste a aprender 3 días distintos.' },
  { id: 'b_streak7', name: 'Racha de 7 días', icon: '💥', description: 'Volviste a aprender 7 días distintos.' },
  { id: 'b_perfect', name: 'Mente Perfecta', icon: '🎯', description: 'Respondiste correctamente a la primera en un mundo completo.' },
  { id: 'b_hero', name: 'Zero to Hero', icon: '👑', description: 'Completaste todo el viaje y te convertiste en un Hero de la IA.' }
];

// Rangos según la experiencia (XP) acumulada
const RANKS = [
  { min: 0, name: 'Recluta Digital', icon: '🔹' },
  { min: 40, name: 'Aprendiz de Bytes', icon: '🔸' },
  { min: 100, name: 'Ayudante IA', icon: '⭐' },
  { min: 170, name: 'Estratega Digital', icon: '🌟' },
  { min: 220, name: 'Maestro de Prompts', icon: '💫' },
  { min: 260, name: 'Hero de la IA', icon: '👑' }
];

// Frases del compañero robot, listas para personalizar con el nombre del usuario
const ROBOT_TIPS = {
  greetings: [
    '¡Hola, {name}! Qué bueno verte de nuevo por aquí.',
    '{name}, tu compañero de circuitos te estaba esperando.',
    '¡Listo para seguir aprendiendo, {name}?'
  ],
  correct: [
    '¡Así se hace, {name}!',
    '¡Excelente, {name}! Tu cerebro y mis circuitos hacen buen equipo.',
    '¡Perfecto, {name}! Vas por muy buen camino.',
    '¡Eso es, {name}! Sigue así.'
  ],
  incorrect: [
    'Casi, {name}. Repasemos esa idea juntos.',
    'No pasa nada, {name}, hasta los robots nos equivocamos. Intentémoslo de nuevo.',
    '{name}, vamos a revisar esto una vez más, tú puedes.',
    'Buen intento, {name}. Aprender también es equivocarse y volver a intentar.'
  ],
  celebrateWorld: [
    '¡{name}, completaste todo un mundo! Estoy orgulloso de ti.',
    '¡Increíble, {name}! Desbloqueaste una nueva insignia.',
    '¡{name}, tus circuitos mentales están cada vez más afinados!'
  ],
  celebrateFinal: [
    '¡{name}, lo lograste! De Zero a Hero, con todo merecido.',
    '¡{name}, ahora sí eres un verdadero Hero de la IA!'
  ],
  idle: [
    'Consejo: entre más claro seas al pedir algo, mejor te responderá la IA.',
    'Consejo: siempre verifica los datos importantes antes de confiar en ellos al 100%.',
    'Consejo: puedes pedirle a una IA que te explique algo "como si tuvieras 10 años".',
    'Consejo: nunca compartas contraseñas ni datos bancarios con una IA.',
    'Consejo: una buena automatización empieza con una idea muy simple.',
    '¿Sabías que puedes pedirle a la IA varias versiones de una misma idea para comparar?'
  ]
};

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function robotSay(category, name) {
  const phrase = pickRandom(ROBOT_TIPS[category]);
  return phrase.replaceAll('{name}', name || 'explorador');
}
