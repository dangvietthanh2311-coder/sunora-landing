# Sunora Landing Page: Ghi chú Responsive (Desktop vs Mobile)

Tài liệu này phục vụ phần thuyết trình, trả lời trực tiếp câu hỏi của đề bài:
"Sự khác biệt giữa bản di động và bản máy tính để bàn là gì, và vì sao có những
khác biệt đó." Mỗi khác biệt được giải thích theo ba trục:

1. Không gian màn hình (màn rộng của máy tính so với màn hẹp, dọc của điện thoại).
2. Cách người dùng tương tác (chuột và con trỏ chính xác so với ngón tay chạm).
3. Tốc độ tải (máy tính thường mạng ổn định, điện thoại hay dùng 3G, 4G).

## Cách dựng tổng quát

- Viết theo hướng **mobile-first**: CSS gốc trong `styles.css` là dành cho điện
  thoại. Các khối `@media (min-width: ...)` bên dưới mới mở rộng cho màn lớn.
- Ba mốc breakpoint:
  - Mobile: dưới 600px (mặc định).
  - Tablet: từ 600px (lưới bắt đầu tách 2 đến 3 cột).
  - Desktop: từ 769px (bố cục đầy đủ, đúng ngưỡng spec đề xuất).
  - Tinh chỉnh thêm từ 1025px cho màn rộng.
- Toàn bộ thay đổi của desktop nằm gọn trong khối có nhãn `DESKTOP (min-width: 769px)`
  ở cuối `styles.css`, nên khi trình bày có thể mở file và chỉ thẳng vào từng dòng.
- Cỡ chữ và khoảng cách đổi theo thiết bị bằng cách ghi đè biến CSS
  (`--fs-h1`, `--fs-h2`, `--section-pad`, `--gutter`) tại breakpoint desktop.

## Bảng khác biệt và lý do (theo mục 6 của spec)

### 1. Header và menu
- **Desktop:** menu ngang đầy đủ (Trang chủ, Sản phẩm, Lợi ích, Đánh giá, Liên hệ),
  logo bên trái, nút "Mua ngay trên Shopee" bên phải.
- **Mobile:** chỉ còn logo và nút hamburger. Bấm hamburger thì menu xổ xuống, bấm
  lần nữa hoặc bấm một mục thì menu đóng.
- **Lý do:**
  - Không gian: màn hẹp không đủ chỗ xếp 5 mục cộng nút trên một hàng, gom vào
    hamburger để dành chỗ cho nội dung.
  - Tương tác: trên điện thoại mỗi mục menu khi mở ra là một dòng cao, vùng chạm
    lớn, ngón tay bấm dễ; trên desktop con trỏ chuột nhắm chính xác nên menu chữ
    nhỏ nằm ngang vẫn dùng tốt.
  - Tốc độ: menu mobile chỉ là CSS và một ít JavaScript, không tải thêm tài nguyên.
- Code: `.primary-nav` (mobile dạng panel xổ), ghi đè thành `display:flex` ngang ở
  khối desktop; `.nav-toggle { display:none }` trên desktop; logic trong `script.js`.

### 2. Hero
- **Desktop:** hai cột nằm cạnh nhau, chữ bên trái và ảnh bên phải.
- **Mobile:** xếp dọc, ảnh nằm trên, chữ nằm dưới.
- Dùng CHUNG một ảnh `hero.jpg` cho cả hai khổ. Khung ảnh cố định tỉ lệ **4/5**
  (`aspect-ratio` đặt trên `.hero__media`) cộng `object-fit: cover` nên ảnh không méo,
  không lệch ở cả desktop lẫn mobile. Khác biệt giữa hai thiết bị ở đây là CÁCH SẮP XẾP
  (cạnh nhau so với xếp tầng), không phải đổi file ảnh.
- **Lý do:**
  - Không gian: màn desktop rộng theo chiều ngang nên chia 2 cột tận dụng tốt; màn
    điện thoại cao và hẹp nên xếp tầng dọc, ảnh và chữ mỗi thứ một tầng.
  - Tương tác: khi cuộn dọc trên điện thoại, bố cục xếp tầng đi theo đúng hướng
    ngón tay vuốt; nút CTA nằm ngay dưới chữ, trong tầm ngón cái.
  - Tốc độ: `hero.jpg` đã nén về cỡ web (khoảng 200KB), dùng chung nên chỉ tải một lần.
