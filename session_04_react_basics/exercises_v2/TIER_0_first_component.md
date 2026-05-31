## 📝 Bài 0.1 — Chạy React đầu tiên (5 phút)
1. File `.jsx` khác gì file `.js`?
.js (JavaScript): Chứa mã logic JavaScript tiêu chuẩn. Trình duyệt có thể đọc và hiểu trực tiếp file này.
.jsx (JavaScript XML): Là một phần mở rộng cú pháp của JavaScript do React phát triển. Nó cho phép bạn viết các thẻ giống HTML nằm ngay trong code JavaScript mà không cần dùng chuỗi văn bản hay các hàm tạo phần tử phức tạp. Trình duyệt không tự hiểu được .jsx; công cụ build (như Vite) sẽ tự động biên dịch nó thành mã JS tiêu chuẩn trước khi chạy.

2. Tại sao phải `export default App`?
Trong ES6 Modules, mỗi file được coi là một module độc lập. Câu lệnh này giúp xuất component App ra ngoài để các file khác trong hệ thống (cụ thể là src/main.jsx) có thể nạp vào sử dụng thông qua lệnh import App from "./App.jsx".

3. Thử xóa `export default` → chuyện gì xảy ra?
Hệ thống sẽ lập tức báo lỗi ngay trên giao diện terminal hoặc màn hình trình duyệt (Uncaught SyntaxError hoặc lỗi module không tìm thấy thành phần default). Ứng dụng của bạn sẽ bị sập (màn hình trắng xóa) vì file main.jsx không thể tìm thấy thành phần nào để render lên cây DOM.


### Bài tập: Viết lại HTML thành JSX
**Bài 1:** Viết component `UserProfile`
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Trang</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>ht@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default UserProfile;

**Bài 2:** Viết component `ProductInfo`
function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button type="button">Mua ngay</button>
        </div>
    );
}
export default ProductInfo;


