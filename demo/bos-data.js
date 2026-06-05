/* ============================================================
   ALQUIMISTIC HUB — BUSINESS OS · sample data
   Negocio demo: "Estudio Camila" — agencia creativa / marketing.
   ============================================================ */
window.BOS = window.BOS || {};

BOS.user = { name: "Camila", full: "Camila Restrepo", role: "Fundadora · CEO", initials: "CR" };
BOS.company = "Estudio Camila";

/* color helpers for person faces */
BOS.faceColors = ["#e8a14a","#5fb0e3","#9b7ede","#e36f8f","#56c2a8","#d9a441","#6f8fe3","#cf6f6f"];

/* ---------------- DASHBOARD ---------------- */
BOS.kpis = [
  { k: "Ingresos del mes", v: "$48,250", icon: "coin", gold: true, delta: "+18%", up: true, foot: "vs. mes anterior",
    spark: [40,55,48,62,58,74,70,88] },
  { k: "Proyectos activos", v: "12", icon: "check", delta: "+3", up: true, foot: "esta semana",
    spark: [30,42,38,50,46,58,64,70] },
  { k: "Tareas automatizadas", v: "340", icon: "bolt", delta: "92h", up: true, foot: "ahorradas",
    spark: [20,30,44,40,58,62,78,84] },
  { k: "Clientes activos", v: "28", icon: "users", delta: "+4", up: true, foot: "este trimestre",
    spark: [44,46,52,50,60,58,66,72] }
];

BOS.revenue = {
  labels: ["Ene","Feb","Mar","Abr","May","Jun"],
  values: [31,38,34,44,41,48],     // miles
  highlight: 5
};

BOS.activity = [
  { who: "Agente Comercial", av: "gold", t: "envió <b>6 seguimientos</b> a leads sin respuesta.", ago: "hace 4 min" },
  { who: "Agente Marketing", av: "teal", t: "programó <b>3 publicaciones</b> para esta semana.", ago: "hace 20 min" },
  { who: "Agente Financiero", av: "rose", t: "concilió <b>14 facturas</b> con los pagos recibidos.", ago: "hace 1 h" },
  { who: "Agente Operaciones", av: "violet", t: "movió <b>2 tareas</b> a “Listo” en Boutique Sol.", ago: "hace 2 h" },
  { who: "Agente CEO", av: "gold", t: "preparó el <b>resumen ejecutivo</b> de la semana.", ago: "hace 3 h" }
];

BOS.tasks = [
  { t: "Enviar propuesta a Agencia Norte", meta: "Hoy · Comercial", done: false },
  { t: "Revisar línea gráfica · Café del Valle", meta: "Hoy · Diseño", done: false },
  { t: "Aprobar campaña de junio", meta: "Mañana · Marketing", done: false },
  { t: "Llamada de kickoff · Estudio Lumen", meta: "Hecho", done: true },
  { t: "Conciliar facturas de mayo", meta: "Hecho · automático", done: true }
];

/* ---------------- CLIENTES (CRM) ---------------- */
BOS.pipeline = [
  { h: "Nuevos", dot: "var(--text-faint)", deals: [
    { n: "Estudio Lumen", v: "$12,000", who: "Fotografía", face: 1 },
    { n: "Café del Valle", v: "$6,500", who: "Branding", face: 0 }
  ]},
  { h: "Contactado", dot: "var(--info)", deals: [
    { n: "Mariana Co.", v: "$9,200", who: "Web + SEO", face: 3 }
  ]},
  { h: "Propuesta", dot: "var(--gold-2)", deals: [
    { n: "Agencia Norte", v: "$18,400", who: "Retainer anual", face: 2 },
    { n: "Verde Mercado", v: "$7,800", who: "Social media", face: 4 }
  ]},
  { h: "Ganado", dot: "var(--pos)", deals: [
    { n: "Boutique Sol", v: "$14,300", who: "Campaña Q3", face: 5 }
  ]}
];

BOS.clients = [
  { n: "Boutique Sol", sector: "Moda · Retail", face: 5, status: "active", value: "$14,300", proj: 3, last: "Hoy", health: 92 },
  { n: "Agencia Norte", sector: "Servicios B2B", face: 2, status: "active", value: "$18,400", proj: 2, last: "Ayer", health: 78 },
  { n: "Estudio Lumen", sector: "Fotografía", face: 1, status: "active", value: "$12,000", proj: 1, last: "hace 2 d", health: 85 },
  { n: "Café del Valle", sector: "Alimentos", face: 0, status: "warn", value: "$6,500", proj: 1, last: "hace 6 d", health: 54 },
  { n: "Verde Mercado", sector: "E-commerce", face: 4, status: "active", value: "$7,800", proj: 2, last: "hace 1 d", health: 81 },
  { n: "Mariana Co.", sector: "Consultoría", face: 3, status: "idle", value: "$9,200", proj: 0, last: "hace 12 d", health: 38 },
  { n: "Casa Míel", sector: "Hospitalidad", face: 6, status: "active", value: "$5,400", proj: 1, last: "hace 3 d", health: 88 }
];