- Code: `.hero__inner` mặc định `flex-direction:column-reverse` (ảnh lên trên),
  ghi đè thành `row` ở desktop. Khung `.hero__media` giữ `aspect-ratio: 4/5` cho cả
  hai khổ; ảnh con đặt `width/height: 100%` cộng `object-fit: cover`.

### 3. Cỡ chữ tiêu đề
- **Desktop:** tiêu đề hero khoảng 54px, tiêu đề section khoảng 38px.
- **Mobile:** tiêu đề hero khoảng 31px, tiêu đề section khoảng 25px.
- **Lý do:**
  - Không gian: màn nhỏ mà để chữ quá lớn sẽ tràn dòng, vỡ nhịp đọc; chữ vừa phải
    giữ được số dòng hợp lý. Màn lớn cần chữ lớn để tạo điểm nhấn và lấp khoảng trống.
  - Tương tác: trên điện thoại người dùng cầm gần mắt nên cỡ chữ nhỏ vẫn rõ; trên
    desktop ngồi xa màn hơn nên tiêu đề lớn dễ đọc.
  - Tốc độ: không ảnh hưởng, chỉ là CSS.
- Code: biến `--fs-h1`, `--fs-h2` đặt giá trị mobile ở `:root`, ghi đè lớn hơn trong
  khối desktop.

### 4. Lợi ích nổi bật
- **Desktop:** 4 lợi ích nằm trên một hàng ngang (4 cột).
- **Mobile:** xếp dọc 1 cột (tablet trung gian là 2 cột).
- Mỗi thẻ có MỘT ảnh trong khung cố định tỉ lệ **4/3** (`object-fit: cover`, bo góc
  giống nhau), áp dụng cả hai khổ nên 4 thẻ luôn đồng đều và ảnh không méo.
- **Lý do:**
  - Không gian: ép 4 cột vào màn hẹp khiến mỗi cột quá bé, chữ vỡ và ảnh nhỏ xíu;
    xếp dọc cho mỗi mục đủ bề rộng.
  - Tương tác: 1 cột dọc hợp với thao tác cuộn của ngón tay, đọc lần lượt từng ý.
  - Tốc độ: ảnh trong phần này dùng `loading="lazy"`, chỉ tải khi cuộn tới,
    đỡ tốn dữ liệu lúc mới vào trang.
- Code: `.benefits__grid` mặc định 1 cột, 2 cột ở 600px, `repeat(4, 1fr)` ở desktop;
  khung ảnh `.benefit__media { aspect-ratio: 4/3 }`.

### 5. Lưới sản phẩm
- Phần sản phẩm chia thành 2 nhóm có tiêu đề: "Áo chống nắng" (S1001, S1002, S1004)
  và "Phụ kiện chống nắng" (S1003, S1005). Mỗi nhóm là một lưới riêng nhưng dùng CHUNG
  một quy tắc xếp cột.
- **Desktop:** 3 card trên một hàng (3 cột).
- **Mobile:** 1 cột (tablet trung gian 2 cột).
- **Lý do:**
  - Không gian: card cần đủ rộng để thấy rõ ảnh, ô chọn màu, giá và nút; 3 cột trên
    màn hẹp sẽ làm mọi thứ chen chúc.
  - Tương tác: ô chọn màu (swatch) và nút "Mua trên Shopee" phải đủ to để chạm bằng
    ngón tay, nên 1 card chiếm trọn bề ngang là hợp lý nhất trên điện thoại.
  - Tốc độ: ảnh sản phẩm `loading="lazy"`, cuộn tới đâu tải tới đó.
- Code: hai khối `.products__grid` (mỗi nhóm một khối) đều 1 cột, 2 cột ở 600px,
  `repeat(3, 1fr)` ở desktop; tiêu đề nhóm là `.products__group-title`; khung ảnh card
  `.product__media { aspect-ratio: 3/4 }`. Nhóm phụ kiện chỉ có 2 card nên ở desktop
  lấp 2 trong 3 cột, vẫn cùng cỡ với nhóm áo.

### 6. Nút CTA
- **Desktop:** nút rộng theo nội dung, nằm trong hàng cùng các nút khác.
- **Mobile:** nút trải gần hết chiều ngang (full width).
- **Lý do:**
  - Không gian: tận dụng chiều ngang hẹp của điện thoại, nút to nổi bật, không bị lọt thỏm.
  - Tương tác: ngón tay cần vùng chạm lớn (chuẩn khuyến nghị tối thiểu 44px), nút
    full width rất dễ bấm; chuột trên desktop nhắm chính xác nên nút vừa nội dung là đủ.
  - Tốc độ: không ảnh hưởng.
