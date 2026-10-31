# -*- coding: utf-8 -*-
"""Fuente única de las preguntas frecuentes.

Genera, desde la misma lista:
  1. el bloque visible de index.html (entre los marcadores FAQ-INICIO / FAQ-FIN),
  2. el FAQPage en JSON-LD para Google (entre FAQ-LD-INICIO / FAQ-LD-FIN),
  3. la sección "Preguntas frecuentes" de llms.txt (para buscadores con IA).
Así lo que ve la persona, lo que lee Google y lo que lee la IA nunca se separan.

Uso:  python -I _faq.py
"""
import html
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent

FAQ = [
    ("¿Qué hace Alquimistic?",
     "Crea el sistema que tu negocio necesita: página web, app propia, tienda online, membresías o la oficina digital, conectados a tu propia IA. Lo hace Cami, desde Santiago, Chile."),
    ("¿Para qué tipo de negocios es?",
     "Para negocios que venden por WhatsApp, Instagram o en persona y quieren dejar de improvisar: tiendas, salones de belleza, marcas de comida, servicios. Se puede partir con una pieza y sumar las demás cuando el negocio lo pida."),
    ("¿Cómo empiezo?",
     "Escríbele a Cami por WhatsApp y cuéntale de tu negocio. Si prefieres partir por tu cuenta, crea tu oficina gratis: respondes unas preguntas y queda armada para tu industria."),
    ("¿Cómo es el diagnóstico?",
     "Es una conversación sin costo, por videollamada, para entender qué vendes, dónde se pierde tiempo y qué frena el crecimiento. Terminas con una propuesta clara."),
    ("¿Cuánto cuesta?",
     "La Oficina Esencial es gratis. La Oficina Completa cuesta $21.900 al mes. Un proyecto a medida (página, app, tienda o membresías) se cotiza después del diagnóstico y se paga una sola vez."),
    ("¿Cuánto demora un proyecto?",
     "Depende de lo que se construya. Antes de empezar sabes qué se hace, cuánto cuesta y cuándo está listo."),
    ("¿El sistema es mío?",
     "Sí. Al pagar el proyecto completo, el código, los datos y las cuentas quedan a tu nombre."),
    ("¿Necesito saber programar?",
     "No. Te lo entrego funcionando y con una guía simple. Para operarlo o hacerle cambios, le pides a tu IA."),
    ("¿Qué IA puedo usar?",
     "La que ya usas: Claude, ChatGPT o Gemini. Como es tu propia IA, no pagas una IA aparte."),
    ("¿Qué es la oficina?",
     "Es la app de Alquimistic donde administras el negocio completo: clientes, ventas, agenda, finanzas, marketing y una bóveda para tus archivos. Puedes crearla gratis."),
    ("¿Puedo conectar lo que ya uso?",
     "Sí. Por ejemplo, una página puede conectarse a la agenda que ya usas, como AgendaPro, para que te encuentren y reserven."),
    ("¿Sirve si mi negocio está creciendo o tengo equipo?",
     "Sí. En la oficina sumas personas y módulos cuando los necesitas, sin cambiar de sistema."),
    ("¿Hay costos después?",
     "Solo los servicios donde vive tu sistema, como hosting y base de datos. Te los explico antes de empezar."),
    ("¿Incluye soporte?",
     "La entrega incluye una sesión para dejarte todo conectado. Los ajustes posteriores se cotizan aparte."),
]


def reemplazar(texto, inicio, fin, nuevo, archivo):
    patron = re.compile(re.escape(inicio) + r".*?" + re.escape(fin), re.S)
    if not patron.search(texto):
        sys.exit(f"No encontré los marcadores {inicio} / {fin} en {archivo}")
    return patron.sub(lambda _m: inicio + nuevo + fin, texto, count=1)


def main():
    idx = RAIZ / "index.html"
    s = idx.read_text(encoding="utf-8")

    visible = "\n" + "".join(
        f"    <details>\n      <summary>{html.escape(q, quote=False)}</summary>\n"
        f"      <p>{html.escape(a, quote=False)}</p>\n    </details>\n"
        for q, a in FAQ
    ) + "    "
    s = reemplazar(s, "<!-- FAQ-INICIO -->", "<!-- FAQ-FIN -->", visible, "index.html")

    ld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in FAQ
        ],
    }
    bloque = "\n" + json.dumps(ld, ensure_ascii=False, indent=2) + "\n"
    s = reemplazar(s, '<script type="application/ld+json" id="faq-ld">',
                   "</script><!-- FAQ-LD-FIN -->", bloque, "index.html")
    idx.write_text(s, encoding="utf-8")

    llms = RAIZ / "llms.txt"
    t = llms.read_text(encoding="utf-8")
    seccion = "\n" + "\n".join(f"- {q} {a}" for q, a in FAQ) + "\n\n"
    t = reemplazar(t, "## Preguntas frecuentes", "## Cómo empezar", seccion, "llms.txt")
    llms.write_text(t, encoding="utf-8")
    print(f"OK: {len(FAQ)} preguntas en index.html, JSON-LD y llms.txt")


if __name__ == "__main__":
    main()
