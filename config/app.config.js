/**
 * app.config.js — Configuración de URLs para producción
 *
 * Producción (dominio real):
 *   - La web vive en https://expressquinuapata.com y nginx proxea /api al
 *     backend en el MISMO origen → API_URL = location.origin (sin CORS).
 *   - El panel vive en https://sistema.expressquinuapata.com.
 *
 * Vista previa por IP (mientras el DNS no está activo):
 *   - Web:   http://5.189.128.214:8081  (el /api también funciona ahí)
 *   - Panel: http://5.189.128.214
 *
 * Desarrollo local (npm/live-server sin nginx): cambiar temporalmente
 *   API_URL       = "http://localhost:8080"
 *   DASHBOARD_URL = "http://localhost:3000"
 */
const AppConfig = {
  API_URL: location.origin,
  DASHBOARD_URL: (location.hostname === "expressquinuapata.com" || location.hostname === "www.expressquinuapata.com")
    ? "https://sistema.expressquinuapata.com"
    : "http://" + location.hostname,  // vista previa por IP: panel en puerto 80
};
