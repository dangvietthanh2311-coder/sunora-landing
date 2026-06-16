# SUNORA — Landing Page Build Spec (Handoff cho Claude Code)

**Phiên bản:** v1 (build spec)
**Ngày đóng gói:** 16/06/2026
**Môn học:** MKT309m (Brand Identity & Content Strategy)
**Mục đích file:** Cung cấp đầy đủ context để một phiên Claude Code mới dựng trang landing page Sunora mà không cần đọc lại lịch sử chat.

## Cách dùng file này
Nhiệm vụ cho Claude Code: dựng **một trang landing page responsive** cho Sunora theo spec dưới.

Output mong muốn:
1. `index.html` (kèm CSS, JS gọn trong cùng dự án) trang responsive hoàn chỉnh.
2. Thư mục `assets/` chứa ảnh đã đổi tên theo mục 4.
3. `responsive-notes.md` ghi chú giải thích khác biệt mobile vs desktop (phần ăn điểm của môn học, xem mục 6).

Quy tắc viết xuyên suốt: **không dùng dấu gạch ngang dài (em dash)** ở bất kỳ đâu. Dùng dấu phẩy, dấu chấm hoặc hai chấm. Nội dung hướng người tiêu dùng viết bằng tiếng Việt.

---

## 0. Mục tiêu và yêu cầu môn học

Đề bài gốc: "Thiết kế một trang đích đơn giản nhằm bán sản phẩm của bạn. Hãy chỉ cho cả lớp thấy sự khác biệt giữa phiên bản dành cho thiết bị di động và máy tính để bàn, và lý do của những khác biệt đó."

Hai trọng tâm:
1. Trang đích bán hàng đơn giản, có cấu trúc rõ ràng, dẫn người xem tới hành động mua (trỏ về Shopee).
2. Thể hiện và giải thích được khác biệt giữa bản desktop và bản mobile. Đây là phần chấm điểm chính, nên trang phải responsive thật và phải kèm ghi chú lý do (mục 6).

Bối cảnh: đây là bài giả lập bán hàng cho môn học. Nội dung đánh giá khách hàng ở mục 5.5 là nội dung mẫu minh hoạ, cần thay bằng review thật nếu sau này chạy thương mại.

---

## 1. Brand kit

| Yếu tố | Chi tiết |
|---|---|
| Tên | Sunora |
| Ngành | Áo chống nắng nữ và unisex, găng tay chống nắng (UV protection wear) |
| Slogan chính | Nắng cháy da, đã có Sunora |
| Thông điệp cốt lõi | Sunora mang đến sự bảo vệ và thoải mái dưới ánh nắng mặt trời, đồng hành cùng người dùng trong lối sống năng động, gần gũi với thiên nhiên và bền vững. |
| Kênh bán | Shopee và Facebook (landing page đóng vai cầu nối, mọi CTA trỏ về Shopee) |
| Chất liệu chủ đạo | Sun Ice Silk, SPF 50+, vải thoáng khí |
| Phong cách hình ảnh | Con dấu mực thủ công (ink seal), tối giản, gần gũi thiên nhiên |

### 1.1 Bảng màu

| Vai trò | Mã màu | Ghi chú dùng |
|---|---|---|
| Màu chính (đậm) | `#32482C` xanh rêu | Nền tối (hero, footer, dải CTA cuối), chữ tiêu đề trên nền sáng, nút CTA chính |
| Nền sáng | `#F9F7F2` kem | Nền chủ đạo của trang, nền các section sáng |
| Màu nhấn | `#5C9FD4` xanh dương | Link, giá, badge, điểm nhấn nhỏ |
| Chữ thân (gợi ý) | `#2C3327` | Chữ body trên nền kem (biến thể đậm của xanh rêu, dễ đọc) |
| Chữ phụ (gợi ý) | `#6B7468` | Chú thích, label phụ |

Quy tắc màu: chữ đặt trên nền màu phải dùng tông đậm cùng họ, không dùng đen thuần hay xám chung chung.

### 1.2 Logo (file đã có)

