# 🎌 Anime Studio

> Sitio web estático multilingüe sobre el universo del anime y la cultura japonesa.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white)
![Multilingüe](https://img.shields.io/badge/Idiomas-ES_%7C_EN_%7C_JP-red?style=flat)

---

## 📖 Descripción

**Anime Studio** es un proyecto de exploración cultural construido íntegramente con tecnologías web nativas (HTML, CSS y JavaScript vanilla). Ofrece contenido sobre la historia del anime, sus géneros, la cultura japonesa y un formulario de contacto, todo disponible en tres idiomas: **Español**, **English** y **日本語**.

El sitio no depende de frameworks de JavaScript ni de herramientas de build; está pensado para desplegarse directamente desde cualquier servidor estático o GitHub Pages.

---

## ✨ Características

- **Selector de idioma** en la portada — redirige automáticamente a la versión elegida (`lang_es/`, `lang_en/`, `lang_jp/`)
- **Modo oscuro / claro** persistente mediante `localStorage`, aplicado antes del primer render para evitar FOUC
- **Detección de idioma** por ruta URL con mensajes de bienvenida personalizados según la hora del día
- **Slider de imágenes** construido a mano con `setInterval`, autoplay, navegación por botones, dots y swipe táctil
- **Menús desplegables** activados por `mouseover / mouseout`, sin dependencias adicionales
- **Navbar con sombra dinámica** al hacer scroll
- **Smooth scroll** hacia anclas internas
- **Pétalos flotantes** animados como efecto decorativo de fondo
- **Bootstrap 5** con fallback local si el CDN no responde
- **Tipografía japonesa** con *New Tegomin* y *Rampart One* (Google Fonts + fuentes locales WOFF2/TTF de respaldo)
- Responsive y accesible: roles ARIA, `aria-label` y estructura semántica en todas las páginas

---

## 🗂️ Estructura del proyecto

```
AnimeStudio/
├── index.html                  # Portada — selector de idioma
├── lang_es/                    # Versión en español
│   ├── home.html
│   ├── history.html
│   ├── genres.html
│   ├── culture.html
│   └── contact_me.html
├── lang_en/                    # English version
│   └── ...
├── lang_jp/                    # 日本語バージョン
│   └── ...
└── assets/
    ├── css/
    │   ├── style.css           # Estilos globales y variables CSS
    │   ├── bootstrap.min.css   # Fallback local de Bootstrap
    │   └── pages/              # Estilos específicos por sección
    │       ├── history.css
    │       ├── genres.css
    │       ├── culture.css
    │       └── contact_me.css
    ├── js/
    │   ├── main.js             # Lógica principal (tema, slider, DOM...)
    │   └── bootstrap.bundle.min.js
    ├── fonts/                  # New Tegomin y Rampart One (WOFF2 + TTF)
    ├── img/
    │   ├── history_pages/
    │   ├── genres_pages/
    │   ├── culture_pages/
    │   └── anime-away-face-svgrepo-com.svg
    └── favicon.ico
```

---

## 🚀 Uso

No se requiere instalación ni proceso de build.

**Opción 1 — Abrir localmente:**
```bash
git clone https://github.com/SebastianMendez20/Pagina-WEB_PROYECTO-UNAD.git
cd anime-studio
# Abrir index.html en el navegador
open index.html
```

**Opción 2 — Servidor local (recomendado para evitar restricciones CORS):**
```bash
# Con Python
python -m http.server 8080

# Con Node.js (npx)
npx serve .
```
Luego visita `http://localhost:8080`.

**Opción 3 — GitHub Pages:**
Activa GitHub Pages desde `Settings → Pages → Source: main / root` y el sitio estará disponible en `https://tu-usuario.github.io/anime-studio/`.

---

## 📄 Páginas

| Página | Descripción |
|---|---|
| `index.html` | Selector de idioma con animación de pétalos |
| `home.html` | Hero, secciones destacadas, slider de imágenes y explorador de géneros |
| `history.html` | Línea de tiempo del anime desde sus orígenes hasta la actualidad |
| `genres.html` | Galería de géneros: Shōnen, Seinen, Isekai, Mecha, Psychological... |
| `culture.html` | Cultura japonesa: gastronomía, festivales, arte, tradiciones y más |
| `contact_me.html` | Formulario de contacto |

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura y accesibilidad |
| CSS3 + variables custom | Tematización, animaciones, diseño responsive |
| JavaScript (ES5/vanilla) | Slider, tema, DOM, eventos |
| Bootstrap 5.3 | Grid, Offcanvas, Carousel, utilidades |
| Google Fonts | New Tegomin · Rampart One |
| SVG inline | Ilustración decorativa en el hero |

---

## 🌐 Internacionalización

El sitio implementa i18n a nivel de archivos HTML estáticos. Cada carpeta de idioma contiene sus propias páginas con textos traducidos. La detección se realiza por ruta en `main.js`:

```js
if (p.indexOf("/lang_en/") !== -1) return "en";
if (p.indexOf("/lang_jp/") !== -1) return "jp";
if (p.indexOf("/lang_es/") !== -1) return "es";
```

---

## 📜 Licencia

Este proyecto es de uso educativo y de exploración personal. Las imágenes utilizadas pertenecen a sus respectivos autores. La tipografía *New Tegomin* y *Rampart One* se distribuyen bajo la licencia [SIL Open Font License](assets/fonts/OFL.txt).

---

<p align="center">
  Hecho con ❤️ y muchísima 規律 &mdash; <strong>Anime Studio © 2026</strong>
</p>
