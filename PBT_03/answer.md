## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1  — 3 Cách nhúng CSS
1. Inline CSS (CSS viết trực tiếp trong thẻ HTML)
-VD code:
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
-Ưu điểm:
+ Viết nhanh, đơn giản
+ Dễ test hoặc debug nhanh một phần tử cụ thể
+ Không cần tạo file CSS riêng
-Nhược điểm:
+ Code sẽ rối nếu dùng nhiều
+ Khó chỉnh sửa khi website lớn
+ Làm HTML mất tính gọn gàng
-Nên dùng khi muốn:
+ Debug nhanh
+ Thử nghiệm style tạm thời
+ Chỉnh sửa nhanh một phần tử đơn lẻ

2. Internal CSS (CSS viết trong thẻ <style>)
-VD code: 
<head>
    <style>
        h1 {
            color: red;
            font-size: 24px;
        }
    </style>
</head>
-Ưu điểm:
+ Code gọn hơn Inline CSS
+ Có thể áp dụng cho nhiều phần tử trong cùng 1 trang
+ Không cần file CSS riêng
-Nhược điểm:
+ Chỉ dùng được cho 1 trang HTML, khó tái sử dụng cho nhiều trang
+ Khi project lớn sẽ khó quản lý
-Nên dùng khi: 
+ Làm prototype
+ Làm bài tập nhỏ
+ Trang web đơn giản chỉ có 1 file

3. External CSS (CSS trong file riêng)
-VD code: HTML
<head>
    <link rel="stylesheet" href="styles.css">
</head>
File styles.css:
h1 {
    color: red;
    font-size: 24px;
}
-Ưu điểm:
+ Code sạch, dễ quản lý
+ Tái sử dụng cho nhiều trang
+ Dễ bảo trì và chỉnh sửa
-Nhược điểm:
+ Cần tạo file riêng
+ Nếu link sai thì CSS không hoạt động
+ Ban đầu hơi phức tạp hơn 2 cách trên
-Nên dùng khi:
+ Website nhiều trang
+ Làm dự án thực tế
+ Làm production

Câu hỏi thêm: Nếu cùng 1 element được áp dụng đồng thời Inline CSS, Internal CSS và External CSS thì thứ tự ưu tiên sẽ là: Inline CSS > Internal CSS > External CSS
Giải thích: do cơ chế Cascade của CSS (Cascading Style Sheets)
-CSS hoạt động theo quy tắc ưu tiên:
Inline CSS có độ ưu tiên cao nhất vì được viết trực tiếp trên chính phần tử đó.
Internal CSS ưu tiên hơn External nếu selector giống nhau.
External CSS có độ ưu tiên thấp hơn.


### Câu A2 — CSS Selectors — Dự đoán kết quả
1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ; 45.990.000đ
3. #app header                  → Chọn: ShopTLU; Home; Products; About
4. nav a:first-child             → Chọn: Home
5. .product.featured h2         → Chọn: MacBook Pro
6. article > p                  → Chọn: 25.990.000đ; Mô tả sản phẩm...; "45.990.000đ; Mô tả sản phẩm...
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1              → Chọn: ShopTLU


