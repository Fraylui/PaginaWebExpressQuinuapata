# Express Quinuapata VRAEM S.A.C. — Sitio Web

Sitio web corporativo para la empresa de transporte terrestre **Express Quinuapata VRAEM S.A.C.**, que conecta Ayacucho con el Valle de los Ríos Apurímac, Ene y Mantaro (VRAEM).

## Estructura del proyecto

```
sd-quinuapata-web/
│
├── index.html                  ← Página principal
│
├── pages/
│   ├── destinos.html           ← Rutas, horarios y destinos
│   ├── servicios.html          ← Servicios ofrecidos
│   ├── nosotros.html           ← Historia, misión, visión
│   └── contacto.html           ← Formulario y sedes
│
├── components/
│   ├── header.html             ← Navbar (cargado dinámicamente)
│   ├── footer.html             ← Pie de página (cargado dinámicamente)
│   └── whatsapp-btn.html       ← Placeholder del botón WhatsApp
│
├── assets/
│   ├── css/
│   │   ├── variables.css       ← Variables CSS (colores, tipografía, espaciado)
│   │   ├── base.css            ← Reset, tipografía global, utilitarios
│   │   ├── components.css      ← Header, Footer, Hero, Cards, Formularios, etc.
│   │   └── responsive.css      ← Media queries (móvil, tablet, desktop)
│   │
│   ├── js/
│   │   ├── main.js             ← Lógica principal (loader, scroll reveal, galería)
│   │   ├── router.js           ← Carga componentes y maneja navegación activa
│   │   └── whatsapp.js         ← Botón flotante de WhatsApp
│   │
│   └── media/
│       ├── images/             ← Imágenes del sitio (agregar aquí)
│       └── videos/             ← Videos del sitio (agregar aquí)
│
├── data/
│   ├── config.json             ← Datos de la empresa, flota, redes sociales
│   ├── destinos.json           ← Rutas, precios y descripción de destinos
│   └── horarios.json           ← Horarios de salida por ruta
│
├── config/
│   └── whatsapp.config.js      ← Configuración del botón de WhatsApp
│
└── docs/
    └── README.md               ← Este archivo
```

---

## Configuración rápida

### 1. Datos de la empresa
Edita `data/config.json` para actualizar:
- Número de WhatsApp
- Dirección de sedes
- Redes sociales
- Descripción de la flota

### 2. Rutas y precios
Edita `data/destinos.json` para agregar o modificar rutas y precios.

### 3. Horarios
Edita `data/horarios.json` para actualizar los horarios de salida.

### 4. WhatsApp
Edita `config/whatsapp.config.js` para personalizar:
- Número de WhatsApp
- Mensajes predeterminados por página
- Horario de atención
- Comportamiento del botón (pulso, tooltip, delay)

---

## Imágenes recomendadas

Agrega las siguientes imágenes en `assets/media/images/`:

| Archivo                   | Uso                          | Tamaño recomendado |
|---------------------------|------------------------------|--------------------|
| `hero-bg.jpg`             | Fondo del hero principal     | 1920×1080          |
| `hilux.jpg`               | Toyota Hilux                 | 800×450            |
| `hiace.jpg`               | Toyota Hiace                 | 800×450            |
| `ruta-pichari.jpg`        | Card de ruta a Pichari       | 600×400            |
| `ruta-kimbiri.jpg`        | Card de ruta a Kimbiri       | 600×400            |
| `ruta-sanfrancisco.jpg`   | Card de ruta a San Francisco | 600×400            |
| `destino-pichari.jpg`     | Info destino Pichari         | 600×400            |
| `destino-kimbiri.jpg`     | Info destino Kimbiri         | 600×400            |
| `destino-sanfrancisco.jpg`| Info destino San Francisco   | 600×400            |
| `gallery-1.jpg` … `5.jpg` | Galería de fotos             | 800×600            |
| `nosotros-historia.jpg`   | Foto página Nosotros         | 800×600            |
| `video-thumb-1.jpg`       | Miniatura video 1            | 1280×720           |
| `video-thumb-2.jpg`       | Miniatura video 2            | 1280×720           |
| `og-image.jpg`            | Imagen Open Graph            | 1200×630           |

## Videos recomendados

Agrega los siguientes videos en `assets/media/videos/`:

| Archivo           | Descripción                           |
|-------------------|---------------------------------------|
| `ruta-hilux.mp4`  | Video del Toyota Hilux en ruta        |
| `ruta-hiace.mp4`  | Video del Toyota Hiace con pasajeros  |

---

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 con Custom Properties (variables)
- JavaScript vanilla (sin frameworks)
- Google Fonts: Poppins
- SVG icons inline (sin dependencias externas)
- Intersection Observer API (animaciones scroll)

## Paleta de colores

| Variable              | Color     | Uso                    |
|-----------------------|-----------|------------------------|
| `--color-primary`     | `#1565C0` | Azul institucional     |
| `--color-secondary`   | `#F9A825` | Amarillo / acento      |
| `--color-primary-900` | `#0D47A1` | Azul oscuro            |
| `--wa-color`          | `#25D366` | Verde WhatsApp         |

---

## Contacto empresa

- **Teléfono:** +51 966 123 456
- **WhatsApp:** +51 966 123 456
- **Email:** info@expressquinuapata.com
- **Dirección:** Jr. Libertad 345, Ayacucho, Perú
- **Horario:** Lunes a Domingo 4:00 AM – 10:00 PM
