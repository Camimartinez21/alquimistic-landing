/* ============================================================
   ALQUIMISTIC HUB — BUSINESS OS · icons
   Línea fina (stroke) coherente con el landing.
   ============================================================ */
window.BOS = window.BOS || {};

BOS.paths = {
  grid:   '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  users:  '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1A4 4 0 0 1 16 11"/>',
  check:  '<path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  coin:   '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  bolt:   '<path d="M13 2L4.5 13H11l-1 9 8.5-11H12l1-9z"/>',
  sparkle:'<path d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4z"/><path d="M5 16l.8 2 .2.8 2-.8L8 16l-2-.8z"/><path d="M18 15l.6 1.6 1.4.5-1.4.5-.6 1.6-.6-1.6-1.4-.5 1.4-.5z"/>',
  doc:    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  vault:  '<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5V10"/><path d="M12 14v1.5"/><path d="M8.5 12H10"/><path d="M14 12h1.5"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>',
  gear:   '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 6.6 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4.9 13H4a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 5.6 6.4l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 11 4.9V4a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-3.5-3.5"/>',
  bell:   '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  moon:   '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
  sun:    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  menu:   '<path d="M3 6h18M3 12h18M3 18h18"/>',
  chart:  '<path d="M3 3v18h18"/><path d="M7 14l3-3 4 2 4-6"/>',
  send:   '<path d="M11 2 2 11l8 2 2 8 9-9z" fill="none"/><path d="M22 2 11 13"/>',
  star:   '<path d="M12 2l2.9 6.3L22 9.3l-5 4.7 1.2 6.9L12 17.6 5.8 20.9 7 14 2 9.3l7.1-1z"/>',
  book:   '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  flow:   '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/>',
  lock:   '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  chat:   '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  clock:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  alert:  '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  plus:   '<path d="M12 5v14M5 12h14"/>',
  arrow:  '<path d="M5 12h14M13 6l6 6-6 6"/>',
  x:      '<path d="M18 6 6 18M6 6l12 12"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
  more:   '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  fire:   '<path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C8 8 12 6 12 2z"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'
};

BOS.icon = function (name, sw) {
  var p = BOS.paths[name] || "";
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.7) + '" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
};
/* solid fill variant (for star / sparkle accents) */
BOS.iconF = function (name) {
  var p = BOS.paths[name] || "";
  return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none">' + p + '</svg>';
};
