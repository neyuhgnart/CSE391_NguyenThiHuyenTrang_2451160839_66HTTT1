## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1 — HTTP & Browser:
1.  Khi bạn gõ `https://shopee.vn` vào trình duyệt và nhấn Enter, hãy liệt kê **đúng thứ tự** ít nhất 5 bước xảy ra (từ DNS lookup đến render):
B1: Browser gửi DNS Lookup để tìm địa chỉ IP của shopee.vn
B2: Thiết lập kết nối tới server qua Internet
B3: Browser gửi HTTP Request
B4: Server xử lý request
B5: Server trả về HTTP Response
B6: Browser nhận file HTML  
B7: Browser parse HTML
B8: Browser parse CSS

- Nguồn tham chiếu: 01_introduction_html_universe.md
+ Mục 1.1 Kiến trúc Client-Server-"Nhà hàng online"
+ Mục 1.2 HTTP-Ngôn ngữ để Client và Server hiểu nhau
+ Mục 1.3 Browser Rendering-Từ code thành hình ảnh

### Câu A2 — Semantic HTML:
Đọc chương 04, trả lời: Tại sao trang web dưới đây bị Google đánh giá SEO thấp? Liệt kê **ít nhất 4 lỗi semantic** và sửa lại.
```html
<div class="header">
    <div class="logo">ShopTLU</div>
    <div class="menu">
        <div><a href="/">Trang chủ</a></div>
        <div><a href="/products">Sản phẩm</a></div>
    </div>
</div>
<div class="main">
    <div class="product">
        <div class="title">iPhone 16 Pro</div>
        <div class="price">25.990.000đ</div>
        <div class="image"><img src="iphone.jpg"></div>
    </div>
</div>
<div class="footer">© 2026 ShopTLU</div>
```
Trả lời: 
- Trang web này bị Google đánh giá SEO thấp vì sử dụng quá nhiều thẻ <div> cho mọi thành phần. Google Bot khi quét qua sẽ không hiểu đâu là phần quan trọng nhất, đâu là thanh điều hướng, hay đâu là một bài viết độc lập.
Nguồn tham chiếu: 04_visible_part_html.md-Semantic HTML5("Dùng đúng thẻ = Google hiểu nội dung = SEO tốt hơn")
- Các lỗi semantic:
1. <div class="header"> sửa thành <header>
2. <div class="menu"> sửa thành <nav>
3. <div class="main"> sửa thành <main>
4. <div class="product"> sửa thành <article>
5. <div class="image"><img src="iphone.jpg"></div> sửa thành 
<figure>
    <img src="iphone.jpg" alt="iPhone 16 Pro">
    <figcaption>iPhone 16 Pro</figcaption>
</figure>

### Câu A3 — Block vs Inline:
Không chạy code, hãy **vẽ tay** (hoặc mô tả bằng text art) kết quả hiển thị của đoạn HTML sau. Giải thích tại sao.
```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
```
Trả lời: Kết quả hiển thị                              
| Hộp 1          |                      
| Text A Text B  |
| Hộp 2          |
| Text C Text D  |
| Hộp 3          |
Giải thích:
1. <div> là phần tử block
Theo chương 04: Block element chiếm cả dòng nên Hộp 1, Hộp 2, Hộp 3 mỗi phần sẽ hiển thị trên 1 dòng riêng
2. <span> và <strong> là phần tử inline
Theo chương 04: Inline element chỉ chiếm nội dung nên Text A, Text B sẽ nằm trên cùng 1 dòng
3. Tương tự với Text C, Text D. Dù <strong> có làm chữ đậm lên thì nó vẫn là inline, nên nó vẫn đứng chung hàng với Text C

