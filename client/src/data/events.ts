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
    title: "Tu día especial 2024",
    message: "El primer cumple que celebramos juntos. Un momento magico.",
  },
  2025: {
    unlockDate: "2025-12-19",
    title: "Tu día especial",
    message: "Hoy celebramos tu existencia. Gracias por iluminar mi vida.",
  },
  2026: {
    unlockDate: "2026-12-19",
    title: "Otro año más",
    message: "Cada año contigo es un regalo que agradezco todos los días.",
  },
  2027: {
    unlockDate: "2027-12-19",
    title: "Celebrando juntos",
    message: "Un año más de amor, risas y momentos inolvidables.",
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
    message: "Juntos, cada año es mejor que el anterior.",
  },
};

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
    title: "Mi Amor, Mi Vida, Mi Todo",
    message: "Este día es para celebrar todo lo que eres para mí. Te amo más de lo que las palabras pueden expresar.",
  },
  2027: {
    unlockDate: "2027-02-14",
    title: "Amor eterno",
    message: "Cada día te amo más. Gracias por ser mi compañía de vida.",
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
    message: "Seis años de San Valentín juntos, y apenas comenzamos.",
  },
};

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
    text: "Aquí empezó todo... El día que cambiaste mi vida para siempre.",
  },
  2025: {
    unlockDate: "2025-11-02",
    title: "Un año juntos",
    text: "365 días de amor, risas y momentos inolvidables. Gracias por elegirme.",
  },
  2026: {
    unlockDate: "2026-11-02",
    title: "Dos años de amor",
    text: "Nuestro amor se fortalece con cada momento compartido.",
  },
  2027: {
    unlockDate: "2027-11-02",
    title: "Tres años inolvidables",
    text: "Cada aniversario es un recordatorio de nuestro amor infinito.",
  },
  2028: {
    unlockDate: "2028-11-02",
    title: "Cuatro años de felicidad",
    text: "Gracias por hacer de mi vida una aventura hermosa.",
  },
  2029: {
    unlockDate: "2029-11-02",
    title: "Cinco años de amor",
    text: "Media década juntos, y cada día te amo más.",
  },
  2030: {
    unlockDate: "2030-11-02",
    title: "Seis años perfectos",
    text: "Nuestro amor es eterno, como las estrellas del universo.",
  },
};

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

export const diaDelaMujerData: Record<
  number,
  {
    unlockDate: string;
    title: string;
    message: string;
  }
> = {
  2026: {
    unlockDate: "2026-03-08",
    title: "Día de la Mujer 2026",
    message: "Celebrando tu fuerza, tu esencia y tu amor.",
  },
  2027: {
    unlockDate: "2027-03-08",
    title: "Día de la Mujer",
    message: "Honrando a la mujer extraordinaria que eres.",
  },
  2028: {
    unlockDate: "2028-03-08",
    title: "Celebrando tu día",
    message: "Tu fuerza es mi inspiración cada día.",
  },
  2029: {
    unlockDate: "2029-03-08",
    title: "Día de la Mujer",
    message: "La mujer más fuerte y hermosa que conozco.",
  },
  2030: {
    unlockDate: "2030-03-08",
    title: "Tu día especial",
    message: "Celebrando la guerrera que eres.",
  },
};