/* ---------------- PROYECTOS (Kanban) ---------------- */
BOS.board = [
  { h: "Backlog", dot: "var(--text-faint)", cards: [
    { t: "Identidad visual · Casa Míel", d: "Logo, paleta y guía de marca", tag: ["Branding","#e8a14a"], due: "12 Jun", faces: [6], prog: 0 },
    { t: "Auditoría SEO · Verde Mercado", d: "Análisis técnico + keywords", tag: ["SEO","#5fb0e3"], due: "18 Jun", faces: [4,3], prog: 0 }
  ]},
  { h: "En progreso", dot: "var(--gold-2)", cards: [
    { t: "Sitio web · Estudio Lumen", d: "Diseño UI de 6 páginas", tag: ["Web","#9b7ede"], due: "9 Jun", faces: [1,2], prog: 65 },
    { t: "Campaña Q3 · Boutique Sol", d: "Conceptos + piezas para redes", tag: ["Campaña","#e36f8f"], due: "Hoy", faces: [5,0], prog: 80, hot: true }
  ]},
  { h: "Revisión", dot: "var(--info)", cards: [
    { t: "Línea gráfica · Café del Valle", d: "Esperando aprobación del cliente", tag: ["Branding","#e8a14a"], due: "Mañana", faces: [0], prog: 95 }
  ]},
  { h: "Listo", dot: "var(--pos)", cards: [
    { t: "Kickoff · Agencia Norte", d: "Reunión inicial y alcance", tag: ["Estrategia","#56c2a8"], due: "Hecho", faces: [2,1], prog: 100 },
    { t: "Reels mayo · Boutique Sol", d: "8 piezas entregadas", tag: ["Social","#d9a441"], due: "Hecho", faces: [5], prog: 100 }
  ]}
];

/* ---------------- FINANZAS ---------------- */
BOS.finance = {
  kpis: [
    { k: "Ingresos (mes)", v: "$48,250", delta: "+18%", up: true },
    { k: "Gastos (mes)", v: "$19,720", delta: "+4%", up: false },
    { k: "Beneficio neto", v: "$28,530", delta: "+27%", up: true },
    { k: "Por cobrar", v: "$23,900", delta: "6 facturas", up: true }
  ],
  cashflow: {
    labels: ["Ene","Feb","Mar","Abr","May","Jun"],
    income:  [31,38,34,44,41,48],
    expense: [16,18,17,19,18,20]
  },
  breakdown: [
    { l: "Retainers", v: 52, c: "var(--gold-2)" },
    { l: "Proyectos", v: 31, c: "var(--teal)" },
    { l: "Consultoría", v: 17, c: "#9b7ede" }
  ],
  invoices: [
    { id: "FAC-0142", client: "Boutique Sol", face: 5, amt: "$14,300", date: "01 Jun", status: "paid" },
    { id: "FAC-0141", client: "Agencia Norte", face: 2, amt: "$9,200", date: "28 May", status: "paid" },
    { id: "FAC-0140", client: "Estudio Lumen", face: 1, amt: "$6,000", date: "24 May", status: "pending" },
    { id: "FAC-0139", client: "Verde Mercado", face: 4, amt: "$3,900", date: "20 May", status: "pending" },
    { id: "FAC-0138", client: "Café del Valle", face: 0, amt: "$3,250", date: "15 May", status: "overdue" },
    { id: "FAC-0137", client: "Casa Míel", face: 6, amt: "$5,400", date: "12 May", status: "paid" }
  ]
};

/* ---------------- AGENTES IA ---------------- */
BOS.agents = [
  { name: "Agente Comercial", role: "Ventas & Seguimiento", orb: "gold", icon: "chart", on: true, status: "active",
    desc: "Califica leads, agenda reuniones y da seguimiento automático antes de que una oportunidad se enfríe.",
    s: [["48","seguimientos"],["6","reuniones"]] },
  { name: "Agente Marketing", role: "Contenido & Campañas", orb: "teal", icon: "send", on: true, status: "active",
    desc: "Crea contenido, programa publicaciones y analiza qué campañas atraen a tus mejores clientes.",
    s: [["24","posts"],["3","campañas"]] },
  { name: "Agente Operaciones", role: "Procesos & Tareas", orb: "violet", icon: "gear", on: true, status: "active",
    desc: "Coordina tableros, asigna tareas y mantiene cada proyecto avanzando sin que tengas que perseguirlo.",
    s: [["92","tareas"],["12","proyectos"]] },
  { name: "Agente Financiero", role: "Finanzas & Cobros", orb: "rose", icon: "coin", on: true, status: "active",
    desc: "Concilia facturas, anticipa tu flujo de caja y te avisa antes de que un número se salga de control.",
    s: [["14","facturas"],["$23.9k","por cobrar"]] },
  { name: "Agente CEO", role: "Visión & Decisiones", orb: "gold", icon: "star", on: false, status: "idle", featured: true,
    desc: "Conecta todas las áreas, te resume el estado real del negocio y recomienda la siguiente mejor acción.",
    s: [["7","insights"],["1","resumen/día"]] }
];