| File | Mô tả | Dùng ở đâu |
|---|---|---|
| `sunora-logo-white-BGRM.png` | Logo trắng đầy đủ (icon + chữ) | Header nếu nền tối, footer trên nền xanh rêu |
| `sunora-logo-primary-BGRM.png` | Logo xanh rêu đầy đủ | Header trên nền kem, các vị trí nền sáng |
| `sunora-logo-icon-BGRM.png` | Chỉ icon mặt trời + sóng (xanh rêu) | Favicon, biểu tượng nhỏ, mobile header thu gọn |

### 1.3 Typography (gợi ý)
Logo dùng kiểu chữ chân mảnh tối giản. Đề xuất cặp font web miễn phí:
- Tiêu đề: một font serif mảnh hiện đại (ví dụ "Cormorant" hoặc "Marcellus") để hợp chất con dấu thủ công.
- Thân chữ: một font sans gọn dễ đọc (ví dụ "Be Vietnam Pro" hoặc "Inter") hỗ trợ tốt tiếng Việt có dấu.
Nếu muốn an toàn, dùng một font sans tiếng Việt cho cả hai (Be Vietnam Pro), chỉ phân biệt bằng cỡ và độ đậm.

---

## 2. Thông tin liên hệ và kênh

| Mục | Giá trị |
|---|---|
| Hotline | 0363 689 459 |
| Địa chỉ | High tech park, Hoa Lac Hi-tech Park, Km29 Thang Long Avenue, Hòa Lạc, Hà Nội 10000, Vietnam |
| TikTok | https://www.tiktok.com/@sunora_store |
| Facebook | https://www.facebook.com/people/Sunora/61576436782702/ |
| Shopee | https://shopee.vn/shop/666029920 |
| YouTube | https://www.youtube.com/@SunoraYoutube |

Mọi nút "Mua ngay" trỏ về link Shopee shop ở trên. Nút "Nhắn tin" trỏ về Facebook.

---

## 3. Catalog sản phẩm (3 sản phẩm)

Giá hiển thị theo quyết định: lấy giá Shopee làm **giá ưu đãi**, kèm **giá gốc gạch ngang** để tạo cảm giác giảm. Các con số đều lấy từ dữ liệu Shopee live và bảng giá vận hành của thương hiệu. Có thể chỉnh lại nếu cần.

### Bảng tổng hợp

| Mã | Tên ngắn (hiển thị web) | Giá ưu đãi | Giá gốc (gạch) | Size | Số màu |
|---|---|---|---|---|---|
| S1001 | Áo khoác chống nắng nữ Sunora Ice Silk | 399.000đ | 499.000đ | S, M, L, XL | 5 |
| S1002 | Áo chống nắng unisex Sunora có mũ trùm | 340.000đ | 399.000đ | S, M, L, XL, 2XL | 2 |
| S1003 | Găng tay chống nắng cảm ứng Sunora | 80.000đ | (không gạch) | Một cỡ | 3 |

Trust strip dùng chung cho cả trang (lấy từ chính sách Shopee thật): **Freeship 0đ · Hoàn đến 15.000đ nếu giao trễ · Đổi trả miễn phí 15 ngày**.

### 3.1 S1001 — Áo khoác chống nắng nữ Sunora Ice Silk
- Tên đầy đủ (Shopee/SEO): Áo khoác chống nắng nữ Sunora Ice Silk, vải mát lạnh thoáng khí, chống tia UV SPF 50+.
- Giá: 399.000đ (gốc gạch 499.000đ).
- Size: S, M, L, XL.
- 5 màu (đúng theo Shopee): Xanh dương, Xanh lá, Hồng, Tím, Be.
- Đặc điểm bán: vải Sun Ice Silk mát lạnh, SPF 50+, dáng nữ ôm nhẹ, có lỗ xỏ ngón ở cổ tay, panel lưới thoáng hai bên hông.
- Ảnh chính card: `s1001-xanh-duong.png`. Swatch theo 5 màu (xem mục 4).

