/**
 * Configuración del botón flotante de WhatsApp
 * Express Quinuapata VRAEM S.A.C.
 */

const WhatsAppConfig = {
  // Número de WhatsApp principal (formato internacional sin + ni espacios)
  numero: "51943960656",

  // Número secundario
  numero2: "51939828535",

  // Mensaje predeterminado al abrir WhatsApp
  mensajePredeterminado: "Hola, quiero información sobre pasajes y horarios al VRAEM",

  // Mensajes rápidos según la página actual
  mensajesPorPagina: {
    "index.html":     "Hola, quiero información sobre pasajes y horarios al VRAEM",
    "servicios.html": "Hola, quiero información sobre pasajes y horarios al VRAEM",
    "destinos.html":  "Hola, quiero información sobre pasajes y horarios al VRAEM",
    "contacto.html":  "Hola, quiero información sobre pasajes y horarios al VRAEM",
  },

  // Comportamiento del botón
  boton: {
    mostrarTooltip: true,
    textoTooltip: "¡Escríbenos!",
    animacionPulso: true,
    delayMostrar: 2000,       // ms antes de mostrar el botón al cargar
    mostrarContador: false,   // mostrar badge de notificación
    posicion: "bottom-right", // bottom-right | bottom-left
  },

  // Horario de atención (para mostrar disponibilidad)
  horarioAtencion: {
    activo: true,
    diasSemana: [1, 2, 3, 4, 5, 6, 0], // 0=Dom, 1=Lun ... 6=Sáb (todos los días)
    horaInicio: 5,   // 5:00 AM
    horaFin: 20,     // 8:00 PM (Dom: 13)
    mensajeFueraHorario: "Estamos fuera de horario. Te responderemos a las 5:00 AM. ¡Deja tu mensaje!",
    mensajeDentroHorario: "¡Estamos en línea! Respuesta en minutos.",
  },
};

// Exportar para uso en módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = WhatsAppConfig;
}
