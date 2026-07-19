/* =========================================================================
   SUNORA Landing Page  |  cart.js
   Giỏ hàng và đặt hàng tại trang, dùng chung cho index.html và checkout.html.
   Mọi truy cập phần tử đều kiểm tra tồn tại trước, nên trang nào thiếu phần
   tử (ví dụ checkout.html không có lưới sản phẩm) cũng không lỗi console.
   ========================================================================= */
const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbwvJpbEmbr1w-pTjYmoUMHJqHeGlwv0xZifOAwrujS8eIUJfpgja19ZOFnQorqtJ-BUQg/exec";
const BANK = { bin: "970423", bankName: "TPBank", account: "00000806592", accountName: "LE QUY AN DUC" };

(function () {
  "use strict";

  var CART_KEY = "sunora_cart_v1";

  /* ---------- 1. Kho giỏ hàng (localStorage) ---------- */
  function loadCart() {
    try {
      var arr = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function saveCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
  }
  function fmtVND(n) { return (n || 0).toLocaleString("vi-VN") + "đ"; }
  function cartCount(items) {
    return items.reduce(function (s, it) { return s + it.qty; }, 0);
  }
  function cartTotal(items) {
    return items.reduce(function (s, it) { return s + it.price * it.qty; }, 0);
  }
  function variantText(it) {
    return it.color ? it.color + " / " + it.size : it.size;
  }

  /* ---------- 2. Badge số lượng trên nút giỏ ---------- */
  var badge = document.getElementById("cartBadge");
  function renderBadge(items) {
    if (!badge) return;
    var n = cartCount(items);
    badge.textContent = n;
    badge.hidden = n === 0;
  }

  /* ---------- 3. Drawer giỏ hàng (chỉ dựng khi trang có nút giỏ) ---------- */
  var cartBtn = document.getElementById("cartBtn");
  var overlay = null, drawer = null, drawerBody = null, drawerFoot = null, subtotalEl = null;

  function buildDrawer() {
    overlay = document.createElement("div");
    overlay.className = "cart-overlay";

    drawer = document.createElement("aside");
    drawer.className = "cart-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", "Giỏ hàng");
    drawer.innerHTML =
      '<div class="cart-drawer__head">' +
      '  <h2 class="cart-drawer__title">Giỏ hàng</h2>' +
      '  <button type="button" class="cart-drawer__close" aria-label="Đóng giỏ hàng">&times;</button>' +
      '</div>' +
      '<div class="cart-drawer__body"></div>' +
      '<div class="cart-drawer__foot">' +
      '  <p class="cart-drawer__row"><span>Tạm tính</span><strong class="cart-drawer__subtotal">0đ</strong></p>' +
      '  <p class="cart-drawer__ship">Freeship 0đ toàn quốc</p>' +
      '  <a class="btn btn--primary btn--block" href="checkout.html">Tiến hành đặt hàng</a>' +
      '  <button type="button" class="cart-drawer__continue">Tiếp tục mua sắm</button>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    drawerBody = drawer.querySelector(".cart-drawer__body");
    drawerFoot = drawer.querySelector(".cart-drawer__foot");
    subtotalEl = drawer.querySelector(".cart-drawer__subtotal");

    overlay.addEventListener("click", closeDrawer);
    drawer.querySelector(".cart-drawer__close").addEventListener("click", closeDrawer);
    drawer.querySelector(".cart-drawer__continue").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });

    /* Tăng, giảm, xóa item: ủy quyền sự kiện trong thân drawer */
    drawerBody.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-act]");
      if (!btn) return;
      var idx = parseInt(btn.getAttribute("data-idx"), 10);
      var items = loadCart();
      if (isNaN(idx) || !items[idx]) return;
      var act = btn.getAttribute("data-act");
      if (act === "inc") items[idx].qty += 1;
      if (act === "dec") items[idx].qty = Math.max(1, items[idx].qty - 1);
      if (act === "rm") items.splice(idx, 1);
      saveCart(items);
      renderCartUI();
    });
  }

  function renderDrawer(items) {
    if (!drawerBody) return;
    if (!items.length) {
      drawerBody.innerHTML =
        '<p class="cart-drawer__empty">Giỏ hàng đang trống. Chọn món đầu tiên của bạn nhé.</p>' +
        '<a class="btn btn--primary btn--block cart-drawer__browse" href="#luoi-san-pham">Xem sản phẩm</a>';
      var browse = drawerBody.querySelector(".cart-drawer__browse");
      if (browse) browse.addEventListener("click", closeDrawer);
      drawerFoot.hidden = true;
      return;
    }
    drawerFoot.hidden = false;
    var html = items.map(function (it, i) {
      return (
        '<div class="cart-item">' +
        '  <div class="cart-item__info">' +
        '    <p class="cart-item__name">' + it.name + '</p>' +
        '    <p class="cart-item__variant">' + variantText(it) + '</p>' +
        '    <p class="cart-item__price">' + fmtVND(it.price * it.qty) + '</p>' +
        '  </div>' +
        '  <div class="cart-item__ctrl">' +
        '    <div class="cart-item__stepper">' +
        '      <button type="button" data-act="dec" data-idx="' + i + '" aria-label="Giảm số lượng">-</button>' +
        '      <span>' + it.qty + '</span>' +
        '      <button type="button" data-act="inc" data-idx="' + i + '" aria-label="Tăng số lượng">+</button>' +
        '    </div>' +
        '    <button type="button" class="cart-item__remove" data-act="rm" data-idx="' + i + '">Xóa</button>' +
        '  </div>' +
        '</div>'
      );
    }).join("");
    drawerBody.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = fmtVND(cartTotal(items));
  }

  function openDrawer() {
    if (!drawer) return;
    overlay.classList.add("is-open");
    drawer.classList.add("is-open");
  }
  function closeDrawer() {
    if (!drawer) return;
    overlay.classList.remove("is-open");
    drawer.classList.remove("is-open");
  }

  function renderCartUI() {
    var items = loadCart();
    renderBadge(items);
    renderDrawer(items);
  }

  if (cartBtn) {
    buildDrawer();
    cartBtn.addEventListener("click", function () {
      renderCartUI();
      openDrawer();
    });
  }

  /* ---------- 4. Nút Thêm vào giỏ trên card sản phẩm ---------- */
  var addBtns = document.querySelectorAll(".add-to-cart");
  addBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".product");
      if (!card) return;
      var img = card.querySelector(".product__img");
      var sel = card.querySelector(".product__size-select");
      var entry = {
        sku: card.dataset.sku || "",
        name: card.dataset.name || "",
        price: parseInt(card.dataset.price, 10) || 0,
        color: (img && img.dataset.color) || "",
        size: sel ? sel.value : "Một cỡ",
        qty: 1
      };
      var items = loadCart();
      var found = null;
      for (var i = 0; i < items.length; i++) {
        if (items[i].sku === entry.sku && items[i].color === entry.color && items[i].size === entry.size) {
          found = items[i]; break;
        }
      }
      if (found) found.qty += 1; else items.push(entry);
      saveCart(items);
      renderCartUI();
      openDrawer();
    });
  });

  renderBadge(loadCart());

  /* ---------- 5. Trang checkout ---------- */
  var form = document.getElementById("checkoutForm");
  if (!form) return; /* index.html dừng ở đây */

  var els = {
    grid: document.getElementById("checkoutGrid"),
    summaryItems: document.getElementById("summaryItems"),
    orderCode: document.getElementById("orderCode"),
    sumSubtotal: document.getElementById("sumSubtotal"),
    sumTotal: document.getElementById("sumTotal"),
    qrBlock: document.getElementById("qrBlock"),
    qrImg: document.getElementById("qrImg"),
    qrAddInfo: document.getElementById("qrAddInfo"),
    empty: document.getElementById("emptyCheckout"),
    thanks: document.getElementById("thankYou"),
    tyCode: document.getElementById("tyCode"),
    tyPayNote: document.getElementById("tyPayNote"),
    payBtn: document.getElementById("payBtn"),
    formMsg: document.getElementById("formMsg"),
    name: document.getElementById("fName"),
    phone: document.getElementById("fPhone"),
    address: document.getElementById("fAddress"),
    note: document.getElementById("fNote"),
    errName: document.getElementById("errName"),
    errPhone: document.getElementById("errPhone"),
    errAddress: document.getElementById("errAddress")
  };

  /* Mã đơn: SUN + 6 ký tự cuối Date.now() hệ 36, viết hoa, không ký tự đặc biệt */
  var orderCode = "SUN" + Date.now().toString(36).slice(-6).toUpperCase();
  var items = loadCart();
  var total = cartTotal(items);

  function showEmptyCheckout() {
    if (els.grid) els.grid.hidden = true;
    if (els.empty) els.empty.hidden = false;
  }

  if (!items.length) {
    showEmptyCheckout();
    return;
  }

  /* Tóm tắt đơn */
  if (els.orderCode) els.orderCode.textContent = orderCode;
  if (els.summaryItems) {
    els.summaryItems.innerHTML = items.map(function (it) {
      return (
        '<div class="co-item">' +
        '  <div><p class="co-item__name">' + it.name + '</p>' +
        '  <p class="co-item__meta">' + variantText(it) + ' · x' + it.qty + '</p></div>' +
        '  <strong>' + fmtVND(it.price * it.qty) + '</strong>' +
        '</div>'
      );
    }).join("");
  }
  if (els.sumSubtotal) els.sumSubtotal.textContent = fmtVND(total);
  if (els.sumTotal) els.sumTotal.textContent = fmtVND(total);

  /* QR chuyển khoản: hiện khi chọn phương thức chuyển khoản */
  function currentPayment() {
    var r = form.querySelector('input[name="payment"]:checked');
    return r ? r.value : "COD";
  }
  function updateQR() {
    var isBank = currentPayment() !== "COD";
    if (els.qrBlock) els.qrBlock.hidden = !isBank;
    if (isBank && els.qrImg && !els.qrImg.getAttribute("src")) {
      els.qrImg.src = "https://img.vietqr.io/image/" + BANK.bin + "-" + BANK.account +
        "-compact2.jpg?amount=" + total + "&addInfo=" + orderCode +
        "&accountName=" + encodeURIComponent(BANK.accountName);
    }
    if (els.qrAddInfo) els.qrAddInfo.textContent = orderCode;
  }
  form.querySelectorAll('input[name="payment"]').forEach(function (r) {
    r.addEventListener("change", updateQR);
  });

  /* Validate tiếng Việt theo từng trường */
  function setErr(el, msgEl, msg) {
    if (msgEl) { msgEl.textContent = msg || ""; msgEl.hidden = !msg; }
    if (el) el.classList.toggle("is-invalid", !!msg);
  }
  function validate() {
    var ok = true;
    var name = (els.name && els.name.value || "").trim();
    var phone = (els.phone && els.phone.value || "").replace(/\s+/g, "");
    var address = (els.address && els.address.value || "").trim();

    if (name.length < 2) { setErr(els.name, els.errName, "Bạn nhập giúp Sunora họ và tên nhé."); ok = false; }
    else setErr(els.name, els.errName, "");

    if (!/^(0|\+?84)\d{8,10}$/.test(phone)) { setErr(els.phone, els.errPhone, "Số điện thoại chưa đúng, bạn kiểm tra lại giúp nhé."); ok = false; }
    else setErr(els.phone, els.errPhone, "");

    if (address.length < 8) { setErr(els.address, els.errAddress, "Bạn ghi rõ địa chỉ nhận hàng giúp Sunora nhé."); ok = false; }
    else setErr(els.address, els.errAddress, "");

    return ok;
  }

  function showThanks(payment) {
    if (els.grid) els.grid.hidden = true;
    if (els.thanks) els.thanks.hidden = false;
    if (els.tyCode) els.tyCode.textContent = orderCode;
    if (els.tyPayNote) {
      els.tyPayNote.textContent = payment === "COD"
        ? "Sunora sẽ gọi xác nhận trong hôm nay."
        : "Đơn được xác nhận ngay khi khoản chuyển về tài khoản.";
    }
    saveCart([]);
    renderBadge([]);
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (els.formMsg) { els.formMsg.hidden = true; els.formMsg.textContent = ""; }

    var current = loadCart();
    if (!current.length) { showEmptyCheckout(); return; }
    if (!validate()) return;

    var payment = currentPayment();
    var hp = form.querySelector('input[name="website"]');
    var payload = {
      code: orderCode,
      name: els.name.value.trim(),
      phone: els.phone.value.trim(),
      address: els.address.value.trim(),
      note: (els.note && els.note.value || "").trim(),
      payment: payment,
      total: fmtVND(total),
      items: current.map(function (it) {
        return { name: it.name, variant: variantText(it), qty: it.qty, lineTotal: fmtVND(it.price * it.qty) };
      }),
      website: (hp && hp.value) || ""
    };

    if (els.payBtn) { els.payBtn.disabled = true; els.payBtn.textContent = "Đang gửi..."; }

    fetch(ORDER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        var d = null;
        try { d = JSON.parse(t); } catch (e) {}
        if (d && d.ok) { showThanks(payment); }
        else { throw new Error((d && d.error) || "response not ok"); }
      })
      .catch(function () {
        if (els.formMsg) {
          els.formMsg.textContent = "Gửi đơn chưa thành công. Bạn thử lại giúp Sunora nhé, hoặc gọi 0363 689 459.";
          els.formMsg.hidden = false;
        }
        if (els.payBtn) { els.payBtn.disabled = false; els.payBtn.textContent = "Đặt hàng"; }
      });
  });
})();