### 3.2 S1002 — Áo chống nắng unisex Sunora có mũ trùm
- Tên đầy đủ (Shopee/SEO): Áo chống nắng unisex Sunora có mũ trùm kín mặt, chống tia UV SPF 50+.
- Giá: 340.000đ (gốc gạch 399.000đ).
- Size: S, M, L, XL, 2XL.
- 2 màu: Đen, Xám đậm. (Navy đã loại, không phải màu bán.)
- Đặc điểm bán: mũ trùm kín đầu và cổ, lớp lót mũ tương phản, lỗ xỏ ngón ở cổ tay, dáng unisex mặc được cả nam và nữ.
- Ảnh chính card: `s1002-den.png`. Ảnh phụ: `s1002-den-flatlay.png`. Swatch: Đen, Xám đậm.

### 3.3 S1003 — Găng tay chống nắng cảm ứng Sunora
- Tên đầy đủ (Shopee/SEO): Găng tay chống nắng Sunora dáng dài, cảm ứng điện thoại, lòng bàn tay chống trượt.
- Giá: 80.000đ.
- Size: một cỡ.
- 3 màu: Hồng, Xám, Đen.
- Đặc điểm bán: đầu ngón hở để cảm ứng điện thoại, lòng bàn tay có hạt silicon chống trượt (hợp đi xe máy), dáng dài che cổ tay.
- Ảnh chính card: `s1003-hong.png`. Swatch: Hồng, Xám, Đen.
- Ghi chú: chưa xác nhận găng tay có cùng chất liệu Sun Ice Silk hay không, nên tên chưa gắn "Ice Silk". Nếu xác nhận thì thêm vào.

---

## 4. Asset manifest và bảng đổi tên file

Đổi tên file gốc sang tên sạch để build cho gọn. Copy các file dưới vào `assets/`.

### Ảnh dùng

| File gốc (trong uploads) | Tên mới trong assets/ | Dùng cho |
|---|---|---|
| `Hero.png` | `hero.png` | Hero. Cần cắt 2 bản: `hero-desktop.png` (ngang, chừa chỗ chữ bên phải) và `hero-mobile.png` (dọc, ôm người mẫu) |
| `S1001_..._xanh_bie__n.png` | `s1001-xanh-duong.png` | S1001 ảnh chính + swatch Xanh dương |
| `S1001_..._xanh_lam.png` | `s1001-xanh-la.png` | S1001 swatch Xanh lá |
| `S1001_..._ho__ng.png` | `s1001-hong.png` | S1001 swatch Hồng |
| `S1001_..._xanh_ti_m.png` | `s1001-tim.png` | S1001 swatch Tím |
| `S1001_..._va_ng.png` | `s1001-be.png` | S1001 swatch Be |
| `Black_font.png` | `s1002-den.png` | S1002 ảnh chính + swatch Đen |
| `Gray_Font.png` | `s1002-xam.png` | S1002 swatch Xám đậm |
| `Black_no.png` | `s1002-den-flatlay.png` | S1002 ảnh phụ (flat lay) |
| `Black_hand.png` | `detail-co-tay.png` | Lợi ích: lỗ xỏ ngón, che mu bàn tay |
| `Gray_hat.png` | `detail-mu-trum.png` | Lợi ích: mũ trùm che kín |
| `2400055640028__1_.JPG` | `detail-vai-sun-ice-silk.png` | Lợi ích: cận chất liệu vải |
| `Gray_side_wide.png` | `lifestyle-van-dong.png` | Phần Vì sao chọn Sunora |
| `11.png` | `s1003-hong.png` | S1003 ảnh chính + swatch Hồng |
| `15.png` | `s1003-xam.png` | S1003 swatch Xám |
| `16.png` | `s1003-den.png` | S1003 swatch Đen |
| `9.png` | `detail-chong-truot.png` | Lợi ích: lòng bàn tay silicon chống trượt |
| `8.png` | `s1003-cam-ung.png` | Tuỳ chọn: minh hoạ đầu ngón cảm ứng |

### Ảnh không dùng (để dự phòng, không đưa lên trang)
`S1001 Ghi đậm`, `Blue_font.png` (navy nam), `Gray_side_smile.png`, và các ảnh găng tay còn lại (`10.png`, `12.png`, `13.png`, `14.png`, `17.png`, `18.png`, `19.png`).

