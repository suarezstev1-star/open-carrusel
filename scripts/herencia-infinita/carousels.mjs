// Los carruseles de Steven Suárez · Herencia Infinita.
// Fuente del contenido: Plano de marca v4, Plan de marketing v2, Método v4 y
// Manual «Voz y Alma». Cada carrusel le habla a UNA persona y sigue los cinco
// tiempos (Dolor → Espejo → Verdad → Luz → Puerta). Solo cifras de las fichas.

import { build } from "./motion.mjs";

const HASHTAGS = [
  "#segurosdevida",
  "#stevensuarez",
  "#familialatina",
  "#latinosenusa",
  "#finanzasparalatinos",
  "#bancoinfinito",
];

export const CAROUSELS = [
  {
    name: "HI 01 · ¿Cuántos días trabajas para el banco?",
    tags: ["herencia-infinita", "construir", "familia-joven"],
    caption:
      "Pagas la tarjeta, pagas la troca, pagas la casa… y a fin de mes no sobra nada.\n\nNo es que trabajes poco. Es que una parte de tu mes ya tiene dueño: el banco.\n\nHaz la cuenta: lo que pagas de intereses al mes ÷ lo que te entra al mes × 30. Ese es el número de días que trabajas para el banco.\n\n¿Quieres tu número? Escríbeme FAMILIA y te mando la calculadora.\n\nNi un día más para el banco.",
    hashtags: [...HASHTAGS, "#deudas", "#tarjetasdecredito"],
    slides: build([
      ["hook", { kicker: "Para el que trabaja de sol a sol", title: "¿Cuántos días al mes trabajas para <em>el banco</em>?", sub: "Haz la cuenta conmigo. Te va a doler." }, "Gancho · Familia joven · Motions: Subida, Trazo de oro, Subrayado"],
      ["text", { kicker: "Dolor", title: "Pagas, pagas y pagas.", paras: ["La tarjeta. La troca. La casa.", "Y a fin de mes, <em>no sobra nada</em>."] }, "Dolor · Subida escalonada"],
      ["text", { kicker: "Espejo", title: "A mí también me pasó.", paras: ["Trabajé años construyendo algo que no era mío.", "Ahí aprendí a hacer esta cuenta."] }, "Espejo · historia de Steven"],
      ["phone", { kicker: "La cuenta", title: "Haz la cuenta en un minuto.", paras: ["Lo que pagas de intereses al mes ÷ lo que te entra × 30.", "Te va a doler."], app: "Herencia Infinita", screen: "Tus días para el banco", rows: [["Intereses al mes", "$900"], ["Te entra al mes", "$3,000"], ["900 ÷ 3,000 × 30", "= 9"]], result: "9 días", resultLabel: "de cada mes trabajas para el banco", src: "Números de ejemplo. Haz la cuenta con los tuyos." }, "Verdad · Motion iPhone (la calculadora se llena fila a fila) · ejemplo del Método v4"],
      ["days", { kicker: "Tu mes", n: 9, text: "9 días de cada mes trabajas solo para pagarle al banco. <em>Sin verlo.</em>", src: "Ejemplo: $900 de intereses con $3,000 netos al mes." }, "Verdad · Motion Calendario: los 9 días se pintan de vino"],
      ["stat", { kicker: "Lo que nadie te dijo", num: "34.5", unit: "¢", text: "De cada dólar que paga un joven normal, 34.5 centavos se van en intereses. Unos <em>10 días</em> de cada mes.", src: "R. Nelson Nash, «Conviértete en tu propio banquero»." }, "Verdad · Motion Golpe · dato Nash p.17 [Alta]"],
      ["text", { kicker: "La luz", title: "El problema no eres tú.", paras: ["Es para quién trabaja tu dinero.", "Lo que hoy le pagas al banco, <em>mañana te lo pagas a ti</em>."] }, "Luz · frase ancla"],
      ["door", { title: "¿Quieres saber tu número?", sub: "y te mando la calculadora. En un minuto sabes cuántos días trabajas para el banco." }, "Puerta · Motion Puerta (FAMILIA respira en oro)"],
    ]),
  },

  {
    name: "HI 02 · Que sus hijos no hagan una colecta",
    tags: ["herencia-infinita", "proteger", "abuelos", "itin"],
    caption:
      "Trabajó aquí toda la vida. Y para volver a su tierra, sus hijos tuvieron que pedir en internet.\n\nDespedirse cuesta dos veces cuando la familia es de dos países: el funeral de aquí y el viaje de vuelta.\n\nSu mayor miedo no es morir. Es que sus hijos tengan que hacer una colecta.\n\nEscríbame FAMILIA y le digo cuánto cuesta despedirse en su país y cómo dejarlo resuelto.\n\nQue su dinero vuelva a casa.",
    hashtags: [...HASHTAGS, "#repatriacion", "#gastosfinales"],
    slides: build([
      ["hook", { kicker: "Lo que nadie habla en casa", title: "Para volver a su tierra, sus hijos tuvieron que <em>pedir</em>.", sub: "Trabajó aquí toda la vida." }, "Gancho · Abuelos / ITIN · de usted"],
      ["text", { kicker: "Una historia que se repite", title: "Treinta años de trabajo.", paras: ["Un día no volvió a casa.", "Y la familia abrió <em>una colecta en internet</em>."], }, "Dolor · historia para ilustrar, no testimonio"],
      ["rows", { kicker: "El primer funeral", title: "Despedirse aquí", rows: [["Con cremación", "$6,280"], ["Con entierro", "$8,300"], ["Con entierro y bóveda", "$9,995"]], src: "NFDA 2023." }, "Verdad · costos NFDA [Alta]"],
      ["wall", { kicker: "El segundo funeral", title: "Volver a su tierra", notes: [["México", "$2,500–$5,000", 0, 90, -4], ["Guatemala", "$2,500–$8,000", 468, 60, 5], ["Honduras", "$4,500–$7,000", 24, 430, 3], ["Colombia", "$10,000–$30,000", 440, 400, -4]], src: "Consulados y cancillerías. Varía por funeraria y aerolínea." }, "Verdad · Motion Pared de titulares · repatriación por país [Alta México y Colombia; Media el resto]"],
      ["stat", { kicker: "Y el gobierno", num: "$255", text: "Eso es lo que paga el Seguro Social por muerte. <em>Nada más.</em>", src: "SSA, abril 2026." }, "Verdad · Motion Golpe · dato SSA [Alta]"],
      ["quote", { kicker: "Lo que de verdad le preocupa", text: "Mi mayor miedo no es morir. Es que mis hijos tengan que hacer una colecta.", by: "Lo que muchos abuelos piensan y no dicen." }, "Espejo · paráfrasis típica (no testimonio)"],
      ["text", { kicker: "La luz", title: "Despedirse en dos países se planea.", paras: ["En $10,000 a $20,000, no en $5,000.", "Y casi seguro cuesta <em>menos de lo que usted cree</em>."] }, "Luz · regla del método para gastos finales"],
      ["door", { title: "Que sus hijos nunca tengan que hacer una colecta.", cta: "Escríbame", sub: "y le digo cuánto cuesta despedirse en su país y cómo dejarlo resuelto." }, "Puerta · de usted"],
    ]),
  },

  {
    name: "HI 03 · Las dos hermanas",
    tags: ["herencia-infinita", "construir", "hijo-que-sostiene"],
    caption:
      "Dos hermanas, mismo sueldo. En el año 1, una tenía $5,200 y la otra $1,933.\n\nCualquiera diría que la primera tenía razón. Pero la del CD va adelante solo hasta el año 14. Después, la historia cambia.\n\nLa diferencia no fue cuánto ganaban. Fue para quién trabajaba su dinero cada vez que compraban un carro.\n\nY te lo digo de frente: esto es lento. No es para quien necesita el dinero en menos de 5 a 7 años.\n\nEscríbeme FAMILIA y te muestro la historia completa con tus números.",
    hashtags: [...HASHTAGS, "#nelsonnash", "#ahorro"],
    slides: build([
      ["hook", { kicker: "Una historia de Nelson Nash", title: "Dos hermanas, mismo sueldo. Una iba ganando… <em>hasta el año 14</em>.", sub: "" }, "Gancho · historia de Nash p.42-45"],
      ["text", { kicker: "Te cuento", title: "Las dos guardan dinero cada año.", paras: ["Una lo pone en un CD del banco.", "La otra construye <em>su propio dinero, a la mano</em>."] }, "Espejo · presentación de la historia"],
      ["compare", { kicker: "Año 1", title: "Lo que tenía cada una", a: { tag: "La del CD", val: "$5,200", lbl: "Va adelante", win: true }, b: { tag: "Su propio dinero", val: "$1,933", lbl: "Empieza lento" }, note: "En el año 1, la del CD le gana por mucho." }, "Verdad · cifras del libro de Nash [Alta]"],
      ["text", { kicker: "La trampa", title: "Mirar solo los primeros años.", paras: ["Así es como casi todos deciden.", "Y así es como casi todos <em>se equivocan</em>."] }, "Verdad · error que evita: mirar solo 10 años"],
      ["chart", { kicker: "El giro", title: "Se cruzan en el año 14.", text: "La del CD va adelante hasta el año 14. <em>Después, pierde.</em>", src: "R. Nelson Nash, «Conviértete en tu propio banquero». La curva muestra la forma, no las cifras." }, "Verdad · Motion Curva que crece (ilustrativa: solo el cruce del año 14 viene de Nash)"],
      ["text", { kicker: "¿Qué cambió?", title: "Para quién trabajaba su dinero.", paras: ["Las dos compran carro cada 4 años.", "Una lo financia con el banco. La otra se presta de lo suyo y se lo devuelve <em>como banquero honesto</em>."] }, "Luz · el carro cada 4 años (Nash)"],
      ["text", { kicker: "Te lo digo de frente", title: "Esto es lento.", paras: ["Si necesitas el dinero en menos de 5 a 7 años, <em>no es para ti</em>.", "No es para hacerse rico. Es para tus hijos."] }, "Honestidad · cuándo NO te conviene"],
      ["door", { title: "¿Cuál de las dos hermanas eres tú?", sub: "y te muestro la historia completa con tus números." }, "Puerta"],
    ]),
  },

  {
    name: "HI 04 · ¿Y quién es tu retiro?",
    tags: ["herencia-infinita", "crecer", "hijo-que-sostiene"],
    caption:
      "Tú eres el retiro de tus papás. ¿Y quién es el tuyo?\n\nCada mes la remesa. Cada vez que suena el teléfono de allá, ya sabes. Y lo haces con amor. Pero nadie está guardando para ti.\n\nEl Seguro Social reemplaza cerca del 43% de tu ingreso, y su fondo de retiro se agota en 2032.\n\nPrimero el match de tu empleador. Después hablamos.\n\nEscríbeme FAMILIA y vemos de qué vas a vivir cuando el cuerpo ya no aguante.",
    hashtags: [...HASHTAGS, "#retiro", "#segurosocial", "#remesas"],
    slides: build([
      ["hook", { kicker: "Para el que sostiene a sus viejos", title: "Tú eres el retiro de tus papás. ¿Y quién es <em>el tuyo</em>?", sub: "" }, "Gancho · Hijo que sostiene"],
      ["text", { kicker: "Dolor", title: "Cada mes, la remesa.", paras: ["Cada vez que suena el teléfono de allá, ya sabes que es para pedir.", "Y lo haces con amor. Pero <em>nadie está guardando para ti</em>."] }, "Dolor · frase de la serie «¿Y quién es tu retiro?»"],
      ["stat", { kicker: "El retiro que te prometen", count: 43, unit: "%", text: "Es lo que el Seguro Social reemplaza de tu ingreso. <em>Menos de la mitad.</em>", src: "SSA, enero 2026." }, "Verdad · Motion Conteo 0→43 [Alta]"],
      ["stat", { kicker: "Y tiene fecha", num: "2032", text: "Ese año se agota el fondo de retiro del Seguro Social. Desde ahí pagaría <em>78%</em> de lo prometido.", src: "Informe de los Fideicomisarios 2026." }, "Verdad · Motion Golpe [Alta]"],
      ["compare", { kicker: "Cada vez menos manos", title: "Trabajadores por cada jubilado", a: { tag: "Hoy", val: "2.6", lbl: "trabajadores" }, b: { tag: "En 2075", val: "1.9", lbl: "trabajadores" }, note: "Tu retiro no puede depender solo del gobierno." }, "Verdad · Fideicomisarios 2026 [Alta]"],
      ["check", { kicker: "La luz", title: "Primero el match. Después hablamos.", label: "El orden para tu retiro", items: ["Toma siempre lo que pone tu empleador en tu 401(k).", "Después, tu propio dinero que crece y no depende del gobierno.", "Y que tus papás y tú tengan con qué."] }, "Luz · Motion Checklist · orden de las tres cubetas"],
      ["quote", { kicker: "Romper el ciclo", text: "Que tus hijos no tengan que ser tu retiro.", by: "Así se rompe el ciclo." }, "Luz · sueño del hijo que sostiene"],
      ["door", { title: "¿De qué vas a vivir cuando el cuerpo ya no aguante?", sub: "y lo vemos juntos, con tus números." }, "Puerta"],
    ]),
  },

  {
    name: "HI 05 · Los tres relojes",
    tags: ["herencia-infinita", "heredar", "abuelos"],
    caption:
      "Tus hijos van a empezar donde tú terminaste… o donde tú empezaste. Depende de esto.\n\nEn cada familia hay tres relojes: el abuelo, el hijo y el nieto. Cada uno con su parte.\n\nNelson Nash cuenta de unos abuelos que ponían $2,000 al año por cada nieto. No les dejaron una casa: les dejaron cómo manejar el dinero.\n\nLa herencia no es lo que dejas cuando te vas. Es lo que construyes mientras vives.\n\nEscríbeme FAMILIA y armamos los tres relojes de tu familia.",
    hashtags: [...HASHTAGS, "#legado", "#herencia"],
    slides: build([
      ["hook", { kicker: "Depende de lo que hagas hoy", title: "Tus hijos van a empezar donde tú terminaste… o donde tú <em>empezaste</em>.", sub: "" }, "Gancho · Todos"],
      ["text", { kicker: "La verdad", title: "Tu nieto no va a heredar tu casa.", paras: ["Va a heredar <em>cómo manejas tu dinero hoy</em>."] }, "Verdad · gancho del video 7"],
      ["clock", { kicker: "Reloj 1", hour: 10, title: "El abuelo", paras: ["Que nadie tenga que hacer una colecta para despedirlo.", "Y que deje algo a los nietos."] }, "Motion Reloj · abuelo (gastos finales y lo que deja)"],
      ["clock", { kicker: "Reloj 2", hour: 2, title: "El hijo", paras: ["Construye su propio dinero, a la mano, <em>mientras vive</em>.", "Lo usa cuando la vida aprieta y lo devuelve."] }, "Motion Reloj · hijo (su propio sistema)"],
      ["clock", { kicker: "Reloj 3", hour: 6, title: "El nieto", paras: ["Lo recibe de niño.", "Lo hereda como sistema: <em>empieza con ventaja</em>."] }, "Motion Reloj · nieto"],
      ["stat", { kicker: "Una historia de Nelson Nash", num: "$2,000", text: "al año por cada nieto. Así empezaron unos abuelos. Ellos eran los dueños; <em>los nietos, los que heredan</em>.", src: "R. Nelson Nash, «Conviértete en tu propio banquero»." }, "Verdad · los abuelos de Nash p.71-74 [Alta]"],
      ["quote", { kicker: "Herencia Infinita", text: "La herencia no es lo que dejas cuando te vas. Es lo que construyes mientras vives.", by: "Una dinastía no se hereda: se construye en vida." }, "Luz · frase del método"],
      ["door", { title: "¿Qué recibe tu nieto el día que tú ya no estés?", sub: "y armamos los tres relojes de tu familia." }, "Puerta"],
    ]),
  },

  {
    name: "HI 06 · Cuándo NO te conviene",
    tags: ["herencia-infinita", "confianza", "honestidad"],
    caption:
      "Casi nadie te lo dice en español. Yo sí: por eso me puedes creer el resto.\n\nEsto no te conviene si:\n1. Necesitas el dinero en menos de 5 a 7 años.\n2. Todavía no tienes protección ni un mes de gastos guardado.\n3. No vas a devolver lo que te prestas.\n4. Tu empleador te iguala el 401(k) y aún no lo tomas.\n5. El pago te obliga a dejar de cubrir lo básico.\n6. Alguien te lo vende como inversión o con una tasa prometida.\n\nSi aun así te conviene, se empieza por el paso 1: Proteger.\n\nEscríbeme FAMILIA y hacemos tu cuenta, sin compromiso.",
    hashtags: [...HASHTAGS, "#educacionfinanciera"],
    slides: build([
      ["hook", { kicker: "Te lo digo de frente", title: "6 casos en los que esto <em>no</em> te conviene.", sub: "Guárdalo antes de que alguien te venda algo." }, "Gancho · Confianza"],
      ["text", { kicker: "Por qué te lo digo", title: "Casi nadie te lo dice en español.", paras: ["Yo sí.", "Por eso <em>me puedes creer el resto</em>."] }, "Espejo · el sello de la marca"],
      ["check", { label: "No te conviene si…", items: ["Necesitas el dinero en menos de 5 a 7 años.", "Todavía no tienes protección ni un mes de gastos guardado."] }, "Casos 1-2 · Motion Checklist"],
      ["check", { label: "No te conviene si…", start: 3, items: ["No vas a devolver lo que te prestas. <em>No te robes los guisantes.</em>", "Tu empleador te iguala el 401(k) y aún no lo tomas."] }, "Casos 3-4 · Motion Checklist · guisantes de Nash p.16"],
      ["check", { label: "No te conviene si…", start: 5, items: ["El pago te obliga a dejar de cubrir lo básico.", "Alguien te lo vende como inversión o con una tasa prometida."] }, "Casos 5-6 · Motion Checklist"],
      ["text", { kicker: "Ya me quemé", title: "Mal vendido, lo es.", paras: ["Por eso yo te enseño a hacer la cuenta y te muestro los cargos.", "Y <em>tú decides con tu familia</em>."] }, "Verdad · objeción «ya me quemé»"],
      ["steps", { kicker: "Si sí te conviene", title: "Se empieza por el paso&nbsp;1.", active: 1, text: "Primero, que a los tuyos <em>no les falte nada</em>. Después, todo lo demás." }, "Luz · Motion Escalera (los 4 pasos se encienden)"],
      ["door", { title: "¿Te conviene o no? Hagamos la cuenta.", sub: "y la hacemos con tus números, sin compromiso." }, "Puerta"],
    ]),
  },

  {
    name: "HI 07 · Me quedé sin nada",
    tags: ["herencia-infinita", "steven-por-dentro", "historia"],
    caption:
      "Construí un negocio de un millón de dólares. Y cuando me quedé sin él, no tenía ni para el pasaje de vuelta.\n\nNo había construido nada que fuera mío.\n\nMeses sin producir, noches sin dormir, mil veces queriendo renunciar. Me sostuvo Dios y reconectar con mi porqué.\n\nAhí aprendí que el que no construye algo propio, trabaja para otro. Por eso hoy enseño a las familias a construir lo suyo.\n\n¿Qué le estás construyendo a los tuyos? Escríbeme FAMILIA.",
    hashtags: [...HASHTAGS, "#historiareal", "#emprendedorlatino"],
    slides: build([
      ["cover", { issue: ["MI HISTORIA", "Nº 07"], word: "PROPIO", line: "Construí un negocio de un millón de dólares. Y me quedé <em>sin nada</em>.", dek: "Lo que aprendí cuando no tenía ni para el pasaje de vuelta." }, "Gancho · Motion Portada de revista · Steven por dentro (frase que duele)"],
      ["timeline", { kicker: "Acto 1 · Trabajar en lo ajeno", title: "Llegué solo.", items: [["Sep 2019", "Llego solo a Estados Unidos desde Medellín."], ["2020", "Entro a esta industria y me va bien rápido."], ["2023", "Equipo, clientes, ingresos… pero nada era mío."]] }, "Espejo · Acto 1"],
      ["text", { kicker: "Acto 2 · El día que lo perdí todo", title: "Me quedé sin el negocio.", paras: ["Sin la estructura. Sin lo construido.", "No tenía <em>ni para el pasaje de vuelta</em>."] }, "Dolor · Acto 2 (sin nombrar empresa ni persona)"],
      ["text", { kicker: "Me rendí", title: "Vendí todo y volví a Colombia.", paras: ["«Estados Unidos ya no tiene nada para mí.»", "Cada paso allá me devolvía a lo mismo."] }, "Dolor · Acto 2"],
      ["text", { kicker: "Volví", title: "Meses sin producir. Noches sin dormir.", paras: ["Mil veces quise renunciar.", "Me sostuvo <em>Dios</em> y volver a mi porqué."] }, "Espejo · fe sin sermón"],
      ["quote", { kicker: "La lección", text: "El que no construye algo propio, trabaja para otro.", by: "Construí en el banco de otro. Nunca más." }, "Verdad"],
      ["text", { kicker: "Acto 3 · Lo propio", title: "Me levanté desde cero.", paras: ["Esta vez, en lo mío.", "Y hoy enseño a las familias a <em>construir lo suyo</em>."] }, "Luz · Acto 3 (sin cifras de agentes ni comisiones)"],
      ["door", { title: "¿Qué le estás construyendo a los tuyos?", sub: "y te enseño a construir algo propio para tu familia." }, "Puerta"],
    ]),
  },
];
