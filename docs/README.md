# Express Quinuapata VRAEM S.A.C. — Sitio Web

Sitio web corporativo para la empresa de transporte terrestre **Express Quinuapata VRAEM S.A.C.**, que conecta Ayacucho con el Valle de los Ríos Apurímac, Ene y Mantaro (VRAEM).

## Estructura del proyecto

```
sd-quinuapata-web/
│
├── index.html                  ← Página principal (hero, rutas, flota, contacto, login)
│
├── pages/
│   ├── destinos.html           ← Ruta Ayacucho–VRAEM, paradas y recomendaciones
│   ├── servicios.html          ← Servicios: pasajes, encomiendas, fletes
│   ├── nosotros.html           ← Historia, misión, visión y valores
│   └── contacto.html           ← Formulario de contacto y datos del terminal
│
├── assets/
│   ├── js/
│   │   ├── main.js             ← Loader, animaciones scroll, contadores, formulario de contacto
│   │   ├── router.js           ← Navbar, menú móvil, scroll-spy, smooth scroll
│   │   └── login.js            ← Modal de inicio de sesión conectado al backend
│   │
│   └── media/
│       ├── images/             ← Logo, flota (Hilux, Hiace) y foto del equipo
│       └── videos/             ← Video de fondo del hero
│
├── config/
│   └── app.config.js           ← URLs del backend y del dashboard (editar para producción)
│
└── docs/
    └── README.md               ← Este archivo
```

Los estilos CSS están escritos dentro de cada página HTML (etiqueta `<style>`), sin hojas externas.

---

## Configuración para producción

Edita `config/app.config.js` antes de subir al servidor:

```js
const AppConfig = {
  API_URL:       "https://expressvraem.pe",        // backend (nginx hace el proxy)
  DASHBOARD_URL: "https://expressvraem.pe/panel",  // panel administrativo
};
```

- **Desarrollo local:** `API_URL = "http://localhost:8080"`, `DASHBOARD_URL = "http://localhost:3000"`.
- El login envía las credenciales a `{API_URL}/api/auth/login` y redirige al dashboard pasando la sesión por el hash de la URL.

## Contenido editable

Los datos de la empresa (teléfonos, horarios, rutas, precios) están escritos directamente en el HTML de cada página. Para actualizarlos, busca y reemplaza en:

- `index.html` — teléfonos, enlaces de WhatsApp, rutas destacadas
- `pages/destinos.html` — paradas de la ruta y recomendaciones
- `pages/contacto.html` — teléfonos, dirección del terminal, horarios

---

## Tecnologías utilizadas

- HTML5 semántico con CSS embebido por página
- JavaScript vanilla (sin frameworks ni dependencias)
- Google Fonts: Plus Jakarta Sans y Syne
- SVG icons inline
- Intersection Observer API (animaciones al hacer scroll)

## Paleta de colores

| Variable    | Color     | Uso                     |
|-------------|-----------|-------------------------|
| `--navy`    | `#0A1628` | Fondo principal (oscuro)|
| `--green`   | `#16a34a` | Acento principal / CTAs |
| `--amber`   | `#F59E0B` | Acento secundario       |
| `--blue`    | `#1565C0` | Azul institucional      |

---

## Contacto empresa

- **WhatsApp principal:** +51 943 960 656
- **WhatsApp secundario:** +51 939 828 535
- **Email:** info@expressquinuapata.com
- **Dirección:** Jr. César Vallejo N.° 354, Ayacucho, Perú
- **Horario:** Lun – Sáb: 5:00 a.m. – 8:00 p.m. / Dom: 5:00 a.m. – 1:00 p.m.
- **Facebook:** [Express Quinuapata VRAEM SAC](https://www.facebook.com/ExpressQuinuapataVRAEMSAC)
