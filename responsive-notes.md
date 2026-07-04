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
- Riêng hero có thêm mốc **768px** dùng chung cho CSS và JavaScript: từ 768px hiện
  video nền (script.js gán src qua matchMedia cùng mốc), dưới 768px chỉ dùng ảnh tĩnh.
- Lưu ý thứ tự CSS: khối `@media (max-width: 767px)` của hero đặt CUỐI phần hero
  trong `styles.css` để thắng các rule base cùng specificity phía trên (ví dụ
  max-width của `.hero__sub`). Khi sửa sau này giữ nguyên vị trí khối này.
- Toàn bộ thay đổi của desktop nằm gọn trong khối có nhãn `DESKTOP (min-width: 769px)`
  ở cuối `styles.css`, nên khi trình bày có thể mở file và chỉ thẳng vào từng dòng.
- Cỡ chữ và khoảng cách đổi theo thiết bị bằng cách ghi đè biến CSS
  (`--fs-h1`, `--fs-h2`, `--section-pad`, `--gutter`) tại breakpoint desktop.

## Bảng khác biệt và lý do (theo mục 6 của spec)

### 1. Header và menu
- **Desktop:** menu ngang đầy đủ (Trang chủ, Lợi ích, Đánh giá, Sản phẩm, Liên hệ),
  logo bên trái, nút "Mua ngay trên Shopee" bên phải. Mục "Sản phẩm" trỏ thẳng tới
  lưới sản phẩm (#luoi-san-pham) để đáp đúng hàng card đầu tiên.
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
- **Desktop (từ 768px):** nền hero là VIDEO `hero-video.mp4` (1280x720, vòng lặp
  10 giây xuôi rồi đảo, tắt tiếng) tự chạy phía sau khối chữ; nền lót là ảnh
  `hero-master.jpg` hiển thị trong lúc video tải. Khối chữ (badge, tiêu đề, phụ đề,
  hai nút, dòng giá) đứng bên trái, nổi trên lớp overlay tối phẳng.
- **Mobile (dưới 768px):** KHÔNG tải video. Nền là ảnh dọc riêng
  `hero-master-mobile.jpg` tỉ lệ 4/5, neo `background-position: 75% 50%` để người
  mẫu nằm khoảng 1/3 phải khung, kèm dải gradient tối riêng (đậm trên, nhạt giữa,
  đậm dưới) thay cho overlay phẳng, nhờ đó chữ trắng rõ mà ảnh không bị xỉn.
- Cách video chỉ chạy trên màn rộng: thẻ `<video>` trong HTML KHÔNG có `src` và
  không dùng attribute `poster`; `script.js` chỉ gán `src` khi
  `matchMedia("(min-width: 768px)")` khớp lúc tải trang và người dùng không bật
  giảm chuyển động (`prefers-reduced-motion`). Nhờ vậy điện thoại không phát sinh
  bất kỳ request nào tới file mp4.
- Copy hero cũng đổi theo thiết bị bằng 3 span nhỏ trong `index.html`:
  - `hero__badge-more` (" toàn shop"): ẩn dưới 768px, badge mobile gọn còn
    "Ưu đãi đến 28%, freeship".
  - `hero__sub-line2` (" chống tia UV SPF 50+."): display block dưới 768px để phụ
    đề ngắt đúng sau "mát lạnh,".
  - `hero__sub-more` (câu "Bảo vệ làn da, giữ trọn phong cách mỗi ngày."): ẩn dưới
    768px, display block từ 768px để câu 2 luôn nằm riêng một dòng.
  - Trên mobile, badge và phụ đề giới hạn `max-width: 63%` để chữ không lấn sang
    mặt người mẫu; H1 và nút giữ nguyên bề rộng.
- **Lý do:**
  - Không gian: màn desktop rộng hợp video ngang 16:9 làm nền cộng khối chữ trái;
    màn điện thoại dọc hợp ảnh 4/5 và copy rút gọn để không che chủ thể.
  - Tương tác: chữ và nút mobile nằm trong tầm ngón cái; video chỉ là nền, không
    chặn thao tác; máy bật giảm chuyển động thì hero đứng yên như một ảnh tĩnh.
  - Tốc độ: khác biệt lớn nhất của trang. Desktop tải video khoảng 900KB; điện
    thoại chỉ tải một ảnh JPG khoảng 130KB, không đụng tới mp4.
- Code: nền và gradient đặt trên `.hero`, overlay phẳng ở `.hero__bg::after`,
  video trong `.hero__bg`; khối `@media (max-width: 767px)` của hero nằm CUỐI phần
  hero trong `styles.css`; JavaScript gán src ở mục 4 của `script.js`.

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
  và "Phụ kiện chống nắng" (S1003, S1006, S1005). Mỗi nhóm là một lưới riêng nhưng dùng
  CHUNG một quy tắc xếp cột.
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
  `.product__media { aspect-ratio: 3/4 }`. Cả hai nhóm đều đủ 3 card nên ở desktop
  mỗi nhóm lấp trọn một hàng 3 cột.

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

### 9. Ảnh và media (đúng khổ cho từng thiết bị, không méo trên mọi máy)
- Ảnh trong nội dung đặt trong khung có `aspect-ratio` cố định cộng `object-fit: cover`,
  giống nhau ở desktop và mobile. Ảnh tự cắt cho vừa khung, không méo, không lệch.
  - Lợi ích: khung **4/3**.
  - Card sản phẩm: khung **3/4**.
- Riêng hero là chỗ DUY NHẤT đổi media theo thiết bị (chi tiết ở mục 2): desktop chạy
  video `hero-video.mp4` với nền lót `hero-master.jpg` (1920px ngang), mobile dùng ảnh
  dọc `hero-master-mobile.jpg` 1080x1350 (4/5). Ảnh áo cut-out `vp-ao-cutout.png` ở
  khối Vì sao chọn Sunora có nền trong suốt nên không cần khung, chỉ đổi cỡ theo
  breakpoint (mục 10).
- **Lý do:**
  - Không gian: khung cố định giúp các thẻ cùng hàng luôn bằng nhau; hero đổi khổ
    ngang hoặc dọc theo chiều màn hình nên chủ thể luôn nằm đúng chỗ.
  - Tương tác: ảnh luôn đúng tỉ lệ nên không bị kéo dãn hay cắt mất chủ thể khi xem,
    kể cả khi đổi cỡ cửa sổ.
  - Tốc độ: điện thoại chỉ tải ảnh (hero mobile khoảng 130KB), video khoảng 900KB
    chỉ dành cho desktop; ảnh lợi ích 48 đến 110KB, avatar 8 đến 13KB; ảnh dưới màn
    đầu dùng `loading="lazy"`, cuộn tới đâu tải tới đó nên nhẹ cho mạng di động.
- Ghi chú kỹ thuật: `hero.jpg` cũ vẫn nằm trong repo cho thẻ og:image khi chia sẻ
  mạng xã hội, không còn hiển thị trên trang.

### 10. Khối Vì sao chọn Sunora (value proposition)
- **Desktop (từ 769px):** 2 cột, chữ bên trái chiếm khoảng 56% (grid `1.4fr 1fr`),
  ảnh áo cut-out `vp-ao-cutout.png` bên phải căn giữa theo chiều dọc, rộng tối đa
  380px, đổ bóng `drop-shadow` theo đường viền áo để ảnh bám nền trắng.
- **Mobile:** 1 cột, chữ đọc trước, ảnh áo nằm CUỐI khối, căn giữa, rộng tối đa
  270px, bóng đổ nhẹ hơn desktop.
- H2 của khối luôn ngắt 2 dòng cân ("Không chỉ chống nắng," / "mà là phong cách
  mỗi ngày") bằng span `why__title-line2` display block ở mọi breakpoint.
- **Lý do:**
  - Không gian: desktop đủ rộng cho chữ và ảnh đứng cạnh nhau; mobile xếp dọc để
    thông điệp và nút mua giữ vị trí ưu tiên, ảnh minh hoạ đi sau.
  - Tương tác: thứ tự đọc trên mobile (tiêu đề, 3 ý, nút, ảnh) khớp hướng cuộn
    của ngón tay.
  - Tốc độ: ảnh cut-out PNG khoảng 394KB có `loading="lazy"`, chỉ tải khi cuộn tới.
- Code: `.why__inner` grid 1 cột mặc định, `1.4fr 1fr` ở desktop; cỡ và bóng của áo
  đặt trong `.why__media img`; DOM đặt `.why__copy` trước `.why__media`.

## Một vài khác biệt bổ sung đã làm thêm

- Logo: trên header dùng icon con dấu cộng chữ "Sunora" (gọn, ngang, nét ở mọi cỡ);
  trên footer dùng logo trắng đầy đủ trên nền xanh rêu.
- Tương tác swatch: bấm ô màu trong card đổi ngay ảnh chính, hoạt động giống nhau cả
  hai thiết bị nhưng vùng chạm trên mobile được làm to để hợp ngón tay.
- Tôn trọng `prefers-reduced-motion`: nếu người dùng tắt hiệu ứng trong hệ điều hành,
  trang tắt cuộn mượt, các chuyển động, và không phát video nền hero (hero khi đó là
  ảnh tĩnh).

## Cách kiểm chứng nhanh khi demo

1. Mở `compare_N.html` qua local server (ví dụ `python3 -m http.server`) để thấy hai
   khung desktop và mobile cạnh nhau trên một màn hình (bản `compare.html` là bản cũ).
2. Hoặc mở `index.html` rồi kéo rộng, thu hẹp cửa sổ trình duyệt, quan sát trang tự
   đổi bố cục khi đi qua mốc 769px và 600px.
3. Hoặc bật chế độ thiết bị trong DevTools (phím F12, rồi biểu tượng điện thoại) để
   chọn iPhone, iPad, desktop và so sánh.
