# 📋 AGENDA — la landing de Alquimistic

> Compañera de `AGENDA.md` y `NORTE.md` del repo **alquimistic-hub-app**, que
> es donde vive el producto. Este repo es sólo la vitrina.

## 🔴 LEE ESTO PRIMERO — estado al 2026-10-31

### La landing ahora es el portafolio de Cami

El 2026-10-31 Cami rediseñó la oferta: Alquimistic deja de venderse como
"Business OS" con agentes y planes en dólares, y pasa a ser **Cami creando el
sistema que cada negocio necesita** (páginas, apps, tiendas y la oficina).
La landing muestra sus proyectos y lleva a conversar con ella por WhatsApp.
El texto lo escribió Cami; se usó tal cual.

Se sacó: planes Semilla / Alquimia / Expande en USD, "implementación desde
USD 79", "socios fundadores", Agente CEO / equipo de IA, métricas inventadas
(12h, -70%…) y el enlace a `demo/`. Se conservó: diseño, paleta, mariposa,
modo claro/oscuro, WhatsApp y el botón al wizard (ahora "Crear mi oficina").

**La oficina = la app de Alquimistic** (app.alquimistic.com).

### Marcadores que Cami tiene que completar (se ven en la página)

| Marcador | Dónde |
|---|---|
| Colego **en diseño** | Su tarjeta del carrusel no tiene captura ni enlace (portada con ícono y etiqueta "En diseño"). Cuando esté lista: poner `assets/proyectos/colego.jpg`, quitar `pc-card--pronto` y descomentar el enlace en `index.html` |
| Reseña de **Somos ERA** (4.º proyecto del carrusel) | La escribió Claude con lo que se ve en somosera.cl; Cami debe confirmarla o cambiarla. La captura (`assets/proyectos/somosera.jpg`) se sacó de la web en vivo el 2026-10-31 |

### ⚠️ La app todavía vende otra cosa

`llms.txt` ya dice lo nuevo (Oficina Esencial gratis / Oficina Completa al mes / proyecto a
medida). **El hub no se tocó** (Cami pidió trabajar sólo en la landing):
el wizard sigue recomendando Semilla / Alquimia / Expande y
`src/lib/planes.ts` sigue con esos tres planes en pesos. Alinearlos es la
próxima conversación con Cami, cuando decida el precio de la Oficina Completa.

### Próxima sesión: seguir con el manual de marca

✅ **Publicado en alquimistic.com el 2026-10-31** (rama
`claude/nice-goldberg-1uznz7` pasada a `main`, por pedido de Cami). Un commit
viejo de junio que estaba sólo en el `main` de este PC (DESIGN.md y
PRODUCT.md) quedó en la rama local `respaldo/main-local-junio-2026`, sin
publicar. Lo que se hizo, en orden:

