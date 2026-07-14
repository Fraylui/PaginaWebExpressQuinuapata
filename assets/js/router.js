/**
 * router.js — Navbar, menú móvil, scroll-spy, smooth scroll
 * Express Quinuapata VRAEM S.A.C.
 */
(function () {
  "use strict";

  function getCurrentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function isIndexPage() {
    var p = getCurrentPage();
    return p === "index.html" || p === "" || p === "/";
  }

  function setActiveNav() {
    var hash = window.location.hash.replace("#", "");
    if (!hash) {
      var map = {
        "index.html": "inicio", "": "inicio",
        "destinos.html": "destinos",
        "servicios.html": "servicios",
        "nosotros.html": "nosotros",
        "contacto.html": "contacto"
      };
      hash = map[getCurrentPage()] || "";
    }
    document.querySelectorAll(".nav-link[data-section]").forEach(function (l) {
      l.classList.toggle("activo", !!hash && l.getAttribute("data-section") === hash);
    });
  }

  function initNavbar() {
    var nav = document.querySelector(".navbar");
    if (!nav) return;
    if (isIndexPage()) {
      function upd() {
        nav.classList.toggle("navbar-s", window.scrollY > 50);
        nav.classList.toggle("navbar-t", window.scrollY <= 50);
      }
      window.addEventListener("scroll", upd, { passive: true });
      upd();
    } else {
      nav.classList.add("navbar-s");
      nav.classList.remove("navbar-t");
    }
  }

  function initScrollSpy() {
    if (!isIndexPage()) return;
    var secs = document.querySelectorAll("section[id]");
    if (!secs.length) return;
    function upd() {
      var mid = window.scrollY + 150;
      var cur = secs[0].id;
      secs.forEach(function (s) { if (s.offsetTop <= mid) cur = s.id; });
      document.querySelectorAll(".nav-link[data-section]").forEach(function (l) {
        l.classList.toggle("activo", l.getAttribute("data-section") === cur);
      });
    }
    window.addEventListener("scroll", upd, { passive: true });
    upd();
  }

  function initMobileMenu() {
    var btn  = document.querySelector(".navbar__hamburger");
    var menu = document.querySelector(".nav-mobile");
    if (!btn || !menu) return;

    function close() {
      btn.classList.remove("open");
      menu.classList.remove("abierto");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    btn.addEventListener("click", function () {
      var open = btn.classList.toggle("open");
      menu.classList.toggle("abierto", open);
      btn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    menu.querySelectorAll(".nav-link, .nav-mobile__cta").forEach(function (l) {
      l.addEventListener("click", close);
    });

    document.addEventListener("click", function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) close();
    });
  }

  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function initBackToTop() {
    var btn = document.getElementById("btn-arriba");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.style.display = window.scrollY > 400 ? "flex" : "none";
    }, { passive: true });
  }

  function init() {
    setActiveNav();
    initNavbar();
    initScrollSpy();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
