// src/data/events.ts

/* ===============================
   DATOS DE CUMPLEAÑOS
================================ */
export const cumpleData: Record<
  number,
  {
    unlockDate: string;
    title: string;
    message: string;
  }
> = {
  2025: {
    unlockDate: "2025-02-14",
    title: "Tu día 💜",
    message: "Hoy celebramos tu existencia. Gracias por iluminar mi vida.",
  },
  2026: {
    unlockDate: "2026-02-14",
    title: "Otro año más",
    message: "Cada año contigo es un regalo que agradezco todos los días.",
  },
  2027: {
    unlockDate: "2027-02-14",
    title: "Celebrando juntos",
    message: "Un año más de amor, risas y momentos inolvidables.",
  },
  2028: {
    unlockDate: "2028-02-14",
    title: "Siempre a tu lado",
    message: "Hoy y siempre, celebro la maravillosa persona que eres.",
  },
  2029: {
    unlockDate: "2029-02-14",
    title: "Nuestro viaje continúa",
    message: "Cada cumpleaños es un recordatorio de cuánto te amo.",
  },
  2030: {
    unlockDate: "2030-02-14",
    title: "Un futuro brillante",
    message: "Juntos, cada año es mejor que el anterior.",
  },
};

/* ===============================
   DATOS DE SAN VALENTÍN
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
    title: "Nuestro primer San Valentín ❤️",
    message: "Amarte es la decisión más bonita que he tomado. Gracias por existir.",
  },
  2026: {
    unlockDate: "2026-02-14",
    title: "Seguimos eligiéndonos",
    message: "Un año más, y sigo enamorado/a como el primer día.",
  },
  2027: {
    unlockDate: "2027-02-14",
    title: "Amor eterno",
    message: "Cada día te amo más. Gracias por ser mi compañero/a de vida.",
  },
  2028: {
    unlockDate: "2028-02-14",
    title: "Nuestro amor crece",
    message: "Contigo, cada San Valentín es especial.",
  },
  2029: {
    unlockDate: "2029-02-14",
    title: "Para siempre",
    message: "El amor que compartimos es mi mayor tesoro.",
  },
  2030: {
    unlockDate: "2030-02-14",
    title: "Juntos por siempre",
    message: "Seis años de San Valentín juntos, y apenas comenzamos.",
  },
};

/* ===============================
   DATOS DE ANIVERSARIO
================================ */
export const anniversaryData: Record<
  number,
  {
    unlockDate: string;
    title: string;
    text: string;
  }
> = {
  2025: {
    unlockDate: "2025-06-10",
    title: "Nuestro comienzo",
    text: "Aquí empezó todo... Gracias por elegirme cada día.",
  },
  2026: {
    unlockDate: "2026-06-10",
    title: "Un año más juntos",
    text: "Seguimos creciendo 💜. Cada día a tu lado es un regalo.",
  },
  2027: {
    unlockDate: "2027-06-10",
    title: "Dos años de amor",
    text: "Nuestro amor se fortalece con cada momento compartido.",
  },
  2028: {
    unlockDate: "2028-06-10",
    title: "Tres años inolvidables",
    text: "Cada aniversario es un recordatorio de nuestro amor infinito.",
  },
  2029: {
    unlockDate: "2029-06-10",
    title: "Cuatro años de felicidad",
    text: "Gracias por hacer de mi vida una aventura hermosa.",
  },
  2030: {
    unlockDate: "2030-06-10",
    title: "Cinco años de amor",
    text: "Medio década juntos, y cada día te amo más.",
  },
};

/* ===============================
   CONTENIDO DE SAN VALENTÍN
================================ */
export const sanValentinContent = {
  poem: {
    title: "Para ti, mi amor",
    text: (year: number) => `
En este ${year}, como siempre,
mi corazón te elige una vez más.

Cada día contigo es un verso,
cada momento, un poema sin fin.

Eres la música de mis días,
la luz en mis noches,
mi refugio y mi hogar.

Gracias por ser mi inspiración,
por llenar mi vida de amor.

Te amo hoy y siempre. ❤️
    `.trim(),
  },
  letter: {
    title: "Carta de amor",
    text: (year: number) => `
Mi amor,

En este San Valentín de ${year}, quiero que sepas
que amarte es lo más fácil y natural del mundo.

Gracias por cada sonrisa que ilumina mis días,
por cada abrazo que me hace sentir en casa,
por cada momento compartido que atesoro en mi corazón.

Eres mi persona favorita,
mi mejor amigo/a,
mi mayor bendición.

No hay palabras suficientes para expresar
lo mucho que significas para mí.

Pero hoy, en este día especial,
quiero recordarte que eres
y serás siempre
el amor de mi vida.

Con todo mi corazón,
Siempre tuyo/a 💕
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
      const yearsCount = year - 2025 + 1;
      return `
${yearsCount} ${yearsCount === 1 ? 'año' : 'años'} contigo,
y siento que apenas comienza nuestra historia.

Cada día a tu lado es un regalo,
cada recuerdo, un tesoro que guardo
en lo más profundo de mi corazón.

Gracias por elegirme,
gracias por quedarte,
gracias por ser tú.

Contigo he aprendido que el amor verdadero
no es solo sentir mariposas,
es elegirse cada día,
es crecer juntos,
es construir un hogar en el corazón del otro.

Te amo más que ayer,
menos que mañana. 💜

Aquí está a muchos años más,
a muchas más aventuras,
a un amor eterno.
      `.trim();
    },
  },
  letter: {
    title: "Carta de aniversario",
    text: (year: number) => {
      const yearsCount = year - 2025 + 1;
      return `
Mi amor,

Hoy celebramos ${yearsCount} ${yearsCount === 1 ? 'año' : 'años'} juntos,
y mi corazón está lleno de gratitud.

Recuerdo el día en que todo comenzó,
cuando nuestras miradas se cruzaron
y supe que había encontrado algo especial.

Desde entonces, cada día ha sido una aventura.
Hemos reído hasta llorar,
hemos superado desafíos juntos,
hemos creado recuerdos que durarán para siempre.

Gracias por ser mi compañero/a en este viaje,
por amarme en mis mejores y peores momentos,
por creer en nosotros incluso cuando las cosas se ponen difíciles.

Eres mi hogar, mi paz, mi alegría.
Contigo, he encontrado un amor
que nunca supe que podía existir.

Aquí está a nuestro próximo aniversario,
y a todos los que vendrán después.

Te amo infinitamente,
Siempre tuyo/a 💕

P.D. Gracias por existir y por elegirme cada día.
      `.trim();
    },
  },
};

/* ===============================
   CONTENIDO DE CUMPLEAÑOS
================================ */
export const cumpleContent = {
  letter: {
    title: "Feliz cumpleaños",
    text: (year: number) => `
¡Feliz cumpleaños ${year}! 🎂

Hoy es tu día,
un día para celebrar
la maravillosa persona que eres.

Gracias por existir,
gracias por ser tú,
gracias por compartir tu vida conmigo.

Hoy celebramos tu vida,
tus sueños,
todo lo que eres
y todo lo que serás.

Que este nuevo año de vida
esté lleno de amor,
risas,
y momentos inolvidables.

Te deseo todo lo mejor,
porque te lo mereces todo y más.

¡Feliz cumpleaños, mi amor! 💖

Con todo mi cariño,
Siempre aquí para ti
    `.trim(),
  },
};