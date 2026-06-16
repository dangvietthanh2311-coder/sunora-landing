/* =========================================================================
   SUNORA Landing Page  |  script.js
   JavaScript thuần, không framework. Ba việc:
   1. Menu hamburger trên mobile (mở, đóng, phím Esc, đóng khi bấm link).
   2. Đổ bóng header khi cuộn.
   3. Swatch màu sản phẩm: bấm để đổi ảnh chính của card.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- 1. Menu hamburger (mobile) ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("is-open"));
    });
  }

  /* Đóng menu khi bấm vào một mục điều hướng (chỉ cần trên mobile) */
  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  /* Đóng menu bằng phím Esc */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* Nếu thu nhỏ rồi phóng to qua ngưỡng desktop, đảm bảo menu về trạng thái sạch */
  var mq = window.matchMedia("(min-width: 769px)");
  function onBreakpoint() { if (mq.matches) setMenu(false); }
  if (mq.addEventListener) mq.addEventListener("change", onBreakpoint);
  else if (mq.addListener) mq.addListener(onBreakpoint);

  /* ---------- 2. Đổ bóng header khi cuộn ---------- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 3. Swatch màu / ảnh chi tiết sản phẩm ---------- */
  var thumbs = document.querySelectorAll(".thumb");
  thumbs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-target");
      var main = document.getElementById(targetId);
      if (!main) return;

      var newSrc = btn.getAttribute("data-img");
      var newAlt = btn.getAttribute("data-alt");
      if (newSrc) main.src = newSrc;
      if (newAlt) main.alt = newAlt;

      /* Cập nhật trạng thái active trong cùng nhóm swatch của card */
      var group = btn.closest(".thumbs");
      if (group) {
        group.querySelectorAll(".thumb").forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-pressed", "false");
        });
      }
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
    });
  });
})();
