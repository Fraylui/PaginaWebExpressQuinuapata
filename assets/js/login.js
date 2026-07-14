/**
 * login.js — Inicio de sesión conectado al backend Express Quinuapata VRAEM
 * Las URLs se leen desde config/app.config.js — editar ese archivo para producción.
 */
(function () {
  "use strict";

  // ── Configuración (viene de config/app.config.js) ────────────────────────────
  const API_URL       = (typeof AppConfig !== "undefined" ? AppConfig.API_URL       : null) || "http://localhost:8080";
  const DASHBOARD_URL = (typeof AppConfig !== "undefined" ? AppConfig.DASHBOARD_URL : null) || "http://localhost:3000";

  // ── Referencias DOM ──────────────────────────────────────────────────────────
  let modal, form, emailInput, passInput, btnSubmit, errorMsg, loadingSpinner;

  function init() {
    modal         = document.getElementById("login-modal");
    form          = document.getElementById("login-form");
    emailInput    = document.getElementById("login-email");
    passInput     = document.getElementById("login-password");
    btnSubmit     = document.getElementById("login-submit");
    errorMsg      = document.getElementById("login-error");
    loadingSpinner = document.getElementById("login-spinner");

    if (!modal) return;

    // Botones para abrir el modal
    document.querySelectorAll("[data-open-login]").forEach(btn =>
      btn.addEventListener("click", openModal)
    );

    // Cerrar modal
    document.getElementById("login-modal-close")
      ?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("login-modal__backdrop")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    // Toggle mostrar/ocultar contraseña
    document.getElementById("toggle-password")
      ?.addEventListener("click", togglePassword);

    // Submit
    form?.addEventListener("submit", handleLogin);
  }

  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => emailInput?.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    clearError();
  }

  function togglePassword() {
    const isText = passInput.type === "text";
    passInput.type = isText ? "password" : "text";
    const icon = document.getElementById("toggle-password");
    icon.innerHTML = isText ? EYE_ICON : EYE_OFF_ICON;
  }

  function showError(msg) {
    errorMsg.querySelector("span").textContent = msg;
    errorMsg.style.display = "flex";
  }

  function clearError() {
    errorMsg.querySelector("span").textContent = "";
    errorMsg.style.display = "none";
  }

  function setLoading(loading) {
    btnSubmit.disabled    = loading;
    loadingSpinner.style.display = loading ? "inline-block" : "none";
    const icon = document.getElementById("login-icon");
    if (icon) icon.style.display = loading ? "none" : "";
    btnSubmit.querySelector(".btn-text").textContent = loading
      ? "Verificando..."
      : "Ingresar al sistema";
  }

  async function handleLogin(e) {
    e.preventDefault();
    clearError();

    const email    = emailInput.value.trim();
    const password = passInput.value;

    if (!email || !password) {
      showError("Ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        showError(result.message || "Credenciales incorrectas.");
        return;
      }

      const data = result.data;
      const u    = data.usuario;

      // Guardar en localStorage en el formato exacto que usa Zustand persist
      const authStore = {
        state: {
          user: {
            id:             u.id,
            nombre:         u.nombre,
            email:          u.email,
            rol:            u.rol,
            agenciaId:      u.agenciaId,
            permisos:       u.permisos       ?? [],
            modulosActivos: u.modulosActivos ?? u.permisos ?? [],
          },
          token:           data.token,
          isAuthenticated: true,
        },
        version: 0,
      };
      // El dashboard corre en un origen diferente (puerto 3000 vs 5050).
      // localStorage no se comparte entre orígenes, así que enviamos los datos
      // en el hash de la URL para que el dashboard los recoja y los guarde.
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(authStore))));
      window.location.href = `${DASHBOARD_URL}/auth-callback#${encoded}`;

    } catch (_) {
      showError("Sin conexión con el servidor. Verifique que el sistema esté activo.");
    } finally {
      setLoading(false);
    }
  }

  // ── Íconos SVG inline ────────────────────────────────────────────────────────
  const EYE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const EYE_OFF_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

  document.addEventListener("DOMContentLoaded", init);
})();