### Câu A4 — Table:
Đọc chương 05: Giải thích sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`. Tại sao KHÔNG NÊN dùng table để tạo layout trang web? (Ghi rõ ít nhất 3 lý do)
-Trả lời:
1. <thead>: Dùng để chứa phần tiêu đề của bảng, thường gồm tên các cột
2. <tbody>: Dùng để chứa dữ liệu chính của bảng
3. <tfoot>: Dùng để chứa thông tin tổng kết hoặc chú thích cho bảng
-Không nên dùng table để tạo layout trang web vì:
1. Không đúng semantic HTML:
Table được tạo ra để hiển thị dữ liệu dạng bảng, không phải để bố trí giao diện. Nếu dùng sai mục đích, Google khó hiểu cấu trúc nội dung → SEO kém
2. Không linh hoạt trên di động:
Bảng có cấu trúc rất cứng nhắc. Trên màn hình điện thoại nhỏ, table không thể tự động xuống dòng hay co giãn linh hoạt. Trong khi CSS Flexbox và Grid responsive tốt hơn
3. Hiệu suất tải trang chậm & Code rắc rối:
Trình duyệt thường phải đợi tải xong toàn bộ thẻ <table> thì mới bắt đầu hiển thị nội dung bên trong. Hơn nữa, việc lồng hàng chục thẻ <tr>, <td> để tạo giao diện sẽ tạo ra một đống "code rác", khiến việc bảo trì và sửa lỗi sau này trở nên khó khăn
-Nguồn tham chiếu: 05_tables_hyperlinks.md (Quy tắc: <table> chỉ dùng cho dữ liệu dạng bảng (danh sách, so sánh, thống kê). KHÔNG dùng cho layout trang web!)


## PHẦN C — SUY LUẬN 
### Câu C1 — Thiết kế cấu trúc
<header> <!-- header: phần đầu trang -->
    <nav> <!-- nav vì đây là điều hướng -->
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
        <a href="/contact">Liên hệ</a>
    </nav>
</header>
<main> <!-- main: nội dung chính của trang -->
    <nav aria-label="breadcrumb"> <!-- nav: điều hướng breadcrumb -->
        <ol> <!-- ol vì breadcrumb có thứ tự -->
            <li><a href="/">Trang chủ</a></li> <!-- li: mục đầu tiên trong breadcrumb, a: liên kết về trang chủ -->
            <li><a href="/phones">Điện thoại</a></li> <!-- li: mục danh mục cha, a: liên kết đến danh mục điện thoại -->
            <li>iPhone 16</li> <!-- li: trang hiện tại nên không cần liên kết -->
        </ol>
    </nav>
    <section> <!-- section: khu vực chi tiết sản phẩm -->
        <article> <!-- article: thông tin của một sản phẩm -->
             <section> <!-- section: khu vực ảnh sản phẩm -->
                <figure> <!-- figure dùng để chứa nhóm ảnh có chú thích -->
                    <img src="img1.jpg" alt="iPhone 16 mặt trước">
                    <img src="img2.jpg" alt="iPhone 16 mặt sau">
                    <img src="img3.jpg" alt="iPhone 16 cạnh bên">
                    <img src="img4.jpg" alt="iPhone 16 hộp đựng">
                    <img src="img5.jpg" alt="iPhone 16 trên tay">
                    <figcaption>Bộ ảnh thực tế của iPhone 16</figcaption>
                </figure>
             </section>
             <section> <!-- section: thông tin định danh sản phẩm -->
                <h1>Tên sản phẩm</h1> <!-- h1: tiêu đề chính -->
                <p>Giá</p> 
                <p>Đánh giá sao</p>
                <p>Mô tả sản phẩm</p> 
             </section>
             <section> <!-- section: bảng thông số kỹ thuật -->
                <h2>Thông số kỹ thuật</h2>
                <table> <!-- table: dữ liệu dạng bảng -->
                    <thead> <!-- thead: chứa tiêu đề các cột -->
                        <tr>  <!-- tr: một hàng trong bảng -->
                            <th>Thông số</th> <!-- th: ô tiêu đề -->
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody> <!-- tbody: chứa dữ liệu chính -->
                        <tr>
                            <td>Màn hình</td> <!-- td: ô dữ liệu -->
                            <td>...</td>
                        </tr>
                    </tbody>
                </table>
             </section>  
             <section> <!-- section: khu vực đánh giá -->
                <h2>Đánh giá sản phẩm</h2>
                <article> <!-- article: mỗi bình luận là 1 nội dung độc lập -->
                    <p>Bình luận của khách hàng</p>
                </article>
             </section>
        </article>
    </section>
    <aside> <!-- Aside: Sidebar chứa các nội dung liên quan nhưng không nằm trong luồng chính -->
        <h2>Sản phẩm tương tự</h2>
        <article>
            <p>Sản phẩm 1</p>
        </article>
        <article>
            <p>Sản phẩm 2</p>
        </article>
    </aside>
</main>
<footer> <!-- footer: thông tin cuối trang -->
    <p>Thông tin liên hệ/copyright</p>
</footer>

### Câu C2 — So sánh & Tranh luận
Quan điểm dùng <div> cho mọi thứ rồi thêm class, không cần semantic HTML là một quan điểm chưa chính xác, semantic HTML không chỉ giúp code rõ ràng hơn mà còn mang lại nhiều lợi ích kỹ thuật quan trọng. Thứ nhất về SEO, các công cụ tìm kiếm như Google dựa vào semantic tags để hiểu cấu trúc nội dung của trang web. Khi sử dụng các thẻ như <header>, <nav>, <main>, <article>, Google dễ xác định đâu là nội dung chính, đâu là điều hướng hay phần phụ, từ đó đánh giá trang tốt hơn. Nếu chỉ dùng nhiều <div>, công cụ tìm kiếm sẽ khó phân tích, làm giảm hiệu quả SEO. Thứ hai, semantic HTML cũng giúp cải thiện Accessibility. Các công cụ hỗ trợ như screen reader có thể đọc và phân tích cấu trúc trang tốt hơn khi gặp các thẻ semantic. Ví dụ, người khiếm thị dùng trình đọc màn hình có thể nhanh chóng chuyển đến khu vực <main> hoặc bỏ qua <nav>, giúp trải nghiệm truy cập thuận tiện hơn. Lấy ví dụ cụ thể, trên một trang thương mại điện tử, nếu mỗi sản phẩm được đặt trong thẻ <article>, hình ảnh dùng <figure> và menu nằm trong <nav>, cả công cụ tìm kiếm lẫn trình hỗ trợ đều hiểu chính xác chức năng từng phần. Điều này tốt hơn nhiều so với việc dùng <div class="product">. Tuy nhiên, nói như vậy không có nghĩa là chúng ta bài trừ <div>, <div> vẫn rất phù hợp trong những trường hợp cần nhóm các phần tử để phục vụ mục đích trình bày hoặc styling bằng CSS, chẳng hạn như gom nhiều nút vào một khối để áp dụng Flexbox hoặc Grid. Vì vậy, semantic HTML không thay thế hoàn toàn <div>, mà cần được kết hợp hợp lý để tạo nên cấu trúc web chính xác và hiệu quả.


### Bài B3 — Debug HTML
Lỗi 1: Dòng 1 — DOCTYPE sai cú pháp — sửa thành <!DOCTYPE html>
Lỗi 2: Dòng 5 — thiếu đóng thẻ title — thêm </title>
Lỗi 3: Dòng 6 — charset sai utf8 — sửa thành utf-8
Lỗi 4: Dòng 9 — thẻ h1 không đóng đúng — <h1> bị thiếu </h1>
Lỗi 5: Dòng 13 — thẻ <a> trang chủ không đóng — thêm </a>
Lỗi 6: Dòng 19 — thiếu alt trong img — thêm alt="iPhone 16 Pro"
Lỗi 7: Dòng 21 — thẻ <b> và </p> sai thứ tự — sửa lại đúng nesting
Lỗi 8: Dòng 33 — dùng 2 thẻ main (semantic sai) — đổi main thứ 2 thành aside
Lỗi 9: Dòng 42 — thiếu </p> trong footer
Lỗi 10: Dòng nav href thiếu .html (logic lỗi) — nên thêm home.html, products.html


### Bài B4 — Phân tích trang web thật
Chọn trang web `thegioididong.com`
1. 3 thẻ semantic HTML5 mà trang đó sử dụng:
- <header>: xuất hiện ngay sau phần chú thích Google Tag Manager
- <h1>: nằm dưới input type
- <p>: nằm trên <style>
*thẻ mà trang đó KHÔNG dùng đúng semantic (nếu có):
- <div>: Thay vì dùng <div>, trang web này nên sử dụng thẻ <main> để bao bọc nội dung chính của trang 

2. Không tìm thấy thẻ <table> trong trang thegioididong.com khi kiểm tra bằng DevTools

3. Tìm 1 `<form>` trên trang (ví dụ ô tìm kiếm):
- action: gửi request đến trang tìm kiếm sản phẩm
- method: get
- Input types được dùng: <input type="text"> hoặc <input type="search">


### Link video thực hành code:
https://drive.google.com/file/d/1zTlX82Nl_fZS3tlttSKOie6bzpzjinlV/view?usp=sharing