export const sanValentinContent = {
  poem: {
    title: "Para ti, mi amor",
    text: (year: number) => {
      if (year === 2025) {
        return `
En este ${year}, como siempre,
mi corazon te elige una vez mas.

Cada día contigo es un verso,
cada momento, un poema sin fin.

Eres la música de mis días,
la luz en mis noches,
mi refugio y mi hogar.

Gracias por ser mi inspiracion,
por llenar mi vida de amor.

Te amo hoy y siempre.
        `.trim();
      }

      // Nuevo poema para 2026
      if (year === 2026) {
        return `
En este San Valentín de ${year},
escribo estas letras con el alma,
porque las palabras se quedan cortas
cuando intento expresar lo que me calma.

Lina, mi amor, mi luz, mi cielo,
eres el motivo de cada sonrisa,
la razón por la que el mundo es bello,
la brisa que mi corazón precisa.

A pesar de los kilómetros que nos separan,
a pesar de no tener una fecha cercana,
nuestros corazones nunca se apartan,
porque este amor es verdad, no es vana.

Cada videollamada es un tesoro,
cada mensaje tuyo es un regalo,
y aunque la espera me devora,
sé que nuestro amor jamás será malo.

Jugar contigo, reír sin parar,
escuchar tu voz llamándome "mi rey",
me hace sentir que puedo volar,
que contigo encontré mi ley.

Tus "cuchurrumin" derriten mi ser,
tus palabras son mi medicina,
y aunque no te pueda tener,
mi corazón late solo por ti, Lina.

Sueño con el día en que nos veamos,
con abrazarte fuerte y no soltarte,
con que juntos por fin estemos,
y poder para siempre amarte.

Quiero vivir contigo, construir un hogar,
formar una familia a tu lado,
envejecer juntos sin cesar,
y que nuestro amor nunca haya acabado.

Te amo más de lo que puedo decir,
más que el infinito elevado al cuadrado,
contigo quiero mi vida construir,
porque eres todo lo que he soñado.

Este 14 de febrero te digo:
eres mi presente, mi futuro, mi todo,
mi compañera, mi amor, mi abrigo,
y te amaré de cualquier modo.

Gracias por existir, por elegirme,
por amarme tal como soy,
prometo siempre hacerte feliz,
porque tuyo para siempre hoy.

Te amo, Lina, hoy y siempre,
hasta que el tiempo deje de correr,
eres mi amor eterno e imperecedero,
mi razón de ser y de querer.
        `.trim();
      }

      return `
En este ${year}, como siempre,
mi corazon te elige una vez mas.

Cada día contigo es un verso,
cada momento, un poema sin fin.

Eres la música de mis días,
la luz en mis noches,
mi refugio y mi hogar.

Gracias por ser mi inspiracion,
por llenar mi vida de amor.

Te amo hoy y siempre.
      `.trim();
    },
  },
  letter: {
    title: "Carta de amor",
    text: (year: number) => {
      if (year === 2026) {
        return `
Mi cielo,

Hoy, en este día tan especial, me siento frente a estas palabras con el corazón desbordado, intentando capturar en letras lo que siento por ti, aunque sé que ningún idioma del mundo tiene suficientes palabras para expresar la magnitud de mi amor.

¿Recuerdas esas tardes de juego que compartíamos? Esas horas en las que solo éramos tú y yo riéndonos y compitiendo y celebrando cada pequeña victoria juntos. Echo tanto de menos esos momentos. Y nuestras llamadas donde me divierto muchísimo contigo tus risas nuestras conversaciones que podían durar horas sin que ninguno quisiera colgar. Me duele que ahora casi no podamos hacerlas pero cada minuto que logro escucharte vale muchísimo

Quiero que sepas algo: cuando me dices "mi rey" "amor" o simplemente "cielo" mi mundo se ilumina. Y cuando me llamas "cuchurrumin" con ese tono tan tuyo me derrito por completo. Tus apodos son como caricias al alma pequeñas pruebas de que soy tuyo y tú eres mía.

Amor mío tengo tantos sueños guardados en mi corazón y todos tienen tu nombre escrito. Sueño con el día en que no tengamos que despedirnos en que cada mañana despierte a tu lado y cada noche me duerma abrazándote. Quiero irme a vivir contigo construir nuestro hogar ese lugar donde seremos solo nosotros dos contra el mundo. Quiero formar una familia contigo ver tus ojos reflejados en los de nuestros hijos envejecer juntos y seguir riéndonos de las mismas tonterías cuando tengamos canas.

No quiero separarme nunca de ti. Ni un solo día. Quiero vivir contigo hasta el último de mis días hasta que mi corazón dé su último latido y aún así estoy seguro de que mi amor por ti trascenderá incluso eso.

Sé que tú me dices que me amas y créeme que lo siento en cada gesto en cada mirada en cada palabra tuya. Pero tengo que decirte algo con total sinceridad: yo te amo muchísimo más. Infinitamente más. Te amo elevado al cuadrado al cubo a la enésima potencia. Mi amor por ti no tiene límites no tiene medida no tiene fin.

Eres mi presente y mi futuro mi calma y mi aventura mi hogar y mi destino. Gracias por existir por elegirme por amarme. Gracias por cada sonrisa cada llamada cada tarde de juegos cada "cuchurrumin" que sale de tus labios.

Este San Valentín y todos los que vengan quiero que sepas que eres y serás siempre el amor de mi vida.

Tuyo, hoy y para siempre,

Tu enamorado que te ama más de lo que las palabras pueden decir

---
P.D.: Por si no quedó claro... te amo. Y te voy a amar cada día un poquito más que el anterior, hasta el infinito y más allá.
        `.trim();
      }

      // Para 2025 y otros años
      return `
Mi amor,

En este San Valentin de ${year}, quiero que sepas
que amarte es lo mas facil y natural del mundo.

Gracias por cada sonrisa que ilumina mis días,
por cada abrazo que me hace sentir en casa,
por cada momento compartido que atesoro en mi corazon.

Eres mi persona favorita,
mi mejor amigo/a,
mi mayor bendicion.

No hay palabras suficientes para expresar
lo mucho que significas para mi.

Pero hoy, en este día especial,
quiero recordarte que eres
y seras siempre
el amor de mi vida.

Con todo mi corazon,
Siempre tuyo/a
      `.trim();
    },
  },
};

