## 🅱️ TRACK A — BOOTSTRAP 5
### PHẦN A — ĐỌC HIỂU
#### Câu A1 — Grid System
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột     |    1    |       2       |    4    |
| Box layout | Mỗi box chiếm 1 hàng  | 2 box / hàng   | 4 box / hàng  |

**Câu hỏi thêm:** `col-md-6` nghĩa là gì? Tại sao không cần viết `col-sm-12`?
- `col-md-6` nghĩa là: 
Khi màn hình đạt breakpoint md (≥ 768px) phần tử sẽ chiếm 6/12 cột của Bootstrap Grid System, tức là chiếm 50% chiều rộng hàng
- không cần viết `col-sm-12` vì: Bootstrap dùng Mobile-First, đã áp dụng cho tất cả kích thước nhỏ trước khi media query lớn hơn ghi đè

#### Câu A2 — Utilities & Components
1. Giải thích class `d-none d-md-block`:
- d-none: ẩn element (display: none)
- d-md-block: từ breakpoint md (≥ 768px) trở lên sẽ hiện element dạng block
*Element này hiển thị khi nào, ẩn khi nào?
- Hiển thị khi kích thước màn hình ≥ 768px
- Ẩn khi kích thước màn hình < 768px

2. Liệt kê 5 spacing utilities (margin/padding) và giải thích. VD: `mt-3`, `px-4`, `mb-auto`
+ mt-3 → margin-top mức 3
+ mb-auto → margin-bottom tự động (auto)
+ px-4 → padding trái + phải mức 4
+ py-2 → padding trên + dưới mức 2
+ ms-5 → margin-left (start) mức 5

3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`?
`.container`
Đặc điểm: Có max-width theo từng breakpoint, tự căn giữa, Responsive
-> Thường dùng cho nội dung chính
`.container-fluid`
Đặc điểm: Luôn full width (100%), tràn toàn màn hình, không có max-width
-> Thường dùng cho: Hero section, Banner lớn, Footer full width
`.container-md`
Đặc điểm: Trước md (< 768px) → full width, từ md trở lên → có max-width giống .container
-> Nghĩa là: Mobile: rộng 100%, Tablet/Desktop: fixed width


### PHẦN C — PHÂN TÍCH 
#### Câu C1 — Tùy biến Bootstrap
1. Bạn muốn đổi màu `$primary` từ xanh mặc định sang `#E63946`. Giải thích quy trình (cần công cụ gì, modify file nào).
*Quy trình:
B1: Cài công cụ Sass
Cần cài: Node.js, Sass compiler 
B2: Tải Bootstrap source SCSS 
B3: Tạo file SCSS riêng
B4: Compile SCSS → CSS
B5: Link CSS vào HTML

2. Tại sao KHÔNG nên override trực tiếp `.btn-primary { background: red; }` mà nên dùng SASS variables?
Vì:
a. Chỉ đổi được một component
.btn-primary chỉ ảnh hưởng button nhưng $primary còn được dùng cho:
alerts, links, badges, navbar, form controls, nhiều component khác
-> Giao diện sẽ không đồng bộ
b. Khó bảo trì
Nếu override thủ công: phải sửa nhiều class riêng lẻ, dễ quên, code bị lặp
Dùng variable: chỉ sửa 1 chỗ, toàn bộ theme đổi theo
c. Dễ bị Bootstrap ghi đè
Khi update Bootstrap: CSS custom có thể bị conflict, phải tăng specificity hoặc dùng !important
SASS variables an toàn và chuẩn hơn
d. Theo đúng cơ chế thiết kế của Bootstrap
Bootstrap được xây dựng để customize bằng: variables, mixins, SCSS system
Nên dùng $primary là cách chính thức và chuyên nghiệp hơn


#### Câu C2 (10đ) — So sánh
Viết CSS thuần (từ PBT trước) để tạo 1 navbar responsive + 1 product card. So sánh với Bootstrap version:
```css
.navbar {
    display: flex;
    justify-content: space-between;
}
.card {
    border-radius: 10px;
}
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
    }
}
```
Bootstrap chỉ cần:
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
<div class="card">
| Tiêu chí             | CSS thuần             | Bootstrap                 |
| -------------------- | --------------------- | ------------------------- |
| Số dòng CSS          | Nhiều                 | Ít                        |
| Thời gian phát triển | Chậm hơn              | Nhanh hơn                 |
| Responsive           | Tự viết media queries | Có sẵn                    |
| Tùy biến             | Rất cao               | Bị giới hạn bởi framework |
| Dễ học               | Khó hơn               | Dễ hơn cho người mới      |
| Kích thước file      | Nhẹ hơn               | Nặng hơn                  |

- Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?
Nên dùng khi:
+ Làm prototype nhanh
+ Deadline ngắn
+ Website admin/dashboard
+ Dự án nhỏ hoặc trung bình
+ Team muốn giao diện đồng nhất
+ Người mới học frontend
Không nên dùng khi:
+ Cần UI quá đặc biệt
+ Thiết kế custom 100%
+ Muốn tối ưu performance tối đa
+ Website cần phong cách riêng mạnh
+ Dự án lớn có design system riêng


## 🌊 TRACK B — TAILWINDCSS
### PHẦN A — ĐỌC HIỂU
#### Câu A1 — Utility Classes
- flex → display: flex
- items-center → align-items: center
- justify-between → justify-content: space-between
- p-4 → padding: 1rem (16px)
- bg-white → background-color: white
- shadow-md → box-shadow: shadow mức vừa
- rounded-lg → border-radius: 0.5rem (8px)
- hover:shadow-xl → khi hover thì box-shadow chuyển sang mức lớn hơn
- transition-shadow → áp dụng hiệu ứng transition cho thuộc tính shadow
- duration-300 → thời gian transition: 300ms
- w-16 → width: 4rem (64px)
- h-16 → height: 4rem (64px)
- rounded-full → border-radius: 9999px (hình tròn)
- object-cover → ảnh tự cắt để phủ kín khung mà không méo
- ml-4 → margin-left: 1rem (16px)
- flex-1 → flex: 1 1 0% (chiếm toàn bộ khoảng trống còn lại)
- text-lg → font-size: 1.125rem (18px)
- font-semibold → font-weight: 600
- text-gray-800 → màu chữ xám đậm
- truncate → overflow: hidden; text-overflow: ellipsis; white-space: nowrap
  (text quá dài sẽ hiện ...)
- text-sm → font-size: 0.875rem (14px)
- text-gray-500 → màu chữ xám trung bình
- px-4 → padding-left + padding-right: 1rem (16px)
- py-2 → padding-top + padding-bottom: 0.5rem (8px)
- bg-blue-500 → background-color: xanh dương mức 500
- text-white → màu chữ trắng
- rounded-md → bo góc vừa (0.375rem = 6px)
- hover:bg-blue-600 → khi hover đổi nền sang xanh đậm hơn
- focus:ring-2 → khi focus hiện viền ring dày 2px
- focus:ring-blue-300 → màu ring xanh dương mức 300


#### Câu A2 (10đ) — Responsive & States
1. Giải thích prefix responsive: `md:`, `lg:`, `xl:`. VD: `md:grid-cols-2 lg:grid-cols-4` nghĩa là gì?
- md: → áp dụng class từ breakpoint medium trở lên (min-width: 768px)
- lg: → áp dụng từ breakpoint large trở lên (min-width: 1024px)
- xl: → áp dụng từ breakpoint extra large trở lên (min-width: 1280px)
VD: `md:grid-cols-2 lg:grid-cols-4` nghĩa là:
- Màn hình nhỏ hơn 768px → dùng layout mặc định
- Từ 768px trở lên (md) → grid có 2 cột
- Từ 1024px trở lên (lg) → grid có 4 cột

2. Giải thích state modifiers: `hover:`, `focus:`, `active:`, `group-hover:`
- hover: → áp dụng style khi rê chuột vào phần tử
- focus: → áp dụng style khi phần tử được focus (click vào input/button hoặc tab bằng bàn phím)
- active: → áp dụng khi phần tử đang được nhấn giữ
- group-hover: → phần tử con thay đổi khi phần tử cha có class group được hover

3. Viết class Tailwind cho: "Ẩn trên mobile, hiện dạng flex trên tablet trở lên" (tương đương `d-none d-md-flex` của Bootstrap)
Trả lời: hidden md:flex
Nghĩa là: 
hidden → display: none
md:flex → từ 768px trở lên hiển thị display: flex


### PHẦN C — PHÂN TÍCH 
#### Câu C1 — Tailwind vs CSS thuần
- HTML:
<article class="product-card">
    <div class="product-image-container">
        <img src="image.jpg" alt="Sản phẩm" class="product-image">
    </div>
    <div class="product-details">
        <h4 class="product-title">Laptop Asus Zenbook Pro</h4>
        <p class="product-price">24.990.000đ</p>
    </div>
