# 📋 PHIẾU BÀI TẬP 02
# **HTML5 FORMS & MEDIA — Biểu mẫu, Validation & Đa phương tiện**

## PHẦN A — KIỂM TRA ĐỌC HIỂU 
### Câu A1 — Input Types
Liệt kê **10 input types** khác nhau trong HTML5:
1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
2. type="password" → Ô nhập text nhưng ẩn ký tự (hiển thị thành dấu chấm tròn hoặc sao) bảo mật thông tin → Dùng để nhập mật khẩu
3. type="tel" → Ô nhập số điện thoại, tự động mở bàn phím số trên giao diện điện thoại di động → Dùng cho phần điền thông tin liên hệ, đặt hàng
4. type="date" → Hiển thị bộ chọn ngày tháng (calendar/lịch) để người dùng click chọn → Dùng để chọn ngày sinh, ngày đặt vé máy bay,..
5. type="number"→ Ô chỉ cho phép nhập các con số, có thêm nút mũi tên tăng/giảm → Dùng để nhập số lượng sản phẩm trong giỏ hàng, nhập tuổi,..
6. type="checkbox" → Ô vuông đánh dấu, cho phép người dùng chọn nhiều đáp án cùng lúc → Dùng cho phần chọn sở thích, hoặc ô "Tôi đồng ý với các điều khoản"
7. type="radio" → Nút hình tròn, trong một nhóm các radio thì chỉ cho phép chọn duy nhất 1 đáp án → Dùng cho phần chọn Giới tính (Nam/Nữ), phương thức thanh toán,..
8. type="range" → Thanh trượt (slider) để kéo chọn một giá trị số trong khoảng (min - max) cho trước → Dùng để tạo bộ lọc mức giá sản phẩm (ví dụ: từ 100k - 500k).
9. type="file" → Nút bấm mở ra cửa sổ thư mục để chọn tệp từ máy tính tải lên → Dùng để upload ảnh đại diện cá nhân, nộp file bài tập hoặc đính kèm CV,..
10. type="search" → Ô nhập từ khóa tìm kiếm, thường có thêm dấu 'x' ở góc để xóa nhanh chữ vừa nhập → Dùng làm thanh tìm kiếm sản phẩm hoặc bài viết trên website,..
-Nguồn tham chiếu: chương 07 - FORMS & INTERACTIVE ELEMENTS phần Các Input Types HTML5


### Câu A2 — Validation Attributes
<!-- Trường hợp 1 -->
<input type="text" required value="">   <!-- User để trống -->
Dự đoán: Form không submit được
Vì: Thuộc tính required bắt buộc người dùng phải nhập dữ liệu. Vì ô đang rỗng nên trình duyệt hiển thị thông báo yêu cầu nhập

<!-- Trường hợp 2 -->
<input type="email" value="abc">        <!-- User gõ "abc" -->
Dự đoán: Form không submit được
Vì: type="email" yêu cầu dữ liệu đúng định dạng email (phải có dạng như abc@gmail.com). Giá trị "abc" không chứa ký tự @ và domain hợp lệ nên trình duyệt báo lỗi

<!-- Trường hợp 3 -->
<input type="number" min="1" max="10" value="15"> <!-- User gõ 15 -->
Dự đoán: Form không submit được
Vì: Giá trị nhập là 15, vượt quá giới hạn max="10", nên vi phạm quy tắc rangeOverflow

<!-- Trường hợp 4 -->
<input type="text" pattern="[0-9]{10}" value="abc123"> <!-- User gõ "abc123" -->
Dự đoán: Form không submit được
Vì: Biểu thức này yêu cầu chuỗi phải là đúng 10 chữ số liên tiếp (từ 0 đến 9). Chuỗi "abc123" vừa chứa chữ cái vừa không đủ 10 ký tự, nên vi phạm patternMismatch

<!-- Trường hợp 5 -->
<input type="password" minlength="8" value="123">  <!-- User gõ "123" -->
Dự đoán: Form không submit được
Vì: Thuộc tính minlength="8" thiết lập độ dài chuỗi tối thiểu là 8 ký tự. Chuỗi "123" chỉ có 3 ký tự, vi phạm quy tắc tooShort
=> So sánh với dự đoán: trùng khớp với dự đoán


