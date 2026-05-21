## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1 — Viewport & Mobile-First
1. Viết chính xác thẻ `<meta viewport>` chuẩn:
<meta name="viewport" content="width=device-width, initial-scale=1.0">
- Giải thích từng thuộc tính:
width=device-width: Chiều rộng trang web bằng chiều rộng thật của thiết bị
initial-scale=1.0: Mức zoom ban đầu = 100%

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? (Đọc chương 13)
- iPhone sẽ coi trang web là web desktop rồi tự thu nhỏ toàn bộ trang lại
- Kết quả:
+ Chữ rất nhỏ
+ Phải zoom để đọc
+ Layout bị vỡ
+ Nút bấm chồng lên nhau
+ Xuất hiện scroll ngang

3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?
- Mobile-First: Code cho mobile trước, sau đó dùng min-width để mở rộng cho màn hình lớn hơn
Ví dụ:
```css
/* Mobile */
.col{
    width: 100%;
}
/* Tablet trở lên */
@media (min-width: 768px){
    .col{
        width: 50%;
    }
}
- Desktop-First: Code cho desktop trước, sau đó dùng max-width để thu nhỏ trên mobile
Ví dụ:
/* Desktop */
.col{
    width: 50%;
}
/* Mobile */
@media (max-width: 768px){
    .col{
        width: 100%;
    }
}
```
- Mobile-First được khuyên dùng vì: 
+ Mobile chiếm phần lớn lượt truy cập web
+ Điện thoại tải ít CSS hơn nên nhanh hơn
+ Dễ mở rộng lên tablet/desktop
+ Responsive tốt hơn
+ Google ưu tiên mobile-friendly SEO


### Câu A2  — Breakpoints
Breakpoint	            | Kích thước màn hình |	Thiết bị đại diện    |	Ví dụ lưới sản phẩm
Extra Small (XS)        | < 576px	          |    Điện thoại nhỏ    |	1 cột
Small (SM)	            | ≥ 576px	          |     Điện thoại lớn   |	2 cột
Medium (MD)	            | ≥ 768px	          |     Tablet/iPad	     |  2–3 cột
Large (LG)	            | ≥ 992px	          |         Laptop	     |  3–4 cột
Extra Large (XL)        | ≥ 1200px	          |    Desktop lớn	     |  4–5 cột
Extra Extra Large (XXL)	| ≥ 1400px	          |  Màn hình rất lớn/TV |	5–6 cột


### Câu A3 (5đ) — Media Queries

Đọc CSS sau, cho biết ở mỗi kích thước màn hình, `.container` có `width` bao nhiêu? Điền bảng.
```css
.container { width: 100%; padding: 10px; }
@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```
| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE)   |        100%        |
| 600px               |        540px       |
| 800px               |        720px       |
| 1000px              |        960px       |
| 1400px              |        1140px      |


### Câu A4 — SCSS Basics
1. Variables (`$primary-color`): Variables dùng để lưu giá trị và tái sử dụng nhiều lần
Ví dụ:
```css
$primary-color: blue;
$font-size: 16px;
button {
    background-color: $primary-color;
    font-size: $font-size;
}
2. Nesting (viết CSS lồng nhau): SCSS cho phép viết selector lồng nhau giống cấu trúc HTML
VD:
nav { background: black; }
nav ul { list-style: none; }
nav li { display: inline-block; }
nav a { color: white; }


3. Mixins (`@mixin`, `@include`): Mixin dùng để tái sử dụng một nhóm CSS nhiều lần
VD:
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    @include flex-center;
}
Compile thành:
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

4. `@extend` / Inheritance: @extend cho phép một class kế thừa style của class khác
VD:
.button {
    padding: 10px;
    border-radius: 5px;
}

.success-button {
    @extend .button;
    background: green;
}
Compile thành:
.button,
.success-button {
    padding: 10px;
    border-radius: 5px;
}

.success-button {
    background: green;
}

- Trình duyệt KHÔNG đọc được file .scss? vì: trình duyệt chỉ hiểu: HTML, CSS, JavaScript
SCSS là ngôn ngữ mở rộng của CSS nên trình duyệt không hiểu trực tiếp cú pháp như:
$variable, @mixin, nesting.
Vì vậy cần compile (biên dịch) SCSS thành CSS trước khi chạy

- Bước để chuyển SCSS → CSS:
Cần dùng Sass Compiler để biên dịch.
VD: sass style.scss style.css
Kết quả:
style.scss → file SCSS gốc
style.css → file CSS trình duyệt đọc được
Sau đó HTML sẽ link tới file CSS: <link rel="stylesheet" href="style.css">
```