- Code: `.hero__actions .btn { width:100% }` trên mobile, đổi `width:auto` từ 600px;
  nút trong card dùng `.btn--block` cho dễ chạm.

### 7. Khoảng cách và lề (padding)
- **Desktop:** lề ngang rộng (40px) và khoảng cách dọc giữa các section lớn (84px).
- **Mobile:** lề ngang hẹp (20px), khoảng cách dọc gọn hơn (46px).
- **Lý do:**
  - Không gian: trên điện thoại từng pixel bề ngang đều quý, lề hẹp cho nội dung
    nhiều chỗ thở; trên desktop lề rộng tạo cảm giác thoáng, sang.
  - Tương tác: khoảng cách dọc giữa các khối giúp ngón tay không bấm nhầm khi cuộn nhanh.
  - Tốc độ: không ảnh hưởng.
- Code: biến `--gutter` và `--section-pad` đổi giá trị ở breakpoint desktop.

### 8. Footer
- **Desktop:** nhiều cột ngang (thương hiệu, liên hệ, kênh, chính sách).
- **Mobile:** các khối xếp dọc lần lượt từ trên xuống.
- **Lý do:**
  - Không gian: nhiều cột trên màn hẹp sẽ chen chúc, chữ địa chỉ dài bị bóp; xếp dọc
    cho mỗi khối đủ rộng, rõ ràng.
  - Tương tác: link trong footer khi xếp dọc có khoảng cách đứng lớn hơn, dễ chạm.
  - Tốc độ: không ảnh hưởng.
- Code: `.site-footer__grid` mặc định 1 cột, ghi đè thành 4 cột ở desktop.

### 9. Ảnh (khung tỉ lệ cố định, không méo trên mọi máy)
- Cách làm: mọi ảnh đặt trong một khung có `aspect-ratio` cố định cộng `object-fit: cover`,
  giống nhau ở desktop và mobile. Ảnh tự cắt cho vừa khung, không méo, không lệch.
  - Hero: khung **4/5**.
  - Lợi ích: khung **4/3**.
  - Card sản phẩm: khung **3/4**.
- **Lý do:**
  - Không gian: khung cố định giúp các thẻ cùng hàng luôn bằng nhau, bố cục gọn gàng
    dù ảnh gốc kích thước khác nhau.
  - Tương tác: ảnh luôn đúng tỉ lệ nên không bị kéo dãn hay cắt mất chủ thể khi xem,
    kể cả khi đổi cỡ cửa sổ.
  - Tốc độ: tất cả ảnh đã nén về cỡ web (hero khoảng 200KB, ảnh lợi ích 60 đến 140KB,
    avatar chỉ 8 đến 13KB), và ảnh dưới màn đầu dùng `loading="lazy"`, cuộn tới đâu tải
    tới đó nên nhẹ cho mạng di động.
- Ghi chú kỹ thuật: dùng CHUNG một `hero.jpg` cho cả hai khổ (đã bỏ kiểu cắt hai file
  desktop và mobile trước đây). Khác biệt desktop và mobile nằm ở BỐ CỤC và CỠ CHỮ,
  không phải ở việc đổi file ảnh.

## Một vài khác biệt bổ sung đã làm thêm

- Logo: trên header dùng icon con dấu cộng chữ "Sunora" (gọn, ngang, nét ở mọi cỡ);
  trên footer dùng logo trắng đầy đủ trên nền xanh rêu.
- Tương tác swatch: bấm ô màu trong card đổi ngay ảnh chính, hoạt động giống nhau cả
  hai thiết bị nhưng vùng chạm trên mobile được làm to để hợp ngón tay.
- Tôn trọng `prefers-reduced-motion`: nếu người dùng tắt hiệu ứng trong hệ điều hành,
  trang tắt cuộn mượt và các chuyển động.

## Cách kiểm chứng nhanh khi demo

1. Mở `compare.html` để thấy hai khung desktop và mobile cạnh nhau trên một màn hình.
2. Hoặc mở `index.html` rồi kéo rộng, thu hẹp cửa sổ trình duyệt, quan sát trang tự
   đổi bố cục khi đi qua mốc 769px và 600px.
3. Hoặc bật chế độ thiết bị trong DevTools (phím F12, rồi biểu tượng điện thoại) để
   chọn iPhone, iPad, desktop và so sánh.
