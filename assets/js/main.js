(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // Vertical parallax on the hero phone mockups
  var phones = document.querySelector(".hero-phones");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (phones && !reduceMotion) {
    var ticking = false;

    function updateParallax() {
      var rect = phones.getBoundingClientRect();
      var viewportH = window.innerHeight;
      // progress: -1 (above viewport) .. 1 (below viewport), 0 when centered
      var progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
      var offset = progress * -36; // px of vertical drift
      phones.style.transform = "translateY(" + offset.toFixed(1) + "px)";
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }
})();
