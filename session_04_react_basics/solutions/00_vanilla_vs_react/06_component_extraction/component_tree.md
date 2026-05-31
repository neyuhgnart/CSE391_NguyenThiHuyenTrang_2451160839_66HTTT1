### 1. 
App
├── Navbar (Nhận props)
├── Hero (Nhận props)
├── ProductGrid (Nhận props)
│   ├── ProductCard (Nhận props — Lặp lại qua vòng lặp .map)
│   ├── ProductCard
│   ├── ProductCard
│   └── ProductCard
└── Footer (Nhận props)

### 2.
| Tên Component | Các Props nhận vào | Kiểu dữ liệu | Vai trò |
| :--- | :--- | :--- | :--- |
| **Navbar** | `logo`<br>`links` | String<br>Array of Objects `[{ label, href }]` | Đổi tên thương hiệu và hiển thị menu điều hướng linh hoạt. |
| **Hero** | `title`<br>`subtitle`<br>`buttonText` | String<br>String<br>String | Thay đổi thông điệp chào mừng và nút bấm kêu gọi hành động. |
| **ProductCard**| `image`<br>`name`<br>`price` | String<br>String<br>String | Nhận dữ liệu của duy nhất một sản phẩm để render thẻ tương ứng. |
| **ProductGrid**| `title`<br>`products` | String<br>Array of Objects `[{ id, name, price, image }]` | Nhận tiêu đề danh mục và mảng danh sách tổng để quản lý layout. |
| **Footer** | `text` | String | Hiển thị thông tin bản quyền hoặc liên hệ dưới chân trang. |

### 3.
* **Tính tái sử dụng cao (Reusability):** Component `Navbar` và `Footer` xuất hiện ở mọi trang trong hệ thống (Trang chủ, Sản phẩm, Giới thiệu). Tách riêng giúp ta chỉ cần gọi thẻ `<Navbar />` thay vì copy-paste hàng chục dòng HTML sang các file khác nhau.
* **Dễ bảo trì và chỉnh sửa (Maintainability):** `ProductCard` được lặp lại rất nhiều lần. Nếu ngày mai thiết kế đổi nút "Thêm vào giỏ" thành biểu tượng Giỏ hàng, ta **chỉ cần sửa đúng 1 chỗ** tại file hoặc khối lệnh của `ProductCard`, toàn bộ 100 sản phẩm trên website sẽ tự động cập nhật theo.
* **Tách biệt trách nhiệm (Separation of Concerns):** `ProductGrid` chịu trách nhiệm quản lý cấu trúc hiển thị dạng lưới (layout grid), trong khi `ProductCard` chỉ lo việc hiển thị chi tiết của một sản phẩm. Sự phân chia này giúp code của hàm `App` cực kỳ ngắn gọn, sạch sẽ và chỉ làm nhiệm vụ lắp ráp (compose) các mảnh ghép lại với nhau.