### Lưu ý cắt ảnh Hero
`hero.png` là ảnh gần vuông, người mẫu áo hồng đứng lệch trái, lối đi sáng bên phải.
- Desktop: crop ngang 16:9 hoặc 3:2, đặt khối chữ và nút CTA ở vùng bên phải (lối đi sáng), có thể phủ một lớp scrim mờ tối nhẹ phía sau chữ để dễ đọc.
- Mobile: crop dọc 4:5 hoặc 9:16, ôm sát người mẫu, đặt chữ phía dưới hoặc trên nền scrim.

---

## 5. Cấu trúc và nội dung từng section

Thứ tự 10 section từ trên xuống. Nội dung copy bên dưới dùng được luôn, chỉnh nhẹ nếu cần.

### 5.1 Header (thanh điều hướng)
- Logo bên trái (xanh rêu trên nền kem).
- Menu: Trang chủ, Sản phẩm, Lợi ích, Đánh giá, Liên hệ.
- Nút CTA bên phải: "Mua ngay trên Shopee" (trỏ link Shopee).
- Sticky khi cuộn (tuỳ chọn).

### 5.2 Hero
- Tiêu đề lớn (slogan): **Nắng cháy da, đã có Sunora**
- Câu phụ: Áo chống nắng vải Sun Ice Silk mát lạnh, chống tia UV SPF 50+, vừa bảo vệ làn da vừa giữ phong cách mỗi ngày.
- Nút chính: "Mua ngay trên Shopee". Nút phụ: "Xem bộ sưu tập" (cuộn xuống phần Sản phẩm).
- Ảnh: `hero-desktop.png` / `hero-mobile.png`.
- Có thể thêm dải tin cậy nhỏ ngay dưới: SPF 50+ · Vải mát lạnh · Freeship 0đ.

### 5.3 Vấn đề (chạm nỗi đau khách)
- Tiêu đề: Nắng nóng mỗi ngày, làn da gánh đủ thứ.
- 3 ý ngắn (icon + chữ):
  1. Tia UV làm da sạm, lão hóa khi đi học, đi làm, đi chơi.
  2. Áo chống nắng thường thì nóng và bí, mặc lâu khó chịu.
  3. Nhiều sản phẩm không giống quảng cáo, mua xong thất vọng.
- Câu chốt dẫn sang giải pháp: Sunora sinh ra để giải quyết cả ba.

### 5.4 Lợi ích nổi bật
4 lợi ích (icon hoặc ảnh chi tiết):
1. **Chống tia UV, SPF 50+.** Bảo vệ da khỏi sạm và lão hóa. (icon)
2. **Vải Sun Ice Silk mát lạnh, thoáng khí.** Hết lo nóng bí khi mặc lâu. (ảnh `detail-vai-sun-ice-silk.png`)
3. **Che kín mà vẫn thoải mái.** Mũ trùm kín đầu cổ, cổ tay có lỗ xỏ ngón che mu bàn tay. (ảnh `detail-mu-trum.png` và `detail-co-tay.png`)
4. **Thiết kế thời trang.** Mặc đẹp khi đi học, đi làm, đi chơi, du lịch. (icon)

### 5.5 Đánh giá khách hàng (NỘI DUNG MẪU)
Lưu ý: đây là review mẫu cho bài giả lập môn học. Thay bằng review thật trước khi chạy thương mại.

3 thẻ đánh giá, mỗi thẻ 5 sao:
- "Mặc đi làm cả ngày không thấy nóng, vải mát thật, lại nhẹ. Rất đáng tiền." — Minh Anh (nội dung mẫu)
- "Mũ trùm che kín mặt, đi xe máy buổi trưa mà da không rát. Sẽ mua thêm màu khác." — Khánh Linh (nội dung mẫu)
- "Găng tay dùng điện thoại được luôn, lòng bàn tay chống trượt cầm lái yên tâm." — Thu Hà (nội dung mẫu)

Kèm dải trust signals thật bên dưới: Freeship 0đ · Đổi trả miễn phí 15 ngày · Chống tia UV SPF 50+.