## PHẦN C — PHÂN TÍCH
### Câu C1 — Phân tích trang web thực
Phân tích:
1. Mobile (375px):
- Navigation đổi thành icon hamburger
- Thanh menu bên trái bị ẩn
- Video hiển thị 1 cột
- Font nhỏ hơn desktop
- Một số text ngắn lại để tiết kiệm không gian

2. Tablet (768px)
- Navigation bắt đầu mở rộng hơn
- Có sidebar thu gọn
- Video hiển thị khoảng 2–3 cột
- Khoảng cách giữa các phần tử lớn hơn mobile

3. Desktop (1440px)
- Sidebar hiển thị đầy đủ
- Video hiển thị nhiều cột (4–6 cột)
- Font lớn và dễ đọc hơn
- Hiển thị đầy đủ search bar và menu


### Câu C2 — Thiết kế Responsive Strategy
Vẽ wireframe:
1. Mobile
--------------------
| LOGO     ☰ MENU |
| Phone hidden    |
--------------------
|                  |
|   HERO IMAGE     |
|                  |
--------------------
|   Food 1         |
|   Food 2         |
|   Food 3         |
|   Food 4         |
|   Food 5         |
|   Food 6         |
--------------------
|   BOOKING FORM   |
| Date             |
| Time             |
| Guests           |
| Notes            |
| Submit Button    |
--------------------
|   GOOGLE MAP     |
--------------------
|     FOOTER       |
--------------------
- Những gì bị ẩn: 
+ Menu navigation đầy đủ bị ẩn → đổi thành hamburger menu (☰)
+ Một số text phụ hoặc icon phụ có thể bị ẩn để tiết kiệm không gian
+ Số điện thoại đặt bàn có thể thu gọn thành icon gọi điện
- Form:
Form đặt bàn nằm bên dưới grid ảnh món ăn
Các trường form xếp theo chiều dọc:
+ Ngày
+ Giờ
+ Số người
+ Ghi chú
+ Nút Submit

2. Tablet
--------------------------------
| LOGO        Phone     MENU  |
--------------------------------
|                              |
|         HERO IMAGE           |
|                              |
--------------------------------
| Food1 | Food2 |
| Food3 | Food4 |
| Food5 | Food6 |
--------------------------------
|     BOOKING FORM             |
--------------------------------
|        GOOGLE MAP            |
--------------------------------
|          FOOTER              |
--------------------------------
- Grid ảnh món ăn hiển thị 2 cột
- Bản đồ nằm bên dưới form đặt bàn

3. Desktop
---------------------------------------------------
| LOGO          MENU             PHONE            |
---------------------------------------------------
|                                                 |
|                 HERO IMAGE                      |
|                                                 |
---------------------------------------------------
| Food1 | Food2 | Food3 |
| Food4 | Food5 | Food6 |
---------------------------------------------------
| BOOKING FORM |        GOOGLE MAP                |
|              |                                  |
---------------------------------------------------
|                    FOOTER                       |
---------------------------------------------------
- Layout chính sử dụng khoảng 2–3 cột để tận dụng màn hình rộng
- Sidebar: không có
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
/* MOBILE FIRST */
body {
    font-family: Arial, sans-serif;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
}
.hero {
    height: 300px;
    background: #ccc;
}
.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 20px;
}
.food-item {
    height: 200px;
    background: #ddd;
}
.booking-form {
    padding: 20px;
}
.map {
    height: 300px;
    background: #bbb;
    margin: 20px;
}
footer {
    padding: 20px;
    text-align: center;
}
/* TABLET */
@media (min-width: 768px) {

    .food-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
/* DESKTOP */
@media (min-width: 1200px) {

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    .bottom-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 20px;
    }
}
