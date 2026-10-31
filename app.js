/* ============================================================
   ALQUIMISTIC — interacciones de la landing
   ============================================================ */
(function () {
  "use strict";

  /* ---------- WhatsApp (captura de leads) ----------
     ⬇️  REEMPLAZAR por el número de WhatsApp de Cami en formato
         internacional SIN "+", ej. Chile: 56912345678
     ------------------------------------------------- */
  var WA_NUMBER = "56976102990";
  function waLink(msg) {
    return "https://wa.me/" + WA_NUMBER +
      "?text=" + encodeURIComponent(msg || "Hola Cami, quiero saber más de Alquimistic.");
  }
  Array.prototype.slice.call(document.querySelectorAll("[data-wa]")).forEach(function (el) {
    el.setAttribute("href", waLink(el.getAttribute("data-wa")));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------- Wizard "Crear mi oficina" (la app de Alquimistic) ----------
     Desde el rediseño de 2026-10 la landing es el portafolio de Cami: el
     botón PRIMARIO es conversar por WhatsApp. El wizard queda para quien
     quiere crear su oficina (la app) por su cuenta.

     El dominio propio: quien entra por la landing NO tiene por qué ver el
     nombre del proveedor donde está alojada la app. Un enlace a un *.vercel.app
     en medio de la venta se ve prestado, y además ata el embudo a una URL que
     puede cambiar sola en cualquier redeploy.
     ------------------------------------------------------------------------- */
  var WIZARD_URL = "https://app.alquimistic.com/crear-mi-sistema";
  Array.prototype.slice.call(document.querySelectorAll("[data-wizard]")).forEach(function (el) {
    var sep = WIZARD_URL.indexOf("?") === -1 ? "?" : "&";
    // `nuevo` fuerza al wizard a EMPEZAR DESDE EL INICIO, ignorando cualquier
    // progreso guardado en el navegador. Sin esto, quien ya abrió el wizard
    // antes (o lo completó) volvería a ver su resultado guardado en vez de
    // arrancar limpio — que es justo lo que debe hacer el botón de la landing.
    el.setAttribute("href", WIZARD_URL + sep + "nuevo=1&utm_source=landing");
  });

  /* ---------- Toggle de tema claro/oscuro ---------- */
  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      var next = cur === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("alq-theme", next); } catch (e) {}
    });
  }

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("menu-open");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("menu-open"); });
    });
  }

  /* ---------- Scroll reveal (rect-based, robust) ---------- */
  /* Some preview/screenshot environments freeze CSS transitions, which would
     leave opacity:0 content stuck hidden. We add .in for the animation, then
     verify it actually progressed; if not, we force the final state inline. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  function forceVisible(node) {
    node.style.transition = "none";
    node.style.opacity = "1";
    node.style.transform = "none";
  }
  function reveal(el) {
    el.classList.add("in");
    setTimeout(function () {
      if (parseFloat(getComputedStyle(el).opacity) < 0.85) forceVisible(el);
    }, 720);
  }
  function checkReveals() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = reveals.length - 1; i >= 0; i--) {
      var el = reveals[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        reveal(el);
        reveals.splice(i, 1);
      }
    }
  }
  window.addEventListener("scroll", checkReveals, { passive: true });
  window.addEventListener("resize", checkReveals);
  checkReveals();
  requestAnimationFrame(checkReveals);
  setTimeout(checkReveals, 200);

  /* ---------- Mariposa guía: vuela y se posa recorriendo el scroll ----------
     Una sola mariposa fija que se reubica por sección (alternando lados),
     con aleteo durante el vuelo. No bloquea (pointer-events:none). */
  var fly = document.getElementById("flyBtfly");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (fly && !reduceMotion) {
    // Waypoints relativos al viewport: {x,y como fracción, rot en grados}.
    var spots = {
      top:          { x: 0.74, y: 0.18, rot: -6 },   // hero (sobre la oficina)
      problema:     { x: 0.12, y: 0.30, rot: 9 },
      crear:        { x: 0.86, y: 0.22, rot: -9 },
      proyectos:    { x: 0.10, y: 0.20, rot: 7 },
      oficina:      { x: 0.86, y: 0.26, rot: -11 },
      metamorfosis: { x: 0.50, y: 0.16, rot: 0 },    // la mariposa se posa sobre su propia historia
      formas:       { x: 0.12, y: 0.22, rot: 8 },
      "sobre-mi":   { x: 0.86, y: 0.20, rot: -6 },
      faq:          { x: 0.12, y: 0.26, rot: 9 },
      cta:          { x: 0.50, y: 0.16, rot: 0 }
    };
    var current = "top";

    function place(spot, animate) {
      var vw = window.innerWidth, vh = window.innerHeight;
      var bw = fly.offsetWidth || 80;
      var x = spot.x * vw - bw / 2;
      var y = spot.y * vh - bw / 2;
      // mantener la mariposa siempre visible y debajo del nav
      x = Math.max(8, Math.min(x, vw - bw - 8));
      y = Math.max(74, Math.min(y, vh - bw - 16));
      if (!animate) fly.style.transition = "none";
      fly.style.transform = "translate3d(" + x + "px," + y + "px,0) rotate(" + spot.rot + "deg)";
      if (!animate) { void fly.offsetHeight; fly.style.transition = ""; }
    }

    function flyTo(id) {
      if (id === current) return;
      var spot = spots[id];
      if (!spot) return;
      current = id;
      fly.classList.add("is-flying");
      place(spot, true);
      clearTimeout(fly._land);
      fly._land = setTimeout(function () { fly.classList.remove("is-flying"); }, 1750);
    }

    place(spots.top, false); // posición inicial en el hero

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && spots[e.target.id]) flyTo(e.target.id);
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

    ["problema", "crear", "proyectos", "oficina", "metamorfosis", "formas", "sobre-mi", "faq", "cta"]
      .forEach(function (id) {
        var el = document.getElementById(id);
        if (el) io.observe(el);
      });

    // Volver al hero al llegar arriba del todo
    window.addEventListener("scroll", function () {
      if (window.scrollY < 90 && current !== "top") flyTo("top");
    }, { passive: true });

    window.addEventListener("resize", function () { place(spots[current] || spots.top, false); });
  }
})();