### 5.6 Sản phẩm
Lưới 3 card (xem dữ liệu mục 3). Mỗi card: ảnh chính, tên ngắn, swatch màu bấm đổi ảnh, giá ưu đãi + giá gốc gạch, nút "Mua trên Shopee".
- Card 1: S1001 (ảnh `s1001-xanh-duong.png`, 5 swatch).
- Card 2: S1002 (ảnh `s1002-den.png`, 2 swatch).
- Card 3: S1003 (ảnh `s1003-hong.png`, 3 swatch).

### 5.7 Vì sao chọn Sunora
- Tiêu đề: Không chỉ chống nắng, mà là phong cách mỗi ngày.
- Ảnh `lifestyle-van-dong.png` một bên, nội dung một bên.
- 3 luận điểm khác biệt:
  1. Ba trong một: chống nắng hiệu quả, mặc mát thoải mái, thiết kế đẹp.
  2. Vải Sun Ice Silk SPF 50+, không chỉ là áo khoác thường.
  3. Giá hợp lý, phù hợp sinh viên và nhân viên văn phòng trẻ.

### 5.8 FAQ
- Sunora chống nắng tốt đến mức nào? Vải Sun Ice Silk có chỉ số chống tia UV cao, đạt SPF 50+.
- Mặc có nóng không? Vải mát lạnh, thoáng khí, có panel lưới và thiết kế thoáng nên dễ chịu khi mặc lâu.
- Giặt nhiều có mất tác dụng chống nắng không? (GIẢ ĐỊNH, cần xác nhận với bên Sunora) Khả năng chống nắng đến từ cấu trúc sợi vải nên bền qua nhiều lần giặt; nên giặt nhẹ, tránh chất tẩy mạnh.
- Chọn size thế nào? Áo nữ S đến XL, unisex S đến 2XL, có bảng size chi tiết trên Shopee.
- Đổi trả thế nào? Đổi trả miễn phí trong 15 ngày, freeship.

### 5.9 CTA cuối
- Tiêu đề trên nền xanh rêu: Đừng để nắng làm phiền làn da bạn.
- Câu phụ: Freeship 0đ, đổi trả 15 ngày, ưu đãi đang chờ trên Shopee.
- Nút lớn: "Mua ngay trên Shopee".

### 5.10 Footer
- Logo trắng `sunora-logo-white-BGRM.png`.
- Cột 1: liên hệ (hotline 0363 689 459, địa chỉ Hòa Lạc Hi-tech Park).
- Cột 2: kênh (TikTok, Facebook, Shopee, YouTube, link ở mục 2).
- Cột 3: chính sách (freeship, đổi trả 15 ngày).
- Dòng cuối: bản quyền Sunora.

---

## 6. Spec responsive: desktop vs mobile (phần ăn điểm)

Build theo hướng mobile-first. Breakpoint đề xuất: mobile dưới 768px, desktop từ 769px trở lên (có thể thêm tablet 768 đến 1024 nếu muốn).

### Bảng khác biệt theo từng phần

| Phần | Desktop | Mobile | Lý do |
|---|---|---|---|
| Header / menu | Menu ngang đầy đủ, logo trái, CTA phải | Logo + nút hamburger, menu xổ ra khi bấm | Màn hình hẹp không đủ chỗ cho menu ngang, hamburger tiết kiệm không gian và quen tay người dùng di động |
| Hero | Chữ và ảnh nằm cạnh nhau (2 cột), dùng ảnh ngang | Chữ và ảnh xếp dọc, dùng ảnh đứng, chữ dưới ảnh | Màn dọc của điện thoại hợp bố cục xếp tầng, ảnh đứng lấp đầy khung tốt hơn ảnh ngang |
| Tiêu đề (cỡ chữ) | Cỡ lớn (ví dụ 48 đến 56px) | Cỡ nhỏ hơn (ví dụ 28 đến 32px) | Màn nhỏ cần chữ vừa phải để không tràn dòng và giữ nhịp đọc |
| Lợi ích | Hàng ngang 4 cột | Xếp dọc 1 cột (hoặc 2) | Cột quá hẹp trên mobile sẽ vỡ chữ, xếp dọc dễ đọc |
| Lưới sản phẩm | 3 cột | 1 cột (hoặc 2 cột nhỏ) | Card cần đủ rộng để ảnh và nút bấm dễ chạm, tránh nút quá nhỏ |
| Nút CTA | Rộng theo nội dung, nằm trong hàng | Trải rộng gần hết chiều ngang (full width) | Ngón tay cần vùng chạm lớn, nút rộng dễ bấm và nổi bật |
| Khoảng cách, padding | Rộng rãi hai bên | Thu hẹp lề, tăng khoảng cách dọc | Tận dụng tối đa bề ngang hẹp của điện thoại |
| Footer | Nhiều cột ngang | Xếp dọc từng khối (hoặc accordion) | Nhiều cột trên màn hẹp sẽ chen chúc, xếp dọc rõ ràng hơn |
| Ảnh | Tải bản ngang, độ phân giải cao | Tải bản dọc, nhẹ hơn | Tối ưu khung hình và tốc độ tải trên mạng di động |

