/* ============================================================
   ALQUIMISTIC HUB — BUSINESS OS · app shell
   Router, tema claro/oscuro, command palette, asistente IA.
   ============================================================ */
(function () {
  "use strict";
  var I = BOS.icon, M = BOS.modules;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ---------- nav groups ---------- */
  var GROUPS = [
    { label: "Principal", items: ["panel", "clientes", "proyectos", "finanzas", "calendario"] },
    { label: "Inteligencia", items: ["agentes", "operaciones", "documentos"] }
  ];
  var BADGES = { clientes: "2", proyectos: "7" };

  /* ============================================================
     THEME
     ============================================================ */
  var THEME_KEY = "bos-theme";
  function getTheme() { return localStorage.getItem(THEME_KEY) || "dark"; }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(THEME_KEY, t);
    var btn = $("#themeToggle");
    if (btn) btn.innerHTML = t === "dark" ? I("sun") : I("moon");
    // sync any open metas
    var label = $("#themeLabel"); if (label) label.textContent = t === "dark" ? "Modo oscuro" : "Modo claro";
    window.dispatchEvent(new CustomEvent("bos-theme", { detail: t }));
  }
  function toggleTheme() { applyTheme(getTheme() === "dark" ? "light" : "dark"); }
  applyTheme(getTheme());
  BOS.applyTheme = applyTheme;
  BOS.getTheme = getTheme;

  /* ============================================================
     BUILD SHELL
     ============================================================ */
  function buildSidebar() {
    var html = GROUPS.map(function (g) {
      var items = g.items.map(function (id) {
        var m = M[id];
        return '<button class="nav-item" data-nav="' + id + '">' + I(m.icon) + '<span>' + m.title + '</span>'
          + (BADGES[id] ? '<span class="badge">' + BADGES[id] + '</span>' : "") + '</button>';
      }).join("");
      return '<div class="side-group"><div class="side-label">' + g.label + '</div>' + items + '</div>';
    }).join("");
    $("#sideNav").innerHTML = html;
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  var current = null;
  function navTo(id) {
    if (!M[id]) id = "panel";
    current = id;
    var m = M[id];
    // active states
    document.querySelectorAll(".nav-item").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-nav") === id);
    });
    // topbar
    $("#topTitle").textContent = m.title;
    $("#topCrumb").innerHTML = BOS.company + ' <span style="opacity:.5">/</span> ' + m.crumb;
    // content
    var c = $("#content");
    c.scrollTop = 0;
    var view = document.createElement("div");
    view.className = "view view-enter";
    view.innerHTML = m.render();
    c.innerHTML = "";
    c.appendChild(view);
    bindViewEvents();
    location.hash = id;
    closeSidebar();
  }

  /* ---------- per-view interactivity ---------- */
  function bindViewEvents() {
    // tasks toggle
    document.querySelectorAll("[data-task]").forEach(function (t) {
      t.addEventListener("click", function () { t.classList.toggle("done"); });
    });
    // segmented panels (CRM pipe/list)
    var seg = $("#crmSeg");
    if (seg) {
      seg.querySelectorAll("[data-seg]").forEach(function (b) {
        b.addEventListener("click", function () {
          seg.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
          var k = b.getAttribute("data-seg");
          document.querySelectorAll("[data-seg-panel]").forEach(function (p) {
            p.hidden = p.getAttribute("data-seg-panel") !== k;
          });
        });
      });
    }
    // generic segmented (visual only)
    document.querySelectorAll(".seg:not(#crmSeg)").forEach(function (s) {
      s.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () { s.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); }); });
      });
    });
    // agent + automation switches
    document.querySelectorAll("[data-agent-switch],[data-auto-switch]").forEach(function (sw) {
      sw.addEventListener("click", function (e) { e.stopPropagation(); sw.classList.toggle("on"); });
    });
    // nav buttons inside content
    document.querySelectorAll("#content [data-nav]").forEach(function (b) {
      b.addEventListener("click", function () { navTo(b.getAttribute("data-nav")); });
    });
    // ai open buttons inside content
    document.querySelectorAll("#content [data-ai-open]").forEach(function (b) {
      b.addEventListener("click", function () { openAI(); });
    });
  }

  /* ============================================================
     SIDEBAR (mobile)
     ============================================================ */
  function openSidebar() { $("#side").classList.add("open"); $("#sideScrim").classList.add("show"); }
  function closeSidebar() { $("#side").classList.remove("open"); $("#sideScrim").classList.remove("show"); }

  /* ============================================================
     COMMAND PALETTE
     ============================================================ */
  var CMDS = [];
  function buildCmds() {
    CMDS = [];
    GROUPS.forEach(function (g) {
      g.items.forEach(function (id) {
        CMDS.push({ type: "nav", id: id, icon: M[id].icon, title: "Ir a " + M[id].title, sub: M[id].crumb });
      });
    });
    BOS.aiSuggestions.forEach(function (q) {
      CMDS.push({ type: "ai", q: q, icon: "sparkle", title: q, sub: "Preguntar al asistente IA" });
    });
    CMDS.push({ type: "theme", icon: "moon", title: "Cambiar tema (claro / oscuro)", sub: "Apariencia" });
  }
  var cmdSel = 0, cmdFiltered = [];
  function openCmd() {
    buildCmds();
    $("#cmdkScrim").classList.add("show");
    var inp = $("#cmdkInput"); inp.value = ""; renderCmd(""); inp.focus();
  }
  function closeCmd() { $("#cmdkScrim").classList.remove("show"); }
  function renderCmd(q) {
    q = q.toLowerCase().trim();
    cmdFiltered = CMDS.filter(function (c) { return !q || c.title.toLowerCase().indexOf(q) > -1 || c.sub.toLowerCase().indexOf(q) > -1; });
    cmdSel = 0;
    var groups = { nav: [], ai: [], theme: [] };
    cmdFiltered.forEach(function (c, i) { c._i = i; groups[c.type].push(c); });
    var html = "";
    function sec(label, arr) {
      if (!arr.length) return "";
      return '<div class="cmdk-sec">' + label + '</div>' + arr.map(function (c) {
        return '<div class="cmdk-item ' + (c.type === "ai" ? "ai" : "") + (c._i === cmdSel ? " sel" : "") + '" data-ci="' + c._i + '">'
          + '<span class="ci">' + I(c.icon) + '</span><div><div class="ct">' + c.title + '</div><div class="cs">' + c.sub + '</div></div>'
          + '<span class="go">↵</span></div>';
      }).join("");
    }
    html += sec("Navegar", groups.nav);
    html += sec("Preguntar a la IA", groups.ai);
    html += sec("Acciones", groups.theme);
    if (!cmdFiltered.length) html = '<div class="cmdk-sec">Sin resultados</div>';
    $("#cmdkList").innerHTML = html;
    bindCmdItems();
  }
  function bindCmdItems() {
    document.querySelectorAll("#cmdkList .cmdk-item").forEach(function (el) {
      el.addEventListener("mousemove", function () {
        cmdSel = parseInt(el.getAttribute("data-ci"));
        document.querySelectorAll("#cmdkList .cmdk-item").forEach(function (x) { x.classList.toggle("sel", x === el); });
      });
      el.addEventListener("click", function () { runCmd(cmdFiltered[parseInt(el.getAttribute("data-ci"))]); });
    });
  }
  function runCmd(c) {
    if (!c) return;
    closeCmd();
    if (c.type === "nav") navTo(c.id);
    else if (c.type === "theme") toggleTheme();
    else if (c.type === "ai") { openAI(); setTimeout(function () { askAI(c.q); }, 350); }
  }
  function moveCmd(d) {
    if (!cmdFiltered.length) return;
    cmdSel = (cmdSel + d + cmdFiltered.length) % cmdFiltered.length;
    document.querySelectorAll("#cmdkList .cmdk-item").forEach(function (x) {
      var on = parseInt(x.getAttribute("data-ci")) === cmdSel;
      x.classList.toggle("sel", on);
      if (on) x.scrollIntoView({ block: "nearest" });
    });
  }

  /* ============================================================
     AI ASSISTANT (triangle)
     ============================================================ */
  function openAI() {
    $("#aiPanel").classList.add("open");
    $("#aiScrim").classList.add("show");
    setTimeout(function () { $("#aiInput").focus(); }, 200);
  }
  function closeAI() { $("#aiPanel").classList.remove("open"); $("#aiScrim").classList.remove("show"); }

  function aiBubble(text, who) {
    var body = $("#aiBody");
    var el = document.createElement("div");
    el.className = "ai-msg " + who;
    el.innerHTML = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }
  function askAI(q) {
    aiBubble(q, "user");
    var typing = document.createElement("div");
    typing.className = "ai-msg bot ai-typing";
    typing.innerHTML = "<i></i><i></i><i></i>";
    $("#aiBody").appendChild(typing);
    $("#aiBody").scrollTop = $("#aiBody").scrollHeight;
    setTimeout(function () {
      typing.remove();
      var reply = BOS.aiReplies[q] || BOS.aiReplies._default;
      aiBubble(reply, "bot");
    }, 850 + Math.random() * 500);
  }
  function renderAIChips() {
    return '<div class="ai-chips">' + BOS.aiSuggestions.map(function (q) {
      return '<button class="ai-chip" data-ai-q="' + q.replace(/"/g, "&quot;") + '">' + q + '</button>';
    }).join("") + '</div>';
  }
  function initAI() {
    var body = $("#aiBody");
    body.innerHTML = "";
    aiBubble('Hola Camila ✦ Soy tu <b>asistente Alquimistic</b>. Estoy conectado a todo tu negocio en tiempo real. ¿Por dónde empezamos?', "bot");
    var chips = document.createElement("div");
    chips.className = "ai-msg bot";
    chips.style.background = "transparent";
    chips.style.border = "none";
    chips.style.padding = "0";
    chips.style.maxWidth = "100%";
    chips.innerHTML = renderAIChips();
    body.appendChild(chips);
    bindAIChips();
  }
  function bindAIChips() {
    document.querySelectorAll("[data-ai-q]").forEach(function (b) {
      b.addEventListener("click", function () { askAI(b.getAttribute("data-ai-q")); });
    });
  }

  /* ============================================================
     EVENTS
     ============================================================ */
  function bindShell() {
    // sidebar nav
    document.querySelectorAll("#sideNav [data-nav]").forEach(function (b) {
      b.addEventListener("click", function () { navTo(b.getAttribute("data-nav")); });
    });
    $("#themeToggle").addEventListener("click", toggleTheme);
    $("#menuBtn").addEventListener("click", openSidebar);
    $("#sideScrim").addEventListener("click", closeSidebar);
    // search triggers
    $("#sideSearch").addEventListener("click", openCmd);
    $("#topSearch").addEventListener("click", openCmd);
    // AI
    $("#aiFab").addEventListener("click", openAI);
    document.querySelectorAll(".topbar [data-ai-open]").forEach(function (b) { b.addEventListener("click", openAI); });
    $("#aiClose").addEventListener("click", closeAI);
    $("#aiScrim").addEventListener("click", closeAI);
    $("#aiSend").addEventListener("click", sendAI);
    $("#aiInput").addEventListener("keydown", function (e) { if (e.key === "Enter") sendAI(); });
    // cmdk
    $("#cmdkScrim").addEventListener("click", function (e) { if (e.target === $("#cmdkScrim")) closeCmd(); });
    $("#cmdkInput").addEventListener("input", function (e) { renderCmd(e.target.value); });

    // global keys
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#cmdkScrim").classList.contains("show") ? closeCmd() : openCmd(); return; }
      if ($("#cmdkScrim").classList.contains("show")) {
        if (e.key === "Escape") closeCmd();
        else if (e.key === "ArrowDown") { e.preventDefault(); moveCmd(1); }
        else if (e.key === "ArrowUp") { e.preventDefault(); moveCmd(-1); }
        else if (e.key === "Enter") { e.preventDefault(); runCmd(cmdFiltered[cmdSel]); }
        return;
      }
      if (e.key === "Escape") { closeAI(); closeSidebar(); }
    });
  }
  function sendAI() {
    var inp = $("#aiInput");
    var v = inp.value.trim();
    if (!v) return;
    inp.value = "";
    askAI(v);
  }

  /* ============================================================
     INIT
     ============================================================ */
  buildSidebar();
  bindShell();
  initAI();
  navTo((location.hash || "").replace("#", "") || "panel");
})();
