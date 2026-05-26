/* =============================================
   ANIME STUDIO — main.js
   - Tema persistente (dark / light)
   - Smooth scroll
   - Navbar shadow al hacer scroll
   - Detección de idioma
   - Mensajes de bienvenida personalizados (DOM)
   - Menús desplegables (mouseover / mouseout)
   - Slider de imágenes con setInterval
   - Estilos inyectados
   ============================================= */

(function () {
  "use strict";

  /* ─────────────────────────────────────────────
       1. DETECCIÓN DE IDIOMA
    ───────────────────────────────────────────── */
  function detectLang() {
    var p = window.location.pathname.toLowerCase();
    if (p.indexOf("/lang_en/") !== -1) return "en";
    if (p.indexOf("/lang_jp/") !== -1) return "jp";
    if (p.indexOf("/lang_es/") !== -1) return "es";
    var html = (document.documentElement.lang || "").toLowerCase();
    if (html.indexOf("en") === 0) return "en";
    if (html.indexOf("ja") === 0 || html.indexOf("jp") === 0) return "jp";
    return "es";
  }
  var LANG = detectLang();
  console.info("[AnimeStudio] Idioma detectado:", LANG);

  /* ─────────────────────────────────────────────
       2. TEMA DARK / LIGHT
    ───────────────────────────────────────────── */
  var THEME_KEY = "animeStudioTheme";
  var DARK = "dark";
  var LIGHT = "light";

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (document.body) {
      document.body.setAttribute(
        "data-bs-theme",
        theme === DARK ? "dark" : "light"
      );
    }
    document.querySelectorAll(".theme-toggle-input").forEach(function (cb) {
      cb.checked = theme === DARK;
    });
    document.querySelectorAll(".icon-sun").forEach(function (el) {
      el.style.display = theme === DARK ? "inline" : "none";
    });
    document.querySelectorAll(".icon-moon").forEach(function (el) {
      el.style.display = theme === DARK ? "none" : "inline";
    });
  }

  function toggleTheme() {
    var next = getStoredTheme() === DARK ? LIGHT : DARK;
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  // Aplicar antes del primer render (evita FOUC)
  applyTheme(getStoredTheme());

  /* ─────────────────────────────────────────────
       3. ESTILOS INYECTADOS
    ───────────────────────────────────────────── */
  function injectGlobalStyles() {
    if (document.getElementById("as-global-styles")) return;

    var css = [
      /* ── Carrusel Historia ── */
      ".history-carousel,.culture-carousel{border-radius:var(--radius-md,12px);overflow:hidden;background:var(--surface)}",
      ".history-carousel img,.culture-carousel img{max-width:100%;height:auto;display:block}",
      ".history-carousel .carousel-item img{max-height:480px;width:100%;object-fit:cover}",
      ".history-carousel .carousel-caption{position:static;padding:.6rem 1rem;color:var(--text);background:var(--surface);text-align:left}",
      ".history-carousel .carousel-caption p{margin:0;font-size:.82rem;color:var(--muted)}",
      ".history-carousel .carousel-control-prev,.history-carousel .carousel-control-next{width:8%;opacity:.85}",
      ".history-carousel .carousel-control-prev-icon,.history-carousel .carousel-control-next-icon{background-color:rgba(0,0,0,.45);border-radius:50%;padding:1rem;background-size:50%}",
      ".history-carousel .carousel-indicators [data-bs-target]{background-color:var(--primary)}",
      /* ── Carrusel Cultura ── */
      ".culture-carousel{padding:1rem 0}",
      ".culture-carousel .carousel-inner{padding-bottom:2.5rem}",
      ".culture-carousel .carousel-item{padding:0 .5rem}",
      ".culture-carousel .carousel-control-prev,.culture-carousel .carousel-control-next{width:6%;opacity:.85}",
      ".culture-carousel .carousel-control-prev-icon,.culture-carousel .carousel-control-next-icon{background-color:var(--primary);border-radius:50%;padding:1rem;background-size:50%}",
      ".culture-carousel .carousel-indicators{position:static;margin-top:1rem}",
      ".culture-carousel .carousel-indicators [data-bs-target]{background-color:var(--primary);width:10px;height:10px;border-radius:50%;border:none;opacity:.4}",
      ".culture-carousel .carousel-indicators .active{opacity:1}",

      /* ── Mensaje de bienvenida ── */
      "#as-welcome-msg{position:fixed;top:76px;right:1.2rem;z-index:1300;background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--primary);border-radius:var(--radius-md,12px);padding:.9rem 1.2rem 1rem;max-width:270px;box-shadow:0 8px 32px rgba(0,0,0,.14);transform:translateX(120%);transition:transform .45s cubic-bezier(.34,1.56,.64,1);font-size:.86rem;line-height:1.55;color:var(--text)}",
      "#as-welcome-msg.visible{transform:translateX(0)}",
      "#as-welcome-msg .as-wm-title{font-family:var(--font-display,serif);color:var(--primary);font-size:.97rem;display:block;margin-bottom:.3rem}",
      "#as-welcome-msg .as-wm-close{position:absolute;top:.35rem;right:.55rem;background:none;border:none;color:var(--muted);cursor:pointer;font-size:.95rem;line-height:1;padding:2px 4px;border-radius:4px;transition:color .15s}",
      "#as-welcome-msg .as-wm-close:hover{color:var(--text)}",

      /* ── Menús desplegables ── */
      ".as-dropdown-wrap{position:relative;display:inline-flex;align-items:center}",
      ".as-dropdown{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(-4px);background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md,12px);padding:.4rem 0;min-width:175px;box-shadow:0 10px 36px rgba(0,0,0,.14);opacity:0;visibility:hidden;transition:opacity .22s,transform .22s,visibility .22s;z-index:1200;pointer-events:none}",
      ".as-dropdown-wrap.open .as-dropdown{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);pointer-events:auto}",
      ".as-dropdown::before{content:'';position:absolute;top:-7px;left:50%;transform:translateX(-50%);border:7px solid transparent;border-bottom-color:var(--border);border-top:none}",
      ".as-dropdown::after{content:'';position:absolute;top:-6px;left:50%;transform:translateX(-50%);border:6px solid transparent;border-bottom-color:var(--surface);border-top:none}",
      ".as-dropdown a{display:block;padding:.42rem 1rem;color:var(--text);text-decoration:none;font-size:.83rem;white-space:nowrap;transition:background .15s,color .15s,padding-left .15s}",
      ".as-dropdown a:hover{background:color-mix(in srgb,var(--primary) 12%,transparent);color:var(--primary);padding-left:1.3rem}",
      ".as-dropdown-arrow{display:inline-block;margin-left:.28rem;font-size:.6rem;vertical-align:middle;transition:transform .22s;line-height:1;opacity:.7}",
      ".as-dropdown-wrap.open .as-dropdown-arrow{transform:rotate(180deg)}",

      /* ── Slider personalizado ── */
      ".as-slider{position:relative;overflow:hidden;border-radius:var(--radius-md,12px);background:var(--surface);line-height:0}",
      ".as-slider-track{display:flex;transition:transform .5s cubic-bezier(.25,.46,.45,.94)}",
      ".as-slider-slide{min-width:100%;position:relative;line-height:normal}",
      ".as-slider-slide img{width:100%;height:300px;object-fit:cover;display:block}",
      ".as-slider-caption{padding:.65rem 1rem .75rem;background:var(--surface);color:var(--text);font-size:.82rem;line-height:1.5}",
      ".as-slider-caption strong{display:block;font-family:var(--font-display,serif);color:var(--primary);font-size:.93rem;margin-bottom:.15rem}",
      ".as-slider-btn{position:absolute;top:calc(300px / 2);transform:translateY(-50%);background:rgba(0,0,0,.48);border:none;color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1.15rem;display:flex;align-items:center;justify-content:center;z-index:10;transition:background .2s,scale .15s;line-height:1}",
      ".as-slider-btn:hover{background:var(--primary);scale:1.1}",
      ".as-slider-prev{left:.65rem}",
      ".as-slider-next{right:.65rem}",
      ".as-slider-dots{display:flex;justify-content:center;gap:.45rem;padding:.6rem 0 .8rem;background:var(--surface);line-height:1}",
      ".as-slider-dot{width:8px;height:8px;border-radius:50%;background:var(--border);border:none;cursor:pointer;padding:0;transition:background .2s,scale .2s}",
      ".as-slider-dot.active{background:var(--primary);scale:1.35}",
    ].join("");

    var s = document.createElement("style");
    s.id = "as-global-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ─────────────────────────────────────────────
       4. SMOOTH SCROLL
    ───────────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var hash = this.getAttribute("href");
        if (hash === "#") return;
        var target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ─────────────────────────────────────────────
       5. NAVBAR SHADOW
    ───────────────────────────────────────────── */
  function initNavbarShadow() {
    var nav = document.querySelector(".navbar");
    if (!nav) return;
    window.addEventListener("scroll", function () {
      nav.classList.toggle("navbar--scrolled", window.scrollY > 20);
    });
  }

  /* ─────────────────────────────────────────────
       6. MENSAJES PERSONALIZADOS (manipulación DOM)
       Muestra una notificación según la hora del
       día y el idioma detectado. Solo aparece una
       vez por sesión y únicamente en páginas home.
    ───────────────────────────────────────────── */
  var GREETINGS = {
    es: {
      morning: {
        title: "¡Buenos días! 🌸",
        body: "Comienza el día explorando el universo del anime.",
      },
      afternoon: {
        title: "¡Buenas tardes! ⛩️",
        body: "Una tarde perfecta para descubrir la cultura japonesa.",
      },
      evening: {
        title: "¡Buenas noches! 🌙",
        body: "El anime es mejor por la noche. ¡Disfruta la visita!",
      },
    },
    en: {
      morning: {
        title: "Good morning! 🌸",
        body: "Start your day exploring the anime universe.",
      },
      afternoon: {
        title: "Good afternoon! ⛩️",
        body: "A perfect afternoon to discover Japanese culture.",
      },
      evening: {
        title: "Good evening! 🌙",
        body: "Anime is best at night. Enjoy your visit!",
      },
    },
    jp: {
      morning: {
        title: "おはようございます！🌸",
        body: "アニメの世界を探検しながら一日を始めましょう！",
      },
      afternoon: {
        title: "こんにちは！⛩️",
        body: "日本文化を発見するのに最適な午後です。",
      },
      evening: {
        title: "こんばんは！🌙",
        body: "夜のアニメ鑑賞は最高です。お楽しみください！",
      },
    },
  };

  function getTimeOfDay() {
    var h = new Date().getHours();
    if (h >= 5 && h < 12) return "morning";
    if (h >= 12 && h < 20) return "afternoon";
    return "evening";
  }

  function initWelcomeMessage() {
    // Solo activar en páginas home.*
    if (!/home\.html/.test(window.location.pathname)) return;
    // Una sola vez por sesión de navegador
    if (sessionStorage.getItem("as-welcome-shown")) return;

    var lang = GREETINGS[LANG] || GREETINGS.es;
    var msg = lang[getTimeOfDay()];

    // Construir el nodo mediante manipulación del DOM
    var box = document.createElement("div");
    var close = document.createElement("button");
    var title = document.createElement("span");
    var body = document.createTextNode(msg.body);

    box.id = "as-welcome-msg";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");

    close.className = "as-wm-close";
    close.setAttribute("aria-label", "Cerrar mensaje");
    close.textContent = "✕";

    title.className = "as-wm-title";
    title.textContent = msg.title;

    box.appendChild(close);
    box.appendChild(title);
    box.appendChild(body);
    document.body.appendChild(box);

    // Mostrar con pequeño delay para que la transición CSS sea visible
    var showTimer = setTimeout(function () {
      box.classList.add("visible");
    }, 900);

    // Auto-cerrar a los 7 s
    var hideTimer = setTimeout(function () {
      box.classList.remove("visible");
    }, 7500);

    close.addEventListener("click", function () {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      box.classList.remove("visible");
    });

    sessionStorage.setItem("as-welcome-shown", "1");
  }

  /* ─────────────────────────────────────────────
       7. MENÚS DESPLEGABLES
       Agrega submenús a los enlaces de la barra de
       navegación de escritorio usando eventos
       mouseover y mouseout (sin frameworks).
    ───────────────────────────────────────────── */

  // Submenús por href del enlace padre (funciona en cualquier idioma)
  var DROPDOWN_ITEMS = {
    "history.html": {
      es: [
        {
          label: "Precursores (1917–1960)",
          href: "history.html#era-precursores",
        },
        { label: "Era dorada (1963–1980)", href: "history.html#era-dorada" },
        { label: "Era digital (1990–hoy)", href: "history.html#era-digital" },
      ],
      en: [
        {
          label: "Precursors (1917–1960)",
          href: "history.html#era-precursores",
        },
        { label: "Golden era (1963–1980)", href: "history.html#era-dorada" },
        { label: "Digital era (1990–now)", href: "history.html#era-digital" },
      ],
      jp: [
        { label: "先駆者（1917–1960）", href: "history.html#era-precursores" },
        { label: "黄金時代（1963–1980）", href: "history.html#era-dorada" },
        { label: "デジタル時代（1990–）", href: "history.html#era-digital" },
      ],
    },
    "genres.html": {
      es: [
        { label: "⚔️ Shōnen", href: "genres.html" },
        { label: "🌸 Shōjo", href: "genres.html" },
        { label: "🔪 Seinen", href: "genres.html" },
        { label: "🌀 Temáticos", href: "genres.html" },
      ],
      en: [
        { label: "⚔️ Shōnen", href: "genres.html" },
        { label: "🌸 Shōjo", href: "genres.html" },
        { label: "🔪 Seinen", href: "genres.html" },
        { label: "🌀 Thematic", href: "genres.html" },
      ],
      jp: [
        { label: "⚔️ 少年", href: "genres.html" },
        { label: "🌸 少女", href: "genres.html" },
        { label: "🔪 青年", href: "genres.html" },
        { label: "🌀 テーマ別", href: "genres.html" },
      ],
    },
    "culture.html": {
      es: [
        { label: "🧘 Filosofía", href: "culture.html#filosofia" },
        { label: "🎋 Festivales", href: "culture.html#festivales" },
        { label: "🍣 Gastronomía", href: "culture.html#gastronomia" },
      ],
      en: [
        { label: "🧘 Philosophy", href: "culture.html#filosofia" },
        { label: "🎋 Festivals", href: "culture.html#festivales" },
        { label: "🍣 Gastronomy", href: "culture.html#gastronomia" },
      ],
      jp: [
        { label: "🧘 哲学", href: "culture.html#filosofia" },
        { label: "🎋 祭り", href: "culture.html#festivales" },
        { label: "🍣 食文化", href: "culture.html#gastronomia" },
      ],
    },
  };

  function initDropdownMenus() {
    var navContainer = document.querySelector(".navbar .d-none.d-md-flex");
    if (!navContainer) return;

    var navLinks = navContainer.querySelectorAll("a.nav-link-custom");
    if (!navLinks.length) return;

    navLinks.forEach(function (link) {
      // Obtener solo el nombre del archivo (p.ej. "history.html")
      var href = link.getAttribute("href") || "";
      var filename = href.split("/").pop().split("?")[0].split("#")[0];
      var config = DROPDOWN_ITEMS[filename];
      if (!config) return;

      var items = config[LANG] || config.es;

      /* ── Envolver el enlace en un contenedor ── */
      var wrap = document.createElement("div");
      wrap.className = "as-dropdown-wrap";
      navContainer.insertBefore(wrap, link);
      wrap.appendChild(link);

      /* ── Flecha indicadora ── */
      var arrow = document.createElement("span");
      arrow.className = "as-dropdown-arrow";
      arrow.textContent = "▾";
      arrow.setAttribute("aria-hidden", "true");
      link.appendChild(arrow);

      /* ── Panel desplegable ── */
      var dd = document.createElement("div");
      dd.className = "as-dropdown";
      dd.setAttribute("role", "menu");

      items.forEach(function (item) {
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        a.setAttribute("role", "menuitem");
        dd.appendChild(a);
      });

      wrap.appendChild(dd);

      /* ── Eventos mouseover / mouseout ── */
      var closeTimer = null;

      wrap.addEventListener("mouseover", function () {
        clearTimeout(closeTimer);
        wrap.classList.add("open");
      });

      wrap.addEventListener("mouseout", function (e) {
        // Ignorar si el cursor sigue dentro del wrapper o el panel
        if (wrap.contains(e.relatedTarget)) return;
        closeTimer = setTimeout(function () {
          wrap.classList.remove("open");
        }, 140);
      });

      /* ── Accesibilidad: teclado ── */
      link.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          wrap.classList.toggle("open");
        }
        if (e.key === "Escape") wrap.classList.remove("open");
      });

      /* Cerrar al hacer clic fuera */
      document.addEventListener("click", function (e) {
        if (!wrap.contains(e.target)) wrap.classList.remove("open");
      });
    });
  }

  /* ─────────────────────────────────────────────
       8. SLIDER DE IMÁGENES CON setInterval
       Se inyecta dinámicamente en la página home
       antes de la sección CTA final. Incluye
       autoplay con setInterval y navegación manual
       (botones + dots + swipe táctil).
    ───────────────────────────────────────────── */
  var SLIDER_SLIDES = {
    es: [
      {
        src: "../assets/img/history_pages/Akira.jpg",
        caption: "Akira (1988)",
        desc: "Pionero del anime cinematográfico moderno; obra cumbre de Katsuhiro Otomo.",
      },
      {
        src: "../assets/img/history_pages/Dragon Ball.jpg",
        caption: "Dragon Ball",
        desc: "El ícono global del género shōnen que marcó generaciones enteras.",
      },
      {
        src: "../assets/img/history_pages/Neon Genesis Evangelion.jpg",
        caption: "Neon Genesis Evangelion",
        desc: "Revolucionó el género mecha y la narrativa psicológica en los años 90.",
      },
      {
        src: "../assets/img/history_pages/Studio Ghibli.png",
        caption: "Studio Ghibli",
        desc: "El estudio más premiado de la animación japonesa, fundado por Miyazaki.",
      },
      {
        src: "../assets/img/history_pages/Hakujaden.jpg",
        caption: "Hakujaden (1958)",
        desc: "Primera película de anime en color de la historia.",
      },
    ],
    en: [
      {
        src: "../assets/img/history_pages/Akira.jpg",
        caption: "Akira (1988)",
        desc: "Pioneer of modern cinematic anime; a milestone by Katsuhiro Otomo.",
      },
      {
        src: "../assets/img/history_pages/Dragon Ball.jpg",
        caption: "Dragon Ball",
        desc: "The global icon of the shōnen genre that shaped entire generations.",
      },
      {
        src: "../assets/img/history_pages/Neon Genesis Evangelion.jpg",
        caption: "Neon Genesis Evangelion",
        desc: "Revolutionized the mecha genre and psychological storytelling in the 90s.",
      },
      {
        src: "../assets/img/history_pages/Studio Ghibli.png",
        caption: "Studio Ghibli",
        desc: "Japan's most awarded animation studio, founded by Hayao Miyazaki.",
      },
      {
        src: "../assets/img/history_pages/Hakujaden.jpg",
        caption: "Hakujaden (1958)",
        desc: "The first full-length color anime film in history.",
      },
    ],
    jp: [
      {
        src: "../assets/img/history_pages/Akira.jpg",
        caption: "AKIRA（1988年）",
        desc: "大友克洋による現代アニメ映画の先駆的な傑作。",
      },
      {
        src: "../assets/img/history_pages/Dragon Ball.jpg",
        caption: "ドラゴンボール",
        desc: "世代を超えた少年ジャンルの世界的アイコン。",
      },
      {
        src: "../assets/img/history_pages/Neon Genesis Evangelion.jpg",
        caption: "新世紀エヴァンゲリオン",
        desc: "90年代にロボットアニメと心理的な物語を革命的に変えた作品。",
      },
      {
        src: "../assets/img/history_pages/Studio Ghibli.png",
        caption: "スタジオジブリ",
        desc: "宮崎駿が創設した、日本で最も受賞歴のあるアニメスタジオ。",
      },
      {
        src: "../assets/img/history_pages/Hakujaden.jpg",
        caption: "白蛇伝（1958年）",
        desc: "日本初のカラーアニメ長編映画。",
      },
    ],
  };

  var SLIDER_SECTION_TITLE = {
    es: "Momentos icónicos del anime",
    en: "Iconic anime moments",
    jp: "アニメの象徴的な瞬間",
  };

  var SLIDER_INTERVAL_MS = 4500; // ms entre slides en autoplay

  /**
   * Construye y activa un slider dentro del `container` indicado.
   * @param {HTMLElement} container  - El elemento .as-slider ya en el DOM.
   * @param {Array}       slides     - Array de { src, caption, desc }.
   */
  function buildSlider(container, slides) {
    var current = 0;
    var total = slides.length;
    var autoInterval = null;

    /* ── Track (cinta de slides) ── */
    var track = document.createElement("div");
    track.className = "as-slider-track";

    slides.forEach(function (s) {
      var slide = document.createElement("div");
      slide.className = "as-slider-slide";

      var img = document.createElement("img");
      img.src = s.src;
      img.alt = s.caption;
      img.loading = "lazy";

      var cap = document.createElement("div");
      cap.className = "as-slider-caption";

      var strong = document.createElement("strong");
      strong.textContent = s.caption;
      cap.appendChild(strong);
      cap.appendChild(document.createTextNode(s.desc));

      slide.appendChild(img);
      slide.appendChild(cap);
      track.appendChild(slide);
    });
    container.appendChild(track);

    /* ── Botones de navegación manual ── */
    var btnPrev = document.createElement("button");
    btnPrev.className = "as-slider-btn as-slider-prev";
    btnPrev.setAttribute("aria-label", "Imagen anterior");
    btnPrev.innerHTML = "&#8249;"; // ‹

    var btnNext = document.createElement("button");
    btnNext.className = "as-slider-btn as-slider-next";
    btnNext.setAttribute("aria-label", "Imagen siguiente");
    btnNext.innerHTML = "&#8250;"; // ›

    container.appendChild(btnPrev);
    container.appendChild(btnNext);

    /* ── Indicadores (dots) ── */
    var dotsWrap = document.createElement("div");
    dotsWrap.className = "as-slider-dots";

    var dots = [];
    for (var i = 0; i < total; i++) {
      var dot = document.createElement("button");
      dot.className = "as-slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Ir a imagen " + (i + 1));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }
    container.appendChild(dotsWrap);

    /* ── Lógica de navegación ── */
    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (d, j) {
        d.classList.toggle("active", j === current);
      });
    }

    /* ── Autoplay con setInterval ── */
    function startAuto() {
      stopAuto();
      autoInterval = setInterval(function () {
        goTo(current + 1);
      }, SLIDER_INTERVAL_MS);
    }

    function stopAuto() {
      if (autoInterval !== null) {
        clearInterval(autoInterval);
        autoInterval = null;
      }
    }

    /* ── Eventos de los botones y dots ── */
    btnPrev.addEventListener("click", function () {
      stopAuto();
      goTo(current - 1);
      startAuto();
    });
    btnNext.addEventListener("click", function () {
      stopAuto();
      goTo(current + 1);
      startAuto();
    });
    dots.forEach(function (dot, j) {
      dot.addEventListener("click", function () {
        stopAuto();
        goTo(j);
        startAuto();
      });
    });

    /* ── Swipe táctil ── */
    var touchStartX = 0;
    container.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    container.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 45) {
        stopAuto();
        goTo(diff > 0 ? current + 1 : current - 1);
        startAuto();
      }
    });

    /* ── Pausar autoplay cuando el usuario pasa el cursor ── */
    container.addEventListener("mouseenter", stopAuto);
    container.addEventListener("mouseleave", startAuto);

    /* ── Arrancar ── */
    goTo(0);
    startAuto();
  }

  function initSliders() {
    // Solo inyectar en la página home
    if (!/home\.html/.test(window.location.pathname)) return;

    var slides = SLIDER_SLIDES[LANG] || SLIDER_SLIDES.es;
    var title = SLIDER_SECTION_TITLE[LANG] || SLIDER_SECTION_TITLE.es;

    // Si ya existe un contenedor preparado en el HTML, usarlo
    var existing = document.getElementById("as-featured-slider");
    if (existing) {
      existing.classList.add("as-slider");
      buildSlider(existing, slides);
      return;
    }

    // Si no existe, inyectar la sección completa antes del CTA final
    var anchor =
      document.querySelector("section.py-5") ||
      document.querySelector("footer");
    if (!anchor) return;

    var section = document.createElement("section");
    section.style.cssText = "padding:3rem 0;background:var(--bg)";

    var container = document.createElement("div");
    container.className = "container";

    var h2 = document.createElement("h2");
    h2.style.cssText =
      "font-family:var(--font-display,serif);color:var(--primary);margin-bottom:1.2rem;font-size:clamp(1.3rem,3vw,1.9rem)";
    h2.textContent = title;

    var sliderEl = document.createElement("div");
    sliderEl.id = "as-featured-slider";
    sliderEl.className = "as-slider";

    container.appendChild(h2);
    container.appendChild(sliderEl);
    section.appendChild(container);
    anchor.parentNode.insertBefore(section, anchor);

    buildSlider(sliderEl, slides);
  }

  /* ─────────────────────────────────────────────
       INIT — punto de entrada principal
    ───────────────────────────────────────────── */
  injectGlobalStyles();

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getStoredTheme());

    // Toggle de tema
    document.querySelectorAll(".theme-toggle-input").forEach(function (cb) {
      cb.addEventListener("change", toggleTheme);
    });

    initSmoothScroll();
    initNavbarShadow();
    initWelcomeMessage(); // ← mensaje según hora e idioma
    initDropdownMenus(); // ← menús desplegables (mouseover/mouseout)
    initSliders(); // ← slider con setInterval
  });
})();