### Ghi chú để viết phần thuyết trình
Trong `responsive-notes.md`, với mỗi dòng ở bảng trên, viết 1 đến 2 câu giải thích "tại sao" theo 3 trục: không gian màn hình, cách người dùng tương tác (chạm vs chuột), và tốc độ tải. Đây là nội dung trả lời trực tiếp câu hỏi của đề bài.

---

## 7. Hướng dẫn build kỹ thuật cho Claude Code

- Stack: HTML, CSS, JavaScript thuần. Không cần framework, giữ đơn giản cho bài môn học và dễ trình bày.
- Mobile-first: viết CSS cho mobile trước, dùng `min-width` media query cho desktop.
- Dùng CSS variables cho màu thương hiệu (mục 1.1) và cỡ chữ.
- Font: nạp từ Google Fonts (Be Vietnam Pro cho thân chữ, một font serif mảnh cho tiêu đề nếu muốn).
- Swatch màu sản phẩm: bấm vào swatch đổi ảnh chính của card bằng JavaScript đơn giản.
- Menu mobile: nút hamburger mở và đóng menu.
- Ảnh: đặt trong `assets/`, dùng `srcset` hoặc thẻ `picture` để đổi ảnh hero ngang và dọc theo breakpoint. Lazy load các ảnh dưới màn đầu.
- Accessibility cơ bản: alt cho mọi ảnh, tương phản chữ và nền đạt chuẩn, nút có nhãn rõ.
- Không dùng dấu gạch ngang dài trong toàn bộ nội dung hiển thị.

### Phục vụ phần demo trước lớp (tuỳ chọn nhưng nên có)
Tạo thêm `compare.html` đặt hai khung cạnh nhau: một khung rộng giả lập desktop và một khung hẹp giả lập điện thoại, cùng nhúng `index.html` qua iframe. Như vậy khi trình bày có thể chiếu một màn hình thấy cả hai phiên bản và chỉ ra khác biệt trực tiếp. Hoặc đơn giản hơn: chụp 2 ảnh màn hình (desktop và mobile) để dán vào slide.

---

## 8. Quyết định đã chốt và giả định cần lưu ý

### Đã chốt
- Tên 3 sản phẩm theo mục 3.
- Giá: S1001 399.000đ (gốc 499.000đ), S1002 340.000đ (gốc 399.000đ), S1003 80.000đ. Có thể chỉnh.
- S1002 chỉ 2 màu: Đen, Xám đậm. Loại Navy và ảnh nam navy.
- S1001 đúng 5 màu Shopee: Xanh dương, Xanh lá, Hồng, Tím, Be. Loại Ghi đậm.
- Ảnh chính: S1001 Xanh dương, S1002 Đen on-model, S1003 Hồng.

### Giả định / cần xác nhận sau
- Review ở mục 5.5 là nội dung mẫu cho bài giả lập, thay bằng review thật trước khi chạy thương mại.
- Câu FAQ về giặt là giả định, cần xác nhận với bên Sunora.
- Găng tay S1003 chưa rõ có cùng chất liệu Sun Ice Silk, nên tên chưa gắn "Ice Silk".
- Giá đang lệch giữa bảng đề xuất trong deck (áo nữ dài 499k) và Shopee live (399k). Bản này dùng 399k làm giá ưu đãi.