### Câu A3 — Box Model — Tính toán kích thước
```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = width + padding×2 + border×2 = 400+(20×2)+(5×2) = 450px
→ Không gian chiếm trên trang = 450+(10×2) = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = width - padding×2 - border×2= 400-40-10 = 350px
→ Không gian chiếm trên trang = 400 + (10×2)= 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = max(25, 40) = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px: Vì xảy ra hiện tượng Margin Collapse:
Khi hai phần tử block xếp dọc:
margin-bottom của phần tử trên
margin-top của phần tử dưới
sẽ gộp lại thành một margin duy nhất, không cộng dồn, CSS chọn giá trị lớn hơn để tránh khoảng cách bị nhân đôi.
```
- **Nâng cao:** Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`, khoảng cách = bao nhiêu?
Trả lời: Với margin collapse, nếu có 1 margin dương và 1 margin âm thì CSS sẽ cộng hai giá trị: 40 + (-10) = 30px => Khoảng cách = 30px


### Câu A4 — Specificity (Độ ưu tiên)
Quy tắc tính:
a = số lượng ID selector
b = số lượng class
c = số lượng element selector

1. Tính specificity score (a, b, c) cho mỗi rule
- Rule A: 0 ID, 0 class, 1 element  => Specificity: (0,0,1)
- Rule B: 0 ID, 1 class, 0 element  => Specificity: (0,1,0)
- Rule C: 1 ID, 0 class, 0 element  => Specificity: (1,0,0)
- Rule D: 0 ID, 1 class, 1 element  => Specificity: (0,1,1)

2. Element sẽ có màu gì? Giải thích
CSS ưu tiên theo thứ tự: ID > Class > Element
Rule mạnh nhất là: Rule C → (1,0,0) nên Element sẽ có màu đỏ
Vì: Selector #main-price chứa ID nên có độ ưu tiên cao hơn tất cả rule còn lại

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu gì?
Inline CSS có độ ưu tiên cao hơn selector thông thường, có thể xem như specificity cực cao => Element sẽ có màu cam (orange)

4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao?
Element sẽ có màu đen (black)
Vì: !important ưu tiên cao hơn specificity thông thường


### Bài B2 — Box Model Lab
Hộp 1 (content-box): chiều rộng thực tế = 300 px (đo từ DevTools)
Hộp 2 (border-box): chiều rộng thực tế = 300 px (đo từ DevTools)
Giải thích sự khác biệt: mặc dù DevTools hiển thị cả hai đều là 300px, nhưng ý nghĩa khác nhau:
- Với content-box, 300px là chiều rộng của phần content, chưa tính padding và border.
Chiều rộng hiển thị thực tế trên trang là: 300 + 20×2 + 5×2 = 350px
- Với border-box, 300px là chiều rộng toàn bộ hộp, đã bao gồm content, padding và border. Vì vậy kích thước hiển thị thực tế vẫn là 300px
Do đó hộp content-box nhìn lớn hơn hộp border-box, dù DevTools đều hiển thị width là 300px


### Bài B3 — Specificity Battle
1. Liệt kê 10 rules + specificity score

| Rule | Selector            | Specificity |
|------|---------------------|-------------|
| 1    | p                   | (0,0,1)     |
| 2    | .text               | (0,1,0)     |
| 3    | .highlight          | (0,1,0)     |
| 4    | body p              | (0,0,2)     |
| 5    | p.text              | (0,1,1)     |
| 6    | .text.highlight     | (0,2,0)     |
| 7    | p.text.highlight    | (0,2,1)     |
| 8    | #demo               | (1,0,0)     |
| 9    | p#demo              | (1,0,1)     |
| 10   | #demo.text.highlight| (1,2,0)     |

2. Element cuối cùng hiển thị màu gì? Tại sao?
Element cuối cùng hiển thị màu: gold
Vì: ```#demo.text.highlight``` có specificity cao nhất: (1,2,0)
CSS ưu tiên selector có specificity lớn hơn, nên rule này ghi đè tất cả rule còn lại

4. Thay đổi thứ tự rules trong CSS file. Kết quả không thay đổi. Vì:
Rule thắng có độ ưu tiên (specificity) cao nhất nên vẫn được áp dụng dù đặt ở đâu.
Thứ tự viết CSS chỉ quan trọng khi 2 rule có cùng specificity. Khi đó rule viết sau sẽ thắng


## PHẦN C — DEBUG & SUY LUẬN 
### Câu C1 — Debug CSS Layout
1. Tính chiều rộng **thực tế** của sidebar và content (content-box!)
Sidebar= width + padding×2 + border×2 = 300 + (20×2) + (1×2)= 342px
Content=660 + (30×2) + (1×2)= 722px

2. Giải thích tại sao layout bị vỡ
Vì: Tổng=342 + 722 = 1064px mà Container chỉ:960px
1064 > 960 nên browser không đủ chỗ đặt cạnh nhau => content bị đẩy xuống dòng

3. Đưa ra **2 cách sửa** khác nhau (1 cách dùng border-box, 1 cách không dùng)
C1: dùng border-box:
*{
    box-sizing: border-box;
}
C2: không dùng border-box:
.sidebar {
    width: 258px;
}
.content {
    width: 598px;
}

### Câu C2 — Cascade Puzzle
1. "Sản phẩm A" (h2) có `font-size` = 20px và `color` = green
Giải thích:
- h2 kế thừa font-size từ .container (14px), nhưng bị rule .card .title ghi đè thành 20px
- Về color, h2 nhận màu đỏ từ #featured .title, nhưng class .highlight có !important nên ghi đè và cho màu green

2. "Mô tả sản phẩm" (p trong card featured) có `color` = blue
Giải thích:
Thẻ <p> dùng color: inherit, nên kế thừa màu từ phần tử cha .card mà .card có màu blue, nên p hiển thị màu blue

3. "Sản phẩm B" (h2) có `font-size` = 20px và `color` = blue
Giải thích:
Rule .card .title đặt trực tiếp font-size 20px nên ghi đè giá trị kế thừa. 
Do không có class .highlight và không nằm trong #featured, nên h2 kế thừa màu từ .card là blue

4. "Mô tả sản phẩm B" (p.highlight) có `color` = green
Giải thích:
Thẻ p ban đầu kế thừa màu blue từ .card
Tuy nhiên nó có class .highlight, và rule .highlight có !important nên ghi đè tất cả và thành màu green















