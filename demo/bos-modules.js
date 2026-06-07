/* ============================================================
   ALQUIMISTIC HUB — BUSINESS OS · módulos (render)
   Cada módulo expone { title, sub, render() }.
   ============================================================ */
window.BOS = window.BOS || {};
(function () {
  var I = BOS.icon, D = BOS;

  /* ---------- shared helpers ---------- */
  function face(i, cls) {
    var c = D.faceColors[i % D.faceColors.length];
    var letters = ["EL","CV","AN","MC","VM","BS","CM","XX"];
    return '<span class="face ' + (cls || "") + '" style="background:' + c + '">' + (letters[i] || "··") + '</span>';
  }
  function faces(arr) {
    return '<span class="faces">' + arr.map(function (i) { return face(i, "sm"); }).join("") + '</span>';
  }
  function spark(vals) {
    var max = Math.max.apply(null, vals);
    return '<span class="spark">' + vals.map(function (v, i) {
      return '<i class="' + (i === vals.length - 1 ? "t" : "") + '" style="height:' + Math.round(v / max * 22) + 'px"></i>';
    }).join("") + '</span>';
  }

  /* ============================================================
     PANEL (dashboard)
     ============================================================ */
  function panel() {
    var kpis = D.kpis.map(function (k) {
      return '<div class="card kpi"><div class="pad">'
        + '<div class="k"><span class="gi">' + I(k.icon) + '</span>' + k.k + '</div>'
        + '<div class="v ' + (k.gold ? "gold" : "") + ' mono">' + k.v + '</div>'
        + '<div class="foot"><span class="delta ' + (k.up ? "up" : "down") + '">' + (k.up ? "▲" : "▼") + ' ' + k.delta + ' <span class="muted" style="font-weight:500">' + k.foot + '</span></span>'
        + spark(k.spark) + '</div>'
        + '</div></div>';
    }).join("");

    var rv = D.revenue, rmax = Math.max.apply(null, rv.values);
    var bars = rv.values.map(function (v, i) {
      return '<div class="col"><div class="bar ' + (i === rv.highlight ? "t" : "") + '" style="height:' + Math.round(v / rmax * 100) + '%"></div><span class="lbl">' + rv.labels[i] + '</span></div>';
    }).join("");

    var feed = D.activity.map(function (a) {
      return '<div class="feed-item"><span class="feed-av ' + a.av + '">' + initials(a.who) + '</span>'
        + '<div class="feed-tx"><b>' + a.who + '</b> ' + a.t + ' <span class="ago">· ' + a.ago + '</span></div></div>';
    }).join("");

    var tasks = D.tasks.map(function (t, i) {
      return '<div class="task ' + (t.done ? "done" : "") + '" data-task="' + i + '"><span class="chk">' + I("check", 2.5) + '</span>'
        + '<span class="tt">' + t.t + '</span><span class="meta">' + t.meta + '</span></div>';
    }).join("");

    return ''
      + '<div class="between" style="margin-bottom:20px"><div>'
      + '<h2 style="font-size:24px">Buenos días, ' + D.user.name + ' <span class="gold-text">✦</span></h2>'
      + '<p class="muted" style="font-size:13.5px;margin-top:4px">Esto es lo que pasó en ' + D.company + ' mientras no estabas.</p></div>'
      + '<button class="btn btn-primary btn-sm" data-ai-open>' + I("sparkle") + ' Preguntar a la IA</button></div>'

      + '<div class="kpis" style="margin-bottom:16px">' + kpis + '</div>'

      + '<div class="grid-2">'
      + '  <div class="card pad"><div class="between" style="margin-bottom:6px"><div><h3 style="font-size:16px">Flujo de ingresos</h3><p class="muted" style="font-size:12.5px;margin-top:2px">Últimos 6 meses · en miles</p></div>'
      + '    <span class="pill gold">' + I("sparkle") + ' IA: tendencia +18%</span></div>'
      + '    <div class="bars">' + bars + '</div>'
      + '    <div class="legend" style="margin-top:14px"><span class="it"><span class="sw" style="background:var(--gold-2)"></span>Real</span><span class="it"><span class="sw" style="background:var(--teal)"></span>Mes actual</span></div>'
      + '  </div>'
      + '  <div class="card pad"><div class="between" style="margin-bottom:10px"><h3 style="font-size:16px">Actividad de agentes</h3><span class="st active"><span class="d"></span>5 activos</span></div>'
      + '    <div class="feed">' + feed + '</div></div>'
      + '</div>'

      + '<div class="grid-2" style="margin-top:16px">'
      + '  <div class="card pad"><div class="between" style="margin-bottom:8px"><h3 style="font-size:16px">Tareas de hoy</h3><span class="muted" style="font-size:12.5px">3 pendientes</span></div>'
      + '    <div>' + tasks + '</div></div>'
      + '  <div class="card pad" style="background:linear-gradient(150deg,var(--gold-soft-2),transparent)">'
      + '    <div class="row" style="margin-bottom:10px"><span class="feed-av gold" style="width:34px;height:34px;border-radius:10px">✦</span><div><h3 style="font-size:15px">Resumen del Agente CEO</h3><span class="muted" style="font-size:11.5px">Generado hace 3 h</span></div></div>'
      + '    <p style="font-size:13.5px;color:var(--text-2);line-height:1.6">Vas <b style="color:var(--text)">18% sobre tu objetivo</b> de ingresos. El equipo va bien, pero <b style="color:var(--text)">Café del Valle</b> lleva 6 días sin respuesta y tiene una factura vencida.</p>'
      + '    <div class="row" style="margin-top:14px;gap:8px"><button class="btn btn-primary btn-sm" data-ai-open>Ver recomendaciones</button><button class="btn btn-ghost btn-sm" data-nav="clientes">Ir a clientes</button></div>'
      + '  </div>'
      + '</div>';
  }

  function initials(name) {
    var m = { "Agente Comercial": "C", "Agente Marketing": "M", "Agente Financiero": "F", "Agente Operaciones": "O", "Agente CEO": "✦" };
    return m[name] || name[0];
  }

  /* ============================================================
     CLIENTES (CRM)
     ============================================================ */
  function clientes() {
    var pipe = D.pipeline.map(function (col) {
      var sum = col.deals.reduce(function (a, d) { return a + parseFloat(d.v.replace(/[$,]/g, "")); }, 0);
      var deals = col.deals.map(function (d) {
        return '<div class="kcard"><div class="between"><div class="kt" style="font-size:13px">' + d.n + '</div>' + face(d.face, "sm") + '</div>'
          + '<div class="kd">' + d.who + '</div>'
          + '<div class="kmeta"><span class="pill gold" style="font-size:11px">' + d.v + '</span></div></div>';
      }).join("");
      return '<div class="kcol"><div class="kcol-h"><span class="dt" style="background:' + col.dot + '"></span><span class="t">' + col.h + '</span><span class="ct">' + col.deals.length + '</span>'
        + '<span class="muted mono" style="margin-left:auto;font-size:11.5px">$' + (sum / 1000).toFixed(1) + 'k</span></div>'
        + deals + '<button class="kadd">+ Añadir</button></div>';
    }).join("");

    var rows = D.clients.map(function (c) {
      var stl = { active: "Activo", warn: "En riesgo", idle: "Inactivo" }[c.status];
      return '<tr><td><span class="name">' + face(c.face, "sm") + '<span>' + c.n + '<div class="muted" style="font-weight:400;font-size:11.5px">' + c.sector + '</div></span></span></td>'
        + '<td><span class="st ' + c.status + '"><span class="d"></span>' + stl + '</span></td>'
        + '<td class="num">' + c.value + '</td>'
        + '<td>' + c.proj + '</td>'
        + '<td style="min-width:130px"><div class="row" style="gap:9px"><div class="prog ' + (c.health < 60 ? "" : "") + '" style="flex:1"><i style="width:' + c.health + '%;background:' + (c.health < 55 ? "var(--neg)" : c.health < 75 ? "var(--grad-gold)" : "var(--grad-iris)") + '"></i></div><span class="muted" style="font-size:11.5px">' + c.health + '%</span></div></td>'
        + '<td class="muted">' + c.last + '</td></tr>';
    }).join("");

    return ''
      + '<div class="between" style="margin-bottom:18px"><div class="seg" id="crmSeg"><button class="on" data-seg="pipe">Pipeline</button><button data-seg="list">Lista</button></div>'
      + '<div class="row" style="gap:9px"><div class="field" style="width:230px"><span>' + I("search") + '</span><input placeholder="Buscar cliente…"></div>'
      + '<button class="btn btn-primary btn-sm">' + I("plus") + ' Nuevo cliente</button></div></div>'

      + '<div data-seg-panel="pipe"><div class="kanban">' + pipe + '</div></div>'

      + '<div data-seg-panel="list" hidden><div class="card" style="overflow:hidden"><table class="table"><thead><tr>'
      + '<th>Cliente</th><th>Estado</th><th>Valor</th><th>Proyectos</th><th>Salud (IA)</th><th>Últ. contacto</th>'
      + '</tr></thead><tbody>' + rows + '</tbody></table></div></div>';
  }

  /* ============================================================
     PROYECTOS (Kanban)
     ============================================================ */
  function proyectos() {
    var cols = D.board.map(function (col) {
      var cards = col.cards.map(function (c) {
        return '<div class="kcard">'
          + '<div class="kchips"><span class="tag"><span class="d" style="background:' + c.tag[1] + '"></span>' + c.tag[0] + '</span>'
          + (c.hot ? '<span class="tag" style="color:var(--neg)">' + I("fire", 2) + ' Hoy</span>' : "") + '</div>'
          + '<div class="kt">' + c.t + '</div><div class="kd">' + c.d + '</div>'
          + (c.prog > 0 && c.prog < 100 ? '<div class="prog" style="margin-top:11px"><i style="width:' + c.prog + '%"></i></div>' : "")
          + '<div class="kmeta">' + faces(c.faces) + '<span class="due">' + I("clock", 1.8) + ' ' + c.due + '</span></div></div>';
      }).join("");
      return '<div class="kcol"><div class="kcol-h"><span class="dt" style="background:' + col.dot + '"></span><span class="t">' + col.h + '</span><span class="ct">' + col.cards.length + '</span></div>'
        + cards + '<button class="kadd">+ Añadir tarea</button></div>';
    }).join("");

    return ''
      + '<div class="between" style="margin-bottom:18px"><div class="row" style="gap:10px"><div class="seg"><button class="on">Tablero</button><button>Lista</button><button>Cronograma</button></div></div>'
      + '<div class="row" style="gap:9px"><span class="pill">' + faces([1,2,5,0,4]) + '&nbsp; Equipo</span>'
      + '<button class="btn btn-primary btn-sm">' + I("plus") + ' Nuevo proyecto</button></div></div>'
      + '<div class="kanban">' + cols + '</div>';
  }

  /* ============================================================
     FINANZAS
     ============================================================ */
  function finanzas() {
    var f = D.finance;
    var kpis = f.kpis.map(function (k) {
      return '<div class="card kpi"><div class="pad"><div class="k">' + k.k + '</div>'
        + '<div class="v mono">' + k.v + '</div>'
        + '<div class="foot"><span class="delta ' + (k.up ? "up" : "down") + '">' + (k.up ? "▲" : "▼") + ' ' + k.delta + '</span></div></div></div>';
    }).join("");

    var cf = f.cashflow, cmax = Math.max.apply(null, cf.income);
    var bars = cf.labels.map(function (l, i) {
      return '<div class="col" style="gap:3px;justify-content:flex-end">'
        + '<div style="width:100%;display:flex;gap:3px;align-items:flex-end;height:100%">'
        + '<div class="bar" style="height:' + Math.round(cf.income[i] / cmax * 100) + '%"></div>'
        + '<div class="bar t" style="height:' + Math.round(cf.expense[i] / cmax * 100) + '%;max-width:18px"></div></div>'
        + '<span class="lbl">' + l + '</span></div>';
    }).join("");

    // donut conic gradient
    var acc = 0, stops = f.breakdown.map(function (b) { var s = acc; acc += b.v; return b.c + ' ' + s + '% ' + acc + '%'; }).join(", ");
    var legend = f.breakdown.map(function (b) {
      return '<div class="between" style="font-size:12.5px;padding:6px 0"><span class="row" style="gap:8px"><span class="sw" style="width:11px;height:11px;border-radius:3px;background:' + b.c + '"></span>' + b.l + '</span><b>' + b.v + '%</b></div>';
    }).join("");

    var stmap = { paid: ["Pagada", "pos"], pending: ["Pendiente", "warn"], overdue: ["Vencida", "neg"] };
    var inv = f.invoices.map(function (v) {
      var s = stmap[v.status];
      return '<tr><td class="num" style="font-weight:600">' + v.id + '</td>'
        + '<td><span class="name" style="font-weight:500">' + face(v.face, "sm") + v.client + '</span></td>'
        + '<td class="num">' + v.amt + '</td><td class="muted">' + v.date + '</td>'
        + '<td><span class="pill ' + (v.status === "paid" ? "teal" : "") + '" style="color:var(--' + s[1] + ')"><span class="dot"></span>' + s[0] + '</span></td></tr>';
    }).join("");

    return ''
      + '<div class="between" style="margin-bottom:16px"><div class="seg"><button class="on">Mes</button><button>Trimestre</button><button>Año</button></div>'
      + '<button class="btn btn-ghost btn-sm">' + I("download") + ' <span>Exportar reporte</span></button></div>'
      + '<div class="kpis" style="margin-bottom:16px">' + kpis + '</div>'
      + '<div class="grid-2">'
      + '  <div class="card pad"><div class="between" style="margin-bottom:14px"><div><h3 style="font-size:16px">Ingresos vs. gastos</h3><p class="muted" style="font-size:12.5px;margin-top:2px">Proyección con IA en azul</p></div>'
      + '    <span class="pill teal">' + I("sparkle") + ' Liquidez sana</span></div>'
      + '    <div class="bars">' + bars + '</div>'
      + '    <div class="legend" style="margin-top:14px"><span class="it"><span class="sw" style="background:var(--gold-2)"></span>Ingresos</span><span class="it"><span class="sw" style="background:var(--teal)"></span>Gastos</span></div></div>'
      + '  <div class="card pad"><h3 style="font-size:16px;margin-bottom:14px">Fuentes de ingreso</h3>'
      + '    <div class="row" style="justify-content:center;margin:6px 0 14px"><div class="donut" style="background:conic-gradient(' + stops + ')"><div class="hole"><div><div class="v">$48k</div><div class="l">este mes</div></div></div></div></div>'
      + legend + '</div>'
      + '</div>'
      + '<div class="card" style="overflow:hidden;margin-top:16px"><div class="between pad" style="padding-bottom:6px"><h3 style="font-size:16px">Facturas recientes</h3>'
      + '<span class="pill" style="color:var(--neg)">' + I("alert", 1.8) + ' 1 vencida</span></div>'
      + '<table class="table"><thead><tr><th>Folio</th><th>Cliente</th><th>Monto</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>' + inv + '</tbody></table></div>';
  }

  /* ============================================================
     AGENTES IA
     ============================================================ */
  function agentes() {
    var cards = D.agents.map(function (a, i) {
      return '<div class="card agent-card" data-agent="' + i + '">'
        + '<div class="switch ' + (a.on ? "on" : "") + ' toptag" data-agent-switch="' + i + '"></div>'
        + '<div class="orb ' + a.orb + '">' + (a.featured ? I("star", 1.6) : I(a.icon)) + '</div>'
        + '<h3>' + a.name + '</h3><div class="role">' + a.role + '</div>'
        + '<p class="desc">' + a.desc + '</p>'
        + '<div class="stats">' + a.s.map(function (s) { return '<div class="s"><div class="v">' + s[0] + '</div><div class="l">' + s[1] + '</div></div>'; }).join("") + '</div>'
        + '</div>';
    }).join("");

    var log = D.agentLog.map(function (a) {
      return '<div class="feed-item"><span class="feed-av ' + a.av + '">' + a.who[0] + '</span><div class="feed-tx"><b>Agente ' + a.who + '</b> ' + a.t + ' <span class="ago">· ' + a.ago + '</span></div></div>';
    }).join("");

    return ''
      + '<div class="between" style="margin-bottom:18px"><div><h2 style="font-size:20px">Tu equipo de IA</h2><p class="muted" style="font-size:13px;margin-top:3px">4 de 5 agentes activos · trabajando 24/7 sobre tus datos reales.</p></div>'
      + '<button class="btn btn-primary btn-sm">' + I("plus") + ' Crear agente</button></div>'
      + '<div class="agents" style="margin-bottom:16px">' + cards + '</div>'
      + '<div class="card pad"><div class="between" style="margin-bottom:10px"><h3 style="font-size:16px">Registro de actividad</h3><span class="st active"><span class="d"></span>En vivo</span></div>'
      + '<div class="feed">' + log + '</div></div>';
  }

  /* ============================================================
     DOCUMENTOS
     ============================================================ */
  function documentos() {
    var vault = '<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5V10"/><path d="M12 14v1.5"/><path d="M8.5 12H10"/><path d="M14 12h1.5"/>';
    var lock = '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>';
    return ''
      + '<div style="display:grid;place-items:center;text-align:center;padding:52px 24px;min-height:440px">'
      +   '<div style="max-width:520px">'
      +     '<div style="position:relative;width:128px;height:128px;margin:0 auto 30px">'
      +       '<div style="position:absolute;inset:-14px;border-radius:44px;background:radial-gradient(circle at 50% 42%, rgba(232,199,102,.30), transparent 70%);filter:blur(10px)"></div>'
      +       '<div style="position:relative;width:128px;height:128px;border-radius:32px;border:1px solid var(--border-strong);background:var(--inset);display:grid;place-items:center;color:var(--gold-2)"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' + vault + '</svg></div>'
      +       '<div style="position:absolute;bottom:-4px;right:-4px;width:38px;height:38px;border-radius:50%;background:var(--surface);border:1px solid var(--border-strong);display:grid;place-items:center;color:var(--text-3)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + lock + '</svg></div>'
      +     '</div>'
      +     '<div style="font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-2);font-weight:700;margin-bottom:12px">La Bóveda</div>'
      +     '<h2 style="font-size:27px;line-height:1.15;font-weight:700;margin:0 0 14px">La memoria estratégica de tu empresa</h2>'
      +     '<p style="font-size:14.5px;color:var(--text-2);line-height:1.6;margin:0 auto 26px;max-width:430px">Aquí vive el conocimiento que hace única a tu empresa.</p>'
      +     '<div style="display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:100px;border:1px solid var(--border-strong);background:var(--inset);font-size:12.5px;color:var(--text-2);font-weight:600"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + lock + '</svg> La construimos contigo</div>'
      +   '</div>'
      + '</div>';
  }

  /* ============================================================
     CALENDARIO
     ============================================================ */
  function calendario() {
    var c = D.calendar;
    var head = '<div class="cal-head"></div>' + c.days.map(function (d, i) {
      return '<div class="cal-head ' + (i === c.today ? "today" : "") + '"><div class="dow">' + d[0] + '</div><div class="dn">' + d[1] + '</div></div>';
    }).join("");
    var rows = "";
    for (var r = 0; r < c.hours.length; r++) {
      rows += '<div class="cal-time">' + c.hours[r] + '</div>';
      for (var col = 0; col < 5; col++) {
        var ev = c.events[col + "-" + r];
        rows += '<div class="cal-cell">' + (ev ? '<div class="cal-ev ' + ev.c + '">' + ev.t + '</div>' : "") + '</div>';
      }
    }
    return ''
      + '<div class="between" style="margin-bottom:18px"><div class="row" style="gap:12px"><h2 style="font-size:20px">Junio 2026</h2>'
      + '<div class="row" style="gap:4px"><button class="icon-btn" style="width:32px;height:32px">' + I("arrow") + '</button><button class="icon-btn" style="width:32px;height:32px;transform:rotate(180deg)">' + I("arrow") + '</button></div></div>'
      + '<div class="row" style="gap:9px"><div class="seg"><button>Día</button><button class="on">Semana</button><button>Mes</button></div>'
      + '<button class="btn btn-primary btn-sm">' + I("plus") + ' Evento</button></div></div>'
      + '<div class="card pad" style="background:linear-gradient(150deg,var(--gold-soft-2),transparent);margin-bottom:16px"><div class="row" style="gap:10px"><span class="feed-av gold" style="border-radius:9px">' + I("sparkle") + '</span>'
      + '<div style="font-size:13.5px;color:var(--text-2)"><b style="color:var(--text)">La IA protegió 2 bloques de enfoque</b> el jueves y viernes, y movió tu 1:1 para evitar un choque con el kickoff.</div></div></div>'
      + '<div class="cal">' + head + rows + '</div>';
  }

  /* ============================================================
     OPERACIONES (Automatizaciones)
     ============================================================ */
  function operaciones() {
    var rows = D.automations.map(function (a, i) {
      return '<div class="card auto-row">'
        + '<div class="auto-flow">'
        + '  <div class="auto-node trigger"><span class="ni">' + I(a.trigger[1]) + '</span>' + a.trigger[0] + '</div>'
        + '  <span class="auto-arrow">' + I("arrow") + '</span>'
        + '  <div class="auto-node action"><span class="ni">' + I(a.action[1]) + '</span>' + a.action[0] + '</div>'
        + '</div>'
        + '<div class="row" style="gap:14px"><span class="muted" style="font-size:11.5px;white-space:nowrap">Ejecutada ' + a.runs + '</span>'
        + '<span class="switch ' + (a.on ? "on" : "") + '" data-auto-switch="' + i + '"></span></div>'
        + '</div>';
    }).join("");

    var active = D.automations.filter(function (a) { return a.on; }).length;
    return ''
      + '<div class="kpis" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">'
      + '  <div class="card kpi"><div class="pad"><div class="k"><span class="gi">' + I("bolt") + '</span>Automatizaciones</div><div class="v mono">' + active + ' <span class="muted" style="font-size:15px">activas</span></div></div></div>'
      + '  <div class="card kpi"><div class="pad"><div class="k"><span class="gi">' + I("clock") + '</span>Tiempo ahorrado</div><div class="v mono">92h <span class="muted" style="font-size:15px">/mes</span></div></div></div>'
      + '  <div class="card kpi"><div class="pad"><div class="k"><span class="gi">' + I("check") + '</span>Ejecuciones</div><div class="v mono">205</div></div></div>'
      + '</div>'
      + '<div class="between" style="margin-bottom:14px"><div><h2 style="font-size:20px">Procesos automáticos</h2><p class="muted" style="font-size:13px;margin-top:3px">Cuando pasa algo, el sistema actúa por ti. Sin código.</p></div>'
      + '<button class="btn btn-primary btn-sm">' + I("plus") + ' Nueva automatización</button></div>'
      + '<div class="stack">' + rows + '</div>';
  }

  /* ---------- registry ---------- */
  BOS.modules = {
    panel:       { title: "Panel", icon: "grid", crumb: "Inicio", render: panel },
    clientes:    { title: "Clientes", icon: "users", crumb: "CRM", render: clientes },
    proyectos:   { title: "Proyectos", icon: "check", crumb: "Ejecución", render: proyectos },
    finanzas:    { title: "Finanzas", icon: "coin", crumb: "Control", render: finanzas },
    calendario:  { title: "Calendario", icon: "calendar", crumb: "Tiempo", render: calendario },
    agentes:     { title: "Agentes IA", icon: "sparkle", crumb: "Inteligencia", render: agentes },
    operaciones: { title: "Operaciones", icon: "gear", crumb: "Inteligencia", render: operaciones },
    documentos:  { title: "Bóveda", icon: "vault", crumb: "Conocimiento", render: documentos }
  };
})();
