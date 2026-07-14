/**
 * app.config.js — Configuración de URLs para producción
 * Editar este archivo antes de subir al servidor.
 *
 * Desarrollo local:
 *   API_URL       = "http://localhost:8080"
 *   DASHBOARD_URL = "http://localhost:3000"
 *
 * Producción (ejemplo con dominio propio):
 *   API_URL       = "https://expressvraem.pe"       ← mismo servidor, nginx hace el proxy
 *   DASHBOARD_URL = "https://expressvraem.pe/panel"  ← o el subdominio donde esté el panel
 */
const AppConfig = {
  API_URL:       "https://expressvraem.pe",
  DASHBOARD_URL: "https://expressvraem.pe/panel",
};
