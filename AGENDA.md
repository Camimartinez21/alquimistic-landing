# 📋 AGENDA — la landing de Alquimistic

> Compañera de `AGENDA.md` y `NORTE.md` del repo **alquimistic-hub-app**, que
> es donde vive el producto. Este repo es sólo la vitrina.

## 🔴 LEE ESTO PRIMERO — estado al 2026-08-27

### Ya está todo mergeado

El 2026-08-27 se mergeó el PR #2 junto con el PR #14 del hub. `main` ya tiene
el botón del wizard apuntando al dominio propio y estos documentos. No queda
trabajo esperando afuera.

Si al abrir www.alquimistic.com el botón todavía te lleva a un `*.vercel.app`,
es la caché del navegador: recarga forzado (Ctrl+Shift+R).

### ⚠️ Dos textos que ya NO son ciertos

`llms.txt` es, según `NORTE.md` del hub, **la definición canónica del producto
y los planes**. Hoy dice dos cosas que el producto dejó de hacer:

1. **Precios en dólares** (US$29 / 79 / 189). El 2026-08-25 Cami decidió
   **cobrar en pesos**: 29.000 / 79.000 / 189.000 CLP, por Flow. La app ya
   muestra pesos (`src/lib/planes.ts` en el hub, campo `precioClp`). La landing
   todavía no. **Es decisión de Cami** cambiar los precios de su página
   pública — no se tocó sin preguntarle.
2. **"Instalación inicial desde $79"**. En el wizard ese cobro aparte se sacó:
   ahora la instalación se cuenta como parte del servicio ("la hacemos
   contigo"), no como un pago único. La landing sigue ofreciéndola como cobro.

Quien retome esto: preguntarle a Cami qué quiere que diga la landing antes de
tocar precios. Son su página de venta.

## Qué hay en este repo

```
index.html            la venta. 5 botones con `data-wizard` van al wizard
app.js                el JS de la landing. Ahí vive WIZARD_URL
llms.txt              ⚠️ definición CANÓNICA del producto y los planes
theme.css             tokens (claro/oscuro)
styles.css            base
styles-sections.css   secciones
demo/                 "Estudio Camila" — la REFERENCIA VISUAL del producto.
                      El OS real debe sentirse así (ver NORTE del hub).
assets/               imágenes
```

Es un sitio **estático**: HTML, CSS y un `app.js` sin framework ni build. No
hay `package.json` ni tests. Se despliega solo al pushear.

### El embudo

```
alquimistic.com  →  botón "Crea tu sistema"  →  app.alquimistic.com/crear-mi-sistema
                 →  botón secundario         →  WhatsApp de Cami (wa.me/56976102990)
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
  sólo en uno. Los dos documentos hoy están desalineados (ver arriba).
- **`demo/` no es la landing**: es la referencia de diseño del producto. No se
  vende desde ahí.
- Sin framework a propósito. Si algo pide React, probablemente va en el hub.