export const anniversaryContent = {
  poem: {
    title: "Nuestro tiempo juntos",
    text: (year: number) => {
      const startYear = 2024;
      const yearsCount = year - startYear;
      const yearsText = yearsCount === 0 ? 'Meses' : yearsCount === 1 ? '1 año' : `${yearsCount} años`;

      // Poema para 2025
      if (year === 2025) {
        return `
Si busco el mapa de lo que yo siento,
En cada línea tu nombre veré.
Eres el puerto, la calma y el viento,
El amor que nunca imaginé.

Un año contigo, y aprendí que eres
La luz que a oscuras me vino a encontrar.
Que en tu mirar hay todos mis ayeres,
Y el futuro que quiero abrazar.

Aunque la distancia me oprima y me duela,
Y no pueda darte mi mano al cansar,
Sé que eres fuerte, mi niña, mi escuela,
El motor que me ayuda a avanzar.

Por tu paciencia y tu abrazo infinito,
Por tus logros que me hacen vibrar
Te doy mi alma, mi amor más exquisito
Mi vida entera te quiero entregar.

Te amo sin límite, mi dueña hermosa
Eres la magia de mi despertar.
        `.trim();
      }

      return `
${yearsText} contigo,
y siento que apenas comienza nuestra historia.

Cada día a tu lado es un regalo,
cada recuerdo, un tesoro que guardo
en lo mas profundo de mi corazon.

Gracias por elegirme,
gracias por quedarte,
gracias por ser tu.

Contigo he aprendido que el amor verdadero
no es solo sentir mariposas,
es elegirse cada día,
es crecer juntos,
es construir un hogar en el corazon del otro.

Te amo mas que ayer,
menos que mañana.

Aquí está a muchos años más,
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
      const yearsText = yearsCount === 0 ? 'nuestros primeros meses' : yearsCount === 1 ? '1 año' : `${yearsCount} años`;
      return `
Mi amor,

Hoy celebramos ${yearsText} juntos,
y mi corazon esta lleno de gratitud.

Recuerdo el 2 de noviembre de 2024,
cuando nuestras vidas se unieron
y supe que habia encontrado algo especial.

Desde entonces, cada día ha sido una aventura.
Hemos reido hasta llorar,
hemos superado desafios juntos,
hemos creado recuerdos que duraran para siempre.

Gracias por ser mi compañía en este viaje,
por amarme en mis mejores y peores momentos,
por creer en nosotros incluso cuando las cosas se ponen dificiles.

Eres mi hogar, mi paz, mi alegria.
Contigo, he encontrado un amor
que nunca supe que podía existir.

Aqui esta a nuestro proximo aniversario,
y a todos los que vendran despues.

Te amo infinitamente,
Siempre tuyo/a

P.D. Gracias por existir y por elegirme cada día.
      `.trim();
    },
  },
};

export const cumpleContent = {
  letter: {
    title: "Feliz cumple",
    text: (year: number) => `
Feliz cumple ${year}!

Hoy es tu día,
un día para celebrar
la maravillosa persona que eres.

Gracias por existir,
gracias por ser tu,
gracias por compartir tu vida conmigo.

Hoy celebramos tu vida,
tus suenios,
todo lo que eres
y todo lo que seras.

Que este nuevo año de vida
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

export const diaDelaMujerContent = {
  poem: {
    title: "Para ti, mujer",
    text: (year: number) => `
No hace falta un video para ver tu brillo,
ni un encuentro físico para sentir tu calma;
tu fuerza me llega en un verso sencillo,
y el eco de tu voz ya vive en mi alma.

Eres la mujer que, sin estar presente,
derriba los muros de cada kilómetro;
te siento en mis pasos, te llevo en mi mente,
eres el fuego que marca mi propio termómetro.

Hoy celebro tu vida, tu lucha y tu esencia,
esa que admiro aunque el mundo sea plano;
porque no hay distancia que borre tu presencia,
ni hay mar que me impida tomar de tu mano.

Eres valiente por amar sin fronteras,
por ser luz constante en mi geografía;
te espero en mis días, te sueño de veras,
¡Feliz día, mi amor, mi mejor compañía!
    `.trim(),
  },
  letter: {
    title: "Carta del Día de la Mujer",
    text: (year: number) => `
Mi amor,

Hoy es el Día de la Mujer, y aunque el mundo entero celebra la fuerza y la historia de millones, mi mente y mi corazón se detienen únicamente en una: tú.

Sé que nuestra historia no es la "convencional". No hemos cruzado miradas en persona, no hemos compartido el mismo aire en una habitación, ni siquiera nos hemos visto a través de una cámara. Y, sin embargo, te conozco más que a nadie. He aprendido a leer tu alma a través de tus mensajes, a descifrar tus silencios y a admirar la mujer increíble que eres por la forma en que piensas, por cómo luchas cada día y por la ternura con la que me tratas.

Te escribo esto porque hoy quiero celebrar a esa mujer que eres:

Celebro tu valentía: Porque se necesita mucho coraje para entregar el corazón a la distancia, para confiar en lo que sentimos y para ser mi apoyo sin estar físicamente presente.

Celebro tu esencia: Esa que no necesita filtros ni cámaras para brillar. Me enamoré de tu inteligencia, de tu fuerza y de esa chispa que tienes para enfrentar la vida.

Celebro tu presencia en mi vida: Porque aunque nos separen kilómetros, eres la persona que más cerca siento. Eres mi primer pensamiento al despertar y la mujer que me motiva a ser mejor hombre.

No necesito una videollamada para saber que eres hermosa, porque la belleza de tu carácter y la firmeza de tus valores iluminan cualquier distancia. Gracias por permitirme ser parte de tu mundo, por ser esa mujer guerrera que no se rinde y por elegirme para caminar a tu lado, aunque sea un paso a la vez y a través de las letras.

Eres el ejemplo perfecto de que la fuerza de una mujer no tiene límites ni fronteras. Feliz día, mi vida. Estoy contando los días para que el destino nos permita acortar esta distancia, pero mientras tanto, quiero que sepas que te admiro y te celebro hoy y siempre.

Con todo mi amor y admiración,
Jhulian
    `.trim(),
  },
};