### Câu A3 — Accessibility
1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?
Vì: 
Screen reader sẽ đọc tên trường nhập liệu cho người dùng khi focus vào input
Người dùng biết ô đó dùng để nhập thông tin gì
Khi click vào label, con trỏ tự động focus vào input tương ứng

2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.
Cặp thẻ này được dùng để nhóm các phần tử liên quan lại với nhau trong một form lớn, giúp tạo cấu trúc ngữ nghĩa mạch lạc
VD: 
<fieldset> 
    <legend>Thông tin cá nhân</legend> 
    <label for="fullname">Họ tên:</label> 
    <input type="text" id="fullname"> 
    <label for="dob">Ngày sinh:</label> 
    <input type="date" id="dob"> 
</fieldset>

3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?
`aria-label`: Dùng khi bạn muốn cung cấp nhãn văn bản cho trình đọc màn hình nhưng không muốn hiển thị văn bản đó trên giao diện (vì lý do thẩm mỹ hoặc thiết kế). Thường dùng cho các nút bấm chỉ có icon
Không nên dùng `aria label` khi đã có `<label>` vì: `<label>` đã cung cấp thông tin đầy đủ, dùng cả hai có thể gây trùng lặp khi screen reader đọc, `<label>` là semantic HTML chuẩn, nên ưu tiên hơn, chỉ dùng aria-label khi không thể dùng `<label>` trực tiếp


### Câu A4 — Media
1. Giải thích thuộc tính `loading="lazy"` trên thẻ `<img>`. Nó cải thiện gì? Khi nào KHÔNG nên dùng?
- thuộc tính `loading="lazy"` trên thẻ `<img>` là thuộc tính cho phép trình duyệt trì hoãn tải ảnh cho đến khi ảnh gần xuất hiện trong vùng hiển thị của người dùng
- Nó cải thiện: 
+ Giảm thời gian tải trang ban đầu
+ Tiết kiệm băng thông
+ Tăng hiệu năng trang web
+ Cải thiện trải nghiệm người dùng trên thiết bị mạng chậm
- Không nên dùng khi: 
+ Ảnh nằm ngay đầu trang
+ Ảnh logo website
+ Nội dung quan trọng cần hiển thị ngay

2. Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`? Liệt kê ít nhất 3 format video web phổ biến.
- Nên cung cấp nhiều `<source>` để đảm bảo khả năng tương thích với nhiều trình duyệt khác nhau.
Không phải trình duyệt nào cũng hỗ trợ cùng một định dạng video
- 3 format video web phổ biến: MP4, WebM, OGV (Ogg Video)

3. Thuộc tính `alt` trên `<img>` dùng để làm gì?
+ Mô tả nội dung ảnh cho screen reader
+ Hiển thị mô tả khi ảnh tải lỗi
+ Hỗ trợ SEO
+ Tăng accessibility cho người khiếm thị
 Viết `alt` tốt cho 3 trường hợp:
   - Ảnh sản phẩm iPhone 16 => alt="iPhone 16 Pro Max 256GB màu Titan" : Mô tả cụ thể tên sản phẩm và đặc điểm
   - Ảnh trang trí (decorative) => alt="" : Để trống vì ảnh không mang nội dung quan trọng
   - Ảnh biểu đồ doanh thu Q1/2026
   => alt="Biểu đồ doanh thu quý 1 năm 2026, doanh thu tăng dần từ tháng 1 đến tháng 3" : Mô tả nội dung chính của biểu đồ để người dùng không nhìn thấy ảnh vẫn hiểu thông tin


### Câu A5 — So sánh `<figure>` vs `<img>`
+ <img> dùng để hiển thị hình ảnh đơn thuần
+ <figure> là phần tử semantic dùng để chứa nội dung minh họa độc lập như hình ảnh, biểu đồ, sơ đồ, thường đi kèm <figcaption> để mô tả hoặc chú thích
- Khi nào dùng Cách 1 (<img>): Dùng khi ảnh chỉ mang tính hiển thị đơn giản, không cần chú thích riêng
VD1: Logo website ở header
<img src="logo.png" alt="Logo cửa hàng">
VD2: Icon minh họa trong nút tìm kiếm
<img src="search-icon.png" alt="Tìm kiếm">
- Khi nào dùng Cách 2 (<figure> + <figcaption>): Dùng khi ảnh cần chú thích, mô tả chi tiết hoặc là nội dung độc lập
VD1: Ảnh sản phẩm trên trang bán hàng
<figure>
    <img src="iphone.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
VD2: Biểu đồ thống kê doanh thu
<figure>
    <img src="chart.png" alt="Biểu đồ doanh thu quý 1 năm 2026">
    <figcaption>Doanh thu tăng 20% so với quý trước</figcaption>
</figure>


## PHẦN B — THỰC HÀNH CODE 
### Bài B1 — Form Đăng ký Tài khoản
Trả lời: Tại sao HTML không thể validate confirm password?
Vì: HTML5 Validation được thiết kế để kiểm tra tính hợp lệ cục bộ (local validation) của từng phần tử dựa trên các thuộc tính có sẵn (như required, pattern, type).H TML không có cơ chế logic để thực hiện validation chéo — tức là so sánh giá trị giữa hai ô input khác nhau. Vì trình duyệt chỉ kiểm tra xem nội dung trong ô đó có khớp với định dạng của chính nó hay không, chứ không biết ô đó 'cần phải giống' một ô nào khác.


## PHẦN C — PHÂN TÍCH & SUY LUẬN 
### Câu C1 — Debug Form
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility
Sửa: 
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>

Lỗi 2: Dòng 4 — Input email chỉ có placeholder, thiếu label
Sửa:
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>

Lỗi 3: Dòng 6 — Ô mật khẩu không có label, thiếu thuộc tính required
Sửa:
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" required>

Lỗi 4: Dòng 7 — Ô nhập lại mật khẩu không có label, không phân biệt rõ chức năng
Sửa:
<label for="confirmPassword">Nhập lại mật khẩu:</label>
<input type="password" id="confirmPassword" name="confirmPassword" required>

Lỗi 5: Dòng 9 — Input số điện thoại dùng type="text", nên dùng type="tel"
Sửa:
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>

Lỗi 6: Dòng 9 — Dùng thuộc tính value mặc định cho số điện thoại không phù hợp
Sửa:
<input type="tel" id="phone" name="phone" placeholder="0901234567">

Lỗi 7: Dòng 11 — Thẻ <select> không có label
Sửa:
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
    <option value="">-- Chọn thành phố --</option>
    <option>Hà Nội</option>
    <option>TP.HCM</option>
</select>

Lỗi 8: Dòng 15 — Label "Tôi đồng ý điều khoản" không gắn với checkbox
Sửa:
<input type="checkbox" id="agree" name="agree" required>
<label for="agree">Tôi đồng ý điều khoản</label>


### Câu C2 — Thiết kế chiến lược Validation
1. Viết `pattern` regex cho CMND/CCCD và Số tài khoản
CMND/CCCD: pattern="[0-9]{12}"
STK: pattern="[0-9]{10,15}"

2. Giải thích: HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
Mặc dù HTML5 validation rất tiện lợi và tạo trải nghiệm tốt cho người dùng (UX), nhưng nó không đủ an toàn vì:
- Dễ dàng bị vượt qua: Người dùng chỉ cần nhấn F12 (DevTools), xóa thuộc tính required hoặc pattern trong mã nguồn là form sẽ được gửi đi bình thường
- Có thể bị vô hiệu hóa: Một số công cụ hoặc script có thể gửi dữ liệu trực tiếp đến server mà không cần thông qua giao diện trình duyệt, bỏ qua hoàn toàn các bước kiểm tra của HTML5

3. Liệt kê 3 loại validation mà HTML5 **KHÔNG THỂ** làm được (phải dùng JavaScript)
- So sánh giữa hai trường dữ liệu (Cross-field validation): Ví dụ: Kiểm tra "Mật khẩu" và "Xác nhận mật khẩu" có trùng khớp với nhau không
- Kiểm tra dữ liệu thời gian thực với Database: Ví dụ: Kiểm tra xem "Số điện thoại" hoặc "Email" này đã có người khác đăng ký trong hệ thống ngân hàng chưa (phải dùng API/AJAX)
- Logic nghiệp vụ phức tạp (Complex Logic): Ví dụ: Kiểm tra mã PIN không được là các số liên tiếp (123456) hoặc trùng với ngày sinh của người dùng

4. Nêu 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend
- Dữ liệu rác và hỏng hóc hệ thống (Data Integrity)
- Tấn công mã độc (SQL Injection / XSS)

Link video thực hành code:
https://drive.google.com/file/d/1E5Uv-c7HkRD2GceFtDJRqXXATHnclqYo/view?usp=sharing






