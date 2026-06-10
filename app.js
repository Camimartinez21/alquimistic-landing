/* ============================================================
   ALQUIMISTIC BUSINESS OS — interactions
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
      "?text=" + encodeURIComponent(msg || "Hola Cami ✦ Quiero saber más de Alquimistic.");
  }
  Array.prototype.slice.call(document.querySelectorAll("[data-wa]")).forEach(function (el) {
    el.setAttribute("href", waLink(el.getAttribute("data-wa")));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
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

  /* ---------- Pricing toggle ---------- */
  var pt = document.getElementById("priceToggle");
  var track = document.getElementById("toggleTrack");
  if (track) {
    function setBilling(annual) {
      pt.classList.toggle("annual", annual);
      pt.querySelector("[data-m]").classList.toggle("on", !annual);
      pt.querySelector("[data-a]").classList.toggle("on", annual);
      document.querySelectorAll(".plan").forEach(function (plan) {
        var amt = plan.querySelector(".amt");
        var note = plan.querySelector("[data-note]");
        if (!amt) return;
        var val = annual ? amt.getAttribute("data-annual") : amt.getAttribute("data-price");
        amt.textContent = "$" + val;
        if (note) note.textContent = annual ? "facturado anualmente" : "";
      });
    }
    track.addEventListener("click", function () { setBilling(!pt.classList.contains("annual")); });
    setBilling(false);
  }

  /* ---------- Modules (data-driven tabs) ---------- */
  var ck = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5 9-11"/></svg>';
  var modules = [
    {
      id: "crm", name: "CRM", tag: "Clientes",
      icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/>',
      title: "Todos tus clientes, una sola memoria.",
      desc: "Cada conversación, propuesta y compromiso conectado al contacto correcto. La IA prioriza a quién atender hoy.",
      points: ["Pipeline visual de oportunidades", "Seguimientos automáticos y recordatorios", "Historial completo por cliente"],
      visual: crmVisual()
    },
    {
      id: "proyectos", name: "Proyectos", tag: "Ejecución",
      icon: '<path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
      title: "Proyectos que avanzan solos.",
      desc: "Tableros, tareas y entregables en un mismo lugar. Asigna, da seguimiento y entrega a tiempo, siempre.",
      points: ["Tableros Kanban y vistas de lista", "Asignación y dependencias claras", "Plantillas de proyectos reutilizables"],
      visual: kanbanVisual()
    },
    {
      id: "finanzas", name: "Finanzas", tag: "Control",
      icon: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
      title: "Tu flujo de caja, sin sorpresas.",
      desc: "Facturas, ingresos y gastos conciliados automáticamente. La IA anticipa tu liquidez antes de que sea un problema.",
      points: ["Facturación y cobros automatizados", "Proyección de flujo de caja con IA", "Reportes financieros en tiempo real"],
      visual: financeVisual()
    },
    {
      id: "operaciones", name: "Operaciones", tag: "Procesos",
      icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
      title: "Procesos que se ejecutan solos.",
      desc: "Diseña flujos una vez y deja que la plataforma los repita sin errores. Menos trabajo manual, más consistencia.",
      points: ["Automatizaciones sin código", "Disparadores entre módulos", "Plantillas de procesos listas"],
      visual: opsVisual()
    },
    {
      id: "docs", name: "Bóveda", tag: "",
      icon: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5V10"/><path d="M12 14v1.5"/><path d="M8.5 12H10"/><path d="M14 12h1.5"/>',
      title: "", desc: "", points: [],
      boveda: true,
      image: "assets/vault-butterfly.png"
    },
    {
      id: "calendario", name: "Calendario", tag: "Tiempo",
      icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>',
      title: "Tu tiempo, organizado por ti y por la IA.",
      desc: "Reuniones, entregas y tareas en una sola línea de tiempo. La IA protege tus bloques de enfoque.",
      points: ["Agenda unificada de todo el negocio", "Programación inteligente de reuniones", "Recordatorios y bloques de enfoque"],
      visual: calVisual()
    },
    {
      id: "ia", name: "IA & Agentes", tag: "Inteligencia",
      icon: '<path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
      title: "Una capa de IA sobre todo tu negocio.",
      desc: "Los agentes leen tus datos reales, sugieren acciones y ejecutan tareas. Tu negocio piensa contigo.",
      points: ["Agentes especializados por área", "Acciones ejecutadas automáticamente", "Respuestas basadas en tus datos"],
      visual: aiVisual()
    }
  ];

  function crmVisual() {
    return '<div class="mv-card"><div class="pt" style="display:flex;justify-content:space-between;margin-bottom:12px"><b style="font-size:12.5px">Pipeline</b><span class="pill" style="font-size:10px;color:var(--gold-1);border:1px solid var(--border-strong);padding:2px 8px;border-radius:100px">$128k abiertos</span></div>'
      + kanbanCols([
        ["Nuevos", ["Estudio Lumen", "Café del Valle"], "var(--text-3)"],
        ["Propuesta", ["Agencia Norte"], "var(--gold-2)"],
        ["Ganado", ["Boutique Sol"], "var(--teal)"]
      ]) + '</div>';
  }
  function kanbanVisual() {
    return '<div class="mv-card">' + kanbanCols([
      ["Por hacer", ["Brief inicial", "Wireframes"], "var(--text-3)"],
      ["En curso", ["Diseño UI", "Copy web"], "var(--gold-2)"],
      ["Hecho", ["Kickoff"], "var(--teal)"]
    ]) + '</div>';
  }
  function kanbanCols(cols) {
    var h = '<div class="kanban">';
    cols.forEach(function (c) {
      h += '<div class="col"><div class="h">' + c[0] + '</div>';
      c[1].forEach(function (t) { h += '<div class="t"><span class="tag" style="background:' + c[2] + '"></span>' + t + '</div>'; });
      h += '</div>';
    });
    return h + '</div>';
  }
  function financeVisual() {
    return '<div class="mv-card"><div style="display:flex;justify-content:space-between;margin-bottom:14px"><b style="font-size:12.5px">Flujo de caja</b><span style="font-size:11px;color:var(--teal)">Proyección IA ▲</span></div>'
      + '<div class="bars" style="height:120px"><div class="bar" style="height:40%"></div><div class="bar" style="height:55%"></div><div class="bar" style="height:50%"></div><div class="bar" style="height:72%"></div><div class="bar" style="height:64%"></div><div class="bar t" style="height:90%"></div></div>'
      + '<div style="display:flex;justify-content:space-between;margin-top:14px;font-size:11.5px;color:var(--text-3)"><span>Ingresos <b style="color:var(--gold-1)">$48.2k</b></span><span>Gastos <b style="color:var(--text-2)">$19.7k</b></span><span>Neto <b style="color:var(--teal)">$28.5k</b></span></div></div>';
  }
  function opsVisual() {
    return '<div class="mv-card"><b style="font-size:12.5px">Automatización activa</b>'
      + '<div class="feed" style="margin-top:14px">'
      + feedRow("ai", "Nuevo cliente", "→ crea proyecto + carpeta de docs")
      + feedRow("teal", "Factura pagada", "→ marca tarea y notifica al equipo")
      + feedRow("dim", "Proyecto cerrado", "→ envía encuesta de satisfacción")
      + '</div></div>';
  }
  function feedRow(cls, a, b) {
    return '<div class="feed-item"><span class="av ' + cls + '">⚡</span><span class="ft"><b>' + a + '</b> ' + b + '</span></div>';
  }
  function calVisual() {
    var days = ["L", "M", "X", "J", "V"];
    var h = '<div class="mv-card"><b style="font-size:12.5px">Esta semana</b><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:14px">';
    var ev = [["Kickoff", "var(--gold-2)"], ["", ""], ["Entrega", "var(--teal)"], ["1:1 equipo", "var(--gold-2)"], ["Enfoque", "#d8d5cd"]];
    days.forEach(function (d, i) {
      h += '<div style="text-align:center"><div style="font-size:10px;color:var(--text-faint);margin-bottom:6px">' + d + '</div><div style="height:64px;background:var(--inset);border:1px solid var(--border);border-radius:8px;padding:5px">' + (ev[i][0] ? '<div style="font-size:9px;background:' + ev[i][1] + ';color:#10100a;border-radius:4px;padding:3px 4px;line-height:1.1">' + ev[i][0] + '</div>' : '') + '</div></div>';
    });
    return h + '</div></div>';
  }
  function aiVisual() {
    return '<div class="mv-card"><div style="display:flex;gap:9px;align-items:center;margin-bottom:14px"><span class="av ai" style="width:26px;height:26px;border-radius:8px;display:grid;place-items:center;font-size:11px;font-weight:700">✦</span><b style="font-size:12.5px">Agente CEO · resumen de hoy</b></div>'
      + '<div class="feed">'
      + feedRow("teal", "Ingresos", "18% por encima del objetivo mensual")
      + feedRow("ai", "Atención", "3 clientes sin seguimiento &gt; 5 días")
      + feedRow("dim", "Siguiente acción", "Activar campaña de reactivación")
      + '</div></div>';
  }

  var tabsEl = document.getElementById("modTabs");
  var stageEl = document.getElementById("modStage");
  if (tabsEl && stageEl) {
    modules.forEach(function (m, i) {
      var btn = document.createElement("button");
      btn.className = "mod-tab" + (i === 0 ? " active" : "");
      btn.setAttribute("data-target", m.id);
      btn.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' + m.icon + '</svg>' + m.name;
      tabsEl.appendChild(btn);

      var panel = document.createElement("div");
      panel.className = "mod-panel" + (i === 0 ? " active" : "") + (m.boveda ? " mod-boveda" : "");
      panel.id = "panel-" + m.id;
      if (m.boveda) {
        panel.innerHTML = '<div class="boveda-stage"><span class="boveda-glow"></span><img src="' + m.image + '" alt="Bóveda Alquimistic" loading="lazy" /></div>';
      } else {
        var lis = m.points.map(function (p) { return '<li>' + ck + p + '</li>'; }).join("");
        panel.innerHTML =
          '<div class="mod-copy"><span class="tag">' + m.tag + '</span><h3>' + m.title + '</h3><p>' + m.desc + '</p><ul>' + lis + '</ul></div>'
          + '<div class="mod-visual">' + m.visual + '</div>';
      }
      stageEl.appendChild(panel);
    });

    tabsEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".mod-tab");
      if (!btn) return;
      var id = btn.getAttribute("data-target");
      tabsEl.querySelectorAll(".mod-tab").forEach(function (b) { b.classList.toggle("active", b === btn); });
      stageEl.querySelectorAll(".mod-panel").forEach(function (p) { p.classList.toggle("active", p.id === "panel-" + id); });
    });
  }
})();