</article>

```css
.product-card {
    background-color: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.product-image-container {
    aspect-ratio: 1 / 1;
    overflow: hidden;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-details {
    padding: 15px;
}

.product-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
}

.product-price {
    color: #dc3545;
    font-weight: bold;
}
```
Viết lại bằng TailwindCSS:
<article class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
    <div class="aspect-square overflow-hidden">
        <img 
            src="image.jpg"
            alt="Sản phẩm"
            class="w-full h-full object-cover"
        >
    </div>
    <div class="p-4">
        <h4 class="text-base font-semibold mb-2">
            Laptop Asus Zenbook Pro
        </h4>
        <p class="text-red-600 font-bold">
            24.990.000đ
        </p>
    </div>
</article>
* So sánh CSS thuần vs Tailwind
a. HTML file size:
- CSS thuần: HTML ngắn hơn nhưng cần thêm file CSS riêng, tốn thời gian đặt tên class
- Tailwind: HTML dài hơn vì chứa nhiều utility classes. Tuy nhiên không cần viết nhiều CSS riêng, giảm số lượng custom class, dễ phát triển nhanh UI

b. Maintainability (dễ đọc? dễ sửa?)
- CSS thuần
+ Ưu điểm: HTML sạch hơn, dễ nhìn cấu trúc component
+ Nhược điểm: Phải chuyển qua lại giữa HTML và CSS, khi sửa giao diện phải tìm đúng selector, dễ bị conflict CSS ở project lớn
- Tailwind
+ Ưu điểm: Style nằm ngay trong HTML, sửa nhanh trực tiếp trên class, ít bị ghi đè CSS, Responsive và state viết rất nhanh
+ Nhược điểm: HTML dài, ban đầu nhìn hơi rối, người mới khó đọc utility classes

c. Reusability (dùng lại thế nào? `@apply`?)
- CSS thuần:
Tái sử dụng bằng class: .product-card { ... }
Chỉ cần gọi: class="product-card"
- Tailwind
Tái sử dụng bằng: copy utility classes; tạo component; dùng @apply
vd: .product-card {
        @apply bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm;
    }
Sau đó dùng: class="product-card"


#### Câu C2 (10đ) — Performance
1. File HTML dùng Tailwind thường rất dài (nhiều classes). Tại sao Tailwind CSS file cuối cùng lại **NHỎ HƠN** Bootstrap CSS?
- Vì Tailwind chỉ tạo CSS được sử dụng
Trong Tailwind: HTML chứa rất nhiều utility classes
Nhưng ở bước build:
+ Tailwind sẽ quét toàn bộ file HTML/JSX
+ Chỉ generate CSS cho các class đang dùng
- Bootstrap là framework component-based:
Nó ship sẵn rất nhiều CSS:
modal
carousel
accordion
tooltip
alert
dropdown
navbar
form
utilities
grid
print styles
animations
...
Ngay cả khi project KHÔNG dùng các component đó, CSS vẫn tồn tại trong file Bootstrap
→ File CSS lớn hơn.

2. Giải thích Tailwind PurgeCSS (Tailwind JIT). Nó loại bỏ gì?
- PurgeCSS là cơ chế: quét source code, tìm class Tailwind thực sự được dùng, xoá toàn bộ CSS không dùng
- Tailwind JIT (Just In Time)
Từ Tailwind v3: JIT trở thành mặc định
Nó: generate CSS theo thời gian thực, chỉ tạo class khi class xuất hiện trong code
- Tailwind Purge/JIT loại bỏ:
+ utility classes không dùng
+ responsive classes không dùng
+ hover/focus classes không dùng
+ animation classes không dùng
=> Giảm kích thước CSS production rất mạnh

3. Khi nào KHÔNG nên dùng TailwindCSS? Cho 2 tình huống cụ thể.
- TH1 — Project nhỏ, rất đơn giản
+ landing page đơn giản
+ website vài trang tĩnh
+ bài tập nhỏ
- Dùng Tailwind có thể: làm HTML dài, setup build phức tạp hơn CSS thường
VD:
html: class="flex items-center justify-center p-4 bg-blue-500"
css: .button { ... }
-> Dùng css thuần ngắn và dễ hiểu hơn
- TH2 — Không quen utility-first
+ quen viết SCSS/BEM
+ quen component CSS
+ không biết Tailwind
thì:
HTML sẽ rất khó đọc, khó maintain, code bị lặp utility classes
VD: class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
-> Người chưa học Tailwind sẽ thấy khó hiểu

















