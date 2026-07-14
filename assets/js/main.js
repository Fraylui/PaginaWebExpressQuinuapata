/**
 * main.js — Lógica principal de la página
 * Express Quinuapata VRAEM S.A.C.
 */

(function () {
  "use strict";

  // ================================================================
  // LOADER DE PÁGINA
  // ================================================================
  function initPageLoader() {
    const loader = document.getElementById("page-loader");
    if (!loader) return;

    window.addEventListener("load", () => {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 400);
    });
  }

  // ================================================================
  // REVEAL ON SCROLL (Intersection Observer)
  // ================================================================
  function initRevealOnScroll() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ================================================================
  // CONTADOR ANIMADO (para estadísticas del hero)
  // ================================================================
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1800;
    const stepTime = 16;
    const steps = Math.floor(duration / stepTime);
    let current = 0;
    const increment = target / steps;
    const suffix = el.getAttribute("data-suffix") || "";

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  // ================================================================
  // FORMULARIO DE CONTACTO
  // ================================================================
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nombre  = (form.querySelector("#nombre")   || {}).value  || "";
      var telefono= (form.querySelector("#telefono") || {}).value  || "";
      var email   = (form.querySelector("#email")    || {}).value  || "";
      var asunto  = (form.querySelector("#asunto")   || {}).value  || "";
      var mensaje = (form.querySelector("#mensaje")  || {}).value  || "";

      var asuntoTexto = {
        reserva:     "Reserva de pasaje",
        encomienda:  "Envío de encomienda",
        cotizacion:  "Cotización de flete",
        informacion: "Información general",
        reclamo:     "Reclamo o sugerencia",
        otro:        "Otro"
      }[asunto] || asunto;

      var texto = "Hola, les escribo desde el sitio web.\n\n"
        + "👤 Nombre: " + nombre + "\n"
        + "📞 Teléfono: " + telefono + "\n"
        + (email ? "📧 Correo: " + email + "\n" : "")
        + "📋 Asunto: " + asuntoTexto + "\n\n"
        + "💬 Mensaje:\n" + mensaje;

      var url = "https://wa.me/51943960656?text=" + encodeURIComponent(texto);

      var btn = form.querySelector('[type="submit"]');
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Abriendo WhatsApp...";
      btn.style.background = "var(--color-success)";

      window.open(url, "_blank", "noopener");
      form.reset();

      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = originalText;
        btn.style.background = "";
      }, 3000);
    });
  }

  // ================================================================
  // TRANSICIÓN DE SALIDA AL NAVEGAR ENTRE PÁGINAS
  // ================================================================
  function initPageTransition() {
    document.addEventListener("click", function (e) {
      var link = e.target.closest(".nav-link");
      if (!link) return;
      var href = link.getAttribute("href");
      if (!href ||
          href.includes("#") ||
          href.startsWith("http") ||
          href.startsWith("mailto") ||
          href.startsWith("tel")) return;

      e.preventDefault();
      var wrapper = document.querySelector(".page-wrapper");
      if (wrapper) {
        wrapper.style.opacity    = "0";
        wrapper.style.transform  = "translateY(-10px)";
        wrapper.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      }
      setTimeout(function () { window.location.href = href; }, 300);
    });
  }

  // ================================================================
  // BOTÓN VOLVER ARRIBA
  // ================================================================
  function initBackToTop() {
    var btn = document.getElementById("btn-arriba");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        btn.style.display = "flex";
      } else {
        btn.style.display = "none";
      }
    }, { passive: true });
  }

  // ================================================================
  // INIT PRINCIPAL
  // ================================================================
  function init() {
    initPageLoader();
    initRevealOnScroll();
    initCounters();
    initContactForm();
    initPageTransition();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