BOS.agentLog = [
  { who: "Comercial", av: "gold", t: "calificó a <b>Mariana Co.</b> como lead caliente (score 87).", ago: "hace 8 min" },
  { who: "Marketing", av: "teal", t: "redactó <b>3 captions</b> para la campaña de Boutique Sol.", ago: "hace 32 min" },
  { who: "Financiero", av: "rose", t: "detectó factura <b>FAC-0138 vencida</b> y envió recordatorio.", ago: "hace 1 h" },
  { who: "Operaciones", av: "violet", t: "reasignó <b>2 tareas</b> tras detectar sobrecarga del equipo.", ago: "hace 2 h" },
  { who: "CEO", av: "gold", t: "recomienda <b>reactivar a Mariana Co.</b> esta semana.", ago: "hace 3 h" }
];

/* ---------------- DOCUMENTOS ---------------- */
BOS.docs = [
  { t: "Manual de marca · Estudio", ic: "book", meta: "Wiki · actualizado hoy", who: "CR" },
  { t: "Proceso de onboarding", ic: "flow", meta: "Plantilla · 4 pasos", who: "Equipo" },
  { t: "Propuesta — Agencia Norte", ic: "doc", meta: "Comercial · v3", who: "IA" },
  { t: "Contratos y retainers", ic: "lock", meta: "Legal · 8 archivos", who: "CR" },
  { t: "Guía de tono y voz", ic: "chat", meta: "Marketing · referencia", who: "Equipo" },
  { t: "Reporte mensual · Mayo", ic: "chart", meta: "Finanzas · generado por IA", who: "IA" }
];

/* ---------------- CALENDARIO ---------------- */
BOS.calendar = {
  days: [["Lun","9"],["Mar","10"],["Mié","11"],["Jue","12"],["Vie","13"]],
  today: 2,
  hours: ["9:00","11:00","13:00","15:00","17:00"],
  // events keyed by "col-row"
  events: {
    "0-0": { t: "Kickoff · Agencia Norte", c: "gold" },
    "0-3": { t: "Diseño · Lumen", c: "violet" },
    "1-1": { t: "Grabación campaña", c: "teal" },
    "2-0": { t: "Stand-up equipo", c: "dim" },
    "2-2": { t: "Aprobación · Café del Valle", c: "gold" },
    "3-1": { t: "1:1 con diseño", c: "violet" },
    "3-4": { t: "Bloque de enfoque", c: "dim" },
    "4-2": { t: "Entrega · Boutique Sol", c: "teal" }
  }
};

/* ---------------- OPERACIONES (Automatizaciones) ---------------- */
BOS.automations = [
  { on: true, trigger: ["Nuevo cliente ganado","user"], action: ["Crear proyecto + carpeta de docs","folder"], runs: "23 veces" },
  { on: true, trigger: ["Factura pagada","coin"], action: ["Marcar tarea y notificar al equipo","bell"], runs: "47 veces" },
  { on: true, trigger: ["Lead sin respuesta 3 días","clock"], action: ["Agente Comercial envía seguimiento","chart"], runs: "112 veces" },
  { on: false, trigger: ["Proyecto cerrado","check"], action: ["Enviar encuesta de satisfacción","star"], runs: "9 veces" },
  { on: true, trigger: ["Factura vencida","alert"], action: ["Recordatorio + alerta a Finanzas","coin"], runs: "14 veces" }
];

/* ---------------- AI ASSISTANT canned replies ---------------- */
BOS.aiSuggestions = [
  "¿Cómo va el negocio esta semana?",
  "¿Qué clientes necesitan seguimiento?",
  "Resume las finanzas del mes",
  "¿Qué proyecto está en riesgo?"
];
BOS.aiReplies = {
  "¿Cómo va el negocio esta semana?": "Vas <b>18% por encima</b> del objetivo de ingresos ($48.2k). Tienes <b>12 proyectos activos</b> y el equipo ahorró <b>92 horas</b> gracias a las automatizaciones. La única señal de atención: <b>Café del Valle</b> lleva 6 días sin respuesta.",
  "¿Qué clientes necesitan seguimiento?": "Detecté 2: <b>Mariana Co.</b> (12 días sin contacto, salud 38%) y <b>Café del Valle</b> (factura vencida). El Agente Comercial puede enviar seguimientos ahora si lo apruebas.",
  "Resume las finanzas del mes": "Ingresos <b>$48,250</b> (+18%), gastos <b>$19,720</b>, beneficio neto <b>$28,530</b> (+27%). Tienes <b>$23,900 por cobrar</b> en 6 facturas — una vencida (FAC-0138, Café del Valle).",
  "¿Qué proyecto está en riesgo?": "<b>Campaña Q3 · Boutique Sol</b> vence hoy y está al 80%. Recomiendo priorizar la revisión de piezas. El resto de proyectos va dentro de plazo.",
  "_default": "Buena pregunta. Estoy conectado a tus clientes, proyectos y finanzas en tiempo real. Puedo resumir el estado del negocio, detectar riesgos o ejecutar tareas con los agentes. ¿Quieres que empiece por algo en concreto?"
};
