// src/data/events.ts

/* ===============================
   DATOS DE CUMPLEAÑOS (19 de diciembre)
================================ */
export const cumpleData: Record<
  number,
  {
    unlockDate: string;
    title: string;
    message: string;
  }
> = {
  2024: {
    unlockDate: "2024-12-19",
    title: "Tu dia especial 2024",
    message: "El primer cumple que celebramos juntos. Un momento magico.",
  },
  2025: {
    unlockDate: "2025-12-19",
    title: "Tu dia especial",
    message: "Hoy celebramos tu existencia. Gracias por iluminar mi vida.",
  },
  2026: {
    unlockDate: "2026-12-19",
    title: "Otro anio mas",
    message: "Cada anio contigo es un regalo que agradezco todos los dias.",
  },
  2027: {
    unlockDate: "2027-12-19",
    title: "Celebrando juntos",
    message: "Un anio mas de amor, risas y momentos inolvidables.",
  },
  2028: {
    unlockDate: "2028-12-19",
    title: "Siempre a tu lado",
    message: "Hoy y siempre, celebro la maravillosa persona que eres.",
  },
  2029: {
    unlockDate: "2029-12-19",
    title: "Nuestro viaje continua",
    message: "Cada cumple es un recordatorio de cuanto te amo.",
  },
  2030: {
    unlockDate: "2030-12-19",
    title: "Un futuro brillante",
    message: "Juntos, cada anio es mejor que el anterior.",
  },
};

/* ===============================
   DATOS DE SAN VALENTIN (14 de febrero)
================================ */
export const sanValentinData: Record<
  number,
  {
    unlockDate: string;
    title: string;
    message: string;
  }
> = {
  2025: {
    unlockDate: "2025-02-14",
    title: "Nuestro primer San Valentin",
    message: "Amarte es la decision mas bonita que he tomado. Gracias por existir.",
  },
  2026: {
    unlockDate: "2026-02-14",
    title: "Seguimos eligiendonos",
    message: "Un anio mas, y sigo enamorado/a como el primer dia.",
  },
  2027: {
    unlockDate: "2027-02-14",
    title: "Amor eterno",
    message: "Cada dia te amo mas. Gracias por ser mi compania de vida.",
  },
  2028: {
    unlockDate: "2028-02-14",
    title: "Nuestro amor crece",
    message: "Contigo, cada San Valentin es especial.",
  },
  2029: {
    unlockDate: "2029-02-14",
    title: "Para siempre",
    message: "El amor que compartimos es mi mayor tesoro.",
  },
  2030: {
    unlockDate: "2030-02-14",
    title: "Juntos por siempre",
    message: "Seis anios de San Valentin juntos, y apenas comenzamos.",
  },
};

/* ===============================
   DATOS DE ANIVERSARIO (02 de noviembre 2024)
================================ */
export const anniversaryData: Record<
  number,
  {
    unlockDate: string;
    title: string;
    text: string;
  }
> = {
  2024: {
    unlockDate: "2024-11-02",
    title: "Nuestro comienzo",
    text: "Aqui empezo todo... El dia que cambiaste mi vida para siempre.",
  },
  2025: {
    unlockDate: "2025-11-02",
    title: "Un anio juntos",
    text: "365 dias de amor, risas y momentos inolvidables. Gracias por elegirme.",
  },
  2026: {
    unlockDate: "2026-11-02",
    title: "Dos anios de amor",
    text: "Nuestro amor se fortalece con cada momento compartido.",
  },
  2027: {
    unlockDate: "2027-11-02",
    title: "Tres anios inolvidables",
    text: "Cada aniversario es un recordatorio de nuestro amor infinito.",
  },
  2028: {
    unlockDate: "2028-11-02",
    title: "Cuatro anios de felicidad",
    text: "Gracias por hacer de mi vida una aventura hermosa.",
  },
  2029: {
    unlockDate: "2029-11-02",
    title: "Cinco anios de amor",
    text: "Media decada juntos, y cada dia te amo mas.",
  },
  2030: {
    unlockDate: "2030-11-02",
    title: "Seis anios perfectos",
    text: "Nuestro amor es eterno, como las estrellas del universo.",
  },
};

/* ===============================
   DATOS DE AMOR Y AMISTAD (septiembre)
================================ */
export const amorAmistadData: Record<
  number,
  {
    unlockDate: string;
    title: string;
    message: string;
  }