1. ✅ **Manual de marca aplicado** (2026-10-31). Todo vive en
   `styles-marca.css` (se carga al final): en oscuro, carbón cálido #141311,
   oro #C9A35B, crema #F4EFE6, sin turquesa ni celeste sueltos. **El modo claro
   es el de siempre** (`theme.css`: #FAF9F6, oro #B8902E): Cami lo prefirió
   por lejos al claro del manual, y el manual se corrige a eso. Rosa latido
   #F2A9C8 sólo en el corazón.
   **Fondo con halos** en toda la página y en ambos modos (como el inicio del
   wizard): halos turquesa que se mueven lento + verde bruma abajo en oscuro.
   Reemplazan la grilla. **Botón principal en oscuro = "metal líquido"**:
   píldora carbón con borde que gira en oro + irisación de la mariposa. En
   claro el botón sigue en oro sólido (gusto de Cami). Etiquetas en
   JetBrains Mono; entrada = fundido + 12 px, 600 ms; línea de oro que se
   desvanece bajo cada título. Foto de Cami en `assets/cami.jpg`.
   **Tono:** el manual (primera persona) es para redes; la landing sigue
   mirando a quien lee, sin "yo, yo, yo" (decisión de Cami).
   «Metamorfosis» ya va en el mensaje de WhatsApp (el botón no cambia).
2. **Las cuatro promesas (respuesta de Cami, 2026-10-31):**
   - *Esencial gratis con Agenda, "lista en minutos"*: se sostiene, el wizard
     ya crea el sistema personalizado por industria (le toca una "cirugía",
     pero la esencia está).
   - *"Suma personas a tu equipo"*: la app lo permite, pero falta definir
     cómo: **cobrar asientos adicionales** y qué puede ver cada persona.
     Es construcción de la app.
   - *"Sabes cuánto cuesta y cuándo está listo"*: Cami aún no tiene precios de
     proyectos; saldrán de la videollamada de diagnóstico (pidió ayuda).
   - *"Beneficios y fidelización"*: se queda; cada sistema es único (Soberana
     es el ejemplo).
   Sin reseñas ni testimonios en la landing: eso va en redes.
   WhatsApp: todos los mensajes dicen "vengo por la Metamorfosis" (opción B).
3. ✅ Precio de la Oficina Completa: **$21.900 al mes** (Cami, 2026-10-31), ya en `index.html` y `llms.txt`. **Falta llevarlo al hub** (`src/lib/planes.ts` y el wizard). Colego entra con captura cuando termine su diseño. (Se sacó el testimonio de Oppa por decisión de Cami; la foto de Cami ya está.)
4. ✅ Revisado en celular (Cami lo probó en su teléfono) y publicado.
5. **Pendiente:** la app (wizard y planes) todavía vende Semilla/Alquimia/Expande;
   alinearla con Oficina Esencial / Completa $21.900.

### Gustos de Cami para el diseño (anotados en la sesión)

- Nada de rayas decorativas: ni líneas verticales al lado de citas ni guiones
  largos (—) en los textos visibles.
- Sin estrellas ✦ ni íconos de destellos para la IA.
- Lenguaje neutro: "clientes", no "clientas". Pocos posesivos (mi, mis, tu).
- Que no suene "yo, yo, yo": los textos miran a la persona que lee.

## Qué hay en este repo

```
index.html            el portafolio. Botones `data-wa` → WhatsApp; `data-wizard` → wizard
app.js                el JS de la landing. Ahí vive WIZARD_URL
llms.txt              ⚠️ definición CANÓNICA del producto y los planes
theme.css             tokens (claro/oscuro)
styles.css            base
styles-sections.css   secciones (base heredada)
styles-portafolio.css las secciones del portafolio (2026-10)
demo/                 "Estudio Camila" — la REFERENCIA VISUAL del producto.
                      El OS real debe sentirse así (ver NORTE del hub).
assets/               imágenes
```

Es un sitio **estático**: HTML, CSS y un `app.js` sin framework ni build. No
hay `package.json` ni tests. Se despliega solo al pushear.

### El embudo

```
alquimistic.com  →  "Cuéntame tu negocio"  →  WhatsApp de Cami (wa.me/56976102990)   ← principal
                 →  "Crear mi oficina"     →  app.alquimistic.com/crear-mi-sistema
```

`WIZARD_URL` está en **una sola línea de `app.js`**. Apuntaba a
`alquimistic-hub-app.vercel.app` hasta el 2026-08-25; ahora va al dominio
propio, que ya resuelve. Un enlace a un `*.vercel.app` en medio de la venta se
ve prestado y ata el embudo a una URL del proveedor que puede cambiar sola.

Los botones llevan `?nuevo=1&utm_source=landing`. El `nuevo=1` obliga al
wizard a **empezar de cero**, ignorando el progreso guardado en el navegador —
sin eso, quien ya lo abrió antes vuelve a ver su resultado viejo en vez de
arrancar limpio.

## Reglas al tocar esto

- **Preguntas frecuentes: se editan SOLO en `_faq.py`** y después se corre
  `python -I _faq.py`. Ese script escribe la lista en tres lugares a la vez:
  el FAQ visible de `index.html`, el `FAQPage` (JSON-LD para Google) y la
  sección de `llms.txt` (para ChatGPT, Claude, Perplexity). Si se edita a
  mano en un solo lugar, Google y la IA leen otra cosa que la persona.
- **Buscadores (2026-10-31):** título y descripción con lo que la gente busca
  (páginas web, apps, IA, Chile); JSON-LD con la empresa, Cami (Person), sus
  redes, las tres ofertas con precio y el FAQ. `sitemap.xml` sólo con la
  portada; `demo/` va con `noindex` (vende la oferta vieja).

- **`llms.txt` es el canon.** Si cambia un plan, un precio o cómo funciona el
  producto, cambia acá PRIMERO y después en el hub — o al revés, pero nunca
  sólo en uno. Hoy están desalineados a propósito, a la espera de Cami (ver arriba).
- **`demo/` no es la landing**: es la referencia de diseño del producto. No se
  vende desde ahí.
- Sin framework a propósito. Si algo pide React, probablemente va en el hub.
