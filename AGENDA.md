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
| `[pantallazo de Soberana]`, `[pantallazo de Minissimas]`, `[pantallazo de Colego]` | `index.html`, sección Proyectos. Guardar en `assets/proyectos/` y cambiar el `<div class="shot-placeholder">` por el `<img>` que está comentado justo arriba |
| `"[frase de Oppa]"` | Proyecto Soberana |
| `[$ precio]` | Plan Mariposa, en `index.html` **y** en `llms.txt` |
| `[foto de Cami]` | Sección Sobre mí (`assets/cami.jpg`, igual que los pantallazos) |

### ⚠️ La app todavía vende otra cosa

`llms.txt` ya dice lo nuevo (Oruga gratis / Mariposa al mes / proyecto a
medida). **El hub no se tocó** (Cami pidió trabajar sólo en la landing):
el wizard sigue recomendando Semilla / Alquimia / Expande y
`src/lib/planes.ts` sigue con esos tres planes en pesos. Alinearlos es la
próxima conversación con Cami, cuando decida el precio de Mariposa.

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

- **`llms.txt` es el canon.** Si cambia un plan, un precio o cómo funciona el
  producto, cambia acá PRIMERO y después en el hub — o al revés, pero nunca
  sólo en uno. Hoy están desalineados a propósito, a la espera de Cami (ver arriba).
- **`demo/` no es la landing**: es la referencia de diseño del producto. No se
  vende desde ahí.
- Sin framework a propósito. Si algo pide React, probablemente va en el hub.