> = {
  2025: {
    unlockDate: "2025-09-20",
    title: "Amor y Amistad 2025",
    message: "Eres mi mejor amigo/a y mi gran amor.",
  },
  2026: {
    unlockDate: "2026-09-20",
    title: "Celebrando nuestra amistad",
    message: "En ti encontre amor y amistad verdadera.",
  },
};

/* ===============================
   CONTENIDO DE SAN VALENTIN
================================ */
export const sanValentinContent = {
  poem: {
    title: "Para ti, mi amor",
    text: (year: number) => `
En este ${year}, como siempre,
mi corazon te elige una vez mas.

Cada dia contigo es un verso,
cada momento, un poema sin fin.

Eres la musica de mis dias,
la luz en mis noches,
mi refugio y mi hogar.

Gracias por ser mi inspiracion,
por llenar mi vida de amor.

Te amo hoy y siempre.
    `.trim(),
  },
  letter: {
    title: "Carta de amor",
    text: (year: number) => `
Mi amor,

En este San Valentin de ${year}, quiero que sepas
que amarte es lo mas facil y natural del mundo.

Gracias por cada sonrisa que ilumina mis dias,
por cada abrazo que me hace sentir en casa,
por cada momento compartido que atesoro en mi corazon.

Eres mi persona favorita,
mi mejor amigo/a,
mi mayor bendicion.

No hay palabras suficientes para expresar
lo mucho que significas para mi.

Pero hoy, en este dia especial,
quiero recordarte que eres
y seras siempre
el amor de mi vida.

Con todo mi corazon,
Siempre tuyo/a
    `.trim(),
  },
};

/* ===============================
   CONTENIDO DE ANIVERSARIO
================================ */
export const anniversaryContent = {
  poem: {
    title: "Nuestro tiempo juntos",
    text: (year: number) => {
      const startYear = 2024;
      const yearsCount = year - startYear;
      const yearsText = yearsCount === 0 ? 'Meses' : yearsCount === 1 ? '1 anio' : `${yearsCount} anios`;
      return `
${yearsText} contigo,
y siento que apenas comienza nuestra historia.

Cada dia a tu lado es un regalo,
cada recuerdo, un tesoro que guardo
en lo mas profundo de mi corazon.

Gracias por elegirme,
gracias por quedarte,
gracias por ser tu.

Contigo he aprendido que el amor verdadero
no es solo sentir mariposas,
es elegirse cada dia,
es crecer juntos,
es construir un hogar en el corazon del otro.

Te amo mas que ayer,
menos que maniana.

Aqui esta a muchos anios mas,
a muchas mas aventuras,
a un amor eterno.
      `.trim();
    },
  },
  letter: {
    title: "Carta de aniversario",
    text: (year: number) => {
      const startYear = 2024;
      const yearsCount = year - startYear;
      const yearsText = yearsCount === 0 ? 'nuestros primeros meses' : yearsCount === 1 ? '1 anio' : `${yearsCount} anios`;
      return `
Mi amor,

Hoy celebramos ${yearsText} juntos,
y mi corazon esta lleno de gratitud.

Recuerdo el 2 de noviembre de 2024,
cuando nuestras vidas se unieron
y supe que habia encontrado algo especial.

Desde entonces, cada dia ha sido una aventura.
Hemos reido hasta llorar,
hemos superado desafios juntos,
hemos creado recuerdos que duraran para siempre.

Gracias por ser mi compania en este viaje,
por amarme en mis mejores y peores momentos,
por creer en nosotros incluso cuando las cosas se ponen dificiles.

Eres mi hogar, mi paz, mi alegria.
Contigo, he encontrado un amor
que nunca supe que podia existir.

Aqui esta a nuestro proximo aniversario,
y a todos los que vendran despues.

Te amo infinitamente,
Siempre tuyo/a

P.D. Gracias por existir y por elegirme cada dia.
      `.trim();
    },
  },
};

/* ===============================
   CONTENIDO DE CUMPLEANIOS
================================ */
export const cumpleContent = {
  letter: {
    title: "Feliz cumple",
    text: (year: number) => `
Feliz cumple ${year}!

Hoy es tu dia,
un dia para celebrar
la maravillosa persona que eres.

Gracias por existir,
gracias por ser tu,
gracias por compartir tu vida conmigo.

Hoy celebramos tu vida,
tus suenios,
todo lo que eres
y todo lo que seras.

Que este nuevo anio de vida
este lleno de amor,
risas,
y momentos inolvidables.

Te deseo todo lo mejor,
porque te lo mereces todo y mas.

Feliz cumple, mi amor!

Con todo mi carinio,
Siempre aqui para ti
    `.trim(),
  },
};
