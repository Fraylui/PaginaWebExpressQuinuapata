/**
 * whatsapp.js — Botón flotante de WhatsApp
 * Express Quinuapata VRAEM S.A.C.
 */

(function () {
  "use strict";

  // ── Carga la configuración ──────────────────────────────────────────
  function getConfig() {
    if (typeof WhatsAppConfig !== "undefined") return WhatsAppConfig;
    return {
      numero: "51943960656",
      mensajePredeterminado: "Hola, quiero información sobre pasajes y horarios al VRAEM",
      boton: {
        mostrarTooltip: true,
        textoTooltip: "¡Escríbenos!",
        animacionPulso: true,
        delayMostrar: 2000,
        posicion: "bottom-right",
      },
      horarioAtencion: {
        activo: false,
      },
    };
  }

  // ── Verifica si estamos en horario de atención ──────────────────────
  function estaEnHorario(horario) {
    if (!horario.activo) return true;
    const ahora = new Date();
    const dia = ahora.getDay();
    const hora = ahora.getHours();
    return (
      horario.diasSemana.includes(dia) &&
      hora >= horario.horaInicio &&
      hora < horario.horaFin
    );
  }

  // ── Construye la URL de WhatsApp ────────────────────────────────────
  function buildWhatsAppUrl(numero, mensaje) {
    const encodedMsg = encodeURIComponent(mensaje);
    return `https://wa.me/${numero}?text=${encodedMsg}`;
  }

  // ── Obtiene el mensaje según la página actual ───────────────────────
  function getMensajePagina(config) {
    const page = window.location.pathname.split("/").pop() || "index.html";
    return (
      (config.mensajesPorPagina && config.mensajesPorPagina[page]) ||
      config.mensajePredeterminado
    );
  }

  // ── Construye el HTML del botón ─────────────────────────────────────
  function crearBoton(config) {
    const container = document.createElement("div");
    container.className = "whatsapp-btn";
    container.id = "whatsapp-float";
    container.style.opacity = "0";
    container.style.transform = "translateY(20px)";
    container.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    const enHorario = estaEnHorario(config.horarioAtencion);
    const mensaje = getMensajePagina(config);
    const url = buildWhatsAppUrl(config.numero, mensaje);
    const tooltipText = enHorario
      ? config.boton.textoTooltip
      : (config.horarioAtencion.mensajeFueraHorario || config.boton.textoTooltip);

    // Tooltip
    if (config.boton.mostrarTooltip) {
      const tooltip = document.createElement("div");
      tooltip.className = "whatsapp-btn__tooltip";
      tooltip.textContent = tooltipText;
      tooltip.id = "wa-tooltip";
      tooltip.style.display = "none";
      container.appendChild(tooltip);
    }

    // Botón principal
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "whatsapp-btn__main";
    link.setAttribute("aria-label", "Contactar por WhatsApp");

    // Pulso animado
    if (config.boton.animacionPulso) {
      const pulse = document.createElement("span");
      pulse.className = "whatsapp-btn__pulse";
      link.appendChild(pulse);
    }

    // Ícono SVG de WhatsApp
    link.innerHTML += `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.535 5.876L.057 23.5a.5.5 0 0 0 .613.637l5.752-1.506A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.683-.5-5.23-1.376l-.374-.215-3.875 1.015 1.033-3.77-.23-.387A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    `;

    container.appendChild(link);
    return { container, link };
  }

  // ── Manejo del tooltip ──────────────────────────────────────────────
  function initTooltip(container, link) {
    const tooltip = document.getElementById("wa-tooltip");
    if (!tooltip) return;

    link.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
    });
    link.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  }

  // ── Seguimiento de clics (Google Analytics / gtag) ─────────────────
  function trackClick() {
    if (typeof gtag === "function") {
      gtag("event", "click", {
        event_category: "WhatsApp",
        event_label: "Botón flotante",
      });
    }
  }

  // ── Inicialización ──────────────────────────────────────────────────
  function init() {
    const config = getConfig();
    const { container, link } = crearBoton(config);

    document.body.appendChild(container);
    initTooltip(container, link);
    link.addEventListener("click", trackClick);

    // Mostrar con delay
    setTimeout(() => {
      container.style.opacity = "1";
      container.style.transform = "translateY(0)";
    }, config.boton.delayMostrar || 2000);
  }

  // Ejecutar al cargar el DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
