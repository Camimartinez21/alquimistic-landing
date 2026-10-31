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
    // Perchas: la mariposa se posa en la ESQUINA de un elemento importante de
    // cada sección (un poco hacia afuera, donde no hay texto) y lo acompaña al
    // hacer scroll. ax/ay = esquina (0 izquierda/arriba, 1 derecha/abajo).
    // "movil" = otra percha cuando la pantalla es angosta.
    // Alterna lados: derecha, izquierda, derecha… para que cruce la página.
    var spots = {
      top:          { sel: ".hero-visual", ax: 1, ay: 0, rot: -8, movil: { sel: ".hero-cta", ax: 1, ay: 0, rot: -8 } },
      problema:     { sel: "#problema .section-head .h2", ax: 0, ay: 0, rot: 8 },
      crear:        { sel: "#crear .goals", ax: 1, ay: 0, rot: -9 },
      proyectos:    { sel: '.pc-card[data-pos="0"]', ax: 0, ay: 0, rot: 10 },
      oficina:      { sel: ".office-chat", ax: 1, ay: 0, rot: -8 },
      metamorfosis: { sel: "#metamorfosis .meta-step:first-child", ax: 0, ay: 0, rot: 7 },
      formas:       { sel: "#formas .plan.popular", ax: 1, ay: 0, rot: -10 },
      "sobre-mi":   { sel: ".about-photo", ax: 0, ay: 0, rot: 8 },
      faq:          { sel: "#faq .faq", ax: 1, ay: 0, rot: -6 },
      cta:          { sel: ".cta-box", ax: 0, ay: 0, rot: 8 }
    };
    var current = "top";
    var angosta = window.matchMedia("(max-width: 899px)");
    var volando = null;      // animación de vuelo en curso
    var pos = null;          // última posición aplicada {x, y, rot}

    function destino(spot) {
      if (angosta.matches && spot.movil) spot = spot.movil;
      var vw = window.innerWidth, vh = window.innerHeight;
      var bw = fly.offsetWidth || 80;
      var el = document.querySelector(spot.sel);
      var x, y;
      if (el) {
        var r = el.getBoundingClientRect();
        // centrada en la esquina, corrida un cuarto de su tamaño hacia afuera
        x = r.left + spot.ax * r.width - bw / 2 + (spot.ax ? 1 : -1) * bw * 0.22;
        y = r.top + spot.ay * r.height - bw / 2 - (spot.ay ? -1 : 1) * bw * 0.28;
      } else {
        x = vw * 0.86 - bw / 2; y = vh * 0.2;
      }
      // siempre visible y debajo del nav
      x = Math.max(6, Math.min(x, vw - bw - 6));
      y = Math.max(74, Math.min(y, vh - bw - 16));
      return { x: x, y: y, rot: spot.rot };
    }
    function tf(p) { return "translate3d(" + p.x + "px," + p.y + "px,0) rotate(" + p.rot + "deg)"; }

    function place(spot, animate) {
      if (volando) return; // durante el vuelo manda la curva
      var p = destino(spot);
      pos = p;
      if (!animate) fly.style.transition = "none";
      fly.style.transform = tf(p);
      if (!animate) { void fly.offsetHeight; fly.style.transition = ""; }
    }

    // Vuelo en curva: sube, se mece hacia un lado y baja a su percha,
    // aleteando todo el camino.
    function flyTo(id) {
      if (id === current) return;
      var spot = spots[id];
      if (!spot) return;
      current = id;
      var a = pos || destino(spots.top);
      if (volando) {
        // cambia de rumbo en pleno vuelo: parte desde donde va ahora
        var m = new DOMMatrix(getComputedStyle(fly).transform);
        a = { x: m.m41, y: m.m42, rot: Math.round(Math.atan2(m.b, m.a) * 180 / Math.PI) };
      }
      var b = destino(spot);
      var dx = b.x - a.x, dy = b.y - a.y;
      var vaiven = (dx === 0 ? 1 : Math.sign(dx)) * Math.max(40, Math.abs(dx) * 0.18);
      var vh = window.innerHeight;
      // Sube en arco si hay cielo arriba; si está pegada al borde, baja en
      // picada y vuelve a subir (como vuela una mariposa de verdad).
      var alto = Math.min(a.y, b.y) - 90 - Math.abs(dx) * 0.12;
      var ola = -18;
      if (alto < 110) { alto = Math.max(a.y, b.y) + 120 + Math.abs(dx) * 0.1; ola = 22; }
      alto = Math.max(80, Math.min(alto, vh * 0.72));
      var p1 = { x: a.x + dx * 0.28 - vaiven * 0.4, y: alto - ola, rot: a.rot - 16 * Math.sign(dx || 1) };
      var p2 = { x: a.x + dx * 0.62 + vaiven, y: alto + ola, rot: b.rot + 14 * Math.sign(dx || 1) };
      var p3 = { x: b.x - vaiven * 0.25, y: b.y - 34, rot: b.rot - 6 };

      if (volando) volando.cancel();
      fly.classList.remove("is-perched");
      fly.classList.add("is-flying");
      fly.style.transition = "none";
      volando = fly.animate([
        { transform: tf(a) },
        { transform: tf(p1), offset: 0.32 },
        { transform: tf(p2), offset: 0.64 },
        { transform: tf(p3), offset: 0.86 },
        { transform: tf(b) }
      ], { duration: 1900, easing: "cubic-bezier(.45,.05,.3,1)", fill: "forwards" });
      pos = b;
      volando.onfinish = function () {
        fly.style.transform = tf(b);
        volando.cancel();
        volando = null;
        fly.style.transition = "";
        fly.classList.remove("is-flying");
        fly.classList.add("is-perched");
        place(spots[current], true); // por si hubo scroll durante el vuelo
      };
    }

    // Mientras está posada, sigue a su elemento al hacer scroll (y al girar el carrusel)
    var follow = false;
    function seguir() {
      follow = false;
      place(spots[current] || spots.top, true);
    }
    function pedirSeguir() { if (!follow) { follow = true; requestAnimationFrame(seguir); } }
    window.addEventListener("scroll", pedirSeguir, { passive: true });
    setInterval(function () { if (current === "proyectos") pedirSeguir(); }, 800);

    place(spots.top, false); // posición inicial en el hero
    fly.classList.add("is-perched");

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

  /* ---------- Carrusel de proyectos ----------
     Píldoras a la izquierda, tarjetas apiladas a la derecha. Avanza solo cada
     5,5 s, se pausa al pasar el mouse o al enfocar, y no se mueve solo si la
     persona pidió menos movimiento. */
  var pc = document.querySelector("[data-pc]");
  if (pc) {
    var pcPills = Array.prototype.slice.call(pc.querySelectorAll(".pc-pill"));
    var pcCards = Array.prototype.slice.call(pc.querySelectorAll(".pc-card"));
    var pcN = pcCards.length, pcCur = 0, pcTimer = null;
    var pcCalm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function pcOff(i) {
      var d = i - pcCur;
      if (d > pcN / 2) d -= pcN;
      if (d < -pcN / 2) d += pcN;
      return d;
    }
    function pcShow(i) {
      pcCur = (i + pcN) % pcN;
      pcCards.forEach(function (c, k) {
        var d = pcOff(k);
        c.setAttribute("data-pos", d === 0 ? "0" : d === -1 ? "-1" : d === 1 ? "1" : "far");
        c.setAttribute("aria-hidden", d === 0 ? "false" : "true");
        Array.prototype.forEach.call(c.querySelectorAll("a"), function (a) { a.tabIndex = d === 0 ? 0 : -1; });
      });
      pcPills.forEach(function (b, k) {
        var d = pcOff(k);
        b.style.setProperty("--d", d);
        b.classList.toggle("is-on", d === 0);
        b.setAttribute("aria-selected", d === 0 ? "true" : "false");
        b.tabIndex = d === 0 ? 0 : -1;
      });
      // En celular las píldoras van en fila: mover la fila hasta la activa (sin mover la página)
      var list = pc.querySelector(".pc-list");
      if (list.scrollWidth > list.clientWidth + 4) {
        list.scrollTo({ left: Math.max(0, pcPills[pcCur].offsetLeft - 18), behavior: "smooth" });
      }
    }
    function pcStop() { if (pcTimer) { clearInterval(pcTimer); pcTimer = null; } }
    function pcPlay() {
      pcStop();
      if (!pcCalm) pcTimer = setInterval(function () { pcShow(pcCur + 1); }, 5500);
    }

    pcPills.forEach(function (b, k) {
      b.addEventListener("click", function () { pcShow(k); pcPlay(); });
    });
    pcCards.forEach(function (c, k) {
      c.addEventListener("click", function (e) {
        if (c.getAttribute("data-pos") !== "0") { e.preventDefault(); pcShow(k); pcPlay(); }
      });
    });
    pc.querySelector(".pc-list").addEventListener("keydown", function (e) {
      var go = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!go) return;
      e.preventDefault();
      pcShow(pcCur + go);
      pcPills[pcCur].focus();
      pcPlay();
    });

    // Deslizar con el dedo en el celular
    var pcX = null;
    var pcStage = pc.querySelector(".pc-stage");
    pcStage.addEventListener("touchstart", function (e) { pcX = e.touches[0].clientX; }, { passive: true });
    pcStage.addEventListener("touchend", function (e) {
      if (pcX === null) return;
      var dx = e.changedTouches[0].clientX - pcX;
      pcX = null;
      if (Math.abs(dx) > 40) { pcShow(pcCur + (dx < 0 ? 1 : -1)); pcPlay(); }
    });

    pc.addEventListener("mouseenter", pcStop);
    pc.addEventListener("mouseleave", pcPlay);
    pc.addEventListener("focusin", pcStop);
    pc.addEventListener("focusout", function (e) { if (!pc.contains(e.relatedTarget)) pcPlay(); });

    pcShow(0);
    pcPlay();
  }
})();
