/**
 * login.js — El botón "Iniciar sesión" lleva directo al login del SISTEMA
 * (el panel de gestión). La página web no tiene login propio.
 *
 * La URL del panel se lee desde config/app.config.js:
 *   - Producción:      https://sistema.expressquinuapata.com/login
 *   - Vista previa IP: http://5.189.128.214/login
 */
(function () {
  "use strict";

  const DASHBOARD_URL = (typeof AppConfig !== "undefined" ? AppConfig.DASHBOARD_URL : null) || "http://localhost:3000";
  const LOGIN_URL = DASHBOARD_URL.replace(/\/+$/, "") + "/login";

  function init() {
    document.querySelectorAll("[data-open-login]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.location.href = LOGIN_URL;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
