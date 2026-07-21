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

      /* Cập nhật màu đang chọn cho giỏ hàng (bỏ qua thumb ảnh chi tiết) */
      if (!btn.classList.contains("thumb--detail")) {
        main.dataset.color = (btn.getAttribute("aria-label") || "").replace(/^Màu /, "");
      }

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

  /* ---------- 4. Video nền hero (chỉ màn rộng) ---------- */
  /* Video trong HTML không có src. Chỉ gán src khi màn từ 768px trở lên và
     người dùng không tắt hiệu ứng chuyển động, nên điện thoại không bao giờ
     tải file mp4, hero mobile dùng ảnh tĩnh làm nền. */
  var heroVideo = document.getElementById("heroVideo");
  if (
    heroVideo &&
    window.matchMedia("(min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    heroVideo.muted = true;
    heroVideo.src = heroVideo.getAttribute("data-src");
    var playAttempt = heroVideo.play();
    if (playAttempt && playAttempt.catch) playAttempt.catch(function () {});
  }

  /* ---------- 5. Tiện ích campaign: đếm ngược flash sale + dải UV ---------- */
  /* Flash sale theo khung Shopee: 12h và 20h hằng ngày, mỗi khung kéo dài 2 giờ. */
  var cdBox = document.getElementById("saleCountdown");
  if (cdBox) {
    var cdLabel = document.getElementById("saleCountdownLabel");
    var cdTimer = document.getElementById("saleCountdownTimer");
    var cdVoucher = document.getElementById("saleCountdownVoucher");
    var SLOTS = [12, 20];
    var SLOT_HOURS = 2;
    var VOUCHER_END = new Date(2026, 6, 31, 23, 59, 59);

    /* Hàm thuần: trạng thái flash sale tại một thời điểm bất kỳ */
    function slotState(now) {
      for (var i = 0; i < SLOTS.length; i++) {
        var start = new Date(now); start.setHours(SLOTS[i], 0, 0, 0);
        var end = new Date(start.getTime() + SLOT_HOURS * 3600000);
        if (now >= start && now < end) {
          return { live: true, target: end, label: "Flash sale đang diễn ra, kết thúc sau" };
        }
        if (now < start) {
          return { live: false, target: start, label: "Flash sale " + SLOTS[i] + "h hôm nay bắt đầu sau" };
        }
      }
      var t = new Date(now); t.setDate(t.getDate() + 1); t.setHours(SLOTS[0], 0, 0, 0);
      return { live: false, target: t, label: "Flash sale " + SLOTS[0] + "h trưa mai bắt đầu sau" };
    }
    window.__slotState = slotState; /* lộ ra cho kiểm thử render, vô hại */

    function two(n) { return (n < 10 ? "0" : "") + n; }
    function cdTick() {
      var now = new Date();
      var st = slotState(now);
      var ms = Math.max(0, st.target - now);
      cdLabel.textContent = st.label;
      cdTimer.textContent = two(Math.floor(ms / 3600000)) + ":" +
        two(Math.floor(ms % 3600000 / 60000)) + ":" + two(Math.floor(ms % 60000 / 1000));
      cdBox.classList.toggle("is-live", st.live);
      if (cdVoucher) cdVoucher.hidden = now > VOUCHER_END;
      cdBox.hidden = false;
    }
    cdTick();
    setInterval(cdTick, 1000);
  }

  /* Dải UV trực tiếp cho Hà Nội và TP.HCM qua open-meteo (không cần key).
     API lỗi thì dải giữ nguyên trạng thái ẩn, trang không ảnh hưởng. */
  var uvStrip = document.getElementById("uvStrip");
  if (uvStrip && window.fetch) {
    var uvLevel = function (v) {
      if (v < 3) return ["Thấp", "#7CB342"];
      if (v < 6) return ["Trung bình", "#F9A825"];
      if (v < 8) return ["Cao", "#EF6C00"];
      if (v < 11) return ["Rất cao", "#C62828"];
      return ["Cực đại", "#6A1B9A"];
    };
    var uvFill = function (el, city, v) {
      if (!el || v == null) return;
      var lv = uvLevel(v);
      el.innerHTML = city + ' <b class="uv-chip" style="background:' + lv[1] + '">' +
        (Math.round(v * 10) / 10) + " " + lv[0] + "</b>";
    };
    fetch("https://api.open-meteo.com/v1/forecast?latitude=21.0285,10.7769&longitude=105.8542,106.7009&current=uv_index&timezone=Asia%2FBangkok")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var list = Array.isArray(data) ? data : [data];
        var hn = list[0] && list[0].current ? list[0].current.uv_index : null;
        var sg = list[1] && list[1].current ? list[1].current.uv_index : null;
        if (hn == null && sg == null) return;
        uvFill(document.getElementById("uvHanoi"), "Hà Nội", hn);
        uvFill(document.getElementById("uvHcm"), "TP.HCM", sg);
        uvStrip.hidden = false;
      })
      .catch(function () {});
  }
})();